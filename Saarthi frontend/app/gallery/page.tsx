"use client"

import { useState } from "react"
import { Download, Eye, Share, Filter } from "lucide-react"

interface GalleryItem {
  id: string
  title: string
  type: "satellite" | "terrain" | "weather" | "analysis"
  date: string
  location: string
  thumbnail: string
  description: string
}

export default function GalleryPage() {
  const [filter, setFilter] = useState("all")
  const [galleryItems] = useState<GalleryItem[]>([
    {
      id: "1",
      title: "Mars Surface Topology",
      type: "terrain",
      date: "2024-01-15",
      location: "Olympus Mons",
      thumbnail: "/placeholder.svg?height=300&width=400",
      description: "High-resolution terrain analysis of Mars largest volcano",
    },
    {
      id: "2",
      title: "ISRO Satellite Coverage",
      type: "satellite",
      date: "2024-01-14",
      location: "Indian Ocean",
      thumbnail: "/placeholder.svg?height=300&width=400",
      description: "Real-time satellite positioning and coverage analysis",
    },
    {
      id: "3",
      title: "Monsoon Pattern Analysis",
      type: "weather",
      date: "2024-01-13",
      location: "Bay of Bengal",
      thumbnail: "/placeholder.svg?height=300&width=400",
      description: "Comprehensive weather pattern tracking and prediction",
    },
    {
      id: "4",
      title: "Lunar Landing Site Assessment",
      type: "analysis",
      date: "2024-01-12",
      location: "Lunar South Pole",
      thumbnail: "/placeholder.svg?height=300&width=400",
      description: "Detailed analysis for Chandrayaan-4 mission planning",
    },
    {
      id: "5",
      title: "Flood Risk Mapping",
      type: "terrain",
      date: "2024-01-11",
      location: "Kerala, India",
      thumbnail: "/placeholder.svg?height=300&width=400",
      description: "Emergency response flood risk assessment and mapping",
    },
    {
      id: "6",
      title: "Solar Activity Monitoring",
      type: "analysis",
      date: "2024-01-10",
      location: "Solar Corona",
      thumbnail: "/placeholder.svg?height=300&width=400",
      description: "Space weather analysis and solar flare prediction",
    },
  ])

  const filteredItems = filter === "all" ? galleryItems : galleryItems.filter((item) => item.type === filter)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "satellite":
        return "bg-blue-500"
      case "terrain":
        return "bg-green-500"
      case "weather":
        return "bg-yellow-500"
      case "analysis":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "satellite":
        return "🛰️"
      case "terrain":
        return "🏔️"
      case "weather":
        return "🌤️"
      case "analysis":
        return "📊"
      default:
        return "📋"
    }
  }

  return (
    <div className="space-bg min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Geospatial Results <span className="text-blue-400">Gallery</span>
          </h1>
          <p className="text-gray-300">Explore and download high-quality geospatial analysis results</p>
        </div>

        {/* Filter Bar */}
        <div className="cosmic-card p-6 rounded-lg mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-blue-400" />
              <span className="text-white font-medium">Filter by type:</span>
            </div>
            <div className="flex space-x-2">
              {[
                { key: "all", label: "All Results" },
                { key: "satellite", label: "Satellite" },
                { key: "terrain", label: "Terrain" },
                { key: "weather", label: "Weather" },
                { key: "analysis", label: "Analysis" },
              ].map((filterOption) => (
                <button
                  key={filterOption.key}
                  onClick={() => setFilter(filterOption.key)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === filterOption.key
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="cosmic-card rounded-lg overflow-hidden hover:glow-effect transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative">
                <img src={item.thumbnail || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)} {item.type.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{item.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <span>{item.date}</span>
                  <span>{item.location}</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="bg-slate-700 hover:bg-slate-600 text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors">
                    <Share className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Load More Results
          </button>
        </div>
      </div>
    </div>
  )
}
