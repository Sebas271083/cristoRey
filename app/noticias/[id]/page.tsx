import Link from "next/link"
import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Building2 } from "lucide-react"
import { noticias } from "@/lib/mock-data"
import { notFound } from "next/navigation"

export default async function NoticiaDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const noticia = noticias.find((n) => n.id === id)
  if (!noticia) return notFound()

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />

      <article className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/noticias"><ArrowLeft className="mr-2 size-4" /> Volver a Noticias</Link>
          </Button>

          <div className="flex items-center gap-2">
            <Badge variant="secondary">{noticia.categoria}</Badge>
            <span className="text-sm text-muted-foreground">
              {new Date(noticia.fecha).toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>

          <h1 className="mt-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">{noticia.titulo}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{noticia.resumen}</p>

          <div className="mt-8 aspect-video overflow-hidden rounded-xl bg-muted/50 flex items-center justify-center">
            <Building2 className="size-16 text-muted-foreground/20" />
          </div>

          <div className="prose prose-sm mt-8 max-w-none">
            <p className="text-foreground leading-relaxed">{noticia.contenido}</p>
            <p className="mt-4 text-foreground leading-relaxed">
              Para mas informacion, no dude en comunicarse con la administracion del colegio a traves de los canales habituales. Estamos a disposicion para cualquier consulta que las familias necesiten realizar.
            </p>
          </div>
        </div>
      </article>

      <PublicFooter />
    </div>
  )
}
