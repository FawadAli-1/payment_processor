"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    safepay?: Record<string, unknown>;
  }
}

interface Props {
  amount: number;
  currency: string;
  description?: string;
  reference: string; // our internal payment id
  returnUrl: string;
  notifyUrl: string;
  apiKey: string; // public key for client
  env: "sandbox" | "production";
}

export default function SafepayCheckoutClient(props: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let script: HTMLScriptElement | null = document.querySelector("script[data-safepay]");
    const ensureScript = () =>
      new Promise<void>((resolve, reject) => {
        if (window.safepay) return resolve();
        if (!script) {
          script = document.createElement("script");
          script.src = "https://storage.googleapis.com/safepayobjects/api/safepay-checkout.min.js";
          script.async = true;
          script.setAttribute("data-safepay", "1");
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Safepay script"));
          document.body.appendChild(script);
        } else {
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Safepay script"));
        }
      });

    (async () => {
      try {
        // Timeout guard so UI doesn't appear to hang forever
        const timeout = setTimeout(() => {
          if (!window.safepay) setError("Failed to load Safepay. Please refresh.");
        }, 8000);

        await ensureScript();
        if (!window.safepay) {
          setError("Safepay script unavailable");
          return;
        }

        const cfg = {
          env: props.env,
          client: {
            sandbox: props.apiKey,
            production: props.apiKey,
          },
          payment: (data: Record<string, unknown>, actions: Record<string, unknown>) => {
            return actions.payment.create({
              transaction: {
                amount: props.amount,
                currency: props.currency,
                description: props.description,
                reference: props.reference,
                return_url: props.returnUrl,
                notify_url: props.notifyUrl,
              },
            });
          },
          onAuthorize: () => {},
          onCancel: () => {},
          onError: () => {
            setError("Safepay reported an error. Please try again.");
          },
        } as any;

        try {
          // Try known render signature (config, selector)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          window.safepay.Button.render(cfg, "#safepay-container");
        } catch {
          try {
            // Fallback: some SDKs use instance().render(selector)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            window.safepay.Button().render("#safepay-container");
          } catch (e) {
            setError("Unable to render Safepay checkout. Check API key and sandbox availability.");
            return;
          }
        }

        clearTimeout(timeout);
        setLoading(false);
      } catch (e) {
        setError("Unexpected error while initializing Safepay.");
      }
    })();

    return () => {
      // best-effort cleanup; Safepay widget manages its own lifecycle
    };
  }, [props.amount, props.currency, props.description, props.reference, props.returnUrl, props.notifyUrl, props.apiKey, props.env]);

  return (
    <div>
      {error && (
        <div className="p-3 mb-3 rounded bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}
      {loading && !error && (
        <div className="p-3 mb-3 rounded bg-gray-50 text-gray-600 text-sm">Loading Safepay…</div>
      )}
      <div id="safepay-container" ref={containerRef} />
    </div>
  );
}


