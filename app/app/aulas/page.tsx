"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRole } from "@/lib/role-context"
import { materias } from "@/lib/mock-data"
import { ArrowRight } from "lucide-react"

const colorMap: Record<string, string> = {
  "bg-chart-1": "bg-chart-1/15 text-chart-1",
  "bg-chart-2": "bg-chart-2/15 text-chart-2",
  "bg-chart-3": "bg-chart-3/15 text-chart-3",
  "bg-chart-4": "bg-chart-4/15 text-chart-4",
  "bg-chart-5": "bg-chart-5/15 text-chart-5",
}

export default function AulasPage() {
  const { role } = useRole()

  return (
    <div className="p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{role === "docente" ? "Mis Cursos" : "Mis Aulas"}</h1>
        <p className="text-muted-foreground">
          {role === "docente" ? "Gestiona tus cursos y materias" : "Accede a tus materias y aulas virtuales"}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {materias.map((m) => (
          <Card key={m.id} className="group overflow-hidden transition-shadow hover:shadow-md">
            <Link href={`/app/aulas/${m.id}`}>
              <div className={`h-2 ${m.color}`} />
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{m.nombre}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{m.docente}</p>
                    <p className="text-xs text-muted-foreground">{m.grado}</p>
                  </div>
                  <Badge variant="outline" className={`text-[10px] ${colorMap[m.color] || ""}`}>
                    {role === "docente" ? "25 alumnos" : "En curso"}
                  </Badge>
                </div>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  {role === "docente" ? "Gestionar aula" : "Ingresar al aula"} <ArrowRight className="ml-1 size-3" />
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
