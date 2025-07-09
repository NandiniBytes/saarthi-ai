"use client"

import Link from "next/link"
import { ArrowRight, Satellite, Globe, Brain, Zap, Shield, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="space-bg min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-6xl mx-auto">
          <div className="mb-8">
            <Satellite className="h-20 w-20 text-blue-400 mx-auto mb-6 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
                Saarthi AI
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-200 mb-4 font-semibold">
              Your Intelligent Companion for Space Exploration
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
              Revolutionizing geospatial intelligence through advanced AI reasoning, real-time satellite analysis, and
              autonomous decision-making for India's space missions and Earth observation programs.
            </p>
          </div>

          {/* Key Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            <div className="cosmic-card p-6 rounded-lg">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="text-lg font-semibold text-white mb-2">AI-Powered Reasoning</h3>
              <p className="text-gray-300 text-sm">
                Advanced chain-of-thought processing for complex geospatial analysis and mission planning
              </p>
            </div>
            <div className="cosmic-card p-6 rounded-lg">
              <div className="text-3xl mb-3">🛰️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Real-Time Monitoring</h3>
              <p className="text-gray-300 text-sm">
                Live satellite tracking, weather analysis, and terrain mapping with ISRO integration
              </p>
            </div>
            <div className="cosmic-card p-6 rounded-lg">
              <div className="text-3xl mb-3">🗺️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Interactive Visualization</h3>
              <p className="text-gray-300 text-sm">
                Dynamic mapping, 3D terrain modeling, and collaborative analysis tools
              </p>
            </div>
          </div>

          {/* Main Description */}
          <div className="cosmic-card p-8 rounded-lg mb-12 max-w-5xl mx-auto text-left">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">What Makes Saarthi AI Special?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">🚀 Mission-Critical Intelligence</h3>
                <p className="text-gray-300 mb-4">
                  Designed specifically for India's space program, Saarthi AI provides autonomous reasoning capabilities
                  for satellite mission planning, launch window optimization, and real-time space weather monitoring.
                </p>

                <h3 className="text-lg font-semibold text-green-400 mb-3">🌍 Earth Observation Excellence</h3>
                <p className="text-gray-300">
                  Advanced flood mapping, disaster response, agricultural monitoring, and climate analysis using
                  cutting-edge machine learning algorithms and satellite imagery processing.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-3">🤖 Autonomous Agent System</h3>
                <p className="text-gray-300 mb-4">
                  Our AI agent doesn't just analyze data—it reasons, plans, and executes complex geospatial workflows
                  with human-like decision-making capabilities and transparent thought processes.
                </p>

                <h3 className="text-lg font-semibold text-orange-400 mb-3">🔬 Research & Development</h3>
                <p className="text-gray-300">
                  Built for researchers, scientists, and space agencies to accelerate discovery through collaborative
                  analysis, session management, and comprehensive result visualization.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/agent"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center glow-effect"
            >
              Launch AI Agent <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/playground"
              className="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              Explore Maps
            </Link>
            <Link
              href="/about"
              className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              Learn More
            </Link>
          </div>

          {/* Indian Space Program Tribute */}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Cutting-Edge <span className="text-blue-400">Capabilities</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Brain className="h-12 w-12 text-blue-400" />,
              title: "Real-time AI Agent",
              description: "Advanced reasoning and decision-making for complex geospatial analysis",
            },
            {
              icon: <Globe className="h-12 w-12 text-green-400" />,
              title: "Geospatial Analysis",
              description: "Comprehensive satellite data processing and terrain analysis",
            },
            {
              icon: <Zap className="h-12 w-12 text-yellow-400" />,
              title: "Lightning Fast",
              description: "Optimized algorithms for rapid processing of large datasets",
            },
            {
              icon: <Shield className="h-12 w-12 text-purple-400" />,
              title: "Secure & Reliable",
              description: "Enterprise-grade security for sensitive space mission data",
            },
            {
              icon: <Users className="h-12 w-12 text-orange-400" />,
              title: "Collaborative",
              description: "Multi-user sessions for team-based space exploration projects",
            },
            {
              icon: <Satellite className="h-12 w-12 text-cyan-400" />,
              title: "ISRO Integration",
              description: "Seamless integration with Indian space program infrastructure",
            },
          ].map((feature, index) => (
            <div key={index} className="cosmic-card p-6 rounded-lg hover:glow-effect transition-all duration-300">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="cosmic-card p-12 rounded-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Explore the Cosmos?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Push the boundaries of space exploration with cutting-edge AI technology
          </p>
          <Link
            href="/login"
            className="isro-blue text-white px-10 py-4 rounded-lg font-semibold hover:scale-105 transition-all duration-300 inline-block glow-effect"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  )
}
