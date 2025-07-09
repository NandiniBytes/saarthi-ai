"use client"

import { useState } from "react"
import { Calendar, Clock, User, MapPin, Download, Eye } from "lucide-react"

interface Session {
  id: string
  name: string
  date: string
  duration: string
  user: string
  location: string
  status: "completed" | "active" | "failed"
  type: "satellite" | "weather" | "terrain" | "mission"
}

export default function SessionsPage() {
  const [sessions] = useState<Session[]>([
    {
      id: "1",
      name: "Mars Terrain Analysis",
      date: "2024-01-15",
      duration: "2h 34m",
      user: "Dr. Sharma",
      location: "Olympus Mons Region",
      status: "completed",
      type: "terrain",
    },
    {
      id: "2",
      name: "ISRO Satellite Tracking",
      date: "2024-01-14",
      duration: "1h 22m",
      user: "Mission Control",
      location: "Indian Ocean",
      status: "completed",
      type: "satellite",
    },
    {
      id: "3",
      name: "Weather Pattern Analysis",
      date: "2024-01-14",
      duration: "45m",
      user: "Dr. Patel",
      location: "Bay of Bengal",
      status: "active",
      type: "weather",
    },
    {
      id: "4",
      name: "Chandrayaan-4 Landing Site",
      date: "2024-01-13",
      duration: "3h 15m",
      user: "ISRO Team",
      location: "Lunar South Pole",
      status: "completed",
      type: "mission",
    },
    {
      id: "5",
      name: "Flood Mapping Kerala",
      date: "2024-01-12",
      duration: "1h 58m",
      user: "Emergency Response",
      location: "Kerala, India",
      status: "failed",
      type: "terrain",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-400/20"
      case "active":
        return "text-blue-400 bg-blue-400/20"
      case "failed":
        return "text-red-400 bg-red-400/20"
      default:
        return "text-gray-400 bg-gray-400/20"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "satellite":
        return "🛰️"
      case "weather":
        return "🌤️"
      case "terrain":
        return "🏔️"
      case "mission":
        return "🚀"
      default:
        return "📊"
    }
  }

  return (
    <div className="space-bg min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Session <span className="text-blue-400">Explorer</span>
          </h1>
          <p className="text-gray-300">Browse and manage your geospatial analysis sessions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Sessions", value: "127", color: "text-blue-400" },
            { label: "Active Sessions", value: "3", color: "text-green-400" },
            { label: "Completed Today", value: "8", color: "text-purple-400" },
            { label: "Success Rate", value: "94%", color: "text-orange-400" },
          ].map((stat, index) => (
            <div key={index} className="cosmic-card p-6 rounded-lg text-center">
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Sessions List */}
        <div className="cosmic-card rounded-lg overflow-hidden">
          <div className="bg-slate-800 p-4 border-b border-blue-500/30">
            <h2 className="text-xl font-semibold text-white">Recent Sessions</h2>
          </div>

          <div className="divide-y divide-slate-700">
            {sessions.map((session) => (
              <div key={session.id} className="p-6 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{getTypeIcon(session.type)}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{session.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {session.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {session.duration}
                        </span>
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {session.user}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {session.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                      {session.status.toUpperCase()}
                    </span>

                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-400 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  page === 1 ? "bg-blue-600 text-white" : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
