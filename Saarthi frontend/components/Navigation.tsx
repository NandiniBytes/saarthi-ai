"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const Navigation = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/agent", label: "Real-time Agent" },
    { href: "/sessions", label: "Session Explorer" },
    { href: "/gallery", label: "Results Gallery" },
    { href: "/playground", label: "Map Playground" },
    { href: "/login", label: "Login" },
  ]

  return (
    <nav className="bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-md border-b border-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 sticky top-0 z-50 shadow-2xl">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Unique Custom Logo */}
          <Link href="/" className="group flex items-center space-x-4 relative no-underline">
            {/* Unique Logo Design */}
            <div className="relative flex items-center space-x-3">
              {/* Custom Saarthi AI Symbol */}
              <div className="relative w-14 h-14">
                {/* Outer rotating ring */}
                <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-1 border border-purple-400/40 rounded-full animate-spin-reverse"></div>

                {/* Central hexagon with gradient */}
                <div className="absolute inset-3 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-lg transform rotate-45 group-hover:rotate-90 transition-all duration-700 shadow-lg shadow-blue-500/30">
                  {/* Inner diamond */}
                  <div className="absolute inset-1 bg-gradient-to-tr from-white/20 to-transparent rounded-lg"></div>
                </div>

                {/* AI Neural Network Pattern */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-2 left-2 w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
                  <div
                    className="absolute bottom-2 right-2 w-1 h-1 bg-purple-300 rounded-full animate-ping"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="absolute top-2 right-2 w-1 h-1 bg-green-300 rounded-full animate-ping"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="absolute bottom-2 left-2 w-1 h-1 bg-yellow-300 rounded-full animate-ping"
                    style={{ animationDelay: "1.5s" }}
                  ></div>
                </div>

                {/* Orbital particles */}
                <div className="absolute -top-1 left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
                <div
                  className="absolute -bottom-1 left-1/2 w-1 h-1 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                ></div>
                <div
                  className="absolute top-1/2 -left-1 w-1 h-1 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.6s" }}
                ></div>
                <div
                  className="absolute top-1/2 -right-1 w-1 h-1 bg-green-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.9s" }}
                ></div>
              </div>

              {/* Unique Typography */}
              <div className="flex flex-col">
                <div className="relative">
                  <span className="text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent group-hover:from-cyan-200 group-hover:via-blue-200 group-hover:to-purple-300 transition-all duration-500 tracking-tight no-underline">
                    Saarthi
                  </span>
                  <span className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent ml-1 group-hover:from-purple-400 group-hover:via-cyan-400 group-hover:to-blue-400 transition-all duration-500 no-underline">
                    AI
                  </span>
                  {/* Unique accent mark */}
                  <div className="absolute -top-1 -right-2 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse opacity-80"></div>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-400 font-bold tracking-[0.2em] uppercase opacity-90 group-hover:opacity-100 transition-all duration-300 no-underline">
                    Space Intelligence
                  </span>
                  <div
                    className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Unique hover aura effect */}
            <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-cyan-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-cyan-600/10 rounded-3xl blur-xl transition-all duration-700"></div>
          </Link>

          {/* Clean Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-800/50 backdrop-blur-sm rounded-full px-2 py-2 border border-slate-700/50">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group no-underline ${
                  pathname === item.href
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                    : "text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Active indicator */}
                {pathname === item.href && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl animate-pulse opacity-20"></div>
                )}

                {/* Modern hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 rounded-xl transition-all duration-300"></div>

                <span className="relative z-10 no-underline">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative p-3 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-white hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:bg-slate-700/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 hover:from-blue-500/20 hover:to-purple-500/20 rounded-full transition-all duration-300"></div>
            {isOpen ? (
              <X className="h-6 w-6 relative z-10 transform rotate-0 transition-transform duration-300" />
            ) : (
              <Menu className="h-6 w-6 relative z-10 transform rotate-0 transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-slate-700/50 bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-md rounded-b-2xl">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 no-underline ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 mx-2"
                      : "text-gray-300 hover:text-white hover:bg-slate-700/50 mx-2"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: "slideInFromRight 0.3s ease-out forwards",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="no-underline">{item.label}</span>
                    {pathname === item.href && <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>}
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile footer */}
            <div className="mt-6 pt-4 border-t border-slate-700/50 text-center">
              <div className="inline-flex items-center space-x-2 text-xs text-gray-400">
                <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="no-underline">Space Intelligence Platform</span>
                <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
