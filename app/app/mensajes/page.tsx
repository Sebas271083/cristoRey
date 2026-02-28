"use client"

import { useState } from "react"
import { mensajes } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, Mail, MailOpen, Send, ArrowLeft } from "lucide-react"

export default function MensajesPage() {
  const [search, setSearch] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const filtered = mensajes.filter(
    (m) => m.asunto.toLowerCase().includes(search.toLowerCase()) || m.de.toLowerCase().includes(search.toLowerCase())
  )
  const selected = mensajes.find((m) => m.id === selectedId)

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mensajes</h1>
          <p className="text-muted-foreground">Bandeja de entrada</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm"><Plus className="mr-1.5 size-3.5" /> Nuevo mensaje</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Nuevo mensaje</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <Input placeholder="Para..." />
              <Input placeholder="Asunto" />
              <Textarea placeholder="Escribe tu mensaje..." className="min-h-[200px]" />
              <Button className="w-full"><Send className="mr-1.5 size-3.5" /> Enviar</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar mensajes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-1">
          {filtered.map((msg) => (
            <button
              key={msg.id}
              onClick={() => setSelectedId(msg.id)}
              className={`w-full rounded-lg p-3 text-left transition-colors ${
                selectedId === msg.id ? "bg-primary/5 border border-primary/20" : "hover:bg-muted/50 border border-transparent"
              }`}
            >
              <div className="flex items-start gap-3">
                <Avatar className="size-8 mt-0.5">
                  <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                    {msg.de.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${!msg.leido ? "font-bold text-foreground" : "font-medium text-foreground/80"}`}>
                      {msg.de}
                    </span>
                    {!msg.leido && <div className="size-2 rounded-full bg-primary" />}
                  </div>
                  <p className={`text-sm truncate ${!msg.leido ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                    {msg.asunto}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{msg.fecha}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          {selected ? (
            <Card>
              <CardHeader>
                <button onClick={() => setSelectedId(null)} className="lg:hidden mb-2 text-sm text-muted-foreground flex items-center gap-1 hover:text-foreground">
                  <ArrowLeft className="size-3.5" /> Volver
                </button>
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {selected.de.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{selected.asunto}</CardTitle>
                    <p className="text-sm text-muted-foreground">De: {selected.de} &middot; {selected.fecha}</p>
                  </div>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="p-6">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {selected.preview} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
                <Separator className="my-6" />
                <Textarea placeholder="Responder..." className="min-h-[80px]" />
                <div className="mt-3 flex justify-end">
                  <Button size="sm"><Send className="mr-1.5 size-3.5" /> Responder</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <Mail className="size-10 text-muted-foreground/50" />
                <p className="mt-3 font-medium text-foreground">Selecciona un mensaje</p>
                <p className="text-sm text-muted-foreground">Elige un mensaje de la lista para ver su contenido</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
