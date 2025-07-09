"use client"

import { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Layers, Settings, Download, Share, ZoomIn, ZoomOut } from "lucide-react"
import "leaflet/dist/leaflet.css"

export default function PlaygroundPage() {
  const [activeLayer, setActiveLayer] = useState("satellite")
  const [mapCenter] = useState<[number, number]>([20.5937, 78.9629]) // India center

  const layers = [
    { id: "satellite", name: "Satellite View", url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" },
    {
      id: "terrain",
      name: "Terrain View",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    },
    { id: "hybrid", name: "Hybrid View", url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" },
  ]

  const tools = [
    { id: "measure", name: "Measure Distance", icon: "📏" },
    { id: "draw", name: "Draw Polygon", icon: "✏️" },
    { id: "marker", name: "Add Marker", icon: "📍" },
    { id: "analyze", name: "Area Analysis", icon: "📊" },
  ]

  return (
    <div className="space-bg min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Map <span className="text-blue-400">Playground</span>
          </h1>
          <p className="text-gray-300">Interactive geospatial visualization and analysis platform</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Layer Controls */}
            <div className="cosmic-card p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Layers className="h-5 w-5 text-blue-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Map Layers</h3>
              </div>
              <div className="space-y-2">
                {layers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeLayer === layer.id ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-700"
                    }`}
                  >
                    {layer.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="cosmic-card p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Settings className="h-5 w-5 text-purple-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Tools</h3>
              </div>
              <div className="space-y-2">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-slate-700 transition-colors flex items-center"
                  >
                    <span className="mr-2">{tool.icon}</span>
                    {tool.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="cosmic-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export Map
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center">
                  <Share className="h-4 w-4 mr-2" />
                  Share View
                </button>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="lg:col-span-3">
            <div className="cosmic-card rounded-lg overflow-hidden">
              {/* Map Header */}
              <div className="bg-slate-800 p-4 border-b border-blue-500/30">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Interactive Map Visualizer</h2>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <ZoomIn className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <ZoomOut className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="h-96 lg:h-[600px]">
                <MapContainer center={mapCenter} zoom={5} style={{ height: "100%", width: "100%" }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={layers.find((l) => l.id === activeLayer)?.url || layers[0].url}
                  />

                  {/* Sample markers for Indian space centers */}
                  <Marker position={[13.7199, 80.2301]}>
                    <Popup>
                      <div className="text-center">
                        <strong>ISRO Headquarters</strong>
                        <br />
                        Bangalore, Karnataka
                      </div>
                    </Popup>
                  </Marker>

                  <Marker position={[13.7308, 80.23]}>
                    <Popup>
                      <div className="text-center">
                        <strong>Satish Dhawan Space Centre</strong>
                        <br />
                        Sriharikota, Andhra Pradesh
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>

              {/* Map Footer */}
              <div className="bg-slate-800 p-4 border-t border-blue-500/30">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>
                    Coordinates: {mapCenter[0].toFixed(4)}, {mapCenter[1].toFixed(4)}
                  </span>
                  <span>Zoom Level: 5</span>
                  <span>Layer: {layers.find((l) => l.id === activeLayer)?.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Panel */}
        <div className="mt-8 cosmic-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-white mb-4">Analysis Results</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">15.2 km²</div>
              <div className="text-gray-300 text-sm">Selected Area</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-2">847m</div>
              <div className="text-gray-300 text-sm">Avg. Elevation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-2">23°C</div>
              <div className="text-gray-300 text-sm">Temperature</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
