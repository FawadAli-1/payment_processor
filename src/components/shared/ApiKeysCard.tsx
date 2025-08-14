import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Key } from "lucide-react";
import { ApiKeysCardClient } from "./ApiKeysCardClient";
import { getCurrentBusiness } from "@/lib/auth";
import { db } from "@/lib/db";

export async function ApiKeysCard() {
  const business = await getCurrentBusiness();
  if (!business) {
    return null;
  }

  // Fetch API key on the server
  const businessWithApiKey = await db.business.findUnique({
    where: { id: business.id },
    select: {
      apiKey: true,
    }
  });

  const apiKey = businessWithApiKey?.apiKey || "";

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
        <ApiKeysCardClient initialApiKey={apiKey} />
      </CardContent>
    </Card>
  );
} 