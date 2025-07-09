import type { NextRequest } from "next/server"
import { advancedAI } from "@/lib/ai-service-advanced"
import { verifyToken } from "@/lib/auth-middleware"

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const user = await verifyToken(request)
    if (!user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const { message, context } = await request.json()

    if (!message) {
      return new Response("Message is required", { status: 400 })
    }

    // Create a readable stream
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send initial metadata
          const metadata = `data: ${JSON.stringify({
            type: "metadata",
            model: "llama-3.3-70b-versatile",
            provider: "groq",
            timestamp: new Date().toISOString(),
          })}\n\n`

          controller.enqueue(encoder.encode(metadata))

          // Stream the response
          for await (const chunk of advancedAI.streamChatResponse(message, context)) {
            const data = `data: ${JSON.stringify({
              type: "chunk",
              content: chunk,
              timestamp: new Date().toISOString(),
            })}\n\n`

            controller.enqueue(encoder.encode(data))
          }

          // Send completion signal
          const completion = `data: ${JSON.stringify({
            type: "complete",
            timestamp: new Date().toISOString(),
          })}\n\n`

          controller.enqueue(encoder.encode(completion))
          controller.close()
        } catch (error) {
          console.error("Groq streaming error:", error)

          const errorData = `data: ${JSON.stringify({
            type: "error",
            error: "Streaming failed",
            timestamp: new Date().toISOString(),
          })}\n\n`

          controller.enqueue(encoder.encode(errorData))
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    })
  } catch (error) {
    console.error("Groq stream setup error:", error)
    return new Response("Internal server error", { status: 500 })
  }
}
