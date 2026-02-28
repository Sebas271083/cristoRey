"use client"

import { pagos } from "@/lib/mock-data"
import { CardStat } from "@/components/card-stat"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Wallet, TrendingUp, AlertTriangle, DollarSign, Search, Download, Plus } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useState } from "react"

function formatMoney(n: number) {
  return `$${n.toLocaleString("es-AR")}`
}

const movimientos = [
  { id: "1", concepto: "Cobro cuota Febrero - Martinez", tipo: "ingreso", monto: 45000, fecha: "2026-02-28" },
  { id: "2", concepto: "Cobro cuota Febrero - Lopez", tipo: "ingreso", monto: 45000, fecha: "2026-02-28" },
  { id: "3", concepto: "Pago proveedor - Limpieza", tipo: "egreso", monto: 25000, fecha: "2026-02-27" },
  { id: "4", concepto: "Cobro material didactico - Garcia", tipo: "ingreso", monto: 8500, fecha: "2026-02-27" },
  { id: "5", concepto: "Pago servicios - Electricidad", tipo: "egreso", monto: 18000, fecha: "2026-02-26" },
  { id: "6", concepto: "Cobro seguro escolar - Fernandez", tipo: "ingreso", monto: 12000, fecha: "2026-02-26" },
  { id: "7", concepto: "Pago honorarios - Capacitador", tipo: "egreso", monto: 30000, fecha: "2026-02-25" },
]

export default function CajaPage() {
  const [search, setSearch] = useState("")
  const ingresos = movimientos.filter((m) => m.tipo === "ingreso").reduce((s, m) => s + m.monto, 0)
  const egresos = movimientos.filter((m) => m.tipo === "egreso").reduce((s, m) => s + m.monto, 0)

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Caja y Cobros</h1>
          <p className="text-muted-foreground">Movimientos de caja y gestion de cobranzas</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline"><Download className="mr-1.5 size-3.5" /> Exportar</Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="sm"><Plus className="mr-1.5 size-3.5" /> Nuevo movimiento</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader><SheetTitle>Nuevo Movimiento</SheetTitle></SheetHeader>
              <div className="mt-6 space-y-4">
                <div>
                  <Label>Tipo</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ingreso">Ingreso</SelectItem>
                      <SelectItem value="egreso">Egreso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Concepto</Label><Input className="mt-1.5" placeholder="Descripcion" /></div>
                <div><Label>Monto</Label><Input className="mt-1.5" type="number" placeholder="0" /></div>
                <div><Label>Fecha</Label><Input className="mt-1.5" type="date" /></div>
                <Button className="w-full" onClick={() => toast.success("Movimiento registrado")}>Registrar</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <CardStat title="Ingresos del mes" value={formatMoney(ingresos)} icon={TrendingUp} description="Febrero 2026" trend="up" />
        <CardStat title="Egresos del mes" value={formatMoney(egresos)} icon={Wallet} description="Febrero 2026" />
        <CardStat title="Saldo" value={formatMoney(ingresos - egresos)} icon={DollarSign} description="Balance actual" trend="up" />
      </div>

      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Movimientos recientes</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Concepto</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {movimientos
                .filter((m) => m.concepto.toLowerCase().includes(search.toLowerCase()))
                .map((mov) => (
                <TableRow key={mov.id}>
                  <TableCell className="font-medium">{mov.concepto}</TableCell>
                  <TableCell className="text-muted-foreground">{mov.fecha}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] ${mov.tipo === "ingreso" ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}`}>
                      {mov.tipo === "ingreso" ? "Ingreso" : "Egreso"}
                    </Badge>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${mov.tipo === "ingreso" ? "text-green-600" : "text-red-600"}`}>
                    {mov.tipo === "ingreso" ? "+" : "-"}{formatMoney(mov.monto)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
