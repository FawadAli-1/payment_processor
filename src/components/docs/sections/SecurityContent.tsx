import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, CheckCircle } from "lucide-react";

export function SecurityContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          🔒 Security & Compliance
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          Security
        </h1>
        <p className="text-xl text-gray-600">
          Learn about PayFlow's security measures and how to keep your integration secure.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Security Features</CardTitle>
          <CardDescription>
            Comprehensive security measures to protect your business and customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Lock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Data Encryption</h3>
                  <p className="text-sm text-gray-600">All data encrypted in transit and at rest</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">PCI DSS Compliance</h3>
                  <p className="text-sm text-gray-600">Bank-level security standards</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Fraud Detection</h3>
                  <p className="text-sm text-gray-600">Advanced fraud prevention systems</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Regular Audits</h3>
                  <p className="text-sm text-gray-600">Continuous security assessments</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Best Practices</CardTitle>
          <CardDescription>
            Security guidelines for your PayFlow integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">API Security</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Use HTTPS for all API requests</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Store API keys securely in environment variables</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Implement proper error handling without exposing sensitive data</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Use webhook signature verification</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Data Protection</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Never log sensitive payment information</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Implement proper access controls</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Regular security updates and patches</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Webhook Security</CardTitle>
          <CardDescription>
            Secure your webhook endpoints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">
              Webhooks are a critical part of your payment flow. Follow these security practices:
            </p>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Signature Verification</h3>
              <p className="text-sm text-gray-700">
                Always verify webhook signatures to ensure they come from PayFlow:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`// Verify webhook signature
const signature = req.headers['x-payflow-signature'];
const payload = req.body;
const expectedSignature = crypto
  .createHmac('sha256', webhookSecret)
  .update(JSON.stringify(payload))
  .digest('hex');

if (signature !== expectedSignature) {
  return res.status(400).json({ error: 'Invalid signature' });
}`}
                </pre>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">HTTPS Only</h3>
              <p className="text-sm text-gray-700">
                Always use HTTPS for your webhook endpoints to encrypt data in transit.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Idempotency</h3>
              <p className="text-sm text-gray-700">
                Implement idempotency to handle duplicate webhook deliveries safely.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
