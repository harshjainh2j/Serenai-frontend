import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL || "http://localhost:3001";

export async function POST(req: NextRequest) {
  try {
    console.log("Creating new chat session...");
    const response = await fetch(`${BACKEND_API_URL}/chat/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to create chat session:", error);
      return NextResponse.json(
        { error: error.error || "Failed to create chat session" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Chat session created:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating chat session:", error);
    return NextResponse.json(
      { error: "Failed to create chat session" },
      { status: 500 }
    );
  }
}
