"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FileText, CheckCircle2, Clock, XCircle, Bus, MapPin, Calendar } from "lucide-react"
import { toast } from "sonner"

const autorizaciones = [
  { id: "1", tipo: "Salida educativa", titulo: "Visita a Reserva Natural Otamendi", fecha: "2026-03-15", estado: "pendiente", descripcion: "Salida de 3er Grado A al area protegida. Salida 08:00, regreso 16:00. Incluye almuerzo." },
  { id: "2", tipo: "Actividad deportiva", titulo: "Torneo intercolegial de futbol", fecha: "2026-03-20", estado: "pendiente", descripcion: "Partido amistoso en el Club Atletico del barrio. Participan alumnos de 4to a 6to grado." },
  { id: "3", tipo: "Salida educativa", titulo: "Museo de Ciencias Naturales", fecha: "2026-02-20", estado: "autorizado", descripcion: "Recorrido guiado por las salas de paleontologia y biodiversidad." },
  { id: "4", tipo: "Retiro anticipado", titulo: "Turno medico - Martina Lopez", fecha: "2026-02-18", estado: "autorizado", descripcion: "Retiro a las 11:30 por consulta medica programada." },
  { id: "5", tipo: "Salida educativa", titulo: "Teatro Colon - Funcion infantil", fecha: "2026-02-10", estado: "rechazado", descripcion: "Se cancelo la funcion por motivos logisticos del teatro." },
]

const estadoConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  pendiente: { label: "Pendiente", className: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
  autorizado: { label: "Autorizado", className: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle2 },
  rechazado: { label: "Rechazado", className: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
}

export default function AutorizacionesPage() {
  const [items, setItems] = useState(autorizaciones)

  const handleAutorizar = (id: string) => {
    setItems((prev) => prev.map((a) => a.id === id ? { ...a, estado: "autorizado" } : a))
    toast.success("Autorizacion confirmada")
  }

  return (
    <div className="p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Autorizaciones</h1>
        <p className="text-muted-foreground">Salidas, actividades y permisos</p>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((auth) => {
          const config = estadoConfig[auth.estado]
          return (
            <Card key={auth.id}>
              <CardContent className="p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                      {auth.tipo.includes("Salida") ? <Bus className="size-5 text-primary" /> : <FileText className="size-5 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-foreground">{auth.titulo}</h3>
                        <Badge variant="outline" className={`text-[10px] ${config.className}`}>{config.label}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{auth.tipo}</p>
                      <p className="mt-2 text-sm text-foreground/80">{auth.descripcion}</p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="size-3" /> {auth.fecha}</span>
                      </div>
                    </div>
                  </div>
                  {auth.estado === "pendiente" && (
                    <div className="flex gap-2 sm:flex-shrink-0">
                      <Button size="sm" onClick={() => handleAutorizar(auth.id)}>Autorizar</Button>
                      <Button size="sm" variant="outline">Rechazar</Button>
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
