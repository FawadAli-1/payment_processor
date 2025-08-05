import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export default async function DebugPage() {
  const { userId } = await auth();
  
  let user = null;
  let business = null;
  let error = null;

  try {
    if (userId) {
      user = await db.user.findUnique({
        where: { clerkId: userId },
        include: { businesses: true },
      });

      if (user) {
        business = await db.business.findFirst({
          where: { userId: user.id },
        });
      }
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error";
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Information</h1>
      
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h2 className="font-semibold">Authentication</h2>
          <p>User ID: {userId || "Not authenticated"}</p>
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-semibold">Database User</h2>
          <pre className="bg-gray-100 p-2 rounded text-sm">
            {user ? JSON.stringify(user, null, 2) : "No user found"}
          </pre>
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-semibold">Business</h2>
          <pre className="bg-gray-100 p-2 rounded text-sm">
            {business ? JSON.stringify(business, null, 2) : "No business found"}
          </pre>
        </div>

        {error && (
          <div className="p-4 border rounded bg-red-50">
            <h2 className="font-semibold text-red-800">Error</h2>
            <p className="text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
} 