import Link from "next/link"
import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Building2 } from "lucide-react"
import { noticias } from "@/lib/mock-data"

export default function NoticiasPage() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground">Noticias</h1>
          <p className="mt-2 text-muted-foreground">Mantente informado sobre las novedades del Colegio Cristo Rey</p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {noticias.map((n) => (
              <Card key={n.id} className="group overflow-hidden transition-shadow hover:shadow-md">
                <div className="aspect-video bg-muted/50 flex items-center justify-center">
                  <Building2 className="size-10 text-muted-foreground/30" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{n.categoria}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(n.fecha).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{n.titulo}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{n.resumen}</p>
                  <Link href={`/noticias/${n.id}`} className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
                    Leer articulo completo <ArrowRight className="ml-1 size-3" />
                  </Link>
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
