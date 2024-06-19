import { Session } from "express-session"

export type Usuario = {
    id: any,
    nombre: string,
    apellido: string,
    username: string,
    role: "Administrador" | "Editor" | "Por Asignar" 
    estado: "Activo" | "Bloqueado"
}

export interface UserSession extends Session {
    userInfo?: Usuario 

}
export type Variables = {
    id: number,
    titulo: string,
    valor: any
}


export type User = {
    nombre: string,
    apellido: string,
    username: string,
    password?: string,
    role?: string
}

export type PreguntasSeguridad = {
    usuario: string,
    pregunta1: string,
    respuesta1: string,
    pregunta2: string,
    respuesta2: string
}

export type PrestamoInfo = {
    id?: string | number,
    expediente: string,
    fecha: string | Date,
    nombre: string,
    apellido: string,
    cedula: number | string,

    cantidad: number,
    gastosAdministrativos: number,
    servicioDeTransferencia: number,
    porcentajeDeIntereses: number,

    montoDeIntereses: number,
    total: number,

    tiempoDePago: number,
    cuotaMensual: number,
    cuotaQuincenal: number,
    concepto: string
}

export type Afiliado = {
    expediente: string,
    nombre: string,
    apellido: string,
    cedula: string | number
}

export type Retiro = {
    id: number,
    nombre: string,
    apellido: string,
    fecha: string,
    cedula: number,
    total: number,
    motivo: "Retiro Parcial" | "Retiro Total",
    modalidad: "Efectivo" | "Transferencia",
    referencia?: string
}

export interface Reingreso extends Afiliado {
    motivo: string,
    fecha: string,
    usuario: string
}