"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Satellite, Shield, Globe } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="space-bg min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Satellite className="h-16 w-16 text-blue-400 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to <span className="text-blue-400">Saarthi AI</span>
          </h1>
          <p className="text-gray-300">Access your geospatial analysis dashboard</p>
        </div>

        {/* Login Form */}
        <div className="cosmic-card p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors glow-effect"
            >
              Sign In to Saarthi AI
            </button>
          </form>

          {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900 text-gray-400">Or continue with</span>
              </div>
            </div>
          </div>

          {/* ISRO Login */}
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center mb-4">
            <Globe className="h-5 w-5 mr-2" />
            ISRO Network Login
          </button>

          {/* Security Notice */}
          <div className="bg-slate-800 p-4 rounded-lg border border-blue-500/30">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-green-400 mr-2 mt-0.5" />
              <div>
                <p className="text-sm text-gray-300">
                  <strong className="text-green-400">Secure Access:</strong> This platform is protected by
                  enterprise-grade security for sensitive space mission data.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
              Request Access
            </Link>
          </p>
        </div>

        {/* Bharatiya Antariksh Hackathon Badge */}
        <div className="text-center mt-8">
          <div className="indian-gradient p-1 rounded-lg inline-block">
            <div className="bg-slate-900 px-6 py-3 rounded-lg">
              <p className="text-white text-sm font-medium">🇮🇳 Advanced Space Intelligence Platform 🚀</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
