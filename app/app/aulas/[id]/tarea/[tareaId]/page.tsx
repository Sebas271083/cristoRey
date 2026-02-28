"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { tareas } from "@/lib/mock-data"
import { useRole } from "@/lib/role-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Calendar, Upload, Download, CheckCircle2, MessageSquare } from "lucide-react"
import { toast } from "sonner"

const estadoBadge: Record<string, string> = {
  pendiente: "bg-amber-100 text-amber-700 border-amber-200",
  entregada: "bg-blue-100 text-blue-700 border-blue-200",
  calificada: "bg-green-100 text-green-700 border-green-200",
  vencida: "bg-red-100 text-red-700 border-red-200",
}

export default function TareaDetallePage() {
  const params = useParams()
  const { role } = useRole()
  const tarea = tareas.find((t) => t.id === params.tareaId) || tareas[0]
  const [entrega, setEntrega] = useState("")
  const [entregado, setEntregado] = useState(tarea.estado === "entregada" || tarea.estado === "calificada")

  const handleEntregar = () => {
    setEntregado(true)
    toast.success("Tarea entregada correctamente")
  }

  return (
    <div className="p-4 lg:p-6">
      <Link href={`/app/aulas/${params.id}`} className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="size-3.5" /> Volver al aula
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{tarea.titulo}</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">{tarea.materia}</p>
                </div>
                <Badge variant="outline" className={estadoBadge[tarea.estado]}>
                  {tarea.estado.charAt(0).toUpperCase() + tarea.estado.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/80 leading-relaxed">{tarea.descripcion}</p>
              <Separator className="my-4" />
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="size-3.5" /> Fecha de entrega: {tarea.fechaEntrega}</span>
                {tarea.nota !== undefined && (
                  <span className="font-medium text-green-600">Nota: {tarea.nota}/10</span>
                )}
              </div>
            </CardContent>
          </Card>

          {role === "alumno" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mi entrega</CardTitle>
              </CardHeader>
              <CardContent>
                {entregado ? (
                  <div className="flex flex-col items-center gap-2 py-6 text-center">
                    <CheckCircle2 className="size-10 text-green-500" />
                    <p className="font-medium text-foreground">Tarea entregada</p>
                    <p className="text-sm text-muted-foreground">Tu trabajo fue enviado correctamente</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Escribe tu respuesta o comentarios sobre la tarea..."
                      value={entrega}
                      onChange={(e) => setEntrega(e.target.value)}
                      className="min-h-[120px]"
                    />
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm">
                        <Upload className="mr-1.5 size-3.5" /> Adjuntar archivo
                      </Button>
                      <Button size="sm" onClick={handleEntregar}>Entregar tarea</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {tarea.estado === "calificada" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Devolucion del docente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">AG</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm text-foreground">Ana Gutierrez</p>
                    <p className="mt-1 text-sm text-foreground/80">Excelente trabajo. La resolucion de los ejercicios es correcta y la presentacion es muy clara. Segui asi!</p>
                    <p className="mt-2 text-xs text-muted-foreground">Hace 3 dias</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Detalles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Materia</span><span className="font-medium text-foreground">{tarea.materia}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Entrega</span><span className="font-medium text-foreground">{tarea.fechaEntrega}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Estado</span><span className="font-medium text-foreground capitalize">{tarea.estado}</span></div>
              {tarea.nota !== undefined && (
                <div className="flex justify-between"><span className="text-muted-foreground">Calificacion</span><span className="font-bold text-primary text-lg">{tarea.nota}/10</span></div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Archivos adjuntos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg border border-border p-2.5">
                  <span className="text-xs text-foreground">consigna_tarea.pdf</span>
                  <Button variant="ghost" size="sm"><Download className="size-3.5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
