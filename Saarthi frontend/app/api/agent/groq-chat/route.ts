import { type NextRequest, NextResponse } from "next/server"
import { advancedAI } from "@/lib/ai-service-advanced"
import { db } from "@/lib/database"
import { cacheService } from "@/lib/redis-client"
import { verifyToken } from "@/lib/auth-middleware"

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { message, sessionId, context, useReasoning = false } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Get session context if provided
    let sessionContext = ""
    if (sessionId) {
      const sessionData = await cacheService.get(`session:${sessionId}`)
      if (sessionData) {
        sessionContext = JSON.stringify(sessionData)
      }
    }

    // Choose appropriate AI service based on request
    const response = useReasoning
      ? await advancedAI.generateReasoningResponse(message, sessionContext || context)
      : await advancedAI.generateChatResponse(message, sessionContext || context)

    // Log the interaction
    if (sessionId) {
      await db.query("INSERT INTO agent_logs (session_id, type, content, timestamp) VALUES ($1, $2, $3, $4)", [
        sessionId,
        "user",
        message,
        new Date().toISOString(),
      ])

      await db.query("INSERT INTO agent_logs (session_id, type, content, timestamp) VALUES ($1, $2, $3, $4)", [
        sessionId,
        useReasoning ? "reasoning" : "result",
        response,
        new Date().toISOString(),
      ])

      // Publish real-time update
      await cacheService.publish(`session:${sessionId}:updates`, {
        type: "agent_response",
        content: response,
        model: useReasoning ? "reasoning" : "chat",
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      success: true,
      response,
      model: useReasoning ? "qwen-qwq-32b" : "llama-3.3-70b-versatile",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Groq chat error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
