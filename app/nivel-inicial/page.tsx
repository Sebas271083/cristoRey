import Link from "next/link";
import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Heart,
  Puzzle,
  Music,
  Palette,
  Sun,
  TreePine,
} from "lucide-react";

const salas = [
  {
    nombre: "Sala de 3 anos",
    horario: "8:00 a 12:00",
    capacidad: "20 alumnos",
    docentes: "2 docentes + auxiliar",
  },
  {
    nombre: "Sala de 4 anos",
    horario: "8:00 a 12:30",
    capacidad: "22 alumnos",
    docentes: "2 docentes + auxiliar",
  },
  {
    nombre: "Sala de 5 anos",
    horario: "7:50 a 12:30",
    capacidad: "25 alumnos",
    docentes: "2 docentes",
  },
];

const areas = [
  {
    icon: Puzzle,
    title: "Juego y Exploracion",
    description:
      "Aprendizaje significativo a traves del juego dirigido y libre.",
  },
  {
    icon: Music,
    title: "Expresion Musical",
    description: "Desarrollo del oido musical, ritmo y canto grupal.",
  },
  {
    icon: Palette,
    title: "Artes Plasticas",
    description:
      "Estimulacion de la creatividad con diversas tecnicas y materiales.",
  },
  {
    icon: Sun,
    title: "Educacion Emocional",
    description: "Reconocimiento y gestion de emociones desde temprana edad.",
  },
  {
    icon: TreePine,
    title: "Contacto con la Naturaleza",
    description: "Huerta, salidas al aire libre y educacion ambiental.",
  },
  {
    icon: Heart,
    title: "Convivencia",
    description:
      "Valores, respeto y trabajo en equipo como ejes transversales.",
  },
];

export default function NivelInicialPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <section className="relative overflow-hidden py-16 lg:py-24">
        {/* Imagen */}
        <div className="absolute inset-0">
          <img
            src="/galeria/nievelInicial.png"
            alt="Nivel Inicial"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay que mejora la lectura */}
        <div className="absolute inset-0 bg-white/85"></div>

        {/* Contenido */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-chart-3/10 text-chart-3 hover:bg-chart-3/15">
              Nivel Inicial
            </Badge>

            <h1 className="text-balance text-4xl font-bold text-foreground lg:text-5xl">
              Donde comienza la aventura de aprender
            </h1>

            <p className="mt-4 text-lg text-muted-foreground">
              Salas de 3, 4 y 5 años con un enfoque lúdico y afectuoso que
              respeta los tiempos de cada niño.
            </p>

            <Button size="lg" className="mt-8" asChild>
              <Link href="/inscripcion">
                Inscribir a mi hijo/a
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground">Nuestras Salas</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {salas.map((s) => (
              <Card
                key={s.nombre}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {s.nombre}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    <li className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Horario</span>
                      <span className="font-medium text-foreground">
                        {s.horario}
                      </span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Capacidad</span>
                      <span className="font-medium text-foreground">
                        {s.capacidad}
                      </span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Equipo</span>
                      <span className="font-medium text-foreground">
                        {s.docentes}
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-foreground">
              Areas de Desarrollo
            </h2>
            <p className="mt-2 text-muted-foreground">
              Un abordaje integral para los primeros anos
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <Card key={a.title} className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-chart-3/10">
                    <a.icon className="size-5 text-chart-3" />
                  </div>
                  <h3 className="mt-3 font-semibold text-foreground">
                    {a.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {a.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
