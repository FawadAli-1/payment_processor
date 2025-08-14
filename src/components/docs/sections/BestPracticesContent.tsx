import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Shield, Zap } from "lucide-react";

export function BestPracticesContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          🚀 Best Practices
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          Integration Best Practices
        </h1>
        <p className="text-xl text-gray-600">
          Follow these best practices to build secure, reliable, and scalable payment integrations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Security Best Practices</CardTitle>
          <CardDescription>
            Protect your integration and customer data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-green-700">✅ Do This</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Store API keys securely (environment variables)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Use HTTPS for all API calls</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Verify webhook signatures</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Implement proper error handling</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Use test mode for development</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-red-700">❌ Don't Do This</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Never expose API keys in client-side code</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Don't store sensitive data in logs</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Avoid hardcoding credentials</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Don't ignore webhook failures</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>Never use live keys in development</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Error Handling</CardTitle>
          <CardDescription>
            Build resilient integrations with proper error handling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`// Good error handling example
try {
  const payment = await payflow.payments.create({
    amount: 2500,
    currency: 'PKR'
  });
} catch (error) {
  if (error.code === 'card_declined') {
    // Handle declined card
    showUserMessage('Payment declined. Please try another card.');
  } else if (error.code === 'insufficient_funds') {
    // Handle insufficient funds
    showUserMessage('Insufficient funds. Please try another payment method.');
  } else {
    // Log unexpected errors
    console.error('Payment error:', error);
    showUserMessage('Payment failed. Please try again later.');
  }
}`}
              </pre>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Key Error Handling Principles</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Always catch and handle API errors gracefully</li>
                <li>• Provide user-friendly error messages</li>
                <li>• Log errors for debugging (without sensitive data)</li>
                <li>• Implement retry logic for transient failures</li>
                <li>• Have fallback payment methods when possible</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Performance Optimization</CardTitle>
          <CardDescription>
            Build fast and efficient payment experiences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Frontend Optimization</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Lazy load payment forms</li>
                <li>• Use loading states for better UX</li>
                <li>• Implement optimistic updates</li>
                <li>• Cache payment link data</li>
                <li>• Minimize API calls</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Backend Optimization</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Use webhooks instead of polling</li>
                <li>• Implement proper caching strategies</li>
                <li>• Batch operations when possible</li>
                <li>• Use connection pooling</li>
                <li>• Monitor API response times</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Testing Strategy</CardTitle>
          <CardDescription>
            Comprehensive testing for reliable integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <h4 className="font-semibold">Unit Tests</h4>
                <p className="text-sm text-gray-600">Test individual functions and components</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-green-600 font-bold text-sm">2</span>
                </div>
                <h4 className="font-semibold">Integration Tests</h4>
                <p className="text-sm text-gray-600">Test API interactions and webhooks</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-purple-600 font-bold text-sm">3</span>
                </div>
                <h4 className="font-semibold">E2E Tests</h4>
                <p className="text-sm text-gray-600">Test complete payment flows</p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Pro Tip:</strong> Always test with PayFlow's test mode first. Use test payment methods 
                and verify webhook delivery before going live.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Monitoring & Observability</CardTitle>
          <CardDescription>
            Keep track of your integration's health
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Key Metrics to Monitor</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Payment success/failure rates</li>
                  <li>• API response times</li>
                  <li>• Webhook delivery success</li>
                  <li>• Error rates by type</li>
                  <li>• Payment volume trends</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Alerting & Notifications</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• High error rate alerts</li>
                  <li>• Webhook delivery failures</li>
                  <li>• Payment processing delays</li>
                  <li>• API rate limit warnings</li>
                  <li>• Security event notifications</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
