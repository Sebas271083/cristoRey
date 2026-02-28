"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Plus, FileText, Calendar, BookOpen } from "lucide-react"
import { toast } from "sonner"

const registros = [
  {
    id: "1", fecha: "2026-02-28", curso: "3er Grado A", materia: "Matematica",
    tema: "Multiplicacion por dos cifras",
    observaciones: "Los alumnos trabajaron bien con material concreto. Algunos necesitan refuerzo en las tablas del 7 y 8.",
    asistentes: 23, ausentes: 2,
  },
  {
    id: "2", fecha: "2026-02-27", curso: "4to Grado A", materia: "Matematica",
    tema: "Problemas de multiplicacion",
    observaciones: "Se realizaron ejercicios grupales. Buena participacion. Se asigno tarea para refuerzo individual.",
    asistentes: 24, ausentes: 1,
  },
  {
    id: "3", fecha: "2026-02-26", curso: "3er Grado A", materia: "Matematica",
    tema: "Introduccion a la multiplicacion de dos cifras",
    observaciones: "Clase introductoria con ejemplos de la vida cotidiana. Los alumnos mostraron interes.",
    asistentes: 25, ausentes: 0,
  },
  {
    id: "4", fecha: "2026-02-25", curso: "3er Grado A", materia: "Matematica",
    tema: "Repaso de tablas de multiplicar",
    observaciones: "Se realizo un juego de repaso. Algunos alumnos necesitan practicar mas las tablas del 6 al 9.",
    asistentes: 22, ausentes: 3,
  },
]

export default function RegistroClasePage() {
  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Registro de Clase</h1>
          <p className="text-muted-foreground">Bitacora diaria de clases</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm"><Plus className="mr-1.5 size-3.5" /> Nuevo registro</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader><SheetTitle>Nuevo Registro de Clase</SheetTitle></SheetHeader>
            <div className="mt-6 space-y-4">
              <div><Label>Fecha</Label><Input className="mt-1.5" type="date" defaultValue="2026-02-28" /></div>
              <div>
                <Label>Curso</Label>
                <Select>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Seleccionar curso" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3a">3er Grado A</SelectItem>
                    <SelectItem value="4a">4to Grado A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Tema desarrollado</Label><Input className="mt-1.5" placeholder="Tema de la clase" /></div>
              <div><Label>Observaciones</Label><Textarea className="mt-1.5 min-h-[120px]" placeholder="Observaciones sobre la clase, participacion, dificultades..." /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Presentes</Label><Input className="mt-1.5" type="number" placeholder="0" /></div>
                <div><Label>Ausentes</Label><Input className="mt-1.5" type="number" placeholder="0" /></div>
              </div>
              <Button className="w-full" onClick={() => toast.success("Registro guardado")}>Guardar registro</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-6 space-y-4">
        {registros.map((reg) => (
          <Card key={reg.id}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="size-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-foreground">{reg.tema}</h3>
                    <Badge variant="outline" className="text-[10px]">{reg.curso}</Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="size-3" /> {reg.fecha}</span>
                    <span className="flex items-center gap-1"><BookOpen className="size-3" /> {reg.materia}</span>
                    <span>Presentes: {reg.asistentes} | Ausentes: {reg.ausentes}</span>
                  </div>
                  <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{reg.observaciones}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
