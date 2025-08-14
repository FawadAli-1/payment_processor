import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ApiPaymentLinksContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          🔌 API Reference
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          Payment Links API
        </h1>
        <p className="text-xl text-gray-600">
          Create and manage payment links programmatically with our REST API.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Base Endpoint</CardTitle>
          <CardDescription>
            All payment link operations use this base URL
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <code className="text-lg">https://api.payflow.com/v1/payment_links</code>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Payment Link</CardTitle>
          <CardDescription>
            Create a new payment link
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">POST</Badge>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">/v1/payment_links</code>
          </div>
          
          <Tabs defaultValue="curl" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
            </TabsList>
            
            <TabsContent value="curl" className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`curl -X POST https://api.payflow.com/v1/payment_links \\
  -H "Authorization: Bearer pk_live_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Premium Course Access",
    "description": "Get access to our premium course content",
    "amount": 2500,
    "currency": "PKR",
    "expires_at": "2024-12-31T23:59:59Z"
  }'`}
                </pre>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Copy className="w-4 h-4" />
                Copy Code
              </Button>
            </TabsContent>

            <TabsContent value="javascript" className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`const response = await fetch('https://api.payflow.com/v1/payment_links', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer pk_live_YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Premium Course Access',
    description: 'Get access to our premium course content',
    amount: 2500,
    currency: 'PKR',
    expires_at: '2024-12-31T23:59:59Z'
  })
});

const paymentLink = await response.json();`}
                </pre>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Copy className="w-4 h-4" />
                Copy Code
              </Button>
            </TabsContent>

            <TabsContent value="python" className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`import requests

response = requests.post(
    'https://api.payflow.com/v1/payment_links',
    headers={
        'Authorization': 'Bearer pk_live_YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'title': 'Premium Course Access',
        'description': 'Get access to our premium course content',
        'amount': 2500,
        'currency': 'PKR',
        'expires_at': '2024-12-31T23:59:59Z'
    }
)

payment_link = response.json()`}
                </pre>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Copy className="w-4 h-4" />
                Copy Code
              </Button>
            </TabsContent>
          </Tabs>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Request Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-red-700">Required</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">title</code>
                    <span className="text-sm text-gray-600">string</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">amount</code>
                    <span className="text-sm text-gray-600">integer</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">currency</code>
                    <span className="text-sm text-gray-600">string</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-700">Optional</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">description</code>
                    <span className="text-sm text-gray-600">string</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">expires_at</code>
                    <span className="text-sm text-gray-600">datetime</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">success_url</code>
                    <span className="text-sm text-gray-600">string</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">cancel_url</code>
                    <span className="text-sm text-gray-600">string</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Response</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`{
  "id": "pl_1234567890",
  "title": "Premium Course Access",
  "description": "Get access to our premium course content",
  "amount": 2500,
  "currency": "PKR",
  "status": "active",
  "url": "https://payflow.com/pay/premium-course-123",
  "expires_at": "2024-12-31T23:59:59Z",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">List Payment Links</CardTitle>
          <CardDescription>
            Retrieve a list of your payment links
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">GET</Badge>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">/v1/payment_links</code>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Query Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">limit</code>
                  <span className="text-sm text-gray-600">Default: 10, Max: 100</span>
                </div>
                <div className="flex justify-between items-center">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">starting_after</code>
                  <span className="text-sm text-gray-600">Cursor for pagination</span>
                </div>
                <div className="flex justify-between items-center">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">status</code>
                  <span className="text-sm text-gray-600">Filter by status</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Example Request</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`curl -X GET "https://api.payflow.com/v1/payment_links?limit=20&status=active" \\
  -H "Authorization: Bearer pk_live_YOUR_API_KEY"`}
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Response</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`{
  "data": [
    {
      "id": "pl_1234567890",
      "title": "Premium Course Access",
      "amount": 2500,
      "currency": "PKR",
      "status": "active",
      "url": "https://payflow.com/pay/premium-course-123",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "has_more": false,
  "total_count": 1
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Retrieve Payment Link</CardTitle>
          <CardDescription>
            Get details of a specific payment link
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">GET</Badge>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">/v1/payment_links/:id</code>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Example Request</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`curl -X GET https://api.payflow.com/v1/payment_links/pl_1234567890 \\
  -H "Authorization: Bearer pk_live_YOUR_API_KEY"`}
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Response</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`{
  "id": "pl_1234567890",
  "title": "Premium Course Access",
  "description": "Get access to our premium course content",
  "amount": 2500,
  "currency": "PKR",
  "status": "active",
  "url": "https://payflow.com/pay/premium-course-123",
  "clicks": 15,
  "conversion_rate": 0.33,
  "total_revenue": 7500,
  "expires_at": "2024-12-31T23:59:59Z",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Update Payment Link</CardTitle>
          <CardDescription>
            Modify an existing payment link
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">PATCH</Badge>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">/v1/payment_links/:id</code>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Example Request</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`curl -X PATCH https://api.payflow.com/v1/payment_links/pl_1234567890 \\
  -H "Authorization: Bearer pk_live_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Updated Course Title",
    "amount": 3000
  }'`}
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Updatable Fields</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <code className="bg-gray-100 px-1 rounded">title</code> - Product title</li>
              <li>• <code className="bg-gray-100 px-1 rounded">description</code> - Product description</li>
              <li>• <code className="bg-gray-100 px-2 rounded">amount</code> - Price amount</li>
              <li>• <code className="bg-gray-100 px-1 rounded">expires_at</code> - Expiration date</li>
              <li>• <code className="bg-gray-100 px-1 rounded">success_url</code> - Success redirect URL</li>
              <li>• <code className="bg-gray-100 px-1 rounded">cancel_url</code> - Cancel redirect URL</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Error Handling</CardTitle>
          <CardDescription>
            Common error responses and how to handle them
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Common Error Codes</h3>
              <div className="space-y-2">
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-red-700">400 Bad Request</h4>
                  <p className="text-sm text-gray-600">Invalid parameters or missing required fields</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 block">
                    Check your request body and ensure all required fields are present
                  </code>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-red-700">401 Unauthorized</h4>
                  <p className="text-sm text-gray-600">Invalid or missing API key</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 block">
                    Verify your API key is correct and included in the Authorization header
                  </code>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-red-700">404 Not Found</h4>
                  <p className="text-sm text-gray-600">Payment link not found</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 block">
                    Check the payment link ID in your request URL
                  </code>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Rate Limits</CardTitle>
          <CardDescription>
            API rate limits for payment link operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-bold text-xl">100</span>
              </div>
              <h3 className="font-semibold">Requests per minute</h3>
              <p className="text-sm text-gray-600">Standard rate limit</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-green-600 font-bold text-xl">1000</span>
              </div>
              <h3 className="font-semibold">Requests per hour</h3>
              <p className="text-sm text-gray-600">Hourly limit</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-purple-600 font-bold text-xl">10,000</span>
              </div>
              <h3 className="font-semibold">Requests per day</h3>
              <p className="text-sm text-gray-600">Daily limit</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-blue-800">
              <strong>Rate Limit Headers:</strong> The API includes <code className="bg-blue-100 px-1 rounded">X-RateLimit-*</code> headers 
              in responses to help you track your usage and stay within limits.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
