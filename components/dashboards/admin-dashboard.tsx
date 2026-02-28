"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardStat } from "@/components/card-stat"
import { Users, ClipboardList, Wallet, AlertTriangle, ArrowRight } from "lucide-react"
import { inscripciones, kpiDirector } from "@/lib/mock-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const datosCaja = [
  { mes: "Ene", ingresos: 1200000, egresos: 800000 },
  { mes: "Feb", ingresos: 1350000, egresos: 850000 },
  { mes: "Mar", ingresos: 1100000, egresos: 900000 },
]

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Panel Administrativo</h1>
        <p className="text-muted-foreground">Gestion diaria del Colegio Cristo Rey</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CardStat icon={ClipboardList} title="Inscripciones Pendientes" value={kpiDirector.inscripcionesPendientes} description="Requieren atencion" />
        <CardStat icon={Users} title="Total Alumnos" value={kpiDirector.totalAlumnos} trend={{ value: 5, positive: true }} />
        <CardStat icon={Wallet} title="Morosidad" value={`${kpiDirector.morosidad}%`} trend={{ value: 2.1, positive: false }} />
        <CardStat icon={AlertTriangle} title="Ausentismo Hoy" value="18" description="Alumnos ausentes" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inscripciones recientes */}
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Inscripciones Recientes</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/app/administracion/inscripciones">Ver todas <ArrowRight className="ml-1 size-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {inscripciones.slice(0, 4).map((ins) => (
              <div key={ins.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{ins.alumno}</p>
                  <p className="text-xs text-muted-foreground">{ins.grado} - {ins.nivel === "inicial" ? "Inicial" : "Primaria"}</p>
                </div>
                <Badge variant={ins.estado === "aprobada" ? "outline" : ins.estado === "rechazada" ? "destructive" : ins.estado === "documentacion" ? "secondary" : "default"} className="text-[10px]">
                  {ins.estado === "pendiente" ? "Pendiente" : ins.estado === "aprobada" ? "Aprobada" : ins.estado === "documentacion" ? "Docs." : "Rechazada"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Grafico Caja */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ingresos vs Egresos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={datosCaja}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="mes" className="text-xs" tick={{ fill: "var(--color-muted-foreground)" }} />
                <YAxis className="text-xs" tick={{ fill: "var(--color-muted-foreground)" }} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-card)" }} />
                <Bar dataKey="ingresos" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="egresos" fill="var(--color-chart-4)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
