"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardStat } from "@/components/card-stat"
import { BookOpen, Clock, CheckCircle, MessageSquare, ArrowRight } from "lucide-react"
import { agendaDelDia, tareas, materias } from "@/lib/mock-data"

export function AlumnoDashboard() {
  const tareasP = tareas.filter((t) => t.estado === "pendiente")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Hola, Martina</h1>
        <p className="text-muted-foreground">Bienvenida a tu aula virtual. Aqui tienes un resumen de tu dia.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CardStat icon={BookOpen} title="Materias" value={materias.length} description="Cursando actualmente" />
        <CardStat icon={Clock} title="Tareas Pendientes" value={tareasP.length} description="Para esta semana" />
        <CardStat icon={CheckCircle} title="Promedio General" value="8.5" trend={{ value: 3, positive: true }} />
        <CardStat icon={MessageSquare} title="Mensajes" value="2" description="Sin leer" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Agenda del dia */}
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Agenda del Dia</CardTitle>
            <Badge variant="outline" className="text-xs">Lunes</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {agendaDelDia.map((item, i) => (
                <div key={i} className={`flex items-center gap-3 rounded-lg p-2.5 ${item.materia === "Recreo" ? "bg-accent/10" : "bg-muted/50"}`}>
                  <span className="w-12 text-xs font-medium text-muted-foreground">{item.hora}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.materia}</p>
                    {item.docente && <p className="text-xs text-muted-foreground">{item.docente} - {item.aula}</p>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tareas pendientes */}
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Proximas Tareas</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/app/aulas">Ver todas <ArrowRight className="ml-1 size-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tareasP.map((t) => (
                <div key={t.id} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{t.titulo}</p>
                    <p className="text-xs text-muted-foreground">{t.materia}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-foreground">{new Date(t.fechaEntrega).toLocaleDateString("es-AR", { day: "numeric", month: "short" })}</p>
                    <Badge variant="secondary" className="text-[10px]">Pendiente</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accesos rapidos */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Mis Aulas", href: "/app/aulas", icon: BookOpen },
          { label: "Mensajes", href: "/app/mensajes", icon: MessageSquare },
          { label: "Calendario", href: "/app/calendario", icon: Clock },
        ].map((a) => (
          <Card key={a.label} className="group cursor-pointer transition-shadow hover:shadow-md" asChild>
            <Link href={a.href}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
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
