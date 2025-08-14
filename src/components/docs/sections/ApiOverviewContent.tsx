import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Globe, 
  Shield, 
  Zap, 
  Database,
  Webhook,
  CreditCard,
  Users,
  Link as LinkIcon
} from "lucide-react";

export function ApiOverviewContent() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          🔌 API Reference
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          API Overview
        </h1>
        <p className="text-xl text-gray-600">
          Everything you need to know about the PayFlow API structure, authentication, and endpoints.
        </p>
      </div>

      {/* API Base URL */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Base URL</CardTitle>
          <CardDescription>
            All API requests should be made to the following base URL
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <code className="text-lg">https://api.payflow.com/v1</code>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            <strong>Note:</strong> Replace <code className="bg-gray-200 px-1 rounded">v1</code> with the latest API version when available.
          </p>
        </CardContent>
      </Card>

      {/* Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Authentication</CardTitle>
          <CardDescription>
            All API requests require authentication using your API key
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Include your API key in the <code className="bg-gray-200 px-1 rounded">Authorization</code> header of every request:
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <pre className="text-sm">
{`Authorization: Bearer pk_live_YOUR_API_KEY`}
            </pre>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Test Mode</h4>
              <p className="text-sm text-gray-600">
                Use <code className="bg-gray-200 px-1 rounded">pk_test_</code> keys for development and testing.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Live Mode</h4>
              <p className="text-sm text-gray-600">
                Use <code className="bg-gray-200 px-1 rounded">pk_live_</code> keys for production transactions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Endpoints */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">API Endpoints</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Payment Links */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <LinkIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Payment Links</CardTitle>
                  <CardDescription>Create and manage payment links</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">POST</span>
                  <Badge variant="secondary">/payment_links</Badge>
                </div>
                <p className="text-xs text-gray-600">Create a new payment link</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">GET</span>
                <Badge variant="secondary">/payment_links</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">GET</span>
                <Badge variant="secondary">/payment_links/:id</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">PATCH</span>
                <Badge variant="secondary">/payment_links/:id</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Payments */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle>Payments</CardTitle>
                  <CardDescription>Manage payment transactions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">POST</span>
                  <Badge variant="secondary">/payments/intents</Badge>
                </div>
                <p className="text-xs text-gray-600">Create payment intent</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">GET</span>
                <Badge variant="secondary">/payments</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">GET</span>
                <Badge variant="secondary">/payments/:id</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Customers */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle>Customers</CardTitle>
                  <CardDescription>Manage customer data</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">POST</span>
                  <Badge variant="secondary">/customers</Badge>
                </div>
                <p className="text-xs text-gray-600">Create a new customer</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">GET</span>
                <Badge variant="secondary">/customers</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">GET</span>
                <Badge variant="secondary">/customers/:id</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">PATCH</span>
                <Badge variant="secondary">/customers/:id</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Webhooks */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Webhook className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle>Webhooks</CardTitle>
                  <CardDescription>Configure webhook endpoints</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">POST</span>
                  <Badge variant="secondary">/webhooks</Badge>
                </div>
                <p className="text-xs text-gray-600">Create webhook endpoint</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">GET</span>
                <Badge variant="secondary">/webhooks</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">DELETE</span>
                <Badge variant="secondary">/webhooks/:id</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Request/Response Format */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Request & Response Format</CardTitle>
          <CardDescription>
            All API requests and responses use JSON format
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="request" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="request">Request Format</TabsTrigger>
              <TabsTrigger value="response">Response Format</TabsTrigger>
            </TabsList>
            
            <TabsContent value="request" className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`POST /v1/payment_links
Authorization: Bearer pk_live_YOUR_API_KEY
Content-Type: application/json

{
  "title": "Product Name",
  "description": "Product description",
  "amount": 1000,
  "currency": "PKR",
  "expires_at": "2024-12-31T23:59:59Z"
}`}
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="response" className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`{
  "id": "pl_1234567890",
  "title": "Product Name",
  "description": "Product description",
  "amount": 1000,
  "currency": "PKR",
  "status": "active",
  "url": "https://payflow.com/pay/abc123",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}`}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* HTTP Status Codes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">HTTP Status Codes</CardTitle>
          <CardDescription>
            Standard HTTP status codes used by the PayFlow API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Success Responses</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">200</Badge>
                  <span className="text-sm text-gray-600">OK - Request successful</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">201</Badge>
                  <span className="text-sm text-gray-600">Created - Resource created</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">204</Badge>
                  <span className="text-sm text-gray-600">No Content - Success, no response body</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Error Responses</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Badge variant="destructive">400</Badge>
                  <span className="text-sm text-gray-600">Bad Request - Invalid parameters</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="destructive">401</Badge>
                  <span className="text-sm text-gray-600">Unauthorized - Invalid API key</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="destructive">404</Badge>
                  <span className="text-sm text-gray-600">Not Found - Resource not found</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="destructive">429</Badge>
                  <span className="text-sm text-gray-600">Too Many Requests - Rate limit exceeded</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="destructive">500</Badge>
                  <span className="text-sm text-gray-600">Internal Server Error - Server error</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rate Limiting */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Rate Limiting</CardTitle>
          <CardDescription>
            API rate limits to ensure fair usage and system stability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-bold text-xl">100</span>
              </div>
              <h3 className="font-semibold">Requests per minute</h3>
              <p className="text-sm text-gray-600">Standard rate limit for most endpoints</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-green-600 font-bold text-xl">1000</span>
              </div>
              <h3 className="font-semibold">Requests per hour</h3>
              <p className="text-sm text-gray-600">Hourly rate limit for high-volume operations</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-purple-600 font-bold text-xl">10,000</span>
              </div>
              <h3 className="font-semibold">Requests per day</h3>
              <p className="text-sm text-gray-600">Daily rate limit for all API calls</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Rate Limit Headers:</strong> The API includes <code className="bg-blue-100 px-1 rounded">X-RateLimit-*</code> headers 
              in responses to help you track your usage and stay within limits.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SDKs and Libraries */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">SDKs & Libraries</CardTitle>
          <CardDescription>
            Official and community-maintained libraries for popular programming languages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Official SDKs</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">JS</span>
                    </div>
                    <span className="font-medium">JavaScript/Node.js</span>
                  </div>
                  <Badge variant="secondary">Official</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">PY</span>
                    </div>
                    <span className="font-medium">Python</span>
                  </div>
                  <Badge variant="secondary">Official</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Community Libraries</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-sm">PHP</span>
                    </div>
                    <span className="font-medium">PHP</span>
                  </div>
                  <Badge variant="outline">Community</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-sm">GO</span>
                    </div>
                    <span className="font-medium">Go</span>
                  </div>
                  <Badge variant="outline">Community</Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-3">
              Don&apos;t see your language? We provide comprehensive REST API documentation for all integrations.
            </p>
            <a 
              href="https://github.com/payflow/sdks" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              View all SDKs on GitHub →
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
