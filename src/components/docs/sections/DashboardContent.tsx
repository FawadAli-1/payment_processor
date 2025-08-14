import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, CreditCard, Users, Settings, Link as LinkIcon } from "lucide-react";

export function DashboardContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          📊 Dashboard
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          PayFlow Dashboard
        </h1>
        <p className="text-xl text-gray-600">
          Manage your business, monitor payments, and configure your PayFlow integration.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Dashboard Overview</CardTitle>
          <CardDescription>
            Your central hub for managing PayFlow operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold">Analytics</h3>
              <p className="text-sm text-gray-600">Revenue, transactions, and performance metrics</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold">Payments</h3>
              <p className="text-sm text-gray-600">View and manage payment transactions</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <LinkIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold">Payment Links</h3>
              <p className="text-sm text-gray-600">Create and manage payment links</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
                <Settings className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold">Settings</h3>
              <p className="text-sm text-gray-600">Configure your account and integrations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Analytics Dashboard</CardTitle>
          <CardDescription>
            Monitor your business performance and revenue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-blue-600 font-bold text-xl">💰</span>
                </div>
                <h3 className="font-semibold">Total Revenue</h3>
                <p className="text-sm text-gray-600">Track your earnings over time</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-green-600 font-bold text-xl">📈</span>
                </div>
                <h3 className="font-semibold">Transaction Volume</h3>
                <p className="text-sm text-gray-600">Number of successful payments</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-purple-600 font-bold text-xl">👥</span>
                </div>
                <h3 className="font-semibold">Customer Growth</h3>
                <p className="text-sm text-gray-600">New customers and retention</p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Pro Tip:</strong> Use date filters to analyze performance over specific time periods. 
                Compare different months or quarters to identify trends and growth patterns.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Payment Management</CardTitle>
          <CardDescription>
            View and manage all payment transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Payment List</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• View all payment transactions in one place</li>
                <li>• Filter by status, date, amount, or customer</li>
                <li>• Search for specific payments</li>
                <li>• Export payment data for accounting</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Payment Details</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Complete transaction information</li>
                <li>• Customer details and contact info</li>
                <li>• Payment provider information</li>
                <li>• Transaction timeline and status</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Actions</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Refund payments when needed</li>
                <li>• Download receipts and invoices</li>
                <li>• Contact customers about payments</li>
                <li>• Mark payments as disputed</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Payment Links Management</CardTitle>
          <CardDescription>
            Create and manage your payment links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Creating Payment Links</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <span className="text-sm text-gray-700">Click "Create New Payment Link"</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <span className="text-sm text-gray-700">Fill in product details and pricing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">3</span>
                  </div>
                  <span className="text-sm text-gray-700">Customize checkout page appearance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">4</span>
                  </div>
                  <span className="text-sm text-gray-700">Save and share the link</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Managing Existing Links</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Edit product details and pricing</li>
                <li>• Enable/disable links</li>
                <li>• Set expiration dates</li>
                <li>• View analytics and performance</li>
                <li>• Duplicate successful links</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Settings & Configuration</CardTitle>
          <CardDescription>
            Configure your account and integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Account Settings</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Business profile information</li>
                <li>• Contact details and addresses</li>
                <li>• Tax and business registration</li>
                <li>• Notification preferences</li>
                <li>• Security settings</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Integration Settings</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• API key management</li>
                <li>• Payment provider configuration</li>
                <li>• Webhook endpoint setup</li>
                <li>• Custom branding options</li>
                <li>• Webhook event selection</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
