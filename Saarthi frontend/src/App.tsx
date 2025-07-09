"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, MapPin, Activity } from "lucide-react"
import "leaflet/dist/leaflet.css"

interface ReasoningStep {
  id: string
  timestamp: string
  type: "plan" | "code" | "result" | "error"
  content: string
}

interface GeoData {
  type: string
  features: any[]
}

export default function App() {
  const [query, setQuery] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [reasoningSteps, setReasoningSteps] = useState<ReasoningStep[]>([])
  const [geoData, setGeoData] = useState<GeoData | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.006]) // Default to NYC
  const reasoningEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll reasoning log to bottom
  useEffect(() => {
    reasoningEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [reasoningSteps])

  const addReasoningStep = (type: ReasoningStep["type"], content: string) => {
    const newStep: ReasoningStep = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString(),
      type,
      content,
    }
    setReasoningSteps((prev) => [...prev, newStep])
  }

  const simulateFloodMapping = async (userQuery: string) => {
    setIsProcessing(true)

    // Simulate CoT planning
    addReasoningStep("plan", `Analyzing query: "${userQuery}"`)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    addReasoningStep("plan", "Planning flood mapping approach:")
    addReasoningStep("plan", "1. Extract region coordinates from query")
    addReasoningStep("plan", "2. Fetch elevation data for the region")
    addReasoningStep("plan", "3. Apply flood simulation algorithms")
    addReasoningStep("plan", "4. Generate flood risk visualization")
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate code execution
    addReasoningStep("code", "Executing flood mapping algorithm...")
    addReasoningStep(
      "code",
      "import numpy as np\nfrom flood_model import simulate_flood\n\n# Processing elevation data...",
    )
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate results
    addReasoningStep("result", "Flood simulation completed successfully")
    addReasoningStep("result", "Generated flood risk zones: High (15%), Medium (35%), Low (50%)")

    // Generate sample GeoJSON data for demonstration
    const sampleFloodData: GeoData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            risk: "high",
            color: "#ff4444",
          },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-74.0059, 40.7128],
                [-74.0049, 40.7128],
                [-74.0049, 40.7138],
                [-74.0059, 40.7138],
                [-74.0059, 40.7128],
              ],
            ],
          },
        },
        {
          type: "Feature",
          properties: {
            risk: "medium",
            color: "#ffaa44",
          },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-74.0049, 40.7128],
                [-74.0039, 40.7128],
                [-74.0039, 40.7138],
                [-74.0049, 40.7138],
                [-74.0049, 40.7128],
              ],
            ],
          },
        },
      ],
    }

    setGeoData(sampleFloodData)
    addReasoningStep("result", "Flood mapping visualization updated on map")
    setIsProcessing(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim() || isProcessing) return

    const userQuery = query
    setQuery("")
    addReasoningStep("plan", `User Query: ${userQuery}`)

    await simulateFloodMapping(userQuery)
  }

  const getStepIcon = (type: ReasoningStep["type"]) => {
    switch (type) {
      case "plan":
        return "🧠"
      case "code":
        return "💻"
      case "result":
        return "✅"
      case "error":
        return "❌"
      default:
        return "📝"
    }
  }

  const getStepColor = (type: ReasoningStep["type"]) => {
    switch (type) {
      case "plan":
        return "text-blue-600 bg-blue-50"
      case "code":
        return "text-purple-600 bg-purple-50"
      case "result":
        return "text-green-600 bg-green-50"
      case "error":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-900">Flood Mapping Agent</h1>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 min-h-0">
        {/* Reasoning Log Panel - 1/3 width on large screens */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Activity className="h-4 w-4" />
                Reasoning Log
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full px-4 pb-4">
                <div className="space-y-3">
                  {reasoningSteps.map((step) => (
                    <div key={step.id} className={`p-3 rounded-lg border ${getStepColor(step.type)}`}>
                      <div className="flex items-start gap-2">
                        <span className="text-sm">{getStepIcon(step.type)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium uppercase tracking-wide">{step.type}</span>
                            <span className="text-xs text-gray-500">{step.timestamp}</span>
                          </div>
                          <p className="text-sm whitespace-pre-wrap break-words">{step.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="p-3 rounded-lg border bg-yellow-50 text-yellow-600">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin h-4 w-4 border-2 border-yellow-600 border-t-transparent rounded-full"></div>
                        <span className="text-sm">Processing...</span>
                      </div>
                    </div>
                  )}
                  <div ref={reasoningEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Map Panel - 2/3 width on large screens */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Flood Risk Visualization</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <div className="h-full min-h-[400px] rounded-lg overflow-hidden">
                <MapContainer
                  center={mapCenter}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  className="rounded-lg"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {geoData && (
                    <GeoJSON
                      data={geoData}
                      style={(feature) => ({
                        fillColor: feature?.properties?.color || "#3388ff",
                        weight: 2,
                        opacity: 1,
                        color: "white",
                        dashArray: "3",
                        fillOpacity: 0.7,
                      })}
                      onEachFeature={(feature, layer) => {
                        if (feature.properties && feature.properties.risk) {
                          layer.bindPopup(`Flood Risk: ${feature.properties.risk.toUpperCase()}`)
                        }
                      }}
                    />
                  )}
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chat Input - Bottom */}
      <div className="bg-white border-t p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your flood mapping query (e.g., 'Perform flood mapping for Manhattan, NY')"
              className="flex-1"
              disabled={isProcessing}
            />
            <Button type="submit" disabled={isProcessing || !query.trim()} className="px-6">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
