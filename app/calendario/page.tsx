"use client"

import { useState } from "react"
import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { eventosCalendario } from "@/lib/mock-data"

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

const tipoBadge: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  academico: "default",
  feriado: "destructive",
  actividad: "outline",
  evaluacion: "secondary",
}

const tipoLabel: Record<string, string> = {
  academico: "Academico",
  feriado: "Feriado",
  actividad: "Actividad",
  evaluacion: "Evaluacion",
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

export default function CalendarioPage() {
  const [mes, setMes] = useState(2) // March
  const [ano] = useState(2026)

  const daysInMonth = getDaysInMonth(ano, mes)
  const firstDay = getFirstDayOfMonth(ano, mes)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const blanks = Array.from({ length: firstDay }, (_, i) => i)

  const eventosDelMes = eventosCalendario.filter((e) => {
    const d = new Date(e.fecha)
    return d.getMonth() === mes && d.getFullYear() === ano
  })

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground">Calendario Escolar 2026</h1>
          <p className="mt-2 text-muted-foreground">Consulta las fechas importantes del ano lectivo</p>

          <Tabs defaultValue="calendario" className="mt-8">
            <TabsList>
              <TabsTrigger value="calendario">Calendario</TabsTrigger>
              <TabsTrigger value="lista">Lista de Eventos</TabsTrigger>
            </TabsList>

            <TabsContent value="calendario" className="mt-6">
              <Card>
                <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
                  <Button variant="ghost" size="icon" onClick={() => setMes((m) => Math.max(0, m - 1))} disabled={mes === 0}>
                    <ChevronLeft className="size-4" />
                  </Button>
                  <CardTitle>{meses[mes]} {ano}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setMes((m) => Math.min(11, m + 1))} disabled={mes === 11}>
                    <ChevronRight className="size-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"].map((d) => (
                      <div key={d} className="p-2 text-xs font-medium text-muted-foreground">{d}</div>
                    ))}
                    {blanks.map((b) => (
                      <div key={`b-${b}`} className="p-2" />
                    ))}
                    {days.map((day) => {
                      const dateStr = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                      const dayEvents = eventosCalendario.filter((e) => e.fecha === dateStr)
                      const hasEvent = dayEvents.length > 0
                      return (
                        <div key={day} className={`relative rounded-md p-2 text-sm ${hasEvent ? "bg-primary/10 font-semibold text-primary" : "text-foreground"} hover:bg-muted/50 transition-colors`}>
                          {day}
                          {hasEvent && (
                            <div className="absolute bottom-0.5 left-1/2 flex -translate-x-1/2 gap-0.5">
                              {dayEvents.map((e) => (
                                <span key={e.id} className={`size-1 rounded-full ${e.tipo === "feriado" ? "bg-destructive" : e.tipo === "evaluacion" ? "bg-chart-3" : "bg-primary"}`} />
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {eventosDelMes.length > 0 && (
                    <div className="mt-6 space-y-2 border-t border-border pt-4">
                      <h4 className="text-sm font-semibold text-foreground">Eventos de {meses[mes]}</h4>
                      {eventosDelMes.map((e) => (
                        <div key={e.id} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                          <div className="flex size-10 flex-col items-center justify-center rounded-lg bg-card text-primary">
                            <span className="text-xs font-medium leading-none">{new Date(e.fecha).getDate()}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{e.titulo}</p>
                            {e.descripcion && <p className="text-xs text-muted-foreground">{e.descripcion}</p>}
                          </div>
                          <Badge variant={tipoBadge[e.tipo]} className="text-[10px]">{tipoLabel[e.tipo]}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lista" className="mt-6">
              <div className="space-y-3">
                {eventosCalendario.map((e) => (
                  <Card key={e.id}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex size-12 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <span className="text-[10px] font-medium leading-none">{new Date(e.fecha).toLocaleDateString("es-AR", { month: "short" }).toUpperCase()}</span>
                        <span className="text-lg font-bold leading-tight">{new Date(e.fecha).getDate()}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{e.titulo}</p>
                          <Badge variant={tipoBadge[e.tipo]} className="text-[10px]">{tipoLabel[e.tipo]}</Badge>
                        </div>
                        {e.descripcion && <p className="mt-0.5 text-sm text-muted-foreground">{e.descripcion}</p>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
