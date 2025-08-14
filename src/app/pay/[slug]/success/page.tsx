import { db } from "@/lib/db";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ pid?: string }> }) {
  const { pid } = await searchParams;
  const payment = pid ? await db.payment.findUnique({ where: { id: pid } }) : null;
  return (
    <div className="max-w-xl mx-auto py-16 text-center">
      <h1 className="text-2xl font-semibold mb-2">Payment Successful</h1>
      <p className="text-gray-600 mb-4">Thank you! Your payment has been processed.</p>
      {payment && (
        <div className="text-sm text-gray-700">
          <p><strong>ID:</strong> {payment.id}</p>
          <p><strong>Amount:</strong> {payment.currency} {payment.amount}</p>
          <p><strong>Status:</strong> {payment.status}</p>
        </div>
      )}
    </div>
  );
}


