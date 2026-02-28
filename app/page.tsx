"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PublicHeader } from "@/components/public-header";
import { PublicFooter } from "@/components/public-footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  GraduationCap,
  Calendar,
  ArrowRight,
  Star,
  Heart,
  Lightbulb,
  Palette,
  Trophy,
  Building2,
  Zap,
  Globe,
  Code,
  Music,
  Brain,
  Award,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Image as ImageIcon,
  Sparkles,
  Rocket,
  Target,
  Flame,
} from "lucide-react";
import { noticias, eventosCalendario } from "@/lib/mock-data";
import Image from "next/image";

// Estilos de animación CSS avanzados
const animationStyles = `
    /* === ANIMACIONES BASE === */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-50px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(50px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) scale(1); }
      50% { transform: translateY(-15px) scale(1.02); }
    }

    @keyframes float-slow {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }

    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
      50% { box-shadow: 0 0 50px rgba(59, 130, 246, 0.8); }
    }

    @keyframes rotate-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes bounce-in {
      0% { opacity: 0; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.05); }
      100% { opacity: 1; transform: scale(1); }
    }

    @keyframes glow-pulse {
      0%, 100% { filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5)); }
      50% { filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.8)); }
    }

    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }

    @keyframes blur-in {
      from { opacity: 0; filter: blur(10px); }
      to { opacity: 1; filter: blur(0); }
    }

    @keyframes rotate-card {
      from { transform: rotateX(0deg) rotateY(0deg); }
      to { transform: rotateX(2deg) rotateY(5deg); }
    }

    /* === CLASES UTILIDAD === */
    .animate-fadeInUp {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .animate-slideInLeft {
      animation: slideInLeft 0.8s ease-out forwards;
    }

    .animate-slideInRight {
      animation: slideInRight 0.8s ease-out forwards;
    }

    .animate-float {
      animation: float 4s ease-in-out infinite;
    }

    .animate-float-slow {
      animation: float-slow 5s ease-in-out infinite;
    }

    .animate-pulse-glow {
      animation: pulse-glow 3s ease-in-out infinite;
    }

    .animate-bounce-in {
      animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }

    .animate-glow-pulse {
      animation: glow-pulse 2s ease-in-out infinite;
    }

    .animate-blur-in {
      animation: blur-in 0.8s ease-out forwards;
    }

    .animate-rotate-slow {
      animation: rotate-slow 25s linear infinite;
    }

    /* === SCROLL ANIMATIONS === */
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(60px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideUpDelay1 {
      0% { opacity: 0; transform: translateY(60px); }
      40% { opacity: 0; transform: translateY(60px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideUpDelay2 {
      0% { opacity: 0; transform: translateY(60px); }
      60% { opacity: 0; transform: translateY(60px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes parallaxDown {
      from { transform: translateY(0px); }
      to { transform: translateY(30px); }
    }

    .animate-scroll-in {
      animation: slideUp 0.8s ease-out forwards;
      opacity: 0;
    }

    .animate-scroll-in-delay-1 {
      animation: slideUpDelay1 0.8s ease-out forwards;
      opacity: 0;
    }

    .animate-scroll-in-delay-2 {
      animation: slideUpDelay2 0.8s ease-out forwards;
      opacity: 0;
    }

    /* === HOVER EFFECTS === */
    .hover-lift {
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .hover-lift:hover {
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
    }

    .card-3d {
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      perspective: 1000px;
    }

    .card-3d:hover {
      transform: translateY(-15px) rotateX(8deg);
      box-shadow: 0 40px 80px rgba(0, 0, 0, 0.25);
    }

    /* === GRADIENTS === */
    .gradient-text {
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .gradient-animated {
      background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
      background-size: 200% 100%;
      animation: shimmer 3s infinite;
    }

    .glass-effect {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .glass-effect-dark {
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* === SCROLL ANIMATIONS === */
    .reveal-on-scroll {
      opacity: 0;
      transform: translateY(30px);
    }

    .reveal-on-scroll.active {
      opacity: 1;
      transform: translateY(0);
      transition: all 0.8s ease-out;
    }

    /* === PARALLAX === */
    .parallax {
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    /* === DECORATIVE ELEMENTS === */
    .orb {
      border-radius: 50%;
      filter: blur(40px);
      opacity: 0.6;
    }

    .orb-animation {
      animation: float 8s ease-in-out infinite;
    }

    /* === BADGE ANIMATIONS === */
    .badge-pulse {
      animation: pulse-glow 2s ease-in-out infinite;
    }

    /* === TEXT ANIMATIONS === */
    .text-shimmer {
      background: linear-gradient(90deg, currentColor 0%, currentColor 45%, rgba(255,255,255,0.3) 50%, currentColor 55%, currentColor 100%);
      background-size: 200% auto;
      animation: shimmer 2s linear infinite;
    }


    
  `;

