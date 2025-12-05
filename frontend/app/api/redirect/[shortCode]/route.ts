import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { shortCode: string } }
) {
  try {
    const shortCode = params.shortCode;

    // Validate short code format
    if (!shortCode || shortCode.length === 0) {
      return NextResponse.json(
        { error: "Invalid short code" },
        { status: 400 }
      );
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    // Call backend redirect endpoint
    const response = await fetch(`${apiUrl}/redirect/${shortCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Don't cache redirects
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Link not found" }, { status: 404 });
      }
      throw new Error(`Backend error: ${response.statusText}`);
    }

    const data = await response.json();

    // Validate the original URL
    if (!data.originalUrl) {
      return NextResponse.json(
        { error: "Invalid redirect data" },
        { status: 500 }
      );
    }

    // Verify the URL is valid
    try {
      new URL(data.originalUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 500 }
      );
    }

    // Redirect to the original URL with 301 (permanent redirect)
    return NextResponse.redirect(data.originalUrl, { status: 301 });
  } catch (error) {
    console.error("Redirect error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
