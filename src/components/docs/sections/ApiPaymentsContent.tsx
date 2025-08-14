import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ApiPaymentsContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          🔌 API Reference
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          Payments API
        </h1>
        <p className="text-xl text-gray-600">
          Process payments and manage payment intents with our REST API.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Payment Intents</CardTitle>
          <CardDescription>
            Create payment intents to initiate payment processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="secondary">POST</Badge>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">/v1/payments/intents</code>
          </div>
          
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`curl -X POST https://api.payflow.com/v1/payments/intents \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 2500,
    "currency": "PKR",
    "description": "Premium Course Access"
  }'`}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">List Payments</CardTitle>
          <CardDescription>
            Retrieve a list of your payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="secondary">GET</Badge>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">/v1/payments</code>
          </div>
          
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`curl -X GET "https://api.payflow.com/v1/payments?limit=20" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
