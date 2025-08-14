import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SubmitButton } from "@/components/shared/SubmitButton";

async function getPaymentLinkBySlug(slug: string) {
  // The current data model stores the full absolute URL in `paymentLink.url`.
  // We resolve by suffix match on the generated slug for now.
  const link = await db.paymentLink.findFirst({
    where: {
      url: {
        endsWith: `/pay/${slug}`,
      },
    },
  });
  return link;
}

 

export default async function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const link = await getPaymentLinkBySlug(slug);
  if (!link) {
    notFound();
  }

  // Increment clicks
  await db.paymentLink.update({ where: { id: link.id }, data: { clicks: { increment: 1 } } });

  async function initiatePayment(_formData: FormData) {
    "use server";
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/payments/intents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
      cache: "no-store",
    });
    if (!res.ok) {
      // Basic toast on error; note: server actions cannot show client toasts directly.
      // We redirect back with an error query for client-side toast via a parallel enhancement if needed.
      throw new Error("Failed to initiate payment");
    }
    const data = await res.json();
    if (data.redirectUrl) {
      redirect(data.redirectUrl as string);
    }
    redirect(`/pay/${slug}/success`);
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>{link.title}</CardTitle>
          <CardDescription>
            {link.description || "Complete your payment securely"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-600">Amount</div>
            <div className="text-lg font-semibold">{link.currency} {link.amount}</div>
          </div>

          <form action={initiatePayment}>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


