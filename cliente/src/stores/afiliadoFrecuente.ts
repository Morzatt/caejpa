import { writable } from "svelte/store"
import type { Writable } from "svelte/store"

export let afiliadoDataStore: Writable<AfiliadoData> = writable(<AfiliadoData>{})

type AfiliadoData = {
    expediente: string
    nombre:string,
    apellido: string,
    cedula: string | number,
    tabState: boolean
}

export default afiliadoDataStore;