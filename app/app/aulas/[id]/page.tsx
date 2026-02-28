"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { materias, tareas } from "@/lib/mock-data"
import { useRole } from "@/lib/role-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, FileText, Upload, Download, Calendar, Clock, MessageSquare, Paperclip, Send, Plus } from "lucide-react"

const muroEntries = [
  { id: "1", autor: "Ana Gutierrez", contenido: "Recuerden que el viernes tenemos evaluacion de fracciones. Repasen los ejercicios del capitulo 4.", fecha: "Hace 2 horas", tipo: "anuncio" as const },
  { id: "2", autor: "Carlos Mendez", contenido: "Subi el material de lectura complementaria para el proyecto integrador.", fecha: "Ayer", tipo: "material" as const },
  { id: "3", autor: "Ana Gutierrez", contenido: "Excelente trabajo en la actividad grupal de hoy. Sigan asi!", fecha: "Hace 2 dias", tipo: "anuncio" as const },
]

const materiales = [
  { id: "1", nombre: "Guia de ejercicios - Fracciones", tipo: "PDF", fecha: "2026-02-26", tamanio: "2.4 MB" },
  { id: "2", nombre: "Presentacion - Numeros decimales", tipo: "PPT", fecha: "2026-02-20", tamanio: "5.1 MB" },
  { id: "3", nombre: "Video explicativo - Geometria", tipo: "Video", fecha: "2026-02-15", tamanio: "45 MB" },
  { id: "4", nombre: "Lectura complementaria Cap. 3", tipo: "PDF", fecha: "2026-02-10", tamanio: "1.8 MB" },
]

const estadoBadge: Record<string, string> = {
  pendiente: "bg-amber-100 text-amber-700 border-amber-200",
  entregada: "bg-blue-100 text-blue-700 border-blue-200",
  calificada: "bg-green-100 text-green-700 border-green-200",
  vencida: "bg-red-100 text-red-700 border-red-200",
}

const estadoLabel: Record<string, string> = {
  pendiente: "Pendiente",
  entregada: "Entregada",
  calificada: "Calificada",
  vencida: "Vencida",
}

export default function AulaDetallePage() {
  const params = useParams()
  const { role } = useRole()
  const materia = materias.find((m) => m.id === params.id) || materias[0]
  const [nuevoPost, setNuevoPost] = useState("")

  return (
    <div className="p-4 lg:p-6">
      <Link href="/app/aulas" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="size-3.5" /> Volver a mis aulas
      </Link>

      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{materia.nombre}</h1>
          <p className="text-muted-foreground">{materia.docente} &middot; {materia.grado}</p>
        </div>
        {role === "docente" && (
          <Button size="sm">
            <Plus className="mr-1.5 size-3.5" /> Publicar
          </Button>
        )}
      </div>

      <Tabs defaultValue="muro" className="mt-6">
        <TabsList>
          <TabsTrigger value="muro">Muro</TabsTrigger>
          <TabsTrigger value="materiales">Materiales</TabsTrigger>
          <TabsTrigger value="tareas">Tareas</TabsTrigger>
          <TabsTrigger value="evaluaciones">Evaluaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="muro" className="mt-4 space-y-4">
          <Card>
            <CardContent className="p-4">
              <Textarea
                placeholder="Escribe un mensaje para el aula..."
                value={nuevoPost}
                onChange={(e) => setNuevoPost(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="mt-3 flex items-center justify-between">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Paperclip className="mr-1.5 size-3.5" /> Adjuntar
                </Button>
                <Button size="sm" disabled={!nuevoPost.trim()}>
                  <Send className="mr-1.5 size-3.5" /> Publicar
                </Button>
              </div>
            </CardContent>
          </Card>
          {muroEntries.map((entry) => (
            <Card key={entry.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">{entry.autor.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-foreground">{entry.autor}</span>
                      <span className="text-xs text-muted-foreground">{entry.fecha}</span>
                    </div>
                    <p className="mt-1 text-sm text-foreground/80">{entry.contenido}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <button className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                        <MessageSquare className="size-3" /> Comentar
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="materiales" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Materiales de estudio</CardTitle>
                {role === "docente" && (
                  <Button size="sm" variant="outline">
                    <Upload className="mr-1.5 size-3.5" /> Subir material
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border">
                {materiales.map((mat) => (
                  <div key={mat.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                        <FileText className="size-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{mat.nombre}</p>
                        <p className="text-xs text-muted-foreground">{mat.tipo} &middot; {mat.tamanio} &middot; {mat.fecha}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="size-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tareas" className="mt-4 space-y-3">
          {tareas.map((tarea) => (
            <Card key={tarea.id} className="transition-shadow hover:shadow-sm">
              <Link href={`/app/aulas/${params.id}/tarea/${tarea.id}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">{tarea.titulo}</h3>
                        <Badge variant="outline" className={`text-[10px] ${estadoBadge[tarea.estado]}`}>
                          {estadoLabel[tarea.estado]}
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">{tarea.materia}</p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="size-3" /> Entrega: {tarea.fechaEntrega}</span>
                        {tarea.nota !== undefined && (
                          <span className="flex items-center gap-1 font-medium text-green-600">Nota: {tarea.nota}/10</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="evaluaciones" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Evaluaciones</CardTitle>
              <CardDescription>Historial de evaluaciones y calificaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border">
                {[
                  { nombre: "Evaluacion parcial - Fracciones", fecha: "2026-03-15", nota: 8, estado: "calificada" },
                  { nombre: "Trabajo practico - Geometria", fecha: "2026-02-28", nota: 9, estado: "calificada" },
                  { nombre: "Evaluacion integradora - Unidad 1", fecha: "2026-04-05", nota: undefined, estado: "pendiente" },
                ].map((ev, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{ev.nombre}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="size-3" /> {ev.fecha}</p>
                    </div>
                    {ev.nota !== undefined ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">{ev.nota}</span>
                        <span className="text-xs text-muted-foreground">/10</span>
                      </div>
                    ) : (
                      <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200 text-[10px]">Proxima</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
