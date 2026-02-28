import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'Colegio Cristo Rey | Nivel Inicial y Primaria',
  description: 'Plataforma educativa integral del Colegio Cristo Rey. Gestion academica, comunicacion y seguimiento para alumnos, familias, docentes y directivos.',
}

export const viewport: Viewport = {
  themeColor: "#3366CC",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
