"use client"

import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { RoleSwitcher } from "@/components/role-switcher"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Bell, Search, LogOut, Settings, User } from "lucide-react"
import { useRole } from "@/lib/role-context"
import { roleLabels } from "@/lib/mock-data"
import Link from "next/link"

const mockNotifications = [
  { id: "1", title: "Nueva tarea asignada", description: "Matematica - Fracciones", time: "Hace 5 min", unread: true },
  { id: "2", title: "Mensaje de Ana Gutierrez", description: "Recordatorio evaluacion...", time: "Hace 1 hora", unread: true },
  { id: "3", title: "Pago registrado", description: "Cuota Febrero confirmada", time: "Hace 3 horas", unread: false },
]

export function AppTopbar() {
  const { role } = useRole()
  const [searchOpen, setSearchOpen] = useState(false)
  const unread = mockNotifications.filter((n) => n.unread).length

  return (
    <header className="flex h-14 items-center gap-3 border-b border-border bg-card px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-5" />

      <div className="hidden flex-1 md:block">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar alumnos, materias, documentos..." className="h-9 pl-9 text-sm" />
        </div>
      </div>
      <Button variant="ghost" size="icon" className="size-8 md:hidden" onClick={() => setSearchOpen(!searchOpen)}>
        <Search className="size-4" />
      </Button>

      <div className="ml-auto flex items-center gap-2">
        <RoleSwitcher />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative size-8">
              <Bell className="size-4" />
              {unread > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-primary-foreground">
                  {unread}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b border-border p-3">
              <h4 className="text-sm font-semibold text-foreground">Notificaciones</h4>
              <Badge variant="secondary" className="text-xs">{unread} nuevas</Badge>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {mockNotifications.map((n) => (
                <div key={n.id} className={`flex gap-3 border-b border-border p-3 last:border-0 ${n.unread ? "bg-primary/5" : ""}`}>
                  <div className={`mt-1 size-2 shrink-0 rounded-full ${n.unread ? "bg-primary" : "bg-transparent"}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.description}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex h-8 items-center gap-2 px-2">
              <Avatar className="size-7">
                <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                  {role === "alumno" ? "ML" : role === "padre" ? "JL" : role === "docente" ? "AG" : role === "administrativo" ? "SR" : "DG"}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium text-foreground lg:block">
                {role === "alumno" ? "Martina Lopez" : role === "padre" ? "Jorge Lopez" : role === "docente" ? "Ana Gutierrez" : role === "administrativo" ? "Sandra Ruiz" : "Diana Gonzalez"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5">
              <p className="text-xs text-muted-foreground">{roleLabels[role]}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem><User className="mr-2 size-4" /> Mi Perfil</DropdownMenuItem>
            <DropdownMenuItem><Settings className="mr-2 size-4" /> Configuracion</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login"><LogOut className="mr-2 size-4" /> Cerrar Sesion</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
