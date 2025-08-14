import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ApiWebhooksContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          🔌 API Reference
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          Webhooks API
        </h1>
        <p className="text-xl text-gray-600">
          Configure and manage webhook endpoints for real-time notifications.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Webhook</CardTitle>
          <CardDescription>
            Create a new webhook endpoint
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="secondary">POST</Badge>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">/v1/webhooks</code>
          </div>
          
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`{
  "url": "https://yoursite.com/webhooks/payflow",
  "events": ["payment.succeeded", "payment.failed"]
}`}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">List Webhooks</CardTitle>
          <CardDescription>
            Retrieve a list of your webhook endpoints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="secondary">GET</Badge>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">/v1/webhooks</code>
          </div>
          
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`{
  "data": [
    {
      "id": "wh_1234567890",
      "url": "https://yoursite.com/webhooks/payflow",
      "status": "active",
      "events": ["payment.succeeded"]
    }
  ]
}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
