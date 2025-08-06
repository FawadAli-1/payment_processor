"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Globe, Settings, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function AccountActionsCard() {
  const handleViewDocumentation = () => {
    window.open('https://docs.payflow.com', '_blank');
    toast.success("Opening documentation...");
  };

  const handleDeveloperSettings = () => {
    // This could open a developer settings modal or page
    toast.info("Developer settings coming soon!");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      if (confirm("This will permanently delete all your data, payments, and customers. Are you absolutely sure?")) {
        toast.error("Account deletion is not implemented yet. Please contact support.");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-2 h-5 w-5" />
          Account Actions
        </CardTitle>
        <CardDescription>
          Manage your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button variant="outline" className="w-full justify-start" onClick={handleViewDocumentation}>
          <Globe className="mr-2 h-4 w-4" />
          View Documentation
        </Button>
        <Button variant="outline" className="w-full justify-start" onClick={handleDeveloperSettings}>
          <Settings className="mr-2 h-4 w-4" />
          Developer Settings
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-600 hover:text-red-700" 
          onClick={handleDeleteAccount}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
      </CardContent>
    </Card>
  );
} 