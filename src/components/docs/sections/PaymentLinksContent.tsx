import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, Zap, Settings, BarChart3 } from "lucide-react";

export function PaymentLinksContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          🔗 Payment Links
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          Payment Links
        </h1>
        <p className="text-xl text-gray-600">
          Create and share payment links instantly. No coding required.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">What are Payment Links?</CardTitle>
          <CardDescription>
            Simple URLs that let customers pay for products or services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Payment links are shareable URLs that take customers directly to a hosted checkout page. 
            They&apos;re perfect for one-time sales, donations, or any scenario where you need a simple payment solution.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold">Instant</h3>
              <p className="text-sm text-gray-600">Create in seconds</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <Link className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold">Shareable</h3>
              <p className="text-sm text-gray-600">Send via email, SMS, social media</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold">Trackable</h3>
              <p className="text-sm text-gray-600">Monitor clicks and conversions</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Creating Payment Links</CardTitle>
          <CardDescription>
            Multiple ways to create payment links for your business
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Via Dashboard (Recommended)</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <span className="text-sm text-gray-700">Log into your PayFlow dashboard</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <span className="text-sm text-gray-700">Navigate to Payment Links</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <span className="text-sm text-gray-700">Click "Create New Payment Link"</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">4</span>
                </div>
                <span className="text-sm text-gray-700">Fill in product details and pricing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">5</span>
                </div>
                <span className="text-sm text-gray-700">Customize and save</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Via API</h3>
            <p className="text-gray-700">
              Programmatically create payment links for integration with your applications:
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`POST /v1/payment_links
{
  "title": "Premium Course Access",
  "description": "Get access to our premium course content",
  "amount": 2500,
  "currency": "PKR",
  "expires_at": "2024-12-31T23:59:59Z"
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Payment Link Fields</CardTitle>
          <CardDescription>
            Required and optional fields when creating payment links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-red-700">Required Fields</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium">Title</h4>
                  <p className="text-sm text-gray-600">Product or service name</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 block">
                    Example: &quot;Premium Course Access&quot;
                  </code>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium">Amount</h4>
                  <p className="text-sm text-gray-600">Price in smallest currency unit</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 block">
                    Example: 2500 (for PKR 25.00)
                  </code>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium">Currency</h4>
                  <p className="text-sm text-gray-600">Three-letter currency code</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 block">
                    Example: &quot;PKR&quot;
                  </code>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-blue-700">Optional Fields</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium">Description</h4>
                  <p className="text-sm text-gray-600">Detailed product description</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 block">
                    Example: &quot;Complete course with lifetime access&quot;
                  </code>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium">Expires At</h4>
                  <p className="text-sm text-gray-600">When the link expires</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 block">
                    Example: &quot;2024-12-31T23:59:59Z&quot;
                  </code>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium">Success URL</h4>
                  <p className="text-sm text-gray-600">Where to redirect after success</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 block">
                    Example: &quot;https://yoursite.com/success&quot;
                  </code>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium">Cancel URL</h4>
                  <p className="text-sm text-gray-600">Where to redirect if cancelled</p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 block">
                    Example: &quot;https://yoursite.com/cancel&quot;
                  </code>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Managing Payment Links</CardTitle>
          <CardDescription>
            How to organize and maintain your payment links
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Link Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-green-600 font-bold text-lg">Active</span>
                </div>
                <p className="text-sm text-gray-600">Link is active and accepting payments</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-yellow-600 font-bold text-lg">Expired</span>
                </div>
                <p className="text-sm text-gray-600">Link has passed its expiry date</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-red-600 font-bold text-lg">Disabled</span>
                </div>
                <p className="text-sm text-gray-600">Link has been manually disabled</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Management Actions</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Edit:</strong> Update product details, pricing, or expiration</li>
              <li>• <strong>Duplicate:</strong> Create a copy with similar settings</li>
              <li>• <strong>Disable:</strong> Temporarily stop accepting payments</li>
              <li>• <strong>Delete:</strong> Permanently remove the link</li>
              <li>• <strong>Analytics:</strong> View clicks, conversions, and revenue</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sharing & Distribution</CardTitle>
          <CardDescription>
            Best practices for sharing your payment links
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Sharing Methods</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium">Digital Channels</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Email marketing campaigns</li>
                  <li>• Social media posts</li>
                  <li>• WhatsApp business messages</li>
                  <li>• SMS marketing</li>
                  <li>• Website buttons</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Physical Materials</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Business cards</li>
                  <li>• Flyers and brochures</li>
                  <li>• Product packaging</li>
                  <li>• QR codes</li>
                  <li>• Point of sale displays</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">QR Code Integration</h3>
            <p className="text-gray-700">
              Generate QR codes for your payment links to make them easy to scan and access:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Use Case:</strong> Place QR codes on physical products, business cards, or 
                marketing materials so customers can quickly access your payment page.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Analytics & Insights</CardTitle>
          <CardDescription>
            Track performance and optimize your payment links
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-bold text-xl">👁️</span>
              </div>
              <h3 className="font-semibold">Clicks</h3>
              <p className="text-sm text-gray-600">Number of times the link was clicked</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-green-600 font-bold text-xl">💰</span>
              </div>
              <h3 className="font-semibold">Conversions</h3>
              <p className="text-sm text-gray-600">Percentage of clicks that resulted in payment</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-purple-600 font-bold text-xl">📊</span>
              </div>
              <h3 className="font-semibold">Revenue</h3>
              <p className="text-sm text-gray-600">Total revenue generated from the link</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Pro Tip:</strong> Use analytics data to A/B test different link titles, descriptions, 
              and pricing to optimize your conversion rates.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
