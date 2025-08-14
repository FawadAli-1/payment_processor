import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Globe, Shield, CheckCircle } from "lucide-react";

export function HostedCheckoutContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          🛒 Checkout Experience
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          Hosted Checkout
        </h1>
        <p className="text-xl text-gray-600">
          Beautiful, secure checkout pages hosted by PayFlow for seamless payment experiences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">What is Hosted Checkout?</CardTitle>
          <CardDescription>
            Professional checkout pages that handle the entire payment process
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Hosted checkout pages are secure, optimized payment forms that PayFlow hosts and manages. 
            They provide a professional checkout experience while keeping sensitive payment data off your servers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold">Secure</h3>
              <p className="text-sm text-gray-600">PCI DSS compliant payment processing</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold">Responsive</h3>
              <p className="text-sm text-gray-600">Works perfectly on all devices</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold">Optimized</h3>
              <p className="text-sm text-gray-600">High conversion rates</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">How It Works</CardTitle>
          <CardDescription>
            The flow of a hosted checkout experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Create Payment Link</h3>
                <p className="text-gray-600">Generate a payment link via API or dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">2</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Customer Clicks Link</h3>
                <p className="text-gray-600">Customer visits the hosted checkout page</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">3</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Complete Payment</h3>
                <p className="text-gray-600">Customer enters payment details and submits</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold text-sm">4</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Redirect & Notify</h3>
                <p className="text-gray-600">Customer redirected back, webhook sent to your server</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Creating Checkout Pages</CardTitle>
          <CardDescription>
            How to create and customize hosted checkout experiences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Via API</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`POST /v1/payment_links
{
  "title": "Premium Course Access",
  "description": "Get access to our premium course content",
  "amount": 2500,
  "currency": "PKR",
  "success_url": "https://yoursite.com/success",
  "cancel_url": "https://yoursite.com/cancel",
  "expires_at": "2024-12-31T23:59:59Z"
}`}
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Via Dashboard</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <span className="text-sm text-gray-700">Go to Payment Links in your dashboard</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <span className="text-sm text-gray-700">Click &quot;Create New Payment Link&quot;</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <span className="text-sm text-gray-700">Fill in the payment details</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">4</span>
                </div>
                <span className="text-sm text-gray-700">Customize the checkout page</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">5</span>
                </div>
                <span className="text-sm text-gray-700">Save and share the link</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Customization Options</CardTitle>
          <CardDescription>
            Personalize your checkout pages to match your brand
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Branding</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Custom logo and colors</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Brand-specific styling</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Custom fonts and typography</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Company information</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Content</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Product title and description</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Product images</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Terms and conditions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Custom success/cancel messages</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">URL Structure</CardTitle>
          <CardDescription>
            How hosted checkout URLs are structured
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">
              Each hosted checkout page has a unique URL that follows this pattern:
            </p>
            
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`https://payflow.com/pay/{slug}

Example: https://payflow.com/pay/premium-course-123`}
              </pre>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">URL Components</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><code className="bg-gray-100 px-1 rounded">payflow.com</code> - PayFlow domain</li>
                <li><code className="bg-gray-100 px-1 rounded">/pay/</code> - Checkout path</li>
                <li><code className="bg-gray-100 px-1 rounded">{slug}</code> - Unique identifier for your payment link</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Success & Cancel URLs</CardTitle>
          <CardDescription>
            Configure where customers are redirected after payment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-green-700">Success URL</h3>
              <p className="text-sm text-gray-700">
                Where customers are redirected after successful payment. Include order confirmation, 
                download links, or thank you messages.
              </p>
              <div className="bg-gray-100 p-3 rounded">
                <code className="text-sm">
                  https://yoursite.com/success?order_id=123
                </code>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg text-red-700">Cancel URL</h3>
              <p className="text-sm text-gray-700">
                Where customers are redirected if they cancel the payment. Use this to encourage 
                them to try again or contact support.
              </p>
              <div className="bg-gray-100 p-3 rounded">
                <code className="text-sm">
                  https://yoursite.com/cancel?reason=user_cancelled
                </code>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Pro Tip:</strong> Include query parameters in your success/cancel URLs to track 
              which payment link was used and provide personalized experiences.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
