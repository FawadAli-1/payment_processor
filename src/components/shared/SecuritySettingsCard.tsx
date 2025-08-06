"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useUser } from "@clerk/nextjs";

export function SecuritySettingsCard() {
  const { user } = useUser();

  const handleSecuritySettings = () => {
    // Open Clerk's user profile with security tab
    if (user) {
      // Use the Clerk UserProfile component or redirect to Clerk's user profile
      window.open('/user', '_blank');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          Security Settings
        </CardTitle>
        <CardDescription>
          Manage your account security and authentication
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleSecuritySettings}>
              Configure
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Session Management</p>
              <p className="text-sm text-gray-500">Manage active sessions</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleSecuritySettings}>
              View Sessions
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">Password Change</p>
              <p className="text-sm text-gray-500">Update your account password</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleSecuritySettings}>
              Change Password
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 