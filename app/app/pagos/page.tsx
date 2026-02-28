"use client"

import { pagos } from "@/lib/mock-data"
import { CardStat } from "@/components/card-stat"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, DollarSign, AlertTriangle, Download, CheckCircle2, Clock, XCircle } from "lucide-react"

const estadoConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  pagado: { label: "Pagado", className: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle2 },
  pendiente: { label: "Pendiente", className: "bg-amber-100 text-amber-700 border-amber-200", icon: Clock },
  vencido: { label: "Vencido", className: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
}

function formatMoney(n: number) {
  return `$${n.toLocaleString("es-AR")}`
}

export default function PagosPage() {
  const totalPagado = pagos.filter((p) => p.estado === "pagado").reduce((s, p) => s + p.monto, 0)
  const totalPendiente = pagos.filter((p) => p.estado === "pendiente").reduce((s, p) => s + p.monto, 0)
  const totalVencido = pagos.filter((p) => p.estado === "vencido").reduce((s, p) => s + p.monto, 0)

  return (
    <div className="p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pagos y Cuotas</h1>
        <p className="text-muted-foreground">Estado de cuenta y gestion de pagos</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <CardStat title="Total Pagado" value={formatMoney(totalPagado)} icon={CheckCircle2} description="Este periodo" trend="up" />
        <CardStat title="Pendiente" value={formatMoney(totalPendiente)} icon={Clock} description="Por abonar" />
        <CardStat title="Vencido" value={formatMoney(totalVencido)} icon={AlertTriangle} description="Atrasado" trend="down" />
      </div>

      <Tabs defaultValue="todos" className="mt-6">
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
          <TabsTrigger value="pagados">Pagados</TabsTrigger>
        </TabsList>

        {(["todos", "pendientes", "pagados"] as const).map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Concepto</TableHead>
                      <TableHead>Alumno</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pagos
                      .filter((p) => tab === "todos" || (tab === "pendientes" ? p.estado !== "pagado" : p.estado === "pagado"))
                      .map((pago) => {
                        const config = estadoConfig[pago.estado]
                        return (
                          <TableRow key={pago.id}>
                            <TableCell className="font-medium">{pago.concepto}</TableCell>
                            <TableCell className="text-muted-foreground">{pago.hijo}</TableCell>
                            <TableCell className="text-muted-foreground">{pago.fecha}</TableCell>
                            <TableCell className="text-right font-medium">{formatMoney(pago.monto)}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={`text-[10px] ${config.className}`}>{config.label}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                {pago.estado === "pagado" && (
                                  <Button variant="ghost" size="sm"><Download className="size-3.5" /></Button>
                                )}
                                {pago.estado !== "pagado" && (
                                  <Button size="sm" variant="outline">Pagar</Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
