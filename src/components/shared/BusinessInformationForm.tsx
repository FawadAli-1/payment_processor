import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building } from "lucide-react";
import { BusinessInformationFormClient } from "./BusinessInformationFormClient";
import { getCurrentBusiness } from "@/lib/auth";
import { db } from "@/lib/db";

export async function BusinessInformationForm() {
  const business = await getCurrentBusiness();
  if (!business) {
    return null;
  }

  // Fetch business data on the server
  const businessData = await db.business.findUnique({
    where: { id: business.id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      website: true,
      logo: true,
    }
  });

  if (!businessData) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="mr-2 h-5 w-5" />
          Business Information
        </CardTitle>
        <CardDescription>
          Update your business details and contact information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BusinessInformationFormClient initialData={businessData} />
      </CardContent>
    </Card>
  );
} 