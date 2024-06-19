import { writable, type Writable } from "svelte/store"

const editPrestamoTabStore: Writable<() => boolean> = writable()

export default editPrestamoTabStore
