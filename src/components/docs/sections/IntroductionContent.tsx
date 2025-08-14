import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Zap, 
  Shield, 
  Globe, 
  BarChart3, 
  Code,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export function IntroductionContent() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="text-sm">
          🚀 Pakistan&apos;s Unified Payment Platform
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to PayFlow
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          The modern payment platform that unifies Pakistan&apos;s leading payment processors into one simple, developer-friendly API.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/docs/quickstart">
            <Button size="lg" className="text-lg px-8">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/docs/api-overview">
            <Button variant="outline" size="lg" className="text-lg px-8">
              <Code className="mr-2 h-5 w-5" />
              View API Reference
            </Button>
          </Link>
        </div>
      </div>

      {/* What is PayFlow */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">What is PayFlow?</CardTitle>
          <CardDescription>
            PayFlow is a comprehensive payment platform designed specifically for the Pakistani market.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Instead of integrating with multiple payment providers separately, PayFlow gives you a single API that works with 
            PayFast, Safepay, Easypaisa, and JazzCash. This means you can accept payments from customers using their 
            preferred payment method without the complexity of managing multiple integrations.
          </p>
          <p className="text-gray-700">
            Whether you&apos;re building an e-commerce site, a subscription service, or a marketplace, PayFlow provides the 
            tools you need to accept payments quickly and securely.
          </p>
        </CardContent>
      </Card>

      {/* Key Features */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Hosted Checkout</CardTitle>
              <CardDescription>
                Beautiful, customizable checkout pages that work across all devices and payment methods.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Payment Links</CardTitle>
              <CardDescription>
                Create payment links instantly and share them with customers. No coding required.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Secure & Compliant</CardTitle>
              <CardDescription>
                Bank-level security with PCI DSS compliance and encrypted data transmission.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Multi-Provider</CardTitle>
              <CardDescription>
                Support for all major Pakistani payment processors in one unified API.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Analytics & Insights</CardTitle>
              <CardDescription>
                Real-time analytics, customer insights, and comprehensive reporting.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-teal-600" />
              </div>
              <CardTitle>Developer First</CardTitle>
              <CardDescription>
                RESTful APIs, webhooks, SDKs, and comprehensive documentation.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Supported Providers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Supported Payment Providers</CardTitle>
          <CardDescription>
            PayFlow integrates with Pakistan&apos;s most popular payment methods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-bold text-lg">PF</span>
              </div>
              <h3 className="font-semibold">PayFast</h3>
              <p className="text-sm text-gray-600">Bank transfers & cards</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-green-600 font-bold text-lg">SP</span>
              </div>
              <h3 className="font-semibold">Safepay</h3>
              <p className="text-sm text-gray-600">Digital wallet</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-orange-600 font-bold text-lg">EP</span>
              </div>
              <h3 className="font-semibold">Easypaisa</h3>
              <p className="text-sm text-gray-600">Mobile money</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-purple-600 font-bold text-lg">JC</span>
              </div>
              <h3 className="font-semibold">JazzCash</h3>
              <p className="text-sm text-gray-600">Mobile payments</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
          <CardDescription>
            Start accepting payments in minutes with our simple integration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">Create your account in 2 minutes</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">Get your API keys instantly</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-gray-700">Accept your first payment in 5 minutes</span>
          </div>
          <div className="pt-4">
            <Link href="/docs/quickstart">
              <Button size="lg" className="w-full sm:w-auto">
                Start Building
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
