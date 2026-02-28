"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardStat } from "@/components/card-stat"
import { Users, CreditCard, CheckSquare, MessageSquare, ArrowRight } from "lucide-react"
import { pagos, mensajes } from "@/lib/mock-data"

export function PadreDashboard() {
  const pagosPendientes = pagos.filter((p) => p.estado !== "pagado")
  const mensajesSinLeer = mensajes.filter((m) => !m.leido)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Hola, Jorge</h1>
        <p className="text-muted-foreground">Resumen del seguimiento de tus hijos en el Colegio Cristo Rey.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CardStat icon={Users} title="Hijos Inscriptos" value="1" description="Martina Lopez - 3er Grado A" />
        <CardStat icon={CheckSquare} title="Asistencia" value="95%" trend={{ value: 2, positive: true }} />
        <CardStat icon={CreditCard} title="Pagos Pendientes" value={pagosPendientes.length} description={`$${pagosPendientes.reduce((s, p) => s + p.monto, 0).toLocaleString()}`} />
        <CardStat icon={MessageSquare} title="Mensajes" value={mensajesSinLeer.length} description="Sin leer" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Resumen del hijo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Resumen - Martina Lopez</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="text-sm text-muted-foreground">Grado</span>
                <span className="text-sm font-medium text-foreground">3er Grado A</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="text-sm text-muted-foreground">Promedio General</span>
                <span className="text-sm font-medium text-foreground">8.5</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="text-sm text-muted-foreground">Asistencia</span>
                <Badge variant="outline" className="text-accent">95%</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="text-sm text-muted-foreground">Tareas Pendientes</span>
                <Badge variant="secondary">3</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ultimos pagos */}
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Estado de Pagos</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/app/pagos">Ver todos <ArrowRight className="ml-1 size-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pagos.slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.concepto}</p>
                    <p className="text-xs text-muted-foreground">{new Date(p.fecha).toLocaleDateString("es-AR")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">${p.monto.toLocaleString()}</p>
                    <Badge variant={p.estado === "pagado" ? "outline" : p.estado === "vencido" ? "destructive" : "secondary"} className="text-[10px]">
                      {p.estado === "pagado" ? "Pagado" : p.estado === "vencido" ? "Vencido" : "Pendiente"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comunicaciones recientes */}
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Comunicaciones Recientes</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/app/mensajes">Ver todas <ArrowRight className="ml-1 size-3" /></Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mensajes.slice(0, 3).map((m) => (
              <div key={m.id} className={`flex items-center gap-3 rounded-lg p-3 ${!m.leido ? "bg-primary/5" : "bg-muted/50"}`}>
                <div className={`size-2 shrink-0 rounded-full ${!m.leido ? "bg-primary" : "bg-transparent"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">{m.asunto}</p>
                    {!m.leido && <Badge className="text-[10px] shrink-0">Nuevo</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">De: {m.de}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{new Date(m.fecha).toLocaleDateString("es-AR", { day: "numeric", month: "short" })}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
