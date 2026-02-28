"use client"

import { useState } from "react"
import { asistenciaMensual, alumnos } from "@/lib/mock-data"
import { useRole } from "@/lib/role-context"
import { CardStat } from "@/components/card-stat"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, XCircle, Clock, AlertTriangle, UserCheck, Calendar } from "lucide-react"
import { toast } from "sonner"

const estadoConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  presente: { label: "Presente", color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle2 },
  ausente: { label: "Ausente", color: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
  tarde: { label: "Tarde", color: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
  justificado: { label: "Justificado", color: "bg-blue-100 text-blue-700 border-blue-200", icon: AlertTriangle },
}

export default function AsistenciaPage() {
  const { role } = useRole()
  const presentes = asistenciaMensual.filter((a) => a.estado === "presente").length
  const ausentes = asistenciaMensual.filter((a) => a.estado === "ausente").length
  const tardes = asistenciaMensual.filter((a) => a.estado === "tarde").length
  const porcentaje = Math.round((presentes / asistenciaMensual.length) * 100)

  const [asistenciaDocente, setAsistenciaDocente] = useState<Record<string, string>>(
    Object.fromEntries(alumnos.slice(0, 8).map((a) => [a.id, "presente"]))
  )

  if (role === "docente") {
    return (
      <div className="p-4 lg:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Asistencia del Curso</h1>
            <p className="text-muted-foreground">3er Grado A &middot; Hoy, 28 de febrero de 2026</p>
          </div>
          <Button size="sm" onClick={() => toast.success("Asistencia guardada correctamente")}>
            <UserCheck className="mr-1.5 size-3.5" /> Guardar asistencia
          </Button>
        </div>

        <Card className="mt-6">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alumno</TableHead>
                  <TableHead>Grado</TableHead>
                  <TableHead>Asistencia</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alumnos.slice(0, 8).map((alumno) => (
                  <TableRow key={alumno.id}>
                    <TableCell className="font-medium">{alumno.nombre} {alumno.apellido}</TableCell>
                    <TableCell className="text-muted-foreground">{alumno.grado} {alumno.seccion}</TableCell>
                    <TableCell>
                      <Select
                        value={asistenciaDocente[alumno.id]}
                        onValueChange={(val) => setAsistenciaDocente((p) => ({ ...p, [alumno.id]: val }))}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="presente">Presente</SelectItem>
                          <SelectItem value="ausente">Ausente</SelectItem>
                          <SelectItem value="tarde">Tarde</SelectItem>
                          <SelectItem value="justificado">Justificado</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Asistencia</h1>
        <p className="text-muted-foreground">
          {role === "padre" ? "Registro de asistencia de tu hijo/a" : "Tu registro de asistencia"}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <CardStat title="Asistencia" value={`${porcentaje}%`} icon={UserCheck} description="Total del mes" trend="up" />
        <CardStat title="Presentes" value={presentes.toString()} icon={CheckCircle2} description="Dias" />
        <CardStat title="Ausencias" value={ausentes.toString()} icon={XCircle} description="Dias" />
        <CardStat title="Tardanzas" value={tardes.toString()} icon={Clock} description="Dias" />
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Registro mensual</CardTitle>
          <CardDescription>Febrero 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {asistenciaMensual.map((dia) => {
              const config = estadoConfig[dia.estado]
              const Icon = config.icon
              const dateNum = new Date(dia.fecha).getDate()
              return (
                <div
                  key={dia.fecha}
                  className={`flex flex-col items-center gap-1 rounded-lg border p-2 ${config.color} border-current/10`}
                  title={`${dia.fecha}: ${config.label}`}
                >
                  <span className="text-xs font-medium">{dateNum}</span>
                  <Icon className="size-3.5" />
                </div>
              )
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-xs">
            {Object.entries(estadoConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className={`size-3 rounded-sm ${config.color.split(" ")[0]}`} />
                <span className="text-muted-foreground">{config.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
