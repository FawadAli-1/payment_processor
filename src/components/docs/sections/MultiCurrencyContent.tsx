import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, DollarSign, Euro, PoundSterling } from "lucide-react";

export function MultiCurrencyContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          🌍 Multi-Currency
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          Multi-Currency Support
        </h1>
        <p className="text-xl text-gray-600">
          Accept payments in multiple currencies and expand your business globally.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Supported Currencies</CardTitle>
          <CardDescription>
            Currencies currently supported by PayFlow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold">USD (US Dollar)</h3>
              <p className="text-sm text-gray-600">Primary currency for international transactions</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Euro className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold">EUR (Euro)</h3>
              <p className="text-sm text-gray-600">European Union currency</p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <PoundSterling className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold">GBP (British Pound)</h3>
              <p className="text-sm text-gray-600">United Kingdom currency</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> PKR (Pakistani Rupee) is our primary supported currency. 
              Additional currencies are available based on your business needs and account tier.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Currency Configuration</CardTitle>
          <CardDescription>
            How to set up multi-currency support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">1. Enable Currencies</h3>
              <p className="text-sm text-gray-700">
                Go to your PayFlow dashboard → Settings → Currencies to enable additional currencies for your account.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">2. Set Default Currency</h3>
              <p className="text-sm text-gray-700">
                Choose your primary currency. This will be used for reporting and default payment amounts.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">3. Configure Exchange Rates</h3>
              <p className="text-sm text-gray-700">
                PayFlow automatically updates exchange rates daily. You can also set custom rates if needed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">API Usage</CardTitle>
          <CardDescription>
            How to use multi-currency in your API calls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Creating Payment Links</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`// Create payment link in USD
const paymentLink = await payflow.paymentLinks.create({
  amount: 2500,        // Amount in cents
  currency: 'USD',     // Specify currency
  description: 'Premium Course Access'
});

// Create payment link in EUR
const eurPaymentLink = await payflow.paymentLinks.create({
  amount: 2000,        // Amount in cents
  currency: 'EUR',     // Specify currency
  description: 'Premium Course Access'
});`}
                </pre>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Payment Intents</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`// Create payment intent in GBP
const paymentIntent = await payflow.payments.intents.create({
  amount: 3000,        // Amount in pence
  currency: 'GBP',     // Specify currency
  description: 'Premium Course Access'
});`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Exchange Rate Handling</CardTitle>
          <CardDescription>
            How exchange rates are managed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Automatic Updates</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Exchange rates updated daily</li>
                  <li>• Based on market rates</li>
                  <li>• No manual intervention needed</li>
                  <li>• Transparent to customers</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Custom Rates</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Set custom exchange rates</li>
                  <li>• Override automatic rates</li>
                  <li>• Useful for special promotions</li>
                  <li>• Requires account approval</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Best Practices</CardTitle>
          <CardDescription>
            Tips for multi-currency implementations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Currency Display</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Always show currency symbol with amounts</li>
                <li>• Use proper currency formatting (e.g., $25.00, €20.00)</li>
                <li>• Consider local currency preferences</li>
                <li>• Display exchange rates when relevant</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Amount Handling</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Store amounts in smallest currency unit (cents, pence)</li>
                <li>• Handle currency conversion in your application</li>
                <li>• Consider rounding rules for each currency</li>
                <li>• Validate currency-amount combinations</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Reporting</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Report revenue in your primary currency</li>
                <li>• Track performance by currency</li>
                <li>• Monitor exchange rate impact</li>
                <li>• Use consistent date ranges for comparisons</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
