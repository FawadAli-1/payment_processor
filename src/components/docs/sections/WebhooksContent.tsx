import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Webhook, Bell, Shield, Code } from "lucide-react";

export function WebhooksContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          🔔 Real-time Notifications
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          Webhooks
        </h1>
        <p className="text-xl text-gray-600">
          Receive real-time notifications about payment events and status changes.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">What are Webhooks?</CardTitle>
          <CardDescription>
            Webhooks are HTTP callbacks that notify your application when events occur
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Instead of polling the API to check payment status, webhooks automatically send HTTP POST requests 
            to your server when events occur. This provides real-time updates and reduces API calls.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Example:</strong> When a payment is completed, PayFlow immediately sends a webhook to your 
              server with the payment details, so you can update your database and notify your customer.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Webhook Events</CardTitle>
          <CardDescription>
            Types of events that trigger webhooks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-700 mb-2">payment.succeeded</h3>
              <p className="text-sm text-gray-600 mb-2">Payment was completed successfully</p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                Triggers when payment status changes to COMPLETED
              </code>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-700 mb-2">payment.failed</h3>
              <p className="text-sm text-gray-600 mb-2">Payment processing failed</p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                Triggers when payment status changes to FAILED
              </code>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">payment.cancelled</h3>
              <p className="text-sm text-gray-600 mb-2">Payment was cancelled by customer</p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                Triggers when payment status changes to CANCELLED
              </code>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-700 mb-2">customer.created</h3>
              <p className="text-sm text-gray-600 mb-2">New customer was created</p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                Triggers when a new customer is added
              </code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Webhook Payload</CardTitle>
          <CardDescription>
            Structure of webhook data sent to your endpoint
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">
              Each webhook contains event information and the associated data:
            </p>
            
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`{
  "id": "evt_1234567890",
  "type": "payment.succeeded",
  "created_at": "2024-01-15T10:30:00Z",
  "data": {
    "id": "pay_1234567890",
    "amount": 2500,
    "currency": "PKR",
    "status": "completed",
    "customer_email": "customer@example.com",
    "provider": "payfast",
    "provider_ref": "PF123456789"
  }
}`}
              </pre>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Event Fields</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><code className="bg-gray-100 px-1 rounded">id</code> - Unique event identifier</li>
                  <li><code className="bg-gray-100 px-1 rounded">type</code> - Event type (e.g., payment.succeeded)</li>
                  <li><code className="bg-gray-100 px-1 rounded">created_at</code> - When the event occurred</li>
                  <li><code className="bg-gray-100 px-1 rounded">data</code> - Event-specific data</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Payment Data Fields</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><code className="bg-gray-100 px-1 rounded">amount</code> - Payment amount in smallest currency unit</li>
                  <li><code className="bg-gray-100 px-1 rounded">currency</code> - Three-letter currency code</li>
                  <li><code className="bg-gray-100 px-1 rounded">status</code> - Current payment status</li>
                  <li><code className="bg-gray-100 px-1 rounded">provider_ref</code> - Provider's reference number</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Setting Up Webhooks</CardTitle>
          <CardDescription>
            Configure webhook endpoints in your PayFlow dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Step 1: Create Webhook Endpoint</h3>
            <p className="text-gray-700">
              Create a webhook endpoint in your application that can receive HTTP POST requests:
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`// Express.js example
app.post('/webhooks/payflow', (req, res) => {
  const event = req.body;
  
  // Handle the webhook event
  handleWebhookEvent(event);
  
  // Respond with 200 to acknowledge receipt
  res.json({ received: true });
});`}
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Step 2: Configure in Dashboard</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <span className="text-sm text-gray-700">Go to Settings → Webhooks</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <span className="text-sm text-gray-700">Click "Add Webhook Endpoint"</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <span className="text-sm text-gray-700">Enter your webhook URL (must be HTTPS)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">4</span>
                </div>
                <span className="text-sm text-gray-700">Select which events to receive</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">5</span>
                </div>
                <span className="text-sm text-gray-700">Save and test the webhook</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Webhook Security</CardTitle>
          <CardDescription>
            Protect your webhook endpoints from unauthorized access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Signature Verification</h3>
            <p className="text-gray-700">
              Always verify webhook signatures to ensure they come from PayFlow:
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}`}
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">HTTPS Requirement</h3>
            <p className="text-gray-700">
              Webhook endpoints must use HTTPS to ensure data security. PayFlow will not send webhooks to HTTP endpoints.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Idempotency</h3>
            <p className="text-gray-700">
              Implement idempotency to handle duplicate webhook deliveries safely. Use the event ID to prevent processing the same event multiple times.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Testing Webhooks</CardTitle>
          <CardDescription>
            Test your webhook implementation before going live
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Webhook Testing Tool</h3>
            <p className="text-gray-700">
              Use the webhook testing tool in your PayFlow dashboard to send test webhooks to your endpoint:
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <span className="text-sm text-gray-700">Go to your webhook endpoint settings</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <span className="text-sm text-gray-700">Click "Send Test Webhook"</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <span className="text-sm text-gray-700">Check your endpoint receives the test event</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Local Testing</h3>
            <p className="text-gray-700">
              For local development, use tools like ngrok to expose your local server to the internet:
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`# Install ngrok
npm install -g ngrok

# Expose your local server
ngrok http 3000

# Use the HTTPS URL provided by ngrok in your webhook endpoint`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
