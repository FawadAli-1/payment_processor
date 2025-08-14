import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MessageCircle, BookOpen, Users } from "lucide-react";

export function SupportContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          🆘 Support
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          Get Help & Support
        </h1>
        <p className="text-xl text-gray-600">
          We&apos;re here to help you succeed with PayFlow. Multiple ways to get support.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Contact Support</CardTitle>
          <CardDescription>
            Get in touch with our support team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold">Email Support</h3>
              <p className="text-sm text-gray-600">support@payflow.com</p>
              <p className="text-xs text-gray-500">Response within 24 hours</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold">Phone Support</h3>
              <p className="text-sm text-gray-600">+92 300 1234567</p>
              <p className="text-xs text-gray-500">Mon-Fri, 9 AM - 6 PM PKT</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold">Live Chat</h3>
              <p className="text-sm text-gray-600">Available on dashboard</p>
              <p className="text-xs text-gray-500">Real-time assistance</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Self-Service Resources</CardTitle>
          <CardDescription>
            Find answers to common questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Documentation</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <a href="/docs/quickstart" className="text-blue-600 hover:underline">Quick Start Guide</a></li>
                <li>• <a href="/docs/api-overview" className="text-blue-600 hover:underline">API Reference</a></li>
                <li>• <a href="/docs/webhooks" className="text-blue-600 hover:underline">Webhook Guide</a></li>
                <li>• <a href="/docs/security" className="text-blue-600 hover:underline">Security Best Practices</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Community</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <a href="#" className="text-blue-600 hover:underline">Developer Forum</a></li>
                <li>• <a href="#" className="text-blue-600 hover:underline">GitHub Discussions</a></li>
                <li>• <a href="#" className="text-blue-600 hover:underline">Stack Overflow</a></li>
                <li>• <a href="#" className="text-blue-600 hover:underline">Discord Community</a></li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Common Issues</CardTitle>
          <CardDescription>
            Quick solutions to frequent problems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-red-700 mb-2">401 Unauthorized Error</h4>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Problem:</strong> API requests are returning 401 errors
              </p>
              <p className="text-sm text-gray-700">
                <strong>Solution:</strong> Check that your API key is correct and included in the Authorization header. 
                Ensure you&apos;re using the right key for test vs live mode.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-red-700 mb-2">Webhooks Not Receiving</h4>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Problem:</strong> Webhooks are not being delivered to your endpoint
              </p>
              <p className="text-sm text-gray-700">
                <strong>Solution:</strong> Verify your webhook URL is accessible via HTTPS, check your endpoint is 
                responding with 200 status, and ensure webhook signature verification is working correctly.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-red-700 mb-2">Payment Processing Failed</h4>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Problem:</strong> Payments are failing during processing
              </p>
              <p className="text-sm text-gray-700">
                <strong>Solution:</strong> Check your payment provider configuration, verify credentials are correct, 
                and ensure your account is properly set up with the provider.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Support Tiers</CardTitle>
          <CardDescription>
            Different levels of support based on your plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3 p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-lg">Free Plan</h3>
              <ul className="text-sm text-gray-700 space-y-1 text-left">
                <li>• Email support (24h response)</li>
                <li>• Documentation access</li>
                <li>• Community forum</li>
              </ul>
            </div>
            
            <div className="text-center space-y-3 p-4 border border-blue-200 rounded-lg bg-blue-50">
              <h3 className="font-semibold text-lg">Pro Plan</h3>
              <ul className="text-sm text-gray-700 space-y-1 text-left">
                <li>• Email support (12h response)</li>
                <li>• Phone support</li>
                <li>• Priority ticket handling</li>
                <li>• Dedicated support contact</li>
              </ul>
            </div>
            
            <div className="text-center space-y-3 p-4 border border-purple-200 rounded-lg bg-purple-50">
              <h3 className="font-semibold text-lg">Enterprise</h3>
              <ul className="text-sm text-gray-700 space-y-1 text-left">
                <li>• 24/7 phone support</li>
                <li>• Dedicated account manager</li>
                <li>• Custom integration help</li>
                <li>• SLA guarantees</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
