"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export function CopyButton({ text, title = "Copy" }: { text: string; title?: string }) {
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (e) {
      toast.error("Failed to copy", { className: "bg-red-600 text-white" });
    }
  };
  return (
    <Button variant="ghost" size="sm" onClick={onCopy} title={title}>
      <Copy className="h-4 w-4" />
    </Button>
  );
}


