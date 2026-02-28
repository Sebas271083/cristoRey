"use client"

import { useState } from "react"
import { alumnos } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Plus, Edit2, Trash2 } from "lucide-react"
import { toast } from "sonner"

export default function AlumnosAdminPage() {
  const [search, setSearch] = useState("")
  const [filtroNivel, setFiltroNivel] = useState("todos")
  const filtered = alumnos
    .filter((a) => filtroNivel === "todos" || a.nivel === filtroNivel)
    .filter((a) => `${a.nombre} ${a.apellido}`.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestion de Alumnos</h1>
          <p className="text-muted-foreground">{alumnos.length} alumnos registrados</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm"><Plus className="mr-1.5 size-3.5" /> Nuevo alumno</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader><SheetTitle>Nuevo Alumno</SheetTitle></SheetHeader>
            <div className="mt-6 space-y-4">
              <div><Label>Nombre</Label><Input className="mt-1.5" placeholder="Nombre" /></div>
              <div><Label>Apellido</Label><Input className="mt-1.5" placeholder="Apellido" /></div>
              <div>
                <Label>Nivel</Label>
                <Select>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inicial">Inicial</SelectItem>
                    <SelectItem value="primaria">Primaria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Grado</Label><Input className="mt-1.5" placeholder="Ej: 3er Grado" /></div>
              <div><Label>Seccion</Label><Input className="mt-1.5" placeholder="Ej: A" /></div>
              <Button className="w-full" onClick={() => toast.success("Alumno registrado")}>Registrar alumno</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar alumno..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <Select value={filtroNivel} onValueChange={setFiltroNivel}>
              <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="inicial">Inicial</SelectItem>
                <SelectItem value="primaria">Primaria</SelectItem>
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
                <TableHead>Nivel</TableHead>
                <TableHead>Grado</TableHead>
                <TableHead>Seccion</TableHead>
                <TableHead className="text-center">Asistencia</TableHead>
                <TableHead className="text-center">Promedio</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((alumno) => (
                <TableRow key={alumno.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-7">
                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary">{alumno.nombre[0]}{alumno.apellido[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{alumno.nombre} {alumno.apellido}</span>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline" className="capitalize text-[10px]">{alumno.nivel}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{alumno.grado}</TableCell>
                  <TableCell className="text-muted-foreground">{alumno.seccion}</TableCell>
                  <TableCell className="text-center">
                    <span className={`font-medium ${alumno.asistencia >= 90 ? "text-green-600" : alumno.asistencia >= 80 ? "text-amber-600" : "text-red-600"}`}>
                      {alumno.asistencia}%
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-medium">{alumno.promedio}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm"><Edit2 className="size-3.5" /></Button>
                      <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="size-3.5" /></Button>
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
