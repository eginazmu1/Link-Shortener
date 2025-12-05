import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!backendUrl) {
      return NextResponse.json(
        { message: "Backend URL not configured" },
        { status: 500 }
      );
    }

    console.log("[Login API] Backend URL:", backendUrl);

    const response = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("[Login API] Response status:", response.status);

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("[Login API] Error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
