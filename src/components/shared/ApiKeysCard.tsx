"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Key, Copy, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function ApiKeysCard() {
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [showKey, setShowKey] = useState(false);

  const fetchApiKey = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/settings/api-keys");
      
      if (!response.ok) {
        throw new Error("Failed to fetch API key");
      }

      const data = await response.json();
      setApiKey(data.apiKey);
    } catch (error) {
      console.error("Error fetching API key:", error);
      toast.error("Failed to fetch API key");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiKey();
  }, []);

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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="mr-2 h-5 w-5" />
            API Keys
          </CardTitle>
          <CardDescription>
            Manage your API access keys
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Key className="mr-2 h-5 w-5" />
          API Keys
        </CardTitle>
        <CardDescription>
          Manage your API access keys
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
            <div className="bg-gray-100 p-2 rounded text-xs font-mono">
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
      </CardContent>
    </Card>
  );
} 