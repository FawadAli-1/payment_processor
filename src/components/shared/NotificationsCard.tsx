"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { toast } from "sonner";

interface NotificationSettings {
  paymentNotifications: boolean;
  failedPaymentAlerts: boolean;
  weeklyReports: boolean;
}

export function NotificationsCard() {
  const [settings, setSettings] = useState<NotificationSettings>({
    paymentNotifications: true,
    failedPaymentAlerts: true,
    weeklyReports: false,
  });

  const toggleSetting = (key: keyof NotificationSettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast.success(`${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} ${settings[key] ? 'disabled' : 'enabled'}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Notifications
        </CardTitle>
        <CardDescription>
          Configure notification preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Payment Notifications</p>
              <p className="text-xs text-gray-500">Get notified of successful payments</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSetting('paymentNotifications')}
            >
              <Badge variant={settings.paymentNotifications ? "default" : "secondary"}>
                {settings.paymentNotifications ? "Enabled" : "Disabled"}
              </Badge>
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Failed Payment Alerts</p>
              <p className="text-xs text-gray-500">Notifications for failed transactions</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSetting('failedPaymentAlerts')}
            >
              <Badge variant={settings.failedPaymentAlerts ? "default" : "secondary"}>
                {settings.failedPaymentAlerts ? "Enabled" : "Disabled"}
              </Badge>
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Weekly Reports</p>
              <p className="text-xs text-gray-500">Receive weekly business summaries</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSetting('weeklyReports')}
            >
              <Badge variant={settings.weeklyReports ? "default" : "secondary"}>
                {settings.weeklyReports ? "Enabled" : "Disabled"}
              </Badge>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 