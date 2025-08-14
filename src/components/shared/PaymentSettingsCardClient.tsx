"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ProviderId = "payfast" | "safepay" | "easypaisa" | "jazzcash";

interface ProviderItem {
  id: ProviderId;
  name: string;
  description: string;
  color: string;
  letter: string;
  status: "connected" | "configure" | "disabled";
  enum: string;
  hasCredentials: boolean;
  existingConfig: {
    enabled: boolean;
    credentials: Record<string, string>;
  } | null;
}

interface PaymentSettingsCardClientProps {
  initialProviders: ProviderItem[];
}

const DEFAULT_FIELDS: Record<ProviderId, string[]> = {
  payfast: ["merchantId", "merchantKey", "passphrase", "callbackUrl"],
  safepay: ["apiKey", "apiSecret", "callbackUrl"],
  easypaisa: ["storeId", "hashKey", "callbackUrl"],
  jazzcash: ["merchantId", "password", "salt", "callbackUrl"],
};

// User-friendly field labels and descriptions
const FIELD_LABELS: Record<string, { label: string; description: string; required: boolean }> = {
  merchantId: { label: "Merchant ID", description: "Your unique merchant identifier", required: true },
  merchantKey: { label: "Merchant Key", description: "Your merchant authentication key", required: true },
  passphrase: { label: "Passphrase", description: "Optional security passphrase", required: false },
  apiKey: { label: "API Key", description: "Your provider API key", required: true },
  apiSecret: { label: "API Secret", description: "Your provider API secret", required: true },
  storeId: { label: "Store ID", description: "Your store identifier", required: true },
  hashKey: { label: "Hash Key", description: "Your hash verification key", required: true },
  password: { label: "Password", description: "Your account password", required: true },
  salt: { label: "Salt", description: "Your security salt", required: true },
  callbackUrl: { label: "Callback URL", description: "Webhook notification URL (optional)", required: false },
};

export function PaymentSettingsCardClient({ initialProviders }: PaymentSettingsCardClientProps) {
  const router = useRouter();
  const [providers, setProviders] = useState<ProviderItem[]>(initialProviders);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeProvider, setActiveProvider] = useState<ProviderId | null>(null);
  const [saving, setSaving] = useState(false);
  const [enabled, setEnabled] = useState<boolean>(true);
  const [credentials, setCredentials] = useState<Record<string, string>>({});

  const fields = useMemo(() => (activeProvider ? DEFAULT_FIELDS[activeProvider] : []), [activeProvider]);

  const openConfigure = (id: ProviderId) => {
    try {
      setActiveProvider(id);
      setDialogOpen(true);
      setSaving(false);
      
      // Use existing config data from server component instead of API call
      const provider = initialProviders.find(p => p.id === id);
      if (provider?.existingConfig) {
        setEnabled(provider.existingConfig.enabled);
        const initial: Record<string, string> = {};
        DEFAULT_FIELDS[id].forEach((f) => {
          initial[f] = provider.existingConfig!.credentials[f] ?? "";
        });
        setCredentials(initial);
      } else {
        // No existing config, set defaults
        setEnabled(true);
        setCredentials({});
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load configuration", { className: "bg-red-600 text-white" });
    }
  };

  const saveConfig = async () => {
    if (!activeProvider) return;
    
    // Validate required fields
    const requiredFields = fields.filter(field => FIELD_LABELS[field]?.required);
    const missingFields = requiredFields.filter(field => !credentials[field]?.trim());
    
    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(field => FIELD_LABELS[field]?.label).join(', ');
      toast.error(`Please fill in required fields: ${fieldNames}`, { className: "bg-red-600 text-white" });
      return;
    }
    
    try {
      setSaving(true);
      const res = await fetch(`/api/settings/providers/${initialProviders.find(p => p.id === activeProvider)?.enum}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled, credentials }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        toast.error(e.error || "Failed to save configuration", { className: "bg-red-600 text-white" });
        return;
      }
      toast.success("Configuration saved successfully!");
      setDialogOpen(false);
      setActiveProvider(null);
      router.refresh(); // Refresh to get updated data
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to save configuration", { className: "bg-red-600 text-white" });
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status: ProviderItem["status"]) => {
    switch (status) {
      case "connected":
        return <Badge variant="default">Connected</Badge>;
      case "configure":
        return <Badge variant="secondary">Configure</Badge>;
      case "disabled":
        return <Badge variant="outline">Disabled</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {providers.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 ${p.color} rounded flex items-center justify-center`}>
                <span
                  className={`font-bold text-sm ${
                    p.id === "payfast"
                      ? "text-blue-600"
                      : p.id === "safepay"
                      ? "text-green-600"
                      : p.id === "easypaisa"
                      ? "text-purple-600"
                      : "text-orange-600"
                  }`}
                >
                  {p.letter}
                </span>
              </div>
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-gray-500">{p.description}</p>
              </div>
            </div>
                   <div className="flex items-center gap-2">
                     {getStatusBadge(p.status)}
                     {p.id === "safepay" ? (
                       <Button variant="outline" size="sm" onClick={() => openConfigure(p.id)}>
                         {p.status === "connected" ? "Edit" : "Configure"}
                       </Button>
                     ) : (
                       <Button variant="outline" size="sm" disabled>
                         Coming soon
                       </Button>
                     )}
                   </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {activeProvider ? (
                <>
                  <div className={`w-6 h-6 ${initialProviders.find(p => p.id === activeProvider)?.color} rounded flex items-center justify-center`}>
                    <span className="font-bold text-xs text-gray-700">
                      {initialProviders.find(p => p.id === activeProvider)?.letter}
                    </span>
                  </div>
                  Configure {initialProviders.find(p => p.id === activeProvider)?.name}
                </>
              ) : (
                "Configure Provider"
              )}
            </DialogTitle>
            <DialogDescription>
              {activeProvider && initialProviders.find(p => p.id === activeProvider)?.existingConfig ? 
                "Update your provider credentials. These are stored securely." :
                "Enter your provider credentials. These are stored securely."
              }
            </DialogDescription>
          </DialogHeader>

          {activeProvider && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <input
                  id="provider-enabled"
                  type="checkbox"
                  className="h-4 w-4"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                />
                <Label htmlFor="provider-enabled" className="text-sm font-medium">
                  Enable this payment provider
                </Label>
              </div>
              
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-3">
                  <p>Enter your {initialProviders.find(p => p.id === activeProvider)?.name} credentials below. All sensitive information is encrypted and stored securely.</p>
                </div>
                
                {fields.map((fieldKey) => {
                  const fieldInfo = FIELD_LABELS[fieldKey];
                  return (
                    <div key={fieldKey} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={fieldKey} className="text-sm font-medium">
                          {fieldInfo?.label}
                        </Label>
                        {fieldInfo?.required && (
                          <span className="text-red-500 text-xs">*</span>
                        )}
                      </div>
                      <Input
                        id={fieldKey}
                        value={credentials[fieldKey] ?? ""}
                        onChange={(e) => setCredentials((prev) => ({ ...prev, [fieldKey]: e.target.value }))}
                        placeholder={fieldInfo?.description}
                        required={fieldInfo?.required}
                      />
                      <p className="text-xs text-gray-500">{fieldInfo?.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={saveConfig} disabled={saving || !activeProvider}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Configuration'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
