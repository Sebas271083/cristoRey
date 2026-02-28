"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardStat } from "@/components/card-stat"
import { BookOpen, ClipboardCheck, AlertTriangle, Users, ArrowRight } from "lucide-react"

const cursos = [
  { id: "1", nombre: "3er Grado A", materia: "Matematica", alumnos: 25, pendientes: 8 },
  { id: "2", nombre: "4to Grado A", materia: "Matematica", alumnos: 22, pendientes: 3 },
]

const pendientes = [
  { tipo: "Corregir", desc: "Tarea 'Fracciones equivalentes' - 3er Grado A", cantidad: 18 },
  { tipo: "Corregir", desc: "Evaluacion parcial - 4to Grado A", cantidad: 22 },
  { tipo: "Planificar", desc: "Clase semana 10/03 - 3er Grado A", cantidad: null },
  { tipo: "Registro", desc: "Asistencia de hoy - 4to Grado A", cantidad: null },
]

export function DocenteDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Hola, Ana</h1>
        <p className="text-muted-foreground">Panel docente. Aqui tienes un resumen de tus cursos y pendientes.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CardStat icon={BookOpen} title="Cursos a Cargo" value="2" description="3er y 4to Grado A" />
        <CardStat icon={Users} title="Total Alumnos" value="47" description="En ambos cursos" />
        <CardStat icon={ClipboardCheck} title="Tareas por Corregir" value="40" description="Entregas recibidas" />
        <CardStat icon={AlertTriangle} title="Alertas" value="3" description="Alumnos con bajo rendimiento" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Cursos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Mis Cursos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cursos.map((c) => (
              <Link key={c.id} href="/app/aulas" className="flex items-center justify-between rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted">
                <div>
                  <p className="font-medium text-foreground">{c.nombre}</p>
                  <p className="text-sm text-muted-foreground">{c.materia} - {c.alumnos} alumnos</p>
                </div>
                <div className="text-right">
                  {c.pendientes > 0 && (
                    <Badge variant="secondary">{c.pendientes} pendientes</Badge>
                  )}
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Pendientes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tareas Pendientes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {pendientes.map((p, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                <Badge variant={p.tipo === "Corregir" ? "default" : p.tipo === "Planificar" ? "secondary" : "outline"} className="text-[10px] shrink-0">
                  {p.tipo}
                </Badge>
                <p className="flex-1 text-sm text-foreground">{p.desc}</p>
                {p.cantidad && <span className="text-xs font-medium text-muted-foreground">{p.cantidad}</span>}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Accesos rapidos */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Planificacion", href: "/app/planificacion", icon: ClipboardCheck },
          { label: "Tomar Asistencia", href: "/app/asistencia", icon: Users },
          { label: "Evaluaciones", href: "/app/evaluaciones", icon: BookOpen },
        ].map((a) => (
          <Card key={a.label} className="group cursor-pointer transition-shadow hover:shadow-md" asChild>
            <Link href={a.href}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <a.icon className="size-5 text-primary" />
                </div>
                <span className="font-medium text-foreground">{a.label}</span>
                <ArrowRight className="ml-auto size-4 text-muted-foreground" />
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
