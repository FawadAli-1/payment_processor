import { NextResponse } from "next/server";

export async function GET() {
  try {
    // In a real application, this would check actual provider APIs
    // For now, we'll simulate status checks with some randomness
    const providers = [
      {
        name: "PayFast",
        status: Math.random() > 0.1 ? "online" : "offline", // 90% uptime
        responseTime: Math.floor(Math.random() * 200) + 50
      },
      {
        name: "Safepay", 
        status: Math.random() > 0.05 ? "online" : "offline", // 95% uptime
        responseTime: Math.floor(Math.random() * 150) + 30
      },
      {
        name: "Easypaisa",
        status: Math.random() > 0.15 ? "online" : "offline", // 85% uptime
        responseTime: Math.floor(Math.random() * 300) + 100
      },
      {
        name: "JazzCash",
        status: Math.random() > 0.2 ? "online" : "offline", // 80% uptime
        responseTime: Math.floor(Math.random() * 250) + 80
      }
    ];

    return NextResponse.json({ 
      providers,
      lastChecked: new Date().toISOString()
    });

  } catch {
    return NextResponse.json(
      { error: "Failed to check provider status" },
      { status: 500 }
    );
  }
} 