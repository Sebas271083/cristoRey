"use client"

import { useState } from "react"
import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"

const steps = [
  { id: 1, title: "Datos del Alumno", description: "Informacion basica del postulante" },
  { id: 2, title: "Datos del Responsable", description: "Informacion del padre, madre o tutor" },
  { id: 3, title: "Nivel y Grado", description: "Seleccionar el nivel deseado" },
  { id: 4, title: "Confirmacion", description: "Revisar y enviar la solicitud" },
]

export default function InscripcionPage() {
  const [step, setStep] = useState(1)
  const [completed, setCompleted] = useState(false)

  const handleSubmit = () => {
    setCompleted(true)
    toast.success("Preinscripcion enviada correctamente")
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-background">
        <PublicHeader />
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <Card className="max-w-md text-center">
            <CardContent className="p-10">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent/10">
                <CheckCircle className="size-8 text-accent" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-foreground">Solicitud Enviada</h2>
              <p className="mt-2 text-muted-foreground">
                Su preinscripcion fue recibida correctamente. Nos comunicaremos a la brevedad para continuar el proceso.
              </p>
              <p className="mt-4 text-sm font-medium text-primary">Numero de solicitud: #2026-0087</p>
            </CardContent>
          </Card>
        </div>
        <PublicFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground">Preinscripcion 2026</h1>
          <p className="mt-2 text-muted-foreground">Complete el formulario para iniciar el proceso de inscripcion</p>

          {/* Stepper */}
          <div className="mt-8 flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s.id} className="flex flex-1 items-center">
                <div className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${step > s.id ? "bg-accent text-accent-foreground" : step === s.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {step > s.id ? <CheckCircle className="size-4" /> : s.id}
                </div>
                {i < steps.length - 1 && <div className={`mx-2 h-0.5 flex-1 rounded ${step > s.id ? "bg-accent" : "bg-border"}`} />}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between">
            {steps.map((s) => (
              <span key={s.id} className={`hidden text-[10px] sm:block ${step === s.id ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                {s.title}
              </span>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{steps[step - 1].title}</CardTitle>
              <CardDescription>{steps[step - 1].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {step === 1 && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input id="nombre" placeholder="Nombre del alumno" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apellido">Apellido</Label>
                      <Input id="apellido" placeholder="Apellido del alumno" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="dni">DNI</Label>
                      <Input id="dni" placeholder="12345678" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fechaNac">Fecha de Nacimiento</Label>
                      <Input id="fechaNac" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coleAnterior">Colegio de procedencia (opcional)</Label>
                    <Input id="coleAnterior" placeholder="Nombre del colegio anterior" />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nombreResp">Nombre del Responsable</Label>
                      <Input id="nombreResp" placeholder="Nombre completo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vinculo">Vinculo</Label>
                      <Select>
                        <SelectTrigger id="vinculo"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="padre">Padre</SelectItem>
                          <SelectItem value="madre">Madre</SelectItem>
                          <SelectItem value="tutor">Tutor/a</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="email@ejemplo.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono">Telefono</Label>
                      <Input id="telefono" placeholder="(011) 1234-5678" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="direccion">Domicilio</Label>
                    <Input id="direccion" placeholder="Direccion completa" />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="space-y-2">
                    <Label>Nivel</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Seleccionar nivel" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inicial">Nivel Inicial</SelectItem>
                        <SelectItem value="primaria">Nivel Primaria</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Grado / Sala</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Seleccionar grado o sala" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sala3">Sala de 3 anos</SelectItem>
                        <SelectItem value="sala4">Sala de 4 anos</SelectItem>
                        <SelectItem value="sala5">Sala de 5 anos</SelectItem>
                        <SelectItem value="1">1er Grado</SelectItem>
                        <SelectItem value="2">2do Grado</SelectItem>
                        <SelectItem value="3">3er Grado</SelectItem>
                        <SelectItem value="4">4to Grado</SelectItem>
                        <SelectItem value="5">5to Grado</SelectItem>
                        <SelectItem value="6">6to Grado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="observaciones">Observaciones (opcional)</Label>
                    <Textarea id="observaciones" placeholder="Informacion adicional relevante..." rows={4} />
                  </div>
                </>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <p className="text-sm text-muted-foreground">
                      Revise que todos los datos ingresados sean correctos antes de enviar. Recibiremos su solicitud y nos pondremos en contacto para coordinar la entrevista y la documentacion necesaria.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Checkbox id="acepto" className="mt-1" />
                    <Label htmlFor="acepto" className="text-sm leading-relaxed text-muted-foreground">
                      Declaro que los datos ingresados son correctos y autorizo al Colegio Cristo Rey a contactarme para continuar el proceso de inscripcion.
                    </Label>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                <Button variant="outline" onClick={() => setStep((s) => s - 1)} disabled={step === 1}>
                  <ChevronLeft className="mr-1 size-4" /> Anterior
                </Button>
                {step < 4 ? (
                  <Button onClick={() => setStep((s) => s + 1)}>
                    Siguiente <ChevronRight className="ml-1 size-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit}>Enviar Preinscripcion</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
