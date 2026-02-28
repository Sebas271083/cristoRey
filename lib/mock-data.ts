// ============ TIPOS ============
export type Role = "alumno" | "padre" | "docente" | "administrativo" | "director"

export interface Alumno {
  id: string
  nombre: string
  apellido: string
  grado: string
  nivel: "inicial" | "primaria"
  seccion: string
  foto?: string
  asistencia: number
  promedio: number
}

export interface Docente {
  id: string
  nombre: string
  apellido: string
  materia: string
  cursos: string[]
}

export interface Materia {
  id: string
  nombre: string
  docente: string
  grado: string
  color: string
}

export interface Tarea {
  id: string
  titulo: string
  materia: string
  fechaEntrega: string
  estado: "pendiente" | "entregada" | "calificada" | "vencida"
  nota?: number
  descripcion: string
}

export interface Noticia {
  id: string
  titulo: string
  resumen: string
  contenido: string
  fecha: string
  imagen: string
  categoria: string
}

export interface EventoCalendario {
  id: string
  titulo: string
  fecha: string
  tipo: "academico" | "feriado" | "actividad" | "evaluacion"
  descripcion?: string
}

export interface Pago {
  id: string
  concepto: string
  monto: number
  fecha: string
  estado: "pagado" | "pendiente" | "vencido"
  hijo?: string
}

export interface Mensaje {
  id: string
  de: string
  asunto: string
  preview: string
  fecha: string
  leido: boolean
}

export interface Asistencia {
  fecha: string
  estado: "presente" | "ausente" | "tarde" | "justificado"
}

export interface Inscripcion {
  id: string
  alumno: string
  nivel: "inicial" | "primaria"
  grado: string
  estado: "pendiente" | "aprobada" | "rechazada" | "documentacion"
  fecha: string
  padre: string
}

// ============ DATOS MOCK ============

export const alumnos: Alumno[] = [
  { id: "1", nombre: "Martina", apellido: "Lopez", grado: "3er Grado", nivel: "primaria", seccion: "A", asistencia: 95, promedio: 8.5 },
  { id: "2", nombre: "Santiago", apellido: "Garcia", grado: "3er Grado", nivel: "primaria", seccion: "A", asistencia: 88, promedio: 7.2 },
  { id: "3", nombre: "Valentina", apellido: "Martinez", grado: "Sala de 5", nivel: "inicial", seccion: "B", asistencia: 92, promedio: 9.0 },
  { id: "4", nombre: "Mateo", apellido: "Rodriguez", grado: "1er Grado", nivel: "primaria", seccion: "A", asistencia: 97, promedio: 8.8 },
  { id: "5", nombre: "Emilia", apellido: "Fernandez", grado: "5to Grado", nivel: "primaria", seccion: "B", asistencia: 90, promedio: 7.9 },
  { id: "6", nombre: "Benjamin", apellido: "Diaz", grado: "2do Grado", nivel: "primaria", seccion: "A", asistencia: 93, promedio: 8.1 },
  { id: "7", nombre: "Isabella", apellido: "Sanchez", grado: "4to Grado", nivel: "primaria", seccion: "A", asistencia: 85, promedio: 6.8 },
  { id: "8", nombre: "Lucas", apellido: "Romero", grado: "Sala de 4", nivel: "inicial", seccion: "A", asistencia: 91, promedio: 9.2 },
  { id: "9", nombre: "Olivia", apellido: "Torres", grado: "6to Grado", nivel: "primaria", seccion: "B", asistencia: 96, promedio: 9.5 },
  { id: "10", nombre: "Tomas", apellido: "Alvarez", grado: "1er Grado", nivel: "primaria", seccion: "B", asistencia: 89, promedio: 7.5 },
]

export const docentes: Docente[] = [
  { id: "1", nombre: "Ana", apellido: "Gutierrez", materia: "Matematica", cursos: ["3er Grado A", "4to Grado A"] },
  { id: "2", nombre: "Carlos", apellido: "Mendez", materia: "Lengua", cursos: ["3er Grado A", "3er Grado B"] },
  { id: "3", nombre: "Laura", apellido: "Perez", materia: "Ciencias Naturales", cursos: ["5to Grado A", "6to Grado B"] },
  { id: "4", nombre: "Roberto", apellido: "Ruiz", materia: "Ciencias Sociales", cursos: ["4to Grado A", "4to Grado B"] },
  { id: "5", nombre: "Maria", apellido: "Sosa", materia: "Educacion Inicial", cursos: ["Sala de 4 A", "Sala de 5 B"] },
]

