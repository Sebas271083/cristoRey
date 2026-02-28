"use client"

import { eventosCalendario } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, BookOpen, PartyPopper, AlertCircle, GraduationCap } from "lucide-react"

const tipoConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  academico: { label: "Academico", className: "bg-blue-100 text-blue-700 border-blue-200", icon: BookOpen },
  feriado: { label: "Feriado", className: "bg-red-100 text-red-700 border-red-200", icon: AlertCircle },
  actividad: { label: "Actividad", className: "bg-green-100 text-green-700 border-green-200", icon: PartyPopper },
  evaluacion: { label: "Evaluacion", className: "bg-amber-100 text-amber-700 border-amber-200", icon: GraduationCap },
}

export default function AppCalendarioPage() {
  const eventosOrdenados = [...eventosCalendario].sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  )

  return (
    <div className="p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Calendario</h1>
        <p className="text-muted-foreground">Proximos eventos y fechas importantes</p>
      </div>

      <div className="mt-6 space-y-3">
        {eventosOrdenados.map((evento) => {
          const config = tipoConfig[evento.tipo]
          const Icon = config.icon
          return (
            <Card key={evento.id} className="transition-shadow hover:shadow-sm">
              <CardContent className="flex items-start gap-4 p-4">
                <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium text-foreground">{evento.titulo}</h3>
                    <Badge variant="outline" className={`text-[10px] ${config.className}`}>{config.label}</Badge>
                  </div>
                  {evento.descripcion && <p className="mt-0.5 text-sm text-muted-foreground">{evento.descripcion}</p>}
                  <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="size-3" /> {evento.fecha}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
