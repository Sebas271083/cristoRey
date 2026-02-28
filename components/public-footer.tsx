import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/90 text-white backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-lg">
                <img
                  src="/logo.png"
                  alt="Escudo Colegio Cristo Rey"
                  className="h-10 w-auto rounded-full drop-shadow-2xl"
                />
              </div>
              <span className="font-bold text-white">Colegio Cristo Rey</span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Educacion integral para el desarrollo pleno de cada alumno. Nivel
              Inicial y Primaria.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Navegacion</h4>
            <ul className="mt-3 space-y-2">
              {["Nivel Inicial", "Nivel Primaria", "Noticias", "Calendario"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Contacto</h4>
            <ul className="mt-3 space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-white/70">
                <MapPin className="size-4 shrink-0 text-white/70" />
                Quesada 5228 - Villa Urquiza, CABA
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="size-4 shrink-0 text-white/70" />
                (011) 4542 2737
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="size-4 shrink-0 text-white/70" />
                info@colegiocristorey.edu.ar
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Acceso Rapido</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/login"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Aula Virtual
                </Link>
              </li>
              <li>
                <Link
                  href="/inscripcion"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Inscripcion
                </Link>
              </li>
              <li>
                <Link
                  href="/calendario"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Calendario Escolar
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-white/60">
            2026 Colegio Cristo Rey. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}