import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Banknote, 
  Shield, 
  Globe,
  CheckCircle
} from "lucide-react";

export function PayFastContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          🇿🇦 Payment Provider
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          PayFast Integration
        </h1>
        <p className="text-xl text-gray-600">
          Integrate PayFast payment processing for bank transfers and card payments in Pakistan.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">About PayFast</CardTitle>
          <CardDescription>
            PayFast is a leading payment gateway in Pakistan offering multiple payment methods
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Supported Payment Methods</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Credit/Debit Cards (Visa, Mastercard)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Bank Transfers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Internet Banking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Mobile Banking</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Features</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Instant payment processing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Secure SSL encryption</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Real-time notifications</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Comprehensive reporting</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Setup & Configuration</CardTitle>
          <CardDescription>
            How to configure PayFast in your PayFlow dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Required Credentials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-2">Merchant ID</h4>
                <p className="text-sm text-gray-600">Your unique PayFast merchant identifier</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 block">
                  Example: 10000100
                </code>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium mb-2">Merchant Key</h4>
                <p className="text-sm text-gray-600">Your PayFast merchant key for authentication</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 block">
                  Example: 46f0cd694581a
                </code>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Configuration Steps</h3>
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
                <span className="text-sm text-gray-700">Navigate to Settings → Payment Providers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <span className="text-sm text-gray-700">Select PayFast and click "Configure"</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">4</span>
                </div>
                <span className="text-sm text-gray-700">Enter your Merchant ID and Merchant Key</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">5</span>
                </div>
                <span className="text-sm text-gray-700">Save and test the configuration</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">API Integration</CardTitle>
          <CardDescription>
            How to integrate PayFast payments in your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="checkout" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="checkout">Checkout Flow</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="checkout" className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Payment Flow</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <span className="text-sm text-gray-700">Create payment intent via PayFlow API</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    <span className="text-sm text-gray-700">Customer redirected to PayFast checkout</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">3</span>
                    </div>
                    <span className="text-sm text-gray-700">Payment processed by PayFast</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">4</span>
                    </div>
                    <span className="text-sm text-gray-700">Customer redirected back with result</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="webhooks" className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Webhook Events</h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-medium">payment.succeeded</h4>
                    <p className="text-sm text-gray-600">Payment was completed successfully</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-medium">payment.failed</h4>
                    <p className="text-sm text-gray-600">Payment processing failed</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-medium">payment.cancelled</h4>
                    <p className="text-sm text-gray-600">Payment was cancelled by customer</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Testing</CardTitle>
          <CardDescription>
            Test your PayFast integration with sandbox credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Test Mode:</strong> Use PayFast sandbox credentials for development and testing. 
              No real money will be processed during testing.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Test Payment Methods</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Test credit card: 4111 1111 1111 1111</li>
              <li>• Test expiry: Any future date</li>
              <li>• Test CVV: Any 3 digits</li>
              <li>• Test amount: Any amount in PKR</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Support & Resources</CardTitle>
          <CardDescription>
            Get help with PayFast integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">PayFlow Support</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Integration assistance</li>
                <li>• Configuration help</li>
                <li>• Troubleshooting</li>
                <li>• Best practices</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">PayFast Resources</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <a href="#" className="text-blue-600 hover:underline">Official Documentation</a></li>
                <li>• <a href="#" className="text-blue-600 hover:underline">API Reference</a></li>
                <li>• <a href="#" className="text-blue-600 hover:underline">Support Portal</a></li>
                <li>• <a href="#" className="text-blue-600 hover:underline">Developer Community</a></li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
