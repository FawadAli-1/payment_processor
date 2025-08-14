import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  Clock, 
  Code, 
  CreditCard, 
  ArrowRight,
  Copy,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

export function QuickStartContent() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          ⚡ 5-Minute Setup
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          Quick Start Guide
        </h1>
        <p className="text-xl text-gray-600">
          Get up and running with PayFlow in just 5 minutes. Accept your first payment today.
        </p>
      </div>

      {/* Steps Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">What You'll Build</CardTitle>
          <CardDescription>
            A simple payment flow that creates a payment link and redirects customers to checkout
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold">Create Payment Link</h3>
              <p className="text-sm text-gray-600">Generate a payment link via API</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-green-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold">Customer Checkout</h3>
              <p className="text-sm text-gray-600">Customer pays via hosted checkout</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-purple-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold">Receive Payment</h3>
              <p className="text-sm text-gray-600">Get notified via webhook</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Guide */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Step-by-Step Implementation</h2>
        
        {/* Step 1: Account Setup */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <div>
                <CardTitle>Create Your Account</CardTitle>
                <CardDescription>Set up your PayFlow account and get your API keys</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Visit <Link href="/" className="text-blue-600 hover:underline">payflow.com</Link> and click "Get Started"</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Complete your business profile and verification</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Navigate to Settings → API Keys to get your keys</span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Your API keys will look like this:</p>
              <code className="text-sm bg-white px-2 py-1 rounded border">
                pk_live_1234567890abcdef...
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Create Payment Link */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">2</span>
              </div>
              <div>
                <CardTitle>Create a Payment Link</CardTitle>
                <CardDescription>Use our API to generate a payment link</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
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

const paymentLink = await response.json();
console.log('Payment URL:', paymentLink.url);`}
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

payment_link = response.json()
print('Payment URL:', payment_link['url'])`}
                  </pre>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Copy className="w-4 h-4" />
                  Copy Code
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Step 3: Customer Checkout */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">3</span>
              </div>
              <div>
                <CardTitle>Customer Completes Payment</CardTitle>
                <CardDescription>Share the payment link with your customer</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              When you create a payment link, you'll receive a response like this:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm text-gray-800">
{`{
  "id": "pl_1234567890",
  "url": "https://payflow.com/pay/abc123",
  "title": "Premium Course Access",
  "amount": 2500,
  "currency": "PKR",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z"
}`}
              </pre>
            </div>
            <p className="text-gray-700">
              Share the <code className="bg-gray-200 px-2 py-1 rounded">url</code> with your customer. 
              They'll be redirected to a beautiful hosted checkout page where they can complete their payment.
            </p>
          </CardContent>
        </Card>

        {/* Step 4: Webhook Notification */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold text-sm">4</span>
              </div>
              <div>
                <CardTitle>Receive Payment Notification</CardTitle>
                <CardDescription>Get notified when payment is completed via webhook</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              PayFlow will send a webhook to your server when the payment is completed. 
              Set up your webhook endpoint to handle these notifications:
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`// Your webhook endpoint
app.post('/webhooks/payflow', (req, res) => {
  const event = req.body;
  
  switch (event.type) {
    case 'payment.succeeded':
      // Handle successful payment
      console.log('Payment completed:', event.data.id);
      break;
    case 'payment.failed':
      // Handle failed payment
      console.log('Payment failed:', event.data.id);
      break;
  }
  
  res.json({ received: true });
});`}
              </pre>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Pro Tip:</strong> Use our webhook testing tool in the dashboard to test webhook delivery 
                before going live.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Testing */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-2xl">Test Your Integration</CardTitle>
          <CardDescription>
            Use test mode to safely test your payment flow
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Use test API keys for development</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Test webhook delivery with our testing tool</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Use test payment methods provided by each provider</span>
            </div>
          </div>
          <div className="pt-4">
            <Link href="/docs/testing">
              <Button variant="outline" size="lg" className="gap-2">
                Learn About Testing
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">What's Next?</CardTitle>
          <CardDescription>
            Explore more advanced features and integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Advanced Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <Link href="/docs/hosted-checkout" className="text-blue-600 hover:underline">Custom hosted checkout pages</Link></li>
                <li>• <Link href="/docs/webhooks" className="text-blue-600 hover:underline">Webhook management</Link></li>
                <li>• <Link href="/docs/api-customers" className="text-blue-600 hover:underline">Customer management</Link></li>
                <li>• <Link href="/docs/analytics" className="text-blue-600 hover:underline">Analytics and reporting</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Integration Guides</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <Link href="/docs/providers/payfast" className="text-blue-600 hover:underline">PayFast integration</Link></li>
                <li>• <Link href="/docs/providers/safepay" className="text-blue-600 hover:underline">Safepay integration</Link></li>
                <li>• <Link href="/docs/security" className="text-blue-600 hover:underline">Security best practices</Link></li>
                <li>• <Link href="/docs/troubleshooting" className="text-blue-600 hover:underline">Common issues and solutions</Link></li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Need Help?</h2>
        <p className="text-gray-600">
          Our team is here to help you get started. Contact us anytime.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/docs/support">
            <Button variant="outline" size="lg">
              View Support Docs
            </Button>
          </Link>
          <Link href="mailto:support@payflow.com">
            <Button size="lg" className="gap-2">
              Contact Support
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
