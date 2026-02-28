import Link from "next/link"
import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Calculator, Globe, FlaskConical, Dumbbell, Laptop } from "lucide-react"

const grados = ["1er Grado", "2do Grado", "3er Grado", "4to Grado", "5to Grado", "6to Grado"]

const areas = [
  { icon: Calculator, title: "Matematica", description: "Pensamiento logico, resolucion de problemas y geometria." },
  { icon: BookOpen, title: "Lengua y Literatura", description: "Lectura comprensiva, escritura creativa y oralidad." },
  { icon: FlaskConical, title: "Ciencias Naturales", description: "Experimentacion, metodo cientifico y educacion ambiental." },
  { icon: Globe, title: "Ciencias Sociales", description: "Historia, geografia y formacion ciudadana." },
  { icon: Laptop, title: "Tecnologia e Informatica", description: "Programacion, robotica y ciudadania digital." },
  { icon: Dumbbell, title: "Educacion Fisica", description: "Deporte, vida saludable y trabajo en equipo." },
]

export default function NivelPrimariaPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <section className="bg-primary/[0.04] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/15">Nivel Primaria</Badge>
            <h1 className="text-balance text-4xl font-bold text-foreground lg:text-5xl">
              Construyendo las bases del conocimiento
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              De 1er a 6to grado, formamos alumnos autonomos, criticos y comprometidos con su aprendizaje.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/inscripcion">Inscribir a mi hijo/a <ArrowRight className="ml-2 size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">Grados</h2>
          <p className="mt-1 text-muted-foreground">Turno manana: 7:50 a 12:30hs | Dos secciones por grado</p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {grados.map((g) => (
              <Card key={g} className="transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col items-center p-5 text-center">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                    {g.charAt(0)}
                  </div>
                  <span className="mt-2 text-sm font-medium text-foreground">{g}</span>
                  <span className="text-xs text-muted-foreground">Sec. A y B</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground">Areas Curriculares</h2>
            <p className="mt-2 text-muted-foreground">Formacion integral en todas las disciplinas</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <Card key={a.title} className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <a.icon className="size-5 text-primary" />
                  </div>
                  <h3 className="mt-3 font-semibold text-foreground">{a.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
