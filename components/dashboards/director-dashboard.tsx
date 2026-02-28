"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardStat } from "@/components/card-stat"
import { Users, TrendingUp, AlertTriangle, GraduationCap, ArrowRight, Activity } from "lucide-react"
import { kpiDirector, datosMensualesAsistencia, datosMensualesRendimiento, datosMorosidad } from "@/lib/mock-data"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

export function DirectorDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Panel de Direccion</h1>
          <p className="text-muted-foreground">Indicadores clave del Colegio Cristo Rey</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/app/direccion/reportes">Ver Reportes <ArrowRight className="ml-1 size-3" /></Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CardStat icon={Users} title="Total Alumnos" value={kpiDirector.totalAlumnos} trend={{ value: 5, positive: true }} />
        <CardStat icon={Activity} title="Asistencia Promedio" value={`${kpiDirector.asistenciaPromedio}%`} trend={{ value: 1.2, positive: true }} />
        <CardStat icon={TrendingUp} title="Rendimiento Promedio" value={kpiDirector.rendimientoPromedio} trend={{ value: 3, positive: true }} />
        <CardStat icon={AlertTriangle} title="Alertas Activas" value={kpiDirector.alertasActivas} description="Requieren atencion" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Asistencia */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Asistencia Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={datosMensualesAsistencia}>
                <defs>
                  <linearGradient id="fillAsistencia" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="mes" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <YAxis domain={[80, 100]} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-card)" }} />
                <Area type="monotone" dataKey="asistencia" stroke="var(--color-chart-1)" fill="url(#fillAsistencia)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rendimiento */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Rendimiento Academico</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={datosMensualesRendimiento}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="mes" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <YAxis domain={[6, 10]} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid var(--color-border)", background: "var(--color-card)" }} />
                <Line type="monotone" dataKey="promedio" stroke="var(--color-chart-2)" strokeWidth={2} dot={{ fill: "var(--color-chart-2)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alertas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Alertas del Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { tipo: "Inasistencias", desc: "Isabella Sanchez (4to A) - 15% de ausencias", nivel: "alta" },
            { tipo: "Rendimiento", desc: "Santiago Garcia (3er A) - Promedio 5.2 en Matematica", nivel: "media" },
            { tipo: "Morosidad", desc: "12 familias con cuotas vencidas (> 60 dias)", nivel: "alta" },
            { tipo: "Docente", desc: "Falta registro de clase: Roberto Ruiz - 3 dias", nivel: "baja" },
            { tipo: "Inscripcion", desc: "5 solicitudes pendientes de revision", nivel: "media" },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <div className={`size-2 shrink-0 rounded-full ${a.nivel === "alta" ? "bg-destructive" : a.nivel === "media" ? "bg-chart-3" : "bg-muted-foreground"}`} />
              <Badge variant="outline" className="shrink-0 text-[10px]">{a.tipo}</Badge>
              <p className="flex-1 text-sm text-foreground">{a.desc}</p>
              <Badge variant={a.nivel === "alta" ? "destructive" : "secondary"} className="text-[10px]">
                {a.nivel === "alta" ? "Alta" : a.nivel === "media" ? "Media" : "Baja"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