export const materias: Materia[] = [
  { id: "1", nombre: "Matematica", docente: "Ana Gutierrez", grado: "3er Grado A", color: "bg-chart-1" },
  { id: "2", nombre: "Lengua", docente: "Carlos Mendez", grado: "3er Grado A", color: "bg-chart-2" },
  { id: "3", nombre: "Ciencias Naturales", docente: "Laura Perez", grado: "3er Grado A", color: "bg-chart-3" },
  { id: "4", nombre: "Ciencias Sociales", docente: "Roberto Ruiz", grado: "3er Grado A", color: "bg-chart-4" },
  { id: "5", nombre: "Educacion Artistica", docente: "Silvia Paredes", grado: "3er Grado A", color: "bg-chart-5" },
  { id: "6", nombre: "Educacion Fisica", docente: "Diego Romero", grado: "3er Grado A", color: "bg-chart-1" },
]

export const tareas: Tarea[] = [
  { id: "1", titulo: "Fracciones equivalentes", materia: "Matematica", fechaEntrega: "2026-03-05", estado: "pendiente", descripcion: "Resolver los ejercicios 1 al 15 de la pagina 42 del libro." },
  { id: "2", titulo: "Comprension lectora: El Principito", materia: "Lengua", fechaEntrega: "2026-03-03", estado: "entregada", descripcion: "Leer los capitulos 5 y 6, responder las preguntas del cuestionario." },
  { id: "3", titulo: "Ecosistemas acuaticos", materia: "Ciencias Naturales", fechaEntrega: "2026-03-07", estado: "pendiente", descripcion: "Realizar un informe sobre ecosistemas acuaticos de Argentina." },
  { id: "4", titulo: "Linea de tiempo: Revolucion de Mayo", materia: "Ciencias Sociales", fechaEntrega: "2026-02-28", estado: "calificada", nota: 9, descripcion: "Elaborar una linea de tiempo con los eventos principales." },
  { id: "5", titulo: "Dibujo con tecnica mixta", materia: "Educacion Artistica", fechaEntrega: "2026-03-10", estado: "pendiente", descripcion: "Crear una obra utilizando acuarelas y colores." },
  { id: "6", titulo: "Multiplicacion por dos cifras", materia: "Matematica", fechaEntrega: "2026-02-25", estado: "vencida", descripcion: "Ejercicios de multiplicacion del cuadernillo." },
]

export const noticias: Noticia[] = [
  { id: "1", titulo: "Inicio del Ciclo Lectivo 2026", resumen: "Toda la informacion sobre el comienzo de clases y las novedades del nuevo ano escolar.", contenido: "El proximo 2 de marzo damos inicio al Ciclo Lectivo 2026 con muchas novedades. Este ano incorporamos nuevos espacios de aprendizaje, talleres extracurriculares y un renovado programa de tutorías para acompanar a cada alumno en su desarrollo academico. Los horarios de ingreso seran de 7:45 a 12:30 para el turno manana.", fecha: "2026-02-15", imagen: "/placeholder-news.jpg", categoria: "Institucional" },
  { id: "2", titulo: "Jornada de Puertas Abiertas", resumen: "Invitamos a las familias a conocer nuestras instalaciones renovadas y el equipo docente.", contenido: "Este sabado 22 de febrero realizaremos nuestra tradicional Jornada de Puertas Abiertas. Las familias podran recorrer las aulas, conocer los laboratorios, la biblioteca y los espacios deportivos. Habra charlas informativas con el equipo directivo y los coordinadores de cada nivel.", fecha: "2026-02-10", imagen: "/placeholder-news.jpg", categoria: "Eventos" },
  { id: "3", titulo: "Nuevos talleres extracurriculares", resumen: "Robotica, teatro, huerta y mas opciones para el desarrollo integral de los alumnos.", contenido: "Nos complace anunciar la ampliacion de nuestra oferta de talleres extracurriculares. Este ano incorporamos Robotica y Programacion, Teatro Musical, Huerta Organica y Ajedrez. Los talleres funcionaran de lunes a viernes de 13:00 a 14:30.", fecha: "2026-02-05", imagen: "/placeholder-news.jpg", categoria: "Academico" },
  { id: "4", titulo: "Campana solidaria de utiles", resumen: "Sumamos esfuerzos para que todos los chicos arranquen el ano con los materiales necesarios.", contenido: "Desde el Departamento de Accion Social lanzamos la campana 'Preparados para aprender'. Recolectamos utiles escolares nuevos o en buen estado para donar a familias que lo necesiten. El punto de recoleccion estara en la recepcion del colegio hasta el 28 de febrero.", fecha: "2026-02-01", imagen: "/placeholder-news.jpg", categoria: "Solidario" },
]

