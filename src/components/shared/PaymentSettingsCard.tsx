"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";

interface PaymentProvider {
  id: string;
  name: string;
  description: string;
  status: "connected" | "configure" | "disabled";
  color: string;
  letter: string;
}

export function PaymentSettingsCard() {
  const providers: PaymentProvider[] = [
    {
      id: "payfast",
      name: "PayFast",
      description: "Bank transfers and cards",
      status: "connected",
      color: "bg-blue-100",
      letter: "P"
    },
    {
      id: "safepay",
      name: "Safepay",
      description: "Digital wallet payments",
      status: "connected",
      color: "bg-green-100",
      letter: "S"
    },
    {
      id: "easypaisa",
      name: "Easypaisa",
      description: "Mobile money transfers",
      status: "connected",
      color: "bg-purple-100",
      letter: "E"
    },
    {
      id: "jazzcash",
      name: "JazzCash",
      description: "Mobile payments",
      status: "configure",
      color: "bg-orange-100",
      letter: "J"
    }
  ];

  const handleProviderAction = (provider: PaymentProvider) => {
    if (provider.status === "connected") {
      toast.info(`${provider.name} is already connected`);
    } else if (provider.status === "configure") {
      toast.info(`Configuring ${provider.name}...`);
      // This would typically open a configuration modal
    } else {
      toast.info(`${provider.name} is currently disabled`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge variant="default">Connected</Badge>;
      case "configure":
        return <Badge variant="secondary">Configure</Badge>;
      case "disabled":
        return <Badge variant="outline">Disabled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          Payment Settings
        </CardTitle>
        <CardDescription>
          Configure your payment preferences and providers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {providers.map((provider) => (
            <div 
              key={provider.id} 
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => handleProviderAction(provider)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${provider.color} rounded flex items-center justify-center`}>
                  <span className={`font-bold text-sm ${
                    provider.id === 'payfast' ? 'text-blue-600' :
                    provider.id === 'safepay' ? 'text-green-600' :
                    provider.id === 'easypaisa' ? 'text-purple-600' :
                    'text-orange-600'
                  }`}>
                    {provider.letter}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{provider.name}</p>
                  <p className="text-sm text-gray-500">{provider.description}</p>
                </div>
              </div>
              {getStatusBadge(provider.status)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 