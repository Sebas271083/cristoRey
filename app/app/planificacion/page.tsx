"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, CheckCircle2, Circle, Clock, BookOpen, Target, Calendar } from "lucide-react"
import { toast } from "sonner"

const unidades = [
  {
    id: "1", nombre: "Numeros y operaciones", materia: "Matematica", grado: "3er Grado A",
    inicio: "2026-03-02", fin: "2026-04-15", avance: 65,
    temas: [
      { nombre: "Numeros naturales hasta 10.000", completado: true },
      { nombre: "Sumas y restas con reagrupacion", completado: true },
      { nombre: "Multiplicacion por una y dos cifras", completado: true },
      { nombre: "Division exacta e inexacta", completado: false },
      { nombre: "Fracciones: concepto y representacion", completado: false },
      { nombre: "Fracciones equivalentes", completado: false },
    ],
  },
  {
    id: "2", nombre: "Geometria y medida", materia: "Matematica", grado: "3er Grado A",
    inicio: "2026-04-16", fin: "2026-05-30", avance: 0,
    temas: [
      { nombre: "Figuras geometricas: clasificacion", completado: false },
      { nombre: "Perimetro de figuras", completado: false },
      { nombre: "Angulos: concepto y medicion", completado: false },
      { nombre: "Unidades de medida", completado: false },
    ],
  },
]

const planSemanal = [
  { dia: "Lunes", hora: "07:50 - 09:30", curso: "3er Grado A", tema: "Division exacta e inexacta", recursos: "Libro pag. 56-60, Fichas de ejercitacion" },
  { dia: "Lunes", hora: "09:50 - 11:30", curso: "4to Grado A", tema: "Multiplicacion por tres cifras", recursos: "Cuadernillo, Calculadora" },
  { dia: "Martes", hora: "07:50 - 09:30", curso: "3er Grado A", tema: "Problemas de division", recursos: "Guia de problemas, Material concreto" },
  { dia: "Miercoles", hora: "09:50 - 11:30", curso: "4to Grado A", tema: "Problemas de multiplicacion", recursos: "Guia de problemas" },
  { dia: "Jueves", hora: "07:50 - 09:30", curso: "3er Grado A", tema: "Repaso division", recursos: "Fichas de repaso" },
  { dia: "Viernes", hora: "07:50 - 09:30", curso: "3er Grado A", tema: "Evaluacion: Division", recursos: "Evaluacion impresa" },
]

export default function PlanificacionPage() {
  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Planificacion</h1>
          <p className="text-muted-foreground">Unidades didacticas y plan semanal</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm"><Plus className="mr-1.5 size-3.5" /> Nueva unidad</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader><SheetTitle>Nueva Unidad Didactica</SheetTitle></SheetHeader>
            <div className="mt-6 space-y-4">
              <div><Label>Nombre de la unidad</Label><Input className="mt-1.5" placeholder="Ej: Numeros y operaciones" /></div>
              <div><Label>Materia</Label><Input className="mt-1.5" placeholder="Ej: Matematica" /></div>
              <div><Label>Curso</Label><Input className="mt-1.5" placeholder="Ej: 3er Grado A" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Fecha inicio</Label><Input className="mt-1.5" type="date" /></div>
                <div><Label>Fecha fin</Label><Input className="mt-1.5" type="date" /></div>
              </div>
              <div><Label>Objetivos</Label><Textarea className="mt-1.5" placeholder="Describa los objetivos de aprendizaje..." /></div>
              <Button className="w-full" onClick={() => toast.success("Unidad creada")}>Crear unidad</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Tabs defaultValue="unidades" className="mt-6">
        <TabsList>
          <TabsTrigger value="unidades">Unidades Didacticas</TabsTrigger>
          <TabsTrigger value="semanal">Plan Semanal</TabsTrigger>
        </TabsList>

        <TabsContent value="unidades" className="mt-4 space-y-4">
          {unidades.map((u) => (
            <Card key={u.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{u.nombre}</CardTitle>
                    <CardDescription>{u.materia} &middot; {u.grado}</CardDescription>
                  </div>
                  <Badge variant="outline" className={u.avance > 0 ? "bg-blue-100 text-blue-700 border-blue-200 text-[10px]" : "text-[10px]"}>
                    {u.avance > 0 ? "En progreso" : "Proxima"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="size-3.5" /> {u.inicio} al {u.fin}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Progress value={u.avance} className="h-2 flex-1" />
                  <span className="text-sm font-medium text-foreground">{u.avance}%</span>
                </div>
                <div className="space-y-2">
                  {u.temas.map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      {t.completado ? (
                        <CheckCircle2 className="size-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle className="size-4 text-muted-foreground/40 flex-shrink-0" />
                      )}
                      <span className={t.completado ? "text-muted-foreground line-through" : "text-foreground"}>{t.nombre}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="semanal" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Semana del 2 al 6 de marzo</CardTitle>
              <CardDescription>Plan de clases semanal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {planSemanal.map((clase, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-lg border border-border p-3">
                    <div className="flex-shrink-0 text-center">
                      <p className="text-xs font-bold text-primary">{clase.dia}</p>
                      <p className="text-[10px] text-muted-foreground">{clase.hora}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{clase.tema}</p>
                      <p className="text-xs text-muted-foreground">{clase.curso}</p>
                      <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                        <BookOpen className="size-3" /> {clase.recursos}
                      </p>
                    </div>
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
