"use client"

import { useState } from "react"
import { alumnos } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, GraduationCap, Save } from "lucide-react"
import { toast } from "sonner"

const evaluacionesCreadas = [
  { id: "1", nombre: "Evaluacion parcial - Fracciones", curso: "3er Grado A", fecha: "2026-03-15", estado: "proxima", promedio: null },
  { id: "2", nombre: "Trabajo practico - Geometria", curso: "3er Grado A", fecha: "2026-02-28", estado: "calificada", promedio: 7.8 },
  { id: "3", nombre: "Evaluacion Unidad 1", curso: "4to Grado A", fecha: "2026-02-20", estado: "calificada", promedio: 8.2 },
]

export default function EvaluacionesPage() {
  const [notas, setNotas] = useState<Record<string, string>>(
    Object.fromEntries(alumnos.slice(0, 8).map((a) => [a.id, ""]))
  )

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Evaluaciones</h1>
          <p className="text-muted-foreground">Crear y registrar calificaciones</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm"><Plus className="mr-1.5 size-3.5" /> Nueva evaluacion</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader><SheetTitle>Nueva Evaluacion</SheetTitle></SheetHeader>
            <div className="mt-6 space-y-4">
              <div><Label>Nombre</Label><Input className="mt-1.5" placeholder="Ej: Evaluacion parcial" /></div>
              <div><Label>Curso</Label><Input className="mt-1.5" placeholder="Ej: 3er Grado A" /></div>
              <div><Label>Fecha</Label><Input className="mt-1.5" type="date" /></div>
              <div><Label>Descripcion</Label><Input className="mt-1.5" placeholder="Temas a evaluar..." /></div>
              <Button className="w-full" onClick={() => toast.success("Evaluacion creada")}>Crear evaluacion</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Tabs defaultValue="listado" className="mt-6">
        <TabsList>
          <TabsTrigger value="listado">Mis evaluaciones</TabsTrigger>
          <TabsTrigger value="calificar">Registrar notas</TabsTrigger>
        </TabsList>

        <TabsContent value="listado" className="mt-4 space-y-3">
          {evaluacionesCreadas.map((ev) => (
            <Card key={ev.id} className="transition-shadow hover:shadow-sm">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <GraduationCap className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{ev.nombre}</h3>
                    <p className="text-sm text-muted-foreground">{ev.curso} &middot; {ev.fecha}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {ev.promedio !== null && (
                    <span className="text-sm font-medium text-foreground">Promedio: {ev.promedio}</span>
                  )}
                  <Badge variant="outline" className={`text-[10px] ${ev.estado === "calificada" ? "bg-green-100 text-green-700 border-green-200" : "bg-amber-100 text-amber-700 border-amber-200"}`}>
                    {ev.estado === "calificada" ? "Calificada" : "Proxima"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="calificar" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Registrar notas - Evaluacion parcial Fracciones</CardTitle>
                  <CardDescription>3er Grado A &middot; 15 de marzo 2026</CardDescription>
                </div>
                <Button size="sm" onClick={() => toast.success("Notas guardadas correctamente")}>
                  <Save className="mr-1.5 size-3.5" /> Guardar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alumno</TableHead>
                    <TableHead>Grado</TableHead>
                    <TableHead className="w-[120px]">Nota (1-10)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alumnos.slice(0, 8).map((alumno) => (
                    <TableRow key={alumno.id}>
                      <TableCell className="font-medium">{alumno.nombre} {alumno.apellido}</TableCell>
                      <TableCell className="text-muted-foreground">{alumno.grado}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          value={notas[alumno.id]}
                          onChange={(e) => setNotas((p) => ({ ...p, [alumno.id]: e.target.value }))}
                          className="w-[80px]"
                          placeholder="-"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