const features = [
  {
    icon: Award,
    title: "Excelencia Académica",
    description:
      "Programa pedagógico actualizado con énfasis en competencias del siglo XXI.",
  },
  {
    icon: Users,
    title: "Acompañamiento Integral",
    description:
      "Equipo de orientación escolar y tutorías personalizadas para cada estudiante.",
  },
  {
    icon: Code,
    title: "Formación Tecnológica",
    description:
      "Laboratorios equipados con tecnología educativa de vanguardia.",
  },
  {
    icon: Globe,
    title: "Educación Global",
    description:
      "Programa bilingüe y conexiones con comunidades educativas internacionales.",
  },
];

// Galería de imágenes del colegio y actividades
const galeriaImagenes = [
  {
    id: 1,
    title: "Actividades en Aula",
    category: "Académica",
    image:
      "https://images.unsplash.com/photo-1427504494785-cdedca239cc1?w=600&h=400&fit=crop",
    delay: 0,
  },
  {
    id: 2,
    title: "Laboratorio de Ciencias",
    category: "Ciencia",
    image:
      "https://images.unsplash.com/photo-1581092918692-8d1e409f4a4d?w=600&h=400&fit=crop",
    delay: 100,
  },
  {
    id: 3,
    title: "Clase de Programación",
    category: "Tecnología",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    delay: 200,
  },
  {
    id: 4,
    title: "Actividades Deportivas",
    category: "Deporte",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop",
    delay: 300,
  },
  {
    id: 5,
    title: "Expresión Artística",
    category: "Arte",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop",
    delay: 100,
  },
  {
    id: 6,
    title: "Áreas Comunes",
    category: "Infraestructura",
    image:
      "https://images.unsplash.com/photo-1564769666745-3105928e127f?w=600&h=400&fit=crop",
    delay: 200,
  },
];

const niveles = [
  {
    title: "Nivel Inicial",
    subtitle: "Salas de 3, 4 y 5 anos",
    description:
      "Primer contacto con el aprendizaje a traves del juego, la exploracion y la creatividad. Espacios seguros y estimulantes.",
    icon: Heart,
    href: "/nivel-inicial",
    color: "bg-chart-3/10 text-chart-3",
  },
  {
    title: "Nivel Primaria",
    subtitle: "1er a 6to Grado",
    description:
      "Formacion solida en todas las areas curriculares, con proyectos interdisciplinarios y desarrollo del pensamiento critico.",
    icon: BookOpen,
    href: "/nivel-primaria",
    color: "bg-primary/10 text-primary",
  },
];

const fortalezas = [
  {
    icon: Brain,
    title: "Pensamiento Crítico",
    detail:
      "Metodología activa que desarrolla análisis y razonamiento profundo",
  },
  {
    icon: Heart,
    title: "Formación en Valores",
    detail: "Énfasis en ética, responsabilidad social y desarrollo integral",
  },
  {
    icon: BookOpen,
    title: "Biblioteca Académica",
    detail: "Recursos educativos actualizados y acceso a investigación",
  },
  {
    icon: Trophy,
    title: "Logros Reconocidos",
    detail: "Excelencia académica comprobada en evaluaciones externas",
  },
];

