import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.headers.get("Authorization");
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    const response = await fetch(`${backendUrl}/links/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token || "",
      },
    });

    if (response.status === 204) {
      return NextResponse.json({}, { status: 204 });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Delete link API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
