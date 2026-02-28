"use client";

import Link from "next/link";
import { useEffect } from "react";
import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Send,
  MessageSquare,
} from "lucide-react";

const proMotionStyles = `
  @media (prefers-reduced-motion: reduce) {
    .reveal, .reveal-stagger > * { 
      transition: none !important; 
      transform: none !important; 
      opacity: 1 !important; 
      filter: none !important;
    }
  }

  .reveal {
    opacity: 0;
    transform: translateY(14px);
    filter: blur(6px);
    transition: opacity .8s ease, transform .8s ease, filter .8s ease;
    will-change: transform, opacity, filter;
  }
  .reveal.is-in {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }

  .reveal-stagger > * {
    opacity: 0;
    transform: translateY(10px);
    filter: blur(6px);
    transition: opacity .7s ease, transform .7s ease, filter .7s ease;
    will-change: transform, opacity, filter;
  }
  .reveal-stagger.is-in > * {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
  .reveal-stagger.is-in > *:nth-child(1) { transition-delay: 0ms; }
  .reveal-stagger.is-in > *:nth-child(2) { transition-delay: 90ms; }
  .reveal-stagger.is-in > *:nth-child(3) { transition-delay: 180ms; }
  .reveal-stagger.is-in > *:nth-child(4) { transition-delay: 270ms; }
`;

function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function ContactoPage() {
  useRevealOnScroll();

  return (
    <div className="min-h-screen bg-background">
      <style>{proMotionStyles}</style>
      <PublicHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative h-[260px] sm:h-[320px] lg:h-[380px] w-[90%] lg:w-[80%] mx-auto rounded-b-3xl overflow-hidden shadow-xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/banner.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          <div className="relative z-10 h-full flex items-end">
            <div className="w-full px-6 pb-8 lg:px-10 lg:pb-10 text-white">
              <Badge className="bg-white/10 text-white border border-white/15 backdrop-blur">
                <MessageSquare className="mr-2 size-4" />
                Contacto
              </Badge>

              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Estamos para ayudarte
              </h1>

              <p className="mt-2 text-white/85 max-w-2xl text-sm sm:text-base lg:text-lg">
                Escribinos para consultas sobre inscripción, niveles, horarios o
                cualquier duda. Respondemos a la brevedad.
              </p>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-white/90 font-bold shadow-lg shadow-black/25"
                  asChild
                >
                  <Link href="/inscripcion" className="flex items-center">
                    Inscripción 2026 <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  className="bg-white/10 text-white border border-white/25 hover:bg-white/20 font-bold"
                  asChild
                >
                  <a href="#form" className="flex items-center">
                    Enviar consulta <Send className="ml-2 size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            {/* INFO + MAPA */}
            <div className="space-y-6">
              <div data-reveal className="reveal">
                <h2 className="text-3xl lg:text-4xl font-black text-foreground">
                  Datos de contacto
                </h2>
                <p className="mt-3 text-muted-foreground max-w-xl">
                  Podés comunicarte por teléfono, email o acercarte al colegio.
                  Si querés, también podés completar el formulario.
                </p>
              </div>

              {/* CARDS INFO */}
              <div
                data-reveal
                className="reveal reveal-stagger grid gap-4 sm:grid-cols-2"
              >
                <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur p-5">
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                      <MapPin className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Dirección</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Quesada 5228 – Villa Urquiza, CABA
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur p-5">
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                      <Phone className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Teléfono</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        (011) 4542 2737
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur p-5">
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                      <Mail className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Email</h3>
                      <p className="text-sm text-muted-foreground mt-1 break-all">
                        info@colegiocristorey.edu.ar
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur p-5">
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                      <Clock className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Horarios</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Lun a Vie – 08:00 a 16:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* MAPA */}
              <div data-reveal className="reveal">
                <div className="rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card">
                  <div className="p-4 border-b border-border/60">
                    <p className="text-sm font-semibold text-foreground">
                      Cómo llegar
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Villa Urquiza, CABA
                    </p>
                  </div>

                  <div className="aspect-[16/10] w-full">
                    {/* Podés reemplazar el src por el embed real del Maps del colegio */}
                    <iframe
                      title="Mapa Colegio Cristo Rey"
                      className="w-full h-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps?q=Quesada%205228%20Villa%20Urquiza%20CABA&output=embed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div id="form" className="space-y-6">
              <div data-reveal className="reveal">
                <h2 className="text-3xl lg:text-4xl font-black text-foreground">
                  Enviá tu consulta
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Completá el formulario y te respondemos por email o teléfono.
                </p>
              </div>

              <form
                data-reveal
                className="reveal rounded-2xl border border-border/60 bg-card/50 backdrop-blur p-6 lg:p-8 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Listo ✅ (falta conectar el envío al backend)");
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-foreground">
                      Nombre y apellido
                    </label>
                    <input
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600/30"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground">
                      Teléfono
                    </label>
                    <input
                      className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600/30"
                      placeholder="(011) ..."
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600/30"
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground">
                    Motivo
                  </label>
                  <select className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600/30">
                    <option>Inscripción</option>
                    <option>Nivel Inicial</option>
                    <option>Nivel Primaria</option>
                    <option>Aranceles</option>
                    <option>Otro</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground">
                    Mensaje
                  </label>
                  <textarea
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-600/30 min-h-[130px]"
                    placeholder="Contanos tu consulta..."
                    required
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 font-bold"
                  >
                    Enviar consulta <Send className="ml-2 size-4" />
                  </Button>

                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    className="border-border"
                    asChild
                  >
                    <Link href="/inscripcion">
                      Ir a Inscripción <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground pt-2">
                  Al enviar, aceptás que podamos contactarte para responder tu
                  consulta.
                </p>
              </form>

              {/* CTA inferior */}
              <div data-reveal className="reveal rounded-2xl border border-border/60 bg-gradient-to-br from-blue-600/10 to-transparent p-6">
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-xl bg-blue-600/15 text-blue-700 flex items-center justify-center">
                    <MessageSquare className="size-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-foreground">
                      ¿Querés visitar el colegio?
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Coordiná una visita y conocé nuestras instalaciones y
                      propuesta educativa.
                    </p>
                    <div className="mt-4">
                      <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                        <Link href="/inscripcion">
                          Solicitar visita <ArrowRight className="ml-2 size-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /FORM */}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}