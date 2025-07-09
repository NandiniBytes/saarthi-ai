"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Brain, Activity, MapPin, Zap } from "lucide-react"

interface AgentMessage {
  id: string
  type: "user" | "agent" | "system"
  content: string
  timestamp: string
  status?: "processing" | "completed" | "error"
}

export default function AgentPage() {
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: "1",
      type: "system",
      content: "Saarthi AI Agent initialized. Ready for geospatial analysis and space exploration tasks.",
      timestamp: new Date().toLocaleTimeString(),
      status: "completed",
    },
  ])
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const simulateAgentResponse = async (userMessage: string) => {
    setIsProcessing(true)

    // Add processing message
    const processingMessage: AgentMessage = {
      id: Date.now().toString(),
      type: "agent",
      content: "Analyzing your request...",
      timestamp: new Date().toLocaleTimeString(),
      status: "processing",
    }
    setMessages((prev) => [...prev, processingMessage])

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate response based on input
    let response = ""
    if (userMessage.toLowerCase().includes("satellite")) {
      response =
        "Accessing ISRO satellite database... Found 15 active satellites in the specified region. Analyzing orbital patterns and coverage areas."
    } else if (userMessage.toLowerCase().includes("weather")) {
      response =
        "Processing meteorological data from multiple sources. Current atmospheric conditions show favorable parameters for space operations."
    } else if (userMessage.toLowerCase().includes("terrain")) {
      response =
        "Initiating terrain analysis using advanced elevation models. Generating topographical insights and geological assessments."
    } else {
      response =
        "Processing your geospatial query using advanced AI algorithms. Analyzing satellite imagery, terrain data, and atmospheric conditions to provide comprehensive insights."
    }

    // Update processing message to completed
    setMessages((prev) =>
      prev.map((msg) => (msg.id === processingMessage.id ? { ...msg, content: response, status: "completed" } : msg)),
    )

    setIsProcessing(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    const userMessage: AgentMessage = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    await simulateAgentResponse(input)
  }

  const getMessageIcon = (type: string, status?: string) => {
    if (type === "user") return "👤"
    if (type === "system") return "⚙️"
    if (status === "processing") return <Activity className="h-4 w-4 animate-spin" />
    return <Brain className="h-4 w-4" />
  }

  return (
    <div className="space-bg min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Real-time <span className="text-blue-400">AI Agent</span>
          </h1>
          <p className="text-gray-300">
            Interact with Saarthi AI for advanced geospatial analysis and space exploration insights
          </p>
        </div>

        {/* Agent Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="cosmic-card rounded-lg overflow-hidden">
            {/* Status Bar */}
            <div className="bg-slate-800 p-4 border-b border-blue-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium">Agent Online</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    ISRO Network
                  </span>
                  <span className="flex items-center">
                    <Zap className="h-4 w-4 mr-1" />
                    High Performance
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : message.type === "system"
                          ? "bg-purple-600 text-white"
                          : "bg-slate-700 text-gray-100"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 mt-1">{getMessageIcon(message.type, message.status)}</div>
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-blue-500/30">
              <form onSubmit={handleSubmit} className="flex space-x-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about satellite data, weather analysis, terrain mapping..."
                  className="flex-1 bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-blue-400 focus:outline-none"
                  disabled={isProcessing}
                />
                <button
                  type="submit"
                  disabled={isProcessing || !input.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              "Analyze satellite imagery for region coordinates 28.6139°N, 77.2090°E",
              "Generate weather forecast for space mission launch window",
              "Perform terrain analysis for Mars rover landing site selection",
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInput(suggestion)}
                className="cosmic-card p-4 rounded-lg text-left hover:glow-effect transition-all duration-300"
                disabled={isProcessing}
              >
                <p className="text-gray-300 text-sm">{suggestion}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
