"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Plus, Award, Calendar, Users, Clock } from "lucide-react"
import { toast } from "sonner"

const capacitaciones = [
  { id: "1", titulo: "Nuevas metodologias de ensenanza", modalidad: "Presencial", inicio: "2026-03-10", fin: "2026-04-10", inscritos: 15, cupo: 20, horas: 40, estado: "abierta" },
  { id: "2", titulo: "Uso de tecnologia en el aula", modalidad: "Virtual", inicio: "2026-03-15", fin: "2026-05-15", inscritos: 22, cupo: 25, horas: 60, estado: "abierta" },
  { id: "3", titulo: "Primeros auxilios y protocolo de emergencia", modalidad: "Presencial", inicio: "2026-02-15", fin: "2026-02-28", inscritos: 28, cupo: 28, horas: 16, estado: "en_curso" },
  { id: "4", titulo: "Educacion emocional", modalidad: "Virtual", inicio: "2026-01-10", fin: "2026-02-10", inscritos: 18, cupo: 20, horas: 30, estado: "finalizada" },
]

const estadoConfig: Record<string, { label: string; className: string }> = {
  abierta: { label: "Inscripcion abierta", className: "bg-blue-100 text-blue-700 border-blue-200" },
  en_curso: { label: "En curso", className: "bg-green-100 text-green-700 border-green-200" },
  finalizada: { label: "Finalizada", className: "bg-muted text-muted-foreground border-border" },
}

export default function CapacitacionesPage() {
  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Capacitaciones</h1>
          <p className="text-muted-foreground">Formacion continua para docentes y personal</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm"><Plus className="mr-1.5 size-3.5" /> Nueva capacitacion</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader><SheetTitle>Nueva Capacitacion</SheetTitle></SheetHeader>
            <div className="mt-6 space-y-4">
              <div><Label>Titulo</Label><Input className="mt-1.5" placeholder="Nombre" /></div>
              <div><Label>Modalidad</Label><Input className="mt-1.5" placeholder="Presencial / Virtual" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Inicio</Label><Input className="mt-1.5" type="date" /></div>
                <div><Label>Fin</Label><Input className="mt-1.5" type="date" /></div>
              </div>
              <div><Label>Cupo</Label><Input className="mt-1.5" type="number" placeholder="20" /></div>
              <div><Label>Carga horaria</Label><Input className="mt-1.5" type="number" placeholder="40" /></div>
              <div><Label>Descripcion</Label><Textarea className="mt-1.5" placeholder="Contenido..." /></div>
              <Button className="w-full" onClick={() => toast.success("Capacitacion creada")}>Crear</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-6 space-y-4">
        {capacitaciones.map((cap) => (
          <Card key={cap.id} className="transition-shadow hover:shadow-sm">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Award className="size-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-foreground">{cap.titulo}</h3>
                      <Badge variant="outline" className={`text-[10px] ${estadoConfig[cap.estado].className}`}>
                        {estadoConfig[cap.estado].label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{cap.modalidad}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="size-3" /> {cap.inicio} al {cap.fin}</span>
                      <span className="flex items-center gap-1"><Clock className="size-3" /> {cap.horas}hs</span>
                      <span className="flex items-center gap-1"><Users className="size-3" /> {cap.inscritos}/{cap.cupo} inscriptos</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 w-32">
                  <Progress value={(cap.inscritos / cap.cupo) * 100} className="h-2" />
                  <p className="mt-1 text-xs text-muted-foreground text-center">{Math.round((cap.inscritos / cap.cupo) * 100)}% del cupo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
