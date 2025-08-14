"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Eye, EyeOff, Loader2, Key } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ApiKeysCardClientProps {
  initialApiKey: string;
}

export function ApiKeysCardClient({ initialApiKey }: ApiKeysCardClientProps) {
  const router = useRouter();
  const [apiKey, setApiKey] = useState<string>(initialApiKey);
  const [showKey, setShowKey] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      toast.success("API key copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy API key");
    }
  };

  const handleGenerateNewKey = async () => {
    if (!confirm("Are you sure you want to generate a new API key? This will invalidate the current key.")) {
      return;
    }

    try {
      setGenerating(true);
      const response = await fetch("/api/settings/api-keys", {
        method: "POST",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate new API key");
      }

      const data = await response.json();
      setApiKey(data.apiKey);
      toast.success("New API key generated successfully!");
      router.refresh(); // Refresh to get updated data
    } catch (error) {
      console.error("Error generating API key:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate API key");
    } finally {
      setGenerating(false);
    }
  };

  const formatApiKey = (key: string) => {
    if (!key) return "";
    return `${key.slice(0, 8)}...${key.slice(-8)}`;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="p-3 border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Live API Key</p>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowKey(!showKey)}
                title={showKey ? "Hide key" : "Show key"}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleCopyKey}
                title="Copy key"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="bg-gray-100 p-2 rounded text-xs font-mono break-all whitespace-pre-wrap overflow-x-auto max-w-full">
            {showKey ? apiKey : formatApiKey(apiKey)}
          </div>
        </div>
      </div>
      <Button 
        variant="outline" 
        className="w-full"
        onClick={handleGenerateNewKey}
        disabled={generating}
      >
        {generating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <Key className="mr-2 h-4 w-4" />
        Generate New Key
      </Button>
    </div>
  );
}
