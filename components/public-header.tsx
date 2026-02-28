"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Building2, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Nivel Inicial", href: "/nivel-inicial" },
  { label: "Nivel Primaria", href: "/nivel-primaria" },
  { label: "Noticias", href: "/noticias" },
  { label: "Calendario", href: "/calendario" },
  { label: "Inscripcion", href: "/inscripcion" },
  { label: "Contacto", href: "/contacto" },
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size- items-center ">
            <img
              src="/logo.png"
              alt="Escudo Colegio Cristo Rey"
              className="h-10 w-auto drop-shadow-sm rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">
              Colegio Cristo Rey
            </span>
            <span className="text-[10px] text-muted-foreground">
              Inicial y Primaria
            </span>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          role="navigation"
          aria-label="Navegacion principal"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Iniciar Sesion</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/inscripcion">Inscribirme</Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <Button variant="outline" asChild>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Iniciar Sesion
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/inscripcion" onClick={() => setOpen(false)}>
                    Inscribirme
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