export const eventosCalendario: EventoCalendario[] = [
  { id: "1", titulo: "Inicio de Clases", fecha: "2026-03-02", tipo: "academico", descripcion: "Primer dia del ciclo lectivo 2026" },
  { id: "2", titulo: "Feriado: Dia de la Memoria", fecha: "2026-03-24", tipo: "feriado" },
  { id: "3", titulo: "Acto Dia de la Memoria", fecha: "2026-03-23", tipo: "actividad", descripcion: "Acto conmemorativo en el SUM" },
  { id: "4", titulo: "Evaluacion Matematica 3er Grado", fecha: "2026-03-15", tipo: "evaluacion" },
  { id: "5", titulo: "Reunion de Padres Nivel Inicial", fecha: "2026-03-10", tipo: "actividad", descripcion: "Salon de actos - 18:00hs" },
  { id: "6", titulo: "Feriado: Semana Santa", fecha: "2026-04-02", tipo: "feriado" },
  { id: "7", titulo: "Campamento 5to y 6to", fecha: "2026-04-15", tipo: "actividad", descripcion: "Campamento en Tandil - 3 dias" },
  { id: "8", titulo: "Evaluacion Lengua 4to Grado", fecha: "2026-03-20", tipo: "evaluacion" },
  { id: "9", titulo: "Feria de Ciencias", fecha: "2026-05-10", tipo: "actividad", descripcion: "Exposicion anual de proyectos" },
  { id: "10", titulo: "Dia del Trabajador", fecha: "2026-05-01", tipo: "feriado" },
  { id: "11", titulo: "25 de Mayo", fecha: "2026-05-25", tipo: "feriado" },
  { id: "12", titulo: "Acto 25 de Mayo", fecha: "2026-05-22", tipo: "actividad", descripcion: "Acto patrio - participan todos los niveles" },
]

export const pagos: Pago[] = [
  { id: "1", concepto: "Cuota Marzo 2026", monto: 45000, fecha: "2026-03-10", estado: "pendiente", hijo: "Martina Lopez" },
  { id: "2", concepto: "Cuota Febrero 2026", monto: 45000, fecha: "2026-02-10", estado: "pagado", hijo: "Martina Lopez" },
  { id: "3", concepto: "Cuota Enero 2026", monto: 42000, fecha: "2026-01-10", estado: "pagado", hijo: "Martina Lopez" },
  { id: "4", concepto: "Material didactico", monto: 8500, fecha: "2026-02-15", estado: "pagado", hijo: "Martina Lopez" },
  { id: "5", concepto: "Seguro escolar", monto: 12000, fecha: "2026-03-01", estado: "pendiente", hijo: "Martina Lopez" },
  { id: "6", concepto: "Cuota Marzo 2026", monto: 45000, fecha: "2026-03-10", estado: "vencido", hijo: "Santiago Garcia" },
]

export const mensajes: Mensaje[] = [
  { id: "1", de: "Ana Gutierrez", asunto: "Tarea pendiente de Matematica", preview: "Estimada familia, les recordamos que la tarea...", fecha: "2026-02-28", leido: false },
  { id: "2", de: "Direccion", asunto: "Informacion importante: Calendario escolar", preview: "Adjuntamos el calendario escolar actualizado...", fecha: "2026-02-27", leido: true },
  { id: "3", de: "Carlos Mendez", asunto: "Felicitaciones por el trabajo de Lengua", preview: "Quiero destacar el excelente trabajo realizado...", fecha: "2026-02-26", leido: true },
  { id: "4", de: "Administracion", asunto: "Estado de cuenta - Febrero", preview: "Le informamos que su estado de cuenta...", fecha: "2026-02-25", leido: false },
  { id: "5", de: "Laura Perez", asunto: "Salida educativa: Reserva Natural", preview: "Informamos que el dia 15 de marzo...", fecha: "2026-02-24", leido: true },
]

export const asistenciaMensual: Asistencia[] = [
  { fecha: "2026-02-03", estado: "presente" },
  { fecha: "2026-02-04", estado: "presente" },
  { fecha: "2026-02-05", estado: "tarde" },
  { fecha: "2026-02-06", estado: "presente" },
  { fecha: "2026-02-07", estado: "presente" },
  { fecha: "2026-02-10", estado: "ausente" },
  { fecha: "2026-02-11", estado: "justificado" },
  { fecha: "2026-02-12", estado: "presente" },
  { fecha: "2026-02-13", estado: "presente" },
  { fecha: "2026-02-14", estado: "presente" },
  { fecha: "2026-02-17", estado: "presente" },
  { fecha: "2026-02-18", estado: "presente" },
  { fecha: "2026-02-19", estado: "tarde" },
  { fecha: "2026-02-20", estado: "presente" },
  { fecha: "2026-02-21", estado: "presente" },
  { fecha: "2026-02-24", estado: "presente" },
  { fecha: "2026-02-25", estado: "presente" },
  { fecha: "2026-02-26", estado: "presente" },
  { fecha: "2026-02-27", estado: "presente" },
  { fecha: "2026-02-28", estado: "presente" },
]

export const inscripciones: Inscripcion[] = [
  { id: "1", alumno: "Sofia Ramirez", nivel: "inicial", grado: "Sala de 4", estado: "pendiente", fecha: "2026-02-20", padre: "Diego Ramirez" },
  { id: "2", alumno: "Lautaro Vega", nivel: "primaria", grado: "1er Grado", estado: "aprobada", fecha: "2026-02-18", padre: "Claudia Vega" },
  { id: "3", alumno: "Mia Herrera", nivel: "primaria", grado: "3er Grado", estado: "documentacion", fecha: "2026-02-15", padre: "Marcos Herrera" },
  { id: "4", alumno: "Nicolas Rios", nivel: "inicial", grado: "Sala de 5", estado: "aprobada", fecha: "2026-02-12", padre: "Ana Rios" },
  { id: "5", alumno: "Catalina Paz", nivel: "primaria", grado: "2do Grado", estado: "rechazada", fecha: "2026-02-10", padre: "Juan Paz" },
]

// ============ DATOS PARA DASHBOARDS ============
export const kpiDirector = {
  totalAlumnos: 342,
  totalDocentes: 28,
  asistenciaPromedio: 92.5,
  morosidad: 15.3,
  rendimientoPromedio: 7.8,
  inscripcionesPendientes: 12,
  alertasActivas: 5,
}

export const datosMensualesAsistencia = [
  { mes: "Mar", asistencia: 94 },
  { mes: "Abr", asistencia: 91 },
  { mes: "May", asistencia: 89 },
  { mes: "Jun", asistencia: 93 },
  { mes: "Jul", asistencia: 88 },
  { mes: "Ago", asistencia: 92 },
  { mes: "Sep", asistencia: 95 },
  { mes: "Oct", asistencia: 90 },
  { mes: "Nov", asistencia: 93 },
]

export const datosMensualesRendimiento = [
  { mes: "Mar", promedio: 7.2 },
  { mes: "Abr", promedio: 7.5 },
  { mes: "May", promedio: 7.8 },
  { mes: "Jun", promedio: 7.4 },
  { mes: "Jul", promedio: 7.9 },
  { mes: "Ago", promedio: 8.1 },
  { mes: "Sep", promedio: 7.7 },
  { mes: "Oct", promedio: 8.0 },
  { mes: "Nov", promedio: 8.3 },
]

export const datosMorosidad = [
  { mes: "Mar", porcentaje: 8 },
  { mes: "Abr", porcentaje: 10 },
  { mes: "May", porcentaje: 12 },
  { mes: "Jun", porcentaje: 14 },
  { mes: "Jul", porcentaje: 11 },
  { mes: "Ago", porcentaje: 13 },
  { mes: "Sep", porcentaje: 15 },
  { mes: "Oct", porcentaje: 16 },
  { mes: "Nov", porcentaje: 15.3 },
]

export const agendaDelDia = [
  { hora: "07:50", materia: "Matematica", aula: "Aula 3A", docente: "Ana Gutierrez" },
  { hora: "08:40", materia: "Matematica", aula: "Aula 3A", docente: "Ana Gutierrez" },
  { hora: "09:30", materia: "Recreo", aula: "", docente: "" },
  { hora: "09:50", materia: "Lengua", aula: "Aula 3A", docente: "Carlos Mendez" },
  { hora: "10:40", materia: "Lengua", aula: "Aula 3A", docente: "Carlos Mendez" },
  { hora: "11:30", materia: "Ciencias Naturales", aula: "Laboratorio", docente: "Laura Perez" },
  { hora: "12:20", materia: "Educacion Fisica", aula: "Patio", docente: "Diego Romero" },
]

export const roleLabels: Record<Role, string> = {
  alumno: "Alumno",
  padre: "Padre/Tutor",
  docente: "Docente",
  administrativo: "Administrativo",
  director: "Director",
}