// ---- Animaciones pro (reveal + stagger) ----
const proMotionStyles = `
    @media (prefers-reduced-motion: reduce) {
      .reveal, .reveal-stagger > * { 
        transition: none !important; 
        transform: none !important; 
        opacity: 1 !important; 
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

    /* Stagger para hijos */
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
    .reveal-stagger.is-in > *:nth-child(5) { transition-delay: 360ms; }
    .reveal-stagger.is-in > *:nth-child(6) { transition-delay: 450ms; }
  `;

// ---- Hook: IntersectionObserver (no scroll listener) ----
function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target); // entra una vez y listo
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function HomePage() {
  const proximosEventos = eventosCalendario.slice(0, 3);
  const ultimasNoticias = noticias.slice(0, 3);
  const [scrollY, setScrollY] = useState(0);

  useRevealOnScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Agregar animación a elementos reveal-on-scroll
      const elements = document.querySelectorAll(".reveal-on-scroll");
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const viewportHeight = window.innerHeight;

        // Si el elemento está visible en pantalla
        if (elementTop < viewportHeight - 100 && elementBottom > 0) {
          element.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <style>{animationStyles + proMotionStyles}</style>
      <PublicHeader />

      {/* Banner lateral fijo para Inscripción (solo imagen + botón) */}
      <aside className="hidden lg:flex flex-col items-center fixed right-10 top-1/6 z-50 w-64 p-2 gap-3">
        <a
          href="/inscripcion"
          className="block w-full rounded-lg overflow-hidden"
        >
          <img
            src="/galeria/inscripcion.png"
            alt="Inscripción 2026"
            className="w-full h-full object-contain h-96 object-cover rounded-lg shadow-lg"
          />
        </a>

        <Button
          size="sm"
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
          asChild
        >
          <Link href="/inscripcion">Inscribirse</Link>
        </Button>
      </aside>

      {/* ========== BANNER HORIZONTAL SUPERIOR ========== */}
      <section className="relative overflow-hidden">
        <div className="relative h-[320px] sm:h-[380px] lg:h-[510px] w-[80%] mx-auto rounded-b-3xl overflow-visible shadow-xl">
          <div
            className="absolute inset-0 bg-cover bg-[center_25%] xs:bg-[center_28%] lg:bg-[center_50%] "
            style={{ backgroundImage: "url('/banner.png')" }}
          />

          {/* overlay suave para que no quede “lavado”, pero sin tapar */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/ to-transparent" />
        </div>
      </section>
      <section className="relative text-white overflow-hidden w-[80%] mx-auto -mt-20 lg:-mt-28 z-10 rounded-t-2xl shadow-lg">
        {/* Top fade overlay: permite ver la imagen debajo y se desvanece hacia el interior */}
        <div className="absolute inset-x-0 -top-12 h-32 pointer-events-none z-20" />

        {/* Imagen */}

        {/* Overlay limpio con transparencia en el borde superior para permitir ver la imagen del banner debajo */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0.2) 8%, rgba(0, 0, 0, 0.2) 15%, rgba(0, 0, 0, 0.2) 30%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.95) 100%)",
          }}
        />

        <div className="relative z-30 mx-auto max-w-7xl px-4 lg:px-8">
          <div className="py-10 lg:py-14">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* ===== COLUMNA IZQUIERDA (TEXTO) ===== */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold border border-white/15 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-yellow-300" />
                  Excelencia Educativa desde 2001
                </div>

                <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  Formamos Líderes del Futuro
                </h1>

                <p className="mt-3 text-sm sm:text-base lg:text-lg text-white/85 max-w-2xl">
                  Educación integral con valores, pensamiento crítico y
                  acompañamiento cercano.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="bg-white text-blue-700 hover:bg-white/90 font-bold shadow-lg shadow-black/25"
                    asChild
                  >
                    <Link
                      href="/inscripcion"
                      className="flex items-center justify-center"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Inscripción 2026
                    </Link>
                  </Button>

                  <Button
                    size="lg"
                    className="bg-white/10 text-white border border-white/25 hover:bg-white/20 font-bold"
                    asChild
                  >
                    <Link
                      href="/nivel-primaria"
                      className="flex items-center justify-center"
                    >
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Ver niveles
                    </Link>
                  </Button>
                </div>
              </div>

              {/* ===== COLUMNA DERECHA (LOGO) ===== */}
              <div className="flex justify-center lg:justify-end">
                <img
                  src="/logo.png"
                  alt="Escudo Colegio Cristo Rey"
                  className="w-40 sm:w-48 lg:w-60 drop-shadow-2xl rounded-full animate-float-slow"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HERO CON IMAGEN - NUEVA ESTRUCTURA ========== */}

      <section className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Contenido izquierdo */}
            <div className="space-y-6 lg:space-y-8">
              <div data-reveal className="reveal">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
                  Una comunidad educativa de{" "}
                  <span className="text-blue-600">calidad</span> y{" "}
                  <span className="text-blue-600">confianza</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  En nuestro colegio apostamos a una educación que trasciende
                  las aulas. Cada estudiante es protagonista de su propio
                  aprendizaje, acompañado por docentes comprometidos con la
                  excelencia.
                </p>
              </div>

              {/* Stats - Stagger */}
              <div
                data-reveal
                className="reveal reveal-stagger space-y-6 pt-6 lg:pt-8 border-t border-slate-200"
              >
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Por Qué Elegirnos
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      emoji: "🎓",
                      label: "Docentes Especialistas",
                      value: "25+",
                    },
                    { emoji: "🏆", label: "Años de Excelencia", value: "25+" },
                    { emoji: "👥", label: "Familias Confiadas", value: "300+" },
                    { emoji: "⭐", label: "Comunidad Activa", value: "2026" },
                  ].map((s) => (
                    <div key={s.label} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{s.emoji}</span>
                        <div>
                          <p className="text-xs text-slate-600">{s.label}</p>
                          <p className="text-lg font-black text-blue-600">
                            {s.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Valores - Stagger suave */}
              <div data-reveal className="reveal reveal-stagger space-y-3 pt-4">
                {[
                  "Formación académica de excelencia",
                  "Desarrollo integral de competencias",
                  "Comunidad inclusiva y solidaria",
                ].map((txt) => (
                  <div key={txt} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">
                      ✓
                    </div>
                    <span className="text-slate-700 font-medium text-sm sm:text-base">
                      {txt}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Imagen derecha */}
            <div data-reveal className="reveal relative hidden lg:block">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                <img
                  src="/galeria/alumnosEnClase.png"
                  alt="Estudiantes en clase"
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  style={{
                    // parallax leve basado en scrollY (si ya lo tenés)
                    transform: `translateY(${Math.min(scrollY * 0.02, 10)}px)`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* Floating card: entra con stagger */}
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur p-4 lg:p-6 rounded-xl shadow-2xl max-w-xs border border-slate-100">
                <div className="text-xs lg:text-sm text-slate-600 font-medium mb-2">
                  Comunidad comprometida
                </div>
                <p className="text-slate-900 font-bold text-sm lg:text-base">
                  Miles de familias confían en nuestro proyecto educativo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECCIÓN DE FORTALEZAS - ANIMADA ========== */}
      <section className="py-20 bg-gradient-to-b from-background to-card/50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Header */}
          <div data-reveal className="reveal text-center mb-16">
            <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary border-primary/30">
              ⚡ Nuestros Pilares
            </Badge>

            <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-4">
              ¿Qué nos hace <span className="gradient-text">diferentes?</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Una educación que va más allá de las aulas, formando personas
              líderes y conscientes
            </p>
          </div>

          {/* Cards (stagger) */}
          <div
            data-reveal
            className="reveal reveal-stagger grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                icon: Brain,
                title: "Pensamiento Crítico",
                detail: "Metodología activa que desarrolla análisis profundo",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Globe,
                title: "Visión Global",
                detail: "Programa bilingüe y conexiones internacionales",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Code,
                title: "Tecnología",
                detail: "Robótica y programación desde nivel inicial",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Music,
                title: "Expresión Artística",
                detail: "Arte integral como parte del desarrollo",
                color: "from-orange-500 to-red-500",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="
        relative rounded-2xl border border-border/50 overflow-hidden group
        p-5 sm:p-6 lg:p-8
        transition-all duration-300
        md:hover:-translate-y-1 md:hover:shadow-2xl md:hover:border-primary/40
      "
              >
                {/* Glow: visible suave en mobile, hover en desktop */}
                <div
                  className={`absolute inset-0 opacity-5 md:opacity-0 md:group-hover:opacity-10 transition-opacity bg-gradient-to-br ${item.color}`}
                />

                {/* Borde highlight sutil */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />

                <div className="relative">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 sm:mb-4 shadow-lg`}
                  >
                    <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>

                  <h3 className="font-black text-base sm:text-lg text-foreground mb-1.5 sm:mb-2 md:group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== GALERÍA + MISIÓN DEL COLEGIO ========== */}
      <section className="py-20 bg-white/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="relative grid gap-12 lg:grid-cols-2 items-center">
            {/* GALERÍA */}
            <div className="relative animate-slideInLeft reveal-on-scroll">
              <div className="space-y-4">
                {/* Foto principal - grande */}
                <div className="relative overflow-hidden rounded-xl shadow-2xl hover-lift group reveal-on-scroll">
                  <img
                    src="/galeria/principal.png"
                    alt="Evento principal"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Grid de fotos secundarias */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    "/galeria/aula.png",
                    "/galeria/huerta.png",
                    "/galeria/arte.png",
                  ].map((img, idx) => (
                    <div
                      key={idx}
                      className="relative overflow-hidden rounded-lg shadow-lg group aspect-square"
                    >
                      <Image
                        src={img}
                        alt={`Galería ${idx + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 33vw, 200px"
                      />

                      {/* Overlay elegante */}
                      <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MISIÓN Y CONTENIDO */}
            <div className="space-y-8 animate-slideInRight reveal-on-scroll">
              <div>
                <p className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-2">
                  Te contamos sobre
                </p>
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">
                  Nuestra <span className="text-blue-600">Misión</span>
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-6" />
              </div>

              <div className="space-y-5">
                <p className="text-lg text-slate-700 leading-relaxed font-light">
                  La misión de nuestro colegio tiene una doble vertiente: en
                  cuanto centro educativo participa en la promoción humana y
                  social; por su carácter cristiano es un ámbito del diálogo
                  entre la cultura que se realiza y la comunidad eclesial
                  concreta.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed font-light">
                  Formamos estudiantes con excelencia académica, valores éticos
                  sólidos y competencias para liderar un futuro sostenible.
                </p>
              </div>

              {/* Logros destacados */}
              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-200">
                {[
                  {
                    icon: "🏆",
                    title: "Excelencia Comprobada",
                    desc: "Reconocimientos académicos nacionales e internacionales",
                  },
                  {
                    icon: "📚",
                    title: "Innovación Educativa",
                    desc: "Plataformas digitales y metodologías modernas",
                  },
                  {
                    icon: "🌍",
                    title: "Alcance Global",
                    desc: "Convenios internacionales en 15+ países",
                  },
                  {
                    icon: "❤️",
                    title: "Comunidad Fuerte",
                    desc: "Más de 25 años formando líderes",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="reveal-on-scroll p-4 bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 animate-fadeInUp group cursor-pointer"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="text-2xl mb-2 group-hover:scale-125 transition-transform">
                      {item.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex gap-3 pt-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 hover-lift"
                  asChild
                >
                  <Link href="/inscripcion">
                    Inscribirse Ahora <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="hover-lift border-slate-300"
                  asChild
                >
                  <Link href="/noticias">
                    Conocer Más <ChevronRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
