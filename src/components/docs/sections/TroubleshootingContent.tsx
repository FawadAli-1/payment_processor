import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

export function TroubleshootingContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          🔧 Troubleshooting
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          Troubleshooting Guide
        </h1>
        <p className="text-xl text-gray-600">
          Common issues and their solutions to help you resolve problems quickly.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Authentication Issues</CardTitle>
          <CardDescription>
            Problems with API keys and authentication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <div className="flex items-center space-x-2 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <h4 className="font-medium text-red-700">401 Unauthorized</h4>
              </div>
              <p className="text-sm text-red-700 mb-2">
                <strong>Problem:</strong> API requests return 401 Unauthorized errors
              </p>
              <div className="space-y-2 text-sm text-red-700">
                <p><strong>Possible Causes:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Invalid or expired API key</li>
                  <li>Missing Authorization header</li>
                  <li>Using test key for live endpoints or vice versa</li>
                  <li>API key doesn&apos;t have required permissions</li>
                </ul>
              </div>
              <div className="mt-3 p-3 bg-white rounded border">
                <p className="text-sm font-medium mb-2">Solution:</p>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Verify your API key is correct</li>
                  <li>Check the Authorization header format: <code className="bg-gray-100 px-1 rounded">Bearer YOUR_API_KEY</code></li>
                  <li>Ensure you&apos;re using the right key for your environment (test vs live)</li>
                  <li>Check API key permissions in your dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Payment Processing Issues</CardTitle>
          <CardDescription>
            Problems with payment creation and processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-700">Payment Creation Fails</h4>
              </div>
              <p className="text-sm text-yellow-700 mb-2">
                <strong>Problem:</strong> Unable to create payment links or intents
              </p>
              <div className="space-y-2 text-sm text-yellow-700">
                <p><strong>Common Causes:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Missing required fields</li>
                  <li>Invalid amount format</li>
                  <li>Unsupported currency</li>
                  <li>Rate limit exceeded</li>
                </ul>
              </div>
              <div className="mt-3 p-3 bg-white rounded border">
                <p className="text-sm font-medium mb-2">Solution:</p>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Check all required fields are present</li>
                  <li>Ensure amount is in smallest currency unit (e.g., 2500 for PKR 25.00)</li>
                  <li>Verify currency is supported (PKR, USD, etc.)</li>
                  <li>Implement exponential backoff for rate limits</li>
                </ol>
              </div>
            </div>
            
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <div className="flex items-center space-x-2 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <h4 className="font-medium text-red-700">Payment Processing Fails</h4>
              </div>
              <p className="text-sm text-red-700 mb-2">
                <strong>Problem:</strong> Payments fail during provider processing
              </p>
              <div className="mt-3 p-3 bg-white rounded border">
                <p className="text-sm font-medium mb-2">Solution:</p>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Check payment provider configuration</li>
                  <li>Verify provider credentials are correct</li>
                  <li>Ensure provider account is active</li>
                  <li>Check provider-specific error messages</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Webhook Issues</CardTitle>
          <CardDescription>
            Problems with webhook delivery and processing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <div className="flex items-center space-x-2 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <h4 className="font-medium text-red-700">Webhooks Not Receiving</h4>
              </div>
              <p className="text-sm text-red-700 mb-2">
                <strong>Problem:</strong> Webhook events are not being delivered to your endpoint
              </p>
              <div className="mt-3 p-3 bg-white rounded border">
                <p className="text-sm font-medium mb-2">Solution:</p>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Verify webhook URL is accessible via HTTPS</li>
                  <li>Check your endpoint responds with 200 status</li>
                  <li>Ensure webhook is active in dashboard</li>
                  <li>Test with webhook testing tool</li>
                  <li>Check server logs for incoming requests</li>
                </ol>
              </div>
            </div>
            
            <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-700">Webhook Signature Verification Fails</h4>
              </div>
              <p className="text-sm text-yellow-700 mb-2">
                <strong>Problem:</strong> Webhook signature verification is failing
              </p>
              <div className="mt-3 p-3 bg-white rounded border">
                <p className="text-sm font-medium mb-2">Solution:</p>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Check webhook secret is correct</li>
                  <li>Verify signature calculation matches</li>
                  <li>Ensure raw body is used for signature</li>
                  <li>Check for middleware that modifies request body</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Performance Issues</CardTitle>
          <CardDescription>
            Slow response times and performance problems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-700">Slow API Responses</h4>
              </div>
              <p className="text-sm text-yellow-700 mb-2">
                <strong>Problem:</strong> API calls are taking too long to respond
              </p>
              <div className="mt-3 p-3 bg-white rounded border">
                <p className="text-sm font-medium mb-2">Solution:</p>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Check your internet connection</li>
                  <li>Verify you&apos;re not hitting rate limits</li>
                  <li>Use appropriate timeout values</li>
                  <li>Implement retry logic with backoff</li>
                </ol>
              </div>
            </div>
            
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-blue-700">Rate Limiting</h4>
              </div>
              <p className="text-sm text-blue-700 mb-2">
                <strong>Problem:</strong> Receiving 429 Too Many Requests errors
              </p>
              <div className="mt-3 p-3 bg-white rounded border">
                <p className="text-sm font-medium mb-2">Solution:</p>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Implement exponential backoff</li>
                  <li>Respect Retry-After headers</li>
                  <li>Cache responses when possible</li>
                  <li>Batch requests when feasible</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Getting More Help</CardTitle>
          <CardDescription>
            When to escalate and how to get additional support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Still having issues?</strong> If you&apos;ve tried the solutions above and are still experiencing problems, 
                contact our support team with:
              </p>
              <ul className="text-sm text-blue-800 mt-2 list-disc list-inside space-y-1">
                <li>Detailed description of the problem</li>
                <li>Steps to reproduce the issue</li>
                <li>Error messages and logs</li>
                <li>Your PayFlow account ID</li>
                <li>What you&apos;ve already tried</li>
              </ul>
            </div>
            
            <div className="text-center">
              <a 
                href="/docs/support"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Contact Support
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
