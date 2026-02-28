"use client"

import { kpiDirector, eventosCalendario } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertTriangle, Calendar, Users, FileText, CreditCard, Activity } from "lucide-react"

const tareasAdmin = [
  { titulo: "Revisar inscripciones pendientes (12)", estado: "urgente", icono: FileText },
  { titulo: "Aprobar compra de material didactico", estado: "pendiente", icono: CreditCard },
  { titulo: "Confirmar fecha de campamento 5to y 6to", estado: "pendiente", icono: Calendar },
  { titulo: "Renovar seguro escolar anual", estado: "pendiente", icono: FileText },
  { titulo: "Publicar circular de inicio de clases", estado: "completada", icono: CheckCircle2 },
  { titulo: "Actualizar protocolo de emergencias", estado: "completada", icono: Activity },
]

const estadoConfig: Record<string, { label: string; className: string }> = {
  urgente: { label: "Urgente", className: "bg-red-100 text-red-700 border-red-200" },
  pendiente: { label: "Pendiente", className: "bg-amber-100 text-amber-700 border-amber-200" },
  completada: { label: "Completada", className: "bg-green-100 text-green-700 border-green-200" },
}

export default function EstadoGeneralPage() {
  const proximosEventos = eventosCalendario
    .filter((e) => new Date(e.fecha) >= new Date("2026-02-28"))
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    .slice(0, 5)

  return (
    <div className="p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Estado General del Colegio</h1>
        <p className="text-muted-foreground">Vista panoramica de la institucion</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-green-100"><Users className="size-5 text-green-700" /></div>
              <div><p className="text-2xl font-bold text-foreground">{kpiDirector.totalAlumnos}</p><p className="text-xs text-muted-foreground">Alumnos activos</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100"><Users className="size-5 text-blue-700" /></div>
              <div><p className="text-2xl font-bold text-foreground">{kpiDirector.totalDocentes}</p><p className="text-xs text-muted-foreground">Docentes</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-amber-100"><AlertTriangle className="size-5 text-amber-700" /></div>
              <div><p className="text-2xl font-bold text-foreground">{kpiDirector.alertasActivas}</p><p className="text-xs text-muted-foreground">Alertas activas</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10"><Clock className="size-5 text-primary" /></div>
              <div><p className="text-2xl font-bold text-foreground">{kpiDirector.inscripcionesPendientes}</p><p className="text-xs text-muted-foreground">Inscripciones pend.</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tareas administrativas</CardTitle>
            <CardDescription>Pendientes y seguimiento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tareasAdmin.map((t, i) => {
                const Icon = t.icono
                return (
                  <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <Icon className={`size-4 flex-shrink-0 ${t.estado === "completada" ? "text-green-500" : t.estado === "urgente" ? "text-red-500" : "text-amber-500"}`} />
                    <span className={`flex-1 text-sm ${t.estado === "completada" ? "text-muted-foreground line-through" : "text-foreground"}`}>{t.titulo}</span>
                    <Badge variant="outline" className={`text-[10px] ${estadoConfig[t.estado].className}`}>{estadoConfig[t.estado].label}</Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Proximos eventos</CardTitle>
            <CardDescription>Calendario institucional</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {proximosEventos.map((ev) => (
                <div key={ev.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <Calendar className="size-4 flex-shrink-0 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{ev.titulo}</p>
                    <p className="text-xs text-muted-foreground">{ev.fecha}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] capitalize">{ev.tipo}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
