"use client"

import { alumnos, docentes } from "@/lib/mock-data"
import { CardStat } from "@/components/card-stat"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Users, UserCheck, Download } from "lucide-react"

const alumnosConFaltas = [
  { nombre: "Isabella Sanchez", grado: "4to Grado A", faltas: 8, tardanzas: 3, justificadas: 2 },
  { nombre: "Santiago Garcia", grado: "3er Grado A", faltas: 6, tardanzas: 5, justificadas: 1 },
  { nombre: "Tomas Alvarez", grado: "1er Grado B", faltas: 5, tardanzas: 2, justificadas: 3 },
  { nombre: "Emilia Fernandez", grado: "5to Grado B", faltas: 4, tardanzas: 1, justificadas: 2 },
]

const personalAusente = [
  { nombre: "Susana Morales", cargo: "Bibliotecaria", motivo: "Licencia medica", desde: "2026-02-15", hasta: "2026-03-15" },
  { nombre: "Carlos Mendez", cargo: "Docente - Lengua", motivo: "Dia personal", desde: "2026-02-28", hasta: "2026-02-28" },
]

export default function AusentismoPage() {
  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ausentismo</h1>
          <p className="text-muted-foreground">Reportes de inasistencias de alumnos y personal</p>
        </div>
        <Button size="sm" variant="outline"><Download className="mr-1.5 size-3.5" /> Exportar reporte</Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <CardStat title="Ausentismo alumnos" value="4.2%" icon={AlertTriangle} description="Promedio del mes" />
        <CardStat title="Alumnos en riesgo" value="4" icon={Users} description="Mas de 4 faltas" trend="down" />
        <CardStat title="Personal ausente hoy" value="2" icon={UserCheck} description="De 28 totales" />
      </div>

      <Tabs defaultValue="alumnos" className="mt-6">
        <TabsList>
          <TabsTrigger value="alumnos">Alumnos</TabsTrigger>
          <TabsTrigger value="personal">Personal</TabsTrigger>
        </TabsList>

        <TabsContent value="alumnos" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Alumnos con mayor ausentismo</CardTitle>
              <CardDescription>Febrero 2026 - Alumnos con 4 o mas faltas</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alumno</TableHead>
                    <TableHead>Grado</TableHead>
                    <TableHead className="text-center">Faltas</TableHead>
                    <TableHead className="text-center">Tardanzas</TableHead>
                    <TableHead className="text-center">Justificadas</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alumnosConFaltas.map((a, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{a.nombre}</TableCell>
                      <TableCell className="text-muted-foreground">{a.grado}</TableCell>
                      <TableCell className="text-center font-medium text-red-600">{a.faltas}</TableCell>
                      <TableCell className="text-center text-amber-600">{a.tardanzas}</TableCell>
                      <TableCell className="text-center text-blue-600">{a.justificadas}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[10px] ${a.faltas >= 6 ? "bg-red-100 text-red-700 border-red-200" : "bg-amber-100 text-amber-700 border-amber-200"}`}>
                          {a.faltas >= 6 ? "Critico" : "Atencion"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personal" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal ausente</CardTitle>
              <CardDescription>Licencias y ausencias actuales</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Desde</TableHead>
                    <TableHead>Hasta</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {personalAusente.map((p, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{p.nombre}</TableCell>
                      <TableCell className="text-muted-foreground">{p.cargo}</TableCell>
                      <TableCell className="text-muted-foreground">{p.motivo}</TableCell>
                      <TableCell className="text-muted-foreground">{p.desde}</TableCell>
                      <TableCell className="text-muted-foreground">{p.hasta}</TableCell>
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
