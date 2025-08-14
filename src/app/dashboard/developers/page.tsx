import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/shared/CopyButton";
import { getCurrentBusiness } from "@/lib/auth";

export default async function DevelopersPage() {
  const business = await getCurrentBusiness();
  const apiBase = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const apiKey = business?.apiKey || "<YOUR_API_KEY>";

  const curlCreateLink = `curl -X POST \ \
  '${apiBase}/api/v1/payment_links' \ \
  -H 'Authorization: Bearer ${apiKey}' \ \
  -H 'Content-Type: application/json' \ \
  -d '{"title":"Test Link","amount":5000,"currency":"PKR"}'`;

  const curlListLinks = `curl -X GET \ \
  '${apiBase}/api/v1/payment_links' \ \
  -H 'Authorization: Bearer ${apiKey}'`;

  const curlCreateCustomer = `curl -X POST \ \
  '${apiBase}/api/v1/customers' \ \
  -H 'Authorization: Bearer ${apiKey}' \ \
  -H 'Content-Type: application/json' \ \
  -d '{"name":"Jane Doe","email":"jane@example.com"}'`;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Reference</CardTitle>
          <CardDescription>Use your API key to access the public endpoints.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Create a Payment Link</p>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">{curlCreateLink}</pre>
            <div className="flex justify-end"><CopyButton text={curlCreateLink} /></div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">List Payment Links</p>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">{curlListLinks}</pre>
            <div className="flex justify-end"><CopyButton text={curlListLinks} /></div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Create a Customer</p>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">{curlCreateCustomer}</pre>
            <div className="flex justify-end"><CopyButton text={curlCreateCustomer} /></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


