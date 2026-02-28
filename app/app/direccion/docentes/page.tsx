"use client"

import { docentes } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserCheck, BookOpen, FileText, CheckCircle2 } from "lucide-react"

const seguimiento = docentes.map((d, i) => ({
  ...d,
  clasesRegistradas: [18, 16, 20, 14, 19][i],
  clasesTotales: 20,
  planificacionAvance: [85, 70, 95, 60, 90][i],
  observaciones: [
    "Excelente registro y planificacion al dia",
    "Mejorar regularidad en registro de clases",
    "Planificacion completa, muy buen seguimiento",
    "Necesita actualizar plan de 4to Grado B",
    "Excelente desempeno con ambos grupos",
  ][i],
}))

export default function DocenDirectionPage() {
  return (
    <div className="p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Seguimiento Docente</h1>
        <p className="text-muted-foreground">Cumplimiento de planificacion y registro de clases</p>
      </div>

      <div className="mt-6 space-y-4">
        {seguimiento.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex items-center gap-3 sm:w-48 flex-shrink-0">
                  <Avatar className="size-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">{doc.nombre[0]}{doc.apellido[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{doc.nombre} {doc.apellido}</p>
                    <p className="text-sm text-muted-foreground">{doc.materia}</p>
                  </div>
                </div>

                <div className="flex-1 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><FileText className="size-3" /> Clases registradas</p>
                    <p className="text-sm font-medium text-foreground">{doc.clasesRegistradas}/{doc.clasesTotales}</p>
                    <Progress value={(doc.clasesRegistradas / doc.clasesTotales) * 100} className="mt-1.5 h-1.5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><BookOpen className="size-3" /> Planificacion</p>
                    <p className="text-sm font-medium text-foreground">{doc.planificacionAvance}%</p>
                    <Progress value={doc.planificacionAvance} className="mt-1.5 h-1.5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><UserCheck className="size-3" /> Cursos</p>
                    <div className="flex flex-wrap gap-1">
                      {doc.cursos.map((c, i) => (
                        <Badge key={i} variant="outline" className="text-[10px]">{c}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="sm:w-48 flex-shrink-0">
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${
                      doc.planificacionAvance >= 80
                        ? "bg-green-100 text-green-700 border-green-200"
                        : doc.planificacionAvance >= 60
                        ? "bg-amber-100 text-amber-700 border-amber-200"
                        : "bg-red-100 text-red-700 border-red-200"
                    }`}
                  >
                    {doc.planificacionAvance >= 80 ? "Al dia" : doc.planificacionAvance >= 60 ? "Atencion" : "Atrasado"}
                  </Badge>
                  <p className="mt-1 text-xs text-muted-foreground">{doc.observaciones}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
