"use client"

import { Rocket, Target, Users, Award, Globe, Satellite } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="space-bg min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            About <span className="text-blue-400">Saarthi AI</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pioneering the future of space exploration through artificial intelligence and geospatial analysis
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="cosmic-card p-8 rounded-lg">
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-blue-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Saarthi AI is dedicated to revolutionizing space exploration and geospatial analysis through cutting-edge
              artificial intelligence. We empower researchers, scientists, and space agencies with advanced tools to
              understand our planet and beyond.
            </p>
          </div>

          <div className="cosmic-card p-8 rounded-lg">
            <div className="flex items-center mb-6">
              <Rocket className="h-8 w-8 text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              To become the leading AI platform supporting India's space program and contributing to global space
              exploration initiatives. We envision a future where AI accelerates scientific discovery and space mission
              success.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Why Choose <span className="text-blue-400">Saarthi AI</span>?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="h-10 w-10 text-green-400" />,
                title: "Advanced Geospatial Analysis",
                description:
                  "Process satellite imagery, terrain data, and atmospheric conditions with unprecedented accuracy",
              },
              {
                icon: <Satellite className="h-10 w-10 text-blue-400" />,
                title: "Real-time Monitoring",
                description: "Live tracking and analysis of space missions, weather patterns, and geological changes",
              },
              {
                icon: <Users className="h-10 w-10 text-orange-400" />,
                title: "Collaborative Platform",
                description: "Multi-user environment for teams to work together on complex space exploration projects",
              },
              {
                icon: <Award className="h-10 w-10 text-yellow-400" />,
                title: "ISRO Certified",
                description: "Officially recognized and integrated with Indian Space Research Organisation standards",
              },
            ].map((feature, index) => (
              <div key={index} className="cosmic-card p-6 rounded-lg hover:glow-effect transition-all duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="cosmic-card p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Built for <span className="text-orange-400">Space Excellence</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto">
            Saarthi AI represents the pinnacle of innovation in space technology. Our platform showcases the potential
            of AI in advancing space exploration capabilities and supporting critical missions worldwide.
          </p>

          <div className="indian-gradient p-1 rounded-lg inline-block">
            <div className="bg-slate-900 px-8 py-4 rounded-lg">
              <p className="text-white font-semibold">🇮🇳 Proudly Made in India for Global Space Excellence 🚀</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
