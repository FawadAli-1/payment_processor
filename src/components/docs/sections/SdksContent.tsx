import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Download, Github, Zap } from "lucide-react";

export function SdksContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="text-sm">
            📚 SDKs & Libraries
          </Badge>
          <Badge variant="outline" className="text-sm border-orange-200 text-orange-700 bg-orange-50">
            🚧 Coming Soon
          </Badge>
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          SDKs & Libraries
        </h1>
        <p className="text-xl text-gray-600">
          Official and community SDKs to integrate PayFlow into your applications.
        </p>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm text-orange-800">
            <strong>Note:</strong> SDKs and client libraries are currently in development. 
            For now, you can integrate with PayFlow using our REST API directly. 
            We'll notify you when SDKs become available!
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Official SDKs</CardTitle>
          <CardDescription>
            Officially supported SDKs maintained by the PayFlow team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">SDKs Coming Soon</h3>
            <p className="text-gray-600 mb-4">
              We're working hard to bring you official SDKs for popular programming languages.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-blue-800">
                <strong>In the meantime:</strong> Use our REST API directly with your preferred HTTP client library.
                Check out our <a href="/docs/api-overview" className="underline font-medium">API documentation</a> for examples.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Community Libraries</CardTitle>
          <CardDescription>
            Third-party libraries and integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Github className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Community Contributions Welcome</h3>
            <p className="text-gray-600 mb-4">
              We encourage the community to build and share PayFlow libraries.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-green-800">
                <strong>Want to contribute?</strong> Build a library for your favorite language and 
                share it with the community. We'll feature it here once it's ready!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Quick Start Examples</CardTitle>
          <CardDescription>
            Get started quickly with code examples
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Examples Coming Soon</h3>
            <p className="text-gray-600 mb-4">
              Once our SDKs are available, you'll find quick start examples here.
            </p>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-purple-800">
                <strong>For now:</strong> Check out our <a href="/docs/quickstart" className="underline font-medium">Quick Start Guide</a> 
                and <a href="/docs/api-overview" className="underline font-medium">API documentation</a> for integration examples.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
