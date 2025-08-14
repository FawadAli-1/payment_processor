import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ApiCustomersContent() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm">
          🔌 API Reference
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900">
          Customers API
        </h1>
        <p className="text-xl text-gray-600">
          Manage customer data and relationships with our REST API.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Customer</CardTitle>
          <CardDescription>
            Create a new customer record
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="secondary">POST</Badge>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">/v1/customers</code>
          </div>
          
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+923001234567"
}`}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">List Customers</CardTitle>
          <CardDescription>
            Retrieve a list of your customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="secondary">GET</Badge>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">/v1/customers</code>
          </div>
          
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`{
  "data": [
    {
      "id": "cus_1234567890",
      "name": "John Doe",
      "email": "john@example.com",
      "total_spent": 5000,
      "total_orders": 2
    }
  ]
}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
