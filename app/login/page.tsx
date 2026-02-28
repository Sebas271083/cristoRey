"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary">
            <Building2 className="size-6 text-primary-foreground" />
          </div>
          <h1 className="mt-3 text-xl font-bold text-foreground">Colegio Cristo Rey</h1>
          <p className="text-sm text-muted-foreground">Plataforma Educativa</p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Iniciar Sesion</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email o Usuario</Label>
              <Input id="email" placeholder="usuario@colegioCristo Rey.edu.ar" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contrasena</Label>
                <button className="text-xs text-primary hover:underline">Olvide mi contrasena</button>
              </div>
              <Input id="password" type="password" placeholder="Ingrese su contrasena" />
            </div>
            <Button className="w-full" onClick={() => router.push("/app/dashboard")}>
              Ingresar
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Demo: Usa el selector de rol en el panel para alternar vistas
            </p>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:underline">Volver al sitio</Link>
        </p>
      </div>
    </div>
  )
}
