import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Code } from "lucide-react";

export function TestingContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          🧪 Testing
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          Testing Your Integration
        </h1>
        <p className="text-xl text-gray-600">
          Safely test your PayFlow integration with test mode and sandbox credentials.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Test Mode vs Live Mode</CardTitle>
          <CardDescription>
            Understanding the difference between testing and production
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-green-700">Test Mode</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Use <code className="bg-gray-100 px-1 rounded">pk_test_</code> API keys</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>No real money is processed</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Perfect for development and testing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Use test payment methods</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-red-700">Live Mode</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Use <code className="bg-gray-100 px-1 rounded">pk_live_</code> API keys</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Real money will be processed</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Only use when ready for production</span>
                </li>
                <li className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Real payment methods required</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Test Payment Methods</CardTitle>
          <CardDescription>
            Use these test credentials to simulate payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">PayFast Test Cards</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Test Credit Card</h4>
                  <p className="text-sm text-gray-600">Card Number: 4111 1111 1111 1111</p>
                  <p className="text-sm text-gray-600">Expiry: Any future date</p>
                  <p className="text-sm text-gray-600">CVV: Any 3 digits</p>
                </div>
                <div>
                  <h4 className="font-medium">Test Bank Account</h4>
                  <p className="text-sm text-gray-600">Account: 1234567890</p>
                  <p className="text-sm text-gray-600">Routing: 123456789</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Webhook Testing</CardTitle>
          <CardDescription>
            Test webhook delivery to your endpoints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">
              Use the webhook testing tool in your PayFlow dashboard to send test webhooks:
            </p>
            
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
                <span className="text-sm text-gray-700">Select your webhook endpoint</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <span className="text-sm text-gray-700">Click &quot;Send Test Webhook&quot;</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Local Development</CardTitle>
          <CardDescription>
            Test webhooks on your local machine
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">
              For local development, use ngrok to expose your local server:
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
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> The free version of ngrok will generate a new URL each time you restart it. 
                For production testing, consider using a paid ngrok plan or deploying to a staging environment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
