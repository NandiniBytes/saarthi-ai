import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Navigation from "@/components/Navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Saarthi AI - Bharatiya Antariksh Hackathon",
  description: "Advanced AI-powered geospatial analysis platform for space exploration and Earth observation",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen space-bg">
          <div className="nebula-bg min-h-screen">
            <Navigation />
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
