"use client"

import { useState } from "react"
import { inscripciones } from "@/lib/mock-data"
import { CardStat } from "@/components/card-stat"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ClipboardList, CheckCircle2, Clock, XCircle, FileText, Eye } from "lucide-react"
import { toast } from "sonner"

const estadoConfig: Record<string, { label: string; className: string }> = {
  pendiente: { label: "Pendiente", className: "bg-amber-100 text-amber-700 border-amber-200" },
  aprobada: { label: "Aprobada", className: "bg-green-100 text-green-700 border-green-200" },
  rechazada: { label: "Rechazada", className: "bg-red-100 text-red-700 border-red-200" },
  documentacion: { label: "Doc. pendiente", className: "bg-blue-100 text-blue-700 border-blue-200" },
}

export default function InscripcionesAdminPage() {
  const [search, setSearch] = useState("")
  const [filtro, setFiltro] = useState("todos")
  const filtered = inscripciones
    .filter((i) => filtro === "todos" || i.estado === filtro)
    .filter((i) => i.alumno.toLowerCase().includes(search.toLowerCase()))

  const pendientes = inscripciones.filter((i) => i.estado === "pendiente").length
  const aprobadas = inscripciones.filter((i) => i.estado === "aprobada").length

  return (
    <div className="p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Inscripciones</h1>
        <p className="text-muted-foreground">Gestion de inscripciones y preinscripciones</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <CardStat title="Total" value={inscripciones.length.toString()} icon={ClipboardList} description="Inscripciones" />
        <CardStat title="Pendientes" value={pendientes.toString()} icon={Clock} description="Por revisar" />
        <CardStat title="Aprobadas" value={aprobadas.toString()} icon={CheckCircle2} description="Confirmadas" />
      </div>

      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar por alumno..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <Select value={filtro} onValueChange={setFiltro}>
              <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pendiente">Pendientes</SelectItem>
                <SelectItem value="aprobada">Aprobadas</SelectItem>
                <SelectItem value="documentacion">Doc. pendiente</SelectItem>
                <SelectItem value="rechazada">Rechazadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alumno</TableHead>
                <TableHead>Padre/Tutor</TableHead>
                <TableHead>Nivel</TableHead>
                <TableHead>Grado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((insc) => (
                <TableRow key={insc.id}>
                  <TableCell className="font-medium">{insc.alumno}</TableCell>
                  <TableCell className="text-muted-foreground">{insc.padre}</TableCell>
                  <TableCell className="text-muted-foreground capitalize">{insc.nivel}</TableCell>
                  <TableCell className="text-muted-foreground">{insc.grado}</TableCell>
                  <TableCell className="text-muted-foreground">{insc.fecha}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] ${estadoConfig[insc.estado].className}`}>
                      {estadoConfig[insc.estado].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm"><Eye className="size-3.5" /></Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>Detalle de inscripcion</DialogTitle></DialogHeader>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between"><span className="text-muted-foreground">Alumno</span><span className="font-medium">{insc.alumno}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Padre/Tutor</span><span className="font-medium">{insc.padre}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Nivel</span><span className="font-medium capitalize">{insc.nivel}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Grado</span><span className="font-medium">{insc.grado}</span></div>
                            <div className="flex gap-2 pt-3">
                              <Button size="sm" className="flex-1" onClick={() => toast.success("Inscripcion aprobada")}>Aprobar</Button>
                              <Button size="sm" variant="outline" className="flex-1">Solicitar documentacion</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
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
