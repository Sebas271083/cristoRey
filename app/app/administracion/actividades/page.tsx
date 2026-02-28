"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Bus, MapPin, Calendar, Users, CheckCircle2, Clock } from "lucide-react"
import { toast } from "sonner"

const actividades = [
  { id: "1", titulo: "Visita a Reserva Natural Otamendi", tipo: "Salida educativa", fecha: "2026-03-15", grados: "3er Grado", autorizaciones: { total: 25, firmadas: 18 }, estado: "abierta" },
  { id: "2", titulo: "Torneo intercolegial de futbol", tipo: "Deportivo", fecha: "2026-03-20", grados: "4to a 6to Grado", autorizaciones: { total: 45, firmadas: 32 }, estado: "abierta" },
  { id: "3", titulo: "Campamento en Tandil", tipo: "Campamento", fecha: "2026-04-15", grados: "5to y 6to Grado", autorizaciones: { total: 40, firmadas: 40 }, estado: "completa" },
  { id: "4", titulo: "Museo de Ciencias Naturales", tipo: "Salida educativa", fecha: "2026-02-20", grados: "2do Grado", autorizaciones: { total: 28, firmadas: 28 }, estado: "realizada" },
  { id: "5", titulo: "Feria de Ciencias", tipo: "Evento", fecha: "2026-05-10", grados: "Todos los grados", autorizaciones: { total: 0, firmadas: 0 }, estado: "planificada" },
]

const estadoConfig: Record<string, { label: string; className: string }> = {
  abierta: { label: "Abierta", className: "bg-blue-100 text-blue-700 border-blue-200" },
  completa: { label: "Completa", className: "bg-green-100 text-green-700 border-green-200" },
  realizada: { label: "Realizada", className: "bg-muted text-muted-foreground border-border" },
  planificada: { label: "Planificada", className: "bg-amber-100 text-amber-700 border-amber-200" },
}

export default function ActividadesPage() {
  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Actividades y Salidas</h1>
          <p className="text-muted-foreground">Salidas educativas, eventos y campamentos</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm"><Plus className="mr-1.5 size-3.5" /> Nueva actividad</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader><SheetTitle>Nueva Actividad</SheetTitle></SheetHeader>
            <div className="mt-6 space-y-4">
              <div><Label>Titulo</Label><Input className="mt-1.5" placeholder="Nombre de la actividad" /></div>
              <div><Label>Tipo</Label><Input className="mt-1.5" placeholder="Ej: Salida educativa" /></div>
              <div><Label>Fecha</Label><Input className="mt-1.5" type="date" /></div>
              <div><Label>Grados participantes</Label><Input className="mt-1.5" placeholder="Ej: 3er y 4to Grado" /></div>
              <div><Label>Descripcion</Label><Textarea className="mt-1.5" placeholder="Detalles de la actividad..." /></div>
              <Button className="w-full" onClick={() => toast.success("Actividad creada")}>Crear actividad</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-6 space-y-4">
        {actividades.map((act) => {
          const progreso = act.autorizaciones.total > 0 ? Math.round((act.autorizaciones.firmadas / act.autorizaciones.total) * 100) : 0
          return (
            <Card key={act.id} className="transition-shadow hover:shadow-sm">
              <CardContent className="p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      <Bus className="size-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-foreground">{act.titulo}</h3>
                        <Badge variant="outline" className={`text-[10px] ${estadoConfig[act.estado].className}`}>
                          {estadoConfig[act.estado].label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{act.tipo}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="size-3" /> {act.fecha}</span>
                        <span className="flex items-center gap-1"><Users className="size-3" /> {act.grados}</span>
                      </div>
                    </div>
                  </div>
                  {act.autorizaciones.total > 0 && (
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-medium text-foreground">{act.autorizaciones.firmadas}/{act.autorizaciones.total}</p>
                      <p className="text-xs text-muted-foreground">Autorizaciones ({progreso}%)</p>
                      <div className="mt-1 h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progreso}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
