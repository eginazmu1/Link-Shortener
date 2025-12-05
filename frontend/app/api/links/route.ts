import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization");
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    const response = await fetch(`${backendUrl}/links`, {
      method: "GET",
      headers: {
        Authorization: token || "",
      },
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Get links API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.headers.get("Authorization");
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    const response = await fetch(`${backendUrl}/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Create link API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
