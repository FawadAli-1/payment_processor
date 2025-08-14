import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertTriangle } from "lucide-react";

export function PciComplianceContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          🛡️ Security & Compliance
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          PCI DSS Compliance
        </h1>
        <p className="text-xl text-gray-600">
          Understanding PayFlow&apos;s PCI DSS compliance and what it means for your business.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">What is PCI DSS?</CardTitle>
          <CardDescription>
            Payment Card Industry Data Security Standard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">
              PCI DSS (Payment Card Industry Data Security Standard) is a set of security standards designed to ensure 
              that all companies that process, store, or transmit credit card information maintain a secure environment.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> PayFlow is PCI DSS Level 1 compliant, the highest level of certification 
                available in the payments industry. This means we handle all the complex security requirements so you don&apos;t have to.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">PCI DSS Requirements</CardTitle>
          <CardDescription>
            The six main categories of PCI DSS requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">1. Build and Maintain a Secure Network</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Firewall configuration</li>
                  <li>• Secure network architecture</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">2. Protect Cardholder Data</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Data encryption</li>
                  <li>• Secure data transmission</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">3. Maintain Vulnerability Management</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Regular security updates</li>
                  <li>• Anti-virus software</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">4. Implement Strong Access Control</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Unique user IDs</li>
                  <li>• Access restrictions</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">5. Monitor and Test Networks</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Security monitoring</li>
                  <li>• Regular testing</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">6. Maintain Information Security Policy</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Security policies</li>
                  <li>• Employee training</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">How PayFlow Handles PCI Compliance</CardTitle>
          <CardDescription>
            We take care of the complex security requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-green-700">What We Handle</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Credit card data encryption</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Secure data transmission</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Network security</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Regular security audits</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Compliance reporting</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-blue-700">What You Need to Do</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Use HTTPS on your website</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Don&apos;t store card data</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Secure your API keys</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Verify webhook signatures</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Compliance Benefits</CardTitle>
          <CardDescription>
            Why PCI DSS compliance matters for your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold">Customer Trust</h3>
              <p className="text-sm text-gray-600">Build confidence with secure payment processing</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold">Risk Reduction</h3>
              <p className="text-sm text-gray-600">Minimize the risk of data breaches</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold">Legal Protection</h3>
              <p className="text-sm text-gray-600">Meet regulatory requirements</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Annual Compliance Report</CardTitle>
          <CardDescription>
            Access our latest PCI DSS compliance documentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-gray-700">
              PayFlow undergoes annual PCI DSS audits by qualified security assessors (QSAs) to maintain our Level 1 certification.
            </p>
            <a 
              href="#"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Download Compliance Report
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
