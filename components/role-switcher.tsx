"use client"

import { useRole } from "@/lib/role-context"
import { roleLabels, type Role } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users } from "lucide-react"

const roleIcons: Record<Role, string> = {
  alumno: "Alumno",
  padre: "Padre/Tutor",
  docente: "Docente",
  administrativo: "Admin",
  director: "Director",
}

export function RoleSwitcher() {
  const { role, setRole } = useRole()

  return (
    <div className="flex items-center gap-2">
      <div className="flex size-7 items-center justify-center rounded-md bg-primary/10">
        <Users className="size-3.5 text-primary" />
      </div>
      <Select value={role} onValueChange={(v) => setRole(v as Role)}>
        <SelectTrigger className="h-8 w-40 border-primary/20 bg-primary/5 text-xs font-medium">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(roleLabels) as Role[]).map((r) => (
            <SelectItem key={r} value={r} className="text-xs">
              {roleIcons[r]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
