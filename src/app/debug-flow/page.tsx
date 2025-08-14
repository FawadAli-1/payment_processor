"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DebugFlowPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch("/api/test-db");
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.log(err);
        
        setError("Failed to check database status");
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, []);

  const createTestBusiness = async () => {
    try {
      const response = await fetch("/api/business/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test Business",
          email: "test@example.com",
          phone: "+92 300 1234567",
          address: "Test Address",
          website: "https://test.com",
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert("Business created successfully!");
        // Refresh the page to see updated data
        window.location.reload();
      } else {
        alert(`Failed to create business: ${result.error}`);
      }
    } catch (err) {
      console.log(err);
      
      alert("Failed to create business. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Debug Flow</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Flow</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h2 className="font-semibold mb-2">Current Status</h2>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>

        <div className="space-y-2">
          <button
            onClick={createTestBusiness}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create Test Business
          </button>
          
          <button
            onClick={() => window.location.href = "/dashboard"}
            className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Go to Dashboard
          </button>
          
          <button
            onClick={() => window.location.href = "/dashboard/setup"}
            className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Go to Setup
          </button>
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-semibold mb-2">Instructions</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Check the current status above</li>
            <li>If no business exists, click "Create Test Business"</li>
            <li>After creation, try "Go to Dashboard"</li>
            <li>If it redirects to setup, there's still an issue</li>
            <li>Check browser console for any errors</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 