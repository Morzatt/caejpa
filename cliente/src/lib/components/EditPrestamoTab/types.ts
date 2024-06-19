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