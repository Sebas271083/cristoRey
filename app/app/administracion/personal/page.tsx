"use client"

import { useState } from "react"
import { docentes } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Plus, Edit2, Trash2 } from "lucide-react"
import { toast } from "sonner"

const personal = [
  ...docentes.map((d) => ({ ...d, cargo: "Docente", estado: "activo" as const })),
  { id: "6", nombre: "Patricia", apellido: "Gomez", materia: "Secretaria", cursos: [], cargo: "Administrativo", estado: "activo" as const },
  { id: "7", nombre: "Jorge", apellido: "Villalba", materia: "Mantenimiento", cursos: [], cargo: "No docente", estado: "activo" as const },
  { id: "8", nombre: "Susana", apellido: "Morales", materia: "Biblioteca", cursos: [], cargo: "No docente", estado: "licencia" as const },
]

export default function PersonalAdminPage() {
  const [search, setSearch] = useState("")
  const filtered = personal.filter((p) => `${p.nombre} ${p.apellido}`.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestion de Personal</h1>
          <p className="text-muted-foreground">{personal.length} personas registradas</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm"><Plus className="mr-1.5 size-3.5" /> Nuevo personal</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader><SheetTitle>Nuevo Personal</SheetTitle></SheetHeader>
            <div className="mt-6 space-y-4">
              <div><Label>Nombre</Label><Input className="mt-1.5" placeholder="Nombre" /></div>
              <div><Label>Apellido</Label><Input className="mt-1.5" placeholder="Apellido" /></div>
              <div><Label>Cargo</Label><Input className="mt-1.5" placeholder="Ej: Docente, Administrativo" /></div>
              <div><Label>Area / Materia</Label><Input className="mt-1.5" placeholder="Ej: Matematica" /></div>
              <div><Label>Email</Label><Input className="mt-1.5" type="email" placeholder="correo@ejemplo.com" /></div>
              <Button className="w-full" onClick={() => toast.success("Personal registrado")}>Registrar</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Buscar personal..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Cursos</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-7">
                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary">{p.nombre[0]}{p.apellido[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{p.nombre} {p.apellido}</span>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="outline" className="text-[10px]">{p.cargo}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{p.materia}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{p.cursos.length > 0 ? p.cursos.join(", ") : "-"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] ${p.estado === "activo" ? "bg-green-100 text-green-700 border-green-200" : "bg-amber-100 text-amber-700 border-amber-200"}`}>
                      {p.estado === "activo" ? "Activo" : "Licencia"}
                    </Badge>
                  </TableCell>
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
