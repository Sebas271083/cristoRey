"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole } from "@/lib/role-context";
import type { Role } from "@/lib/mock-data";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  CreditCard,
  CalendarDays,
  ClipboardList,
  Users,
  FileText,
  GraduationCap,
  BarChart3,
  UserCog,
  Building2,
  CheckSquare,
  Wallet,
  Bus,
  Award,
  UserCheck,
  AlertTriangle,
  Activity,
  TrendingUp,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navByRole: Record<Role, NavGroup[]> = {
  alumno: [
    {
      label: "Principal",
      items: [
        { label: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
        { label: "Mis Aulas", href: "/app/aulas", icon: BookOpen },
        { label: "Mensajes", href: "/app/mensajes", icon: MessageSquare },
        { label: "Calendario", href: "/app/calendario", icon: CalendarDays },
      ],
    },
  ],
  padre: [
    {
      label: "Principal",
      items: [
        { label: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
        { label: "Mis Hijos", href: "/app/hijos", icon: Users },
        { label: "Comunicaciones", href: "/app/mensajes", icon: MessageSquare },
        { label: "Pagos y Cuotas", href: "/app/pagos", icon: CreditCard },
        { label: "Asistencia", href: "/app/asistencia", icon: CheckSquare },
        {
          label: "Autorizaciones",
          href: "/app/autorizaciones",
          icon: FileText,
        },
      ],
    },
  ],
  docente: [
    {
      label: "Principal",
      items: [
        { label: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
        { label: "Mis Aulas", href: "/app/aulas", icon: BookOpen },
        {
          label: "Planificacion",
          href: "/app/planificacion",
          icon: ClipboardList,
        },
      ],
    },
    {
      label: "Gestion",
      items: [
        { label: "Asistencia", href: "/app/asistencia", icon: CheckSquare },
        {
          label: "Evaluaciones",
          href: "/app/evaluaciones",
          icon: GraduationCap,
        },
        {
          label: "Registro de Clase",
          href: "/app/registro-clase",
          icon: FileText,
        },
      ],
    },
  ],
  administrativo: [
    {
      label: "Principal",
      items: [
        { label: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
        {
          label: "Inscripciones",
          href: "/app/administracion/inscripciones",
          icon: ClipboardList,
        },
      ],
    },
    {
      label: "Gestion",
      items: [
        { label: "Alumnos", href: "/app/administracion/alumnos", icon: Users },
        {
          label: "Personal",
          href: "/app/administracion/personal",
          icon: UserCog,
        },
        {
          label: "Caja y Cobros",
          href: "/app/administracion/caja",
          icon: Wallet,
        },
      ],
    },
    {
      label: "Reportes",
      items: [
        {
          label: "Ausentismo",
          href: "/app/administracion/ausentismo",
          icon: AlertTriangle,
        },
        {
          label: "Actividades",
          href: "/app/administracion/actividades",
          icon: Bus,
        },
        {
          label: "Capacitaciones",
          href: "/app/administracion/capacitaciones",
          icon: Award,
        },
      ],
    },
  ],
  director: [
    {
      label: "Principal",
      items: [
        { label: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
        {
          label: "Estado General",
          href: "/app/direccion/estado",
          icon: Activity,
        },
      ],
    },
    {
      label: "Seguimiento",
      items: [
        { label: "Docentes", href: "/app/direccion/docentes", icon: UserCheck },
        { label: "Alumnos", href: "/app/direccion/alumnos", icon: Users },
        { label: "Reportes", href: "/app/direccion/reportes", icon: BarChart3 },
        {
          label: "Indicadores",
          href: "/app/direccion/indicadores",
          icon: TrendingUp,
        },
      ],
    },
  ],
};

export function AppSidebar() {
  const { role } = useRole();
  const pathname = usePathname();
  const groups = navByRole[role];

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="p-4">
        <Link href="/app/dashboard" className="flex items-center gap-2">
          <div className="flex size- items-center justify-center rounded-lg ">
            <img
              src="/logo.png"
              alt="Escudo Colegio Cristo Rey"
              className="h-10 w-auto rounded-full drop-shadow-2xl animate-float-slow"
            />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold text-foreground">
              Colegio Cristo Rey
            </span>
            <span className="text-[10px] text-muted-foreground">
              Inicial y Primaria
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        pathname === item.href ||
                        pathname.startsWith(item.href + "/")
                      }
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 group-data-[collapsible=icon]:hidden">
        <Link
          href="/"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Volver al sitio
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
