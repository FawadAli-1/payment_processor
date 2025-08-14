import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CreditCard, CheckCircle, Clock, XCircle } from "lucide-react";

export function PaymentFlowContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          💳 Core Concepts
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          Payment Flow
        </h1>
        <p className="text-xl text-gray-600">
          Understand how payments flow through the PayFlow system from creation to completion.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Payment Lifecycle</CardTitle>
          <CardDescription>
            The complete journey of a payment from initiation to completion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Payment Creation</h3>
                <p className="text-gray-600">Payment link or checkout session is created</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold text-lg">2</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Customer Checkout</h3>
                <p className="text-gray-600">Customer enters payment details and submits</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-lg">3</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Payment Processing</h3>
                <p className="text-gray-600">Payment is processed by the selected provider</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400" />
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-lg">4</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Confirmation</h3>
                <p className="text-gray-600">Payment result is confirmed and webhook sent</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Payment Statuses</CardTitle>
          <CardDescription>
            Understanding the different states a payment can be in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <h4 className="font-semibold">PENDING</h4>
                <p className="text-sm text-gray-600">Payment is being processed</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <h4 className="font-semibold">COMPLETED</h4>
                <p className="text-sm text-gray-600">Payment was successful</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
              <div>
                <h4 className="font-semibold">FAILED</h4>
                <p className="text-sm text-gray-600">Payment was unsuccessful</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-semibold">CANCELLED</h4>
                <p className="text-sm text-gray-600">Payment was cancelled by user</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Provider Selection</CardTitle>
          <CardDescription>
            How PayFlow automatically selects the best payment provider for each transaction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            PayFlow automatically selects the most appropriate payment provider based on:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>• Provider availability and status</li>
            <li>• Transaction amount and currency</li>
            <li>• Customer&apos;s preferred payment method</li>
            <li>• Provider performance and success rates</li>
            <li>• Business configuration preferences</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
