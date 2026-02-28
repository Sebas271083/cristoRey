"use client"

import { alumnos, tareas, pagos } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCheck, BookOpen, CreditCard, AlertCircle } from "lucide-react"

const hijos = [alumnos[0], alumnos[1]]

export default function HijosPage() {
  return (
    <div className="p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mis Hijos</h1>
        <p className="text-muted-foreground">Resumen academico y administrativo</p>
      </div>

      <Tabs defaultValue={hijos[0].id} className="mt-6">
        <TabsList>
          {hijos.map((h) => (
            <TabsTrigger key={h.id} value={h.id}>{h.nombre}</TabsTrigger>
          ))}
        </TabsList>

        {hijos.map((hijo) => (
          <TabsContent key={hijo.id} value={hijo.id} className="mt-4">
            <div className="grid gap-4 lg:grid-cols-3">
              <Card className="lg:col-span-1">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Avatar className="size-20">
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {hijo.nombre[0]}{hijo.apellido[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="mt-4 text-lg font-bold text-foreground">{hijo.nombre} {hijo.apellido}</h2>
                  <p className="text-sm text-muted-foreground">{hijo.grado} &middot; Seccion {hijo.seccion}</p>
                  <Badge variant="outline" className="mt-2 capitalize">{hijo.nivel}</Badge>

                  <div className="mt-6 w-full space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Asistencia</span>
                        <span className="font-medium text-foreground">{hijo.asistencia}%</span>
                      </div>
                      <Progress value={hijo.asistencia} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Promedio</span>
                        <span className="font-medium text-foreground">{hijo.promedio}/10</span>
                      </div>
                      <Progress value={hijo.promedio * 10} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="size-4 text-primary" /> Tareas pendientes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="divide-y divide-border">
                      {tareas.filter((t) => t.estado === "pendiente").slice(0, 3).map((tarea) => (
                        <div key={tarea.id} className="flex items-center justify-between py-3">
                          <div>
                            <p className="text-sm font-medium text-foreground">{tarea.titulo}</p>
                            <p className="text-xs text-muted-foreground">{tarea.materia} &middot; Entrega: {tarea.fechaEntrega}</p>
                          </div>
                          <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200 text-[10px]">Pendiente</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CreditCard className="size-4 text-primary" /> Estado de pagos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="divide-y divide-border">
                      {pagos.filter((p) => p.hijo === `${hijo.nombre} ${hijo.apellido}`).slice(0, 3).map((pago) => (
                        <div key={pago.id} className="flex items-center justify-between py-3">
                          <div>
                            <p className="text-sm font-medium text-foreground">{pago.concepto}</p>
                            <p className="text-xs text-muted-foreground">${pago.monto.toLocaleString("es-AR")}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${
                              pago.estado === "pagado"
                                ? "bg-green-100 text-green-700 border-green-200"
                                : pago.estado === "pendiente"
                                ? "bg-amber-100 text-amber-700 border-amber-200"
                                : "bg-red-100 text-red-700 border-red-200"
                            }`}
                          >
                            {pago.estado.charAt(0).toUpperCase() + pago.estado.slice(1)}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
