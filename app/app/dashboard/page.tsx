"use client"

import { useRole } from "@/lib/role-context"
import { AlumnoDashboard } from "@/components/dashboards/alumno-dashboard"
import { PadreDashboard } from "@/components/dashboards/padre-dashboard"
import { DocenteDashboard } from "@/components/dashboards/docente-dashboard"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { DirectorDashboard } from "@/components/dashboards/director-dashboard"

export default function DashboardPage() {
  const { role } = useRole()

  return (
    <div className="p-4 lg:p-6">
      {role === "alumno" && <AlumnoDashboard />}
      {role === "padre" && <PadreDashboard />}
      {role === "docente" && <DocenteDashboard />}
      {role === "administrativo" && <AdminDashboard />}
      {role === "director" && <DirectorDashboard />}
    </div>
  )
}
