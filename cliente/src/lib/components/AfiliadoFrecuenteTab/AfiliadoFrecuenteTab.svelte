<script lang="ts">
    import afiliadoDataStore from "../../../stores/afiliadoFrecuente";
    import Tooltip1 from "$lib/components/tooltip/Tooltip1.svelte"

    // Images Import
    import deleteIcon from "$lib/images/delete_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import checkIcon from "$lib/images/check_circle_FILL0_wght400_GRAD0_opsz24.svg"
    import closeIcon from "$lib/images/close_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import searchIcon from "$lib/images/search_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import arrowDown from "$lib/images/expand_more_FILL0_wght400_GRAD0_opsz24.svg"

    function closeTab() {
        afiliadoDataStore.update(afiliado => {
            return {
                ...afiliado,
                tabState: false
            }
        })
    }

    let cedulaAnterior: string | number
    function selectAfiliado(selectedAfiliado: {expediente: string, nombre: string, apellido: string, cedula: number | string}) {
        let img = document.getElementById(`selectedImg/${selectedAfiliado.cedula}`)
        let row = document.getElementById(`row/${selectedAfiliado.cedula}`)
        row?.classList.add("bg-slate-200")
        img?.classList.remove("scale-0")
        if (cedulaAnterior) {
            document.getElementById(`selectedImg/${cedulaAnterior}`)?.classList.add("scale-0")
            document.getElementById(`row/${cedulaAnterior}`)?.classList.remove("bg-slate-200")
        }
        cedulaAnterior = selectedAfiliado.cedula
        afiliadoDataStore.update(afiliado => {
            return {
                expediente: selectedAfiliado.expediente,
                nombre: selectedAfiliado.nombre,
                apellido: selectedAfiliado.apellido,
                cedula: selectedAfiliado.cedula,
                tabState: true
            }
        })
    }

    type Afiliado = {
        expediente: string,
        nombre: string, 
        apellido: string,
        cedula: string
    }

    type Campos = "expediente" | "nombre" | "apellido" | "cedula"
    type Orden = "desc" | "asc"

    let campo: Campos = "nombre";
    let orden: Orden = "asc"; 

    function sortArr(arr: Afiliado[], campo: Campos, orden: Orden): Afiliado[] {
        if (orden === "asc") {
            return arr.sort((a,b) => {
                if (a[campo] < b[campo]) {
                    return -1
                }
                if (a[campo] > b[campo]) {
                    return 1
                }
                return 0
            })
        }

        return arr.sort((a,b) => {
            if (a[campo] < b[campo]) {
                return -1
            }
            if (a[campo] > b[campo]) {
                return 1
            }
            return 0
        }).reverse()
    }

    let search: string = ""; 
    async function getAfiliadosFrecuentes(): Promise<Afiliado[]> {
        const response = await fetch(`http://localhost:2606/afiliados?searchParams=${search.toLowerCase()}`)
        const data: Afiliado[] = await response.json()
        const sorted = sortArr(data, campo, orden)
        
        return sorted  
    }

    let operationCounter = 0
    async function deleteAfiliado(cedula: string) {
        const response = await fetch(`http://localhost:2606/afiliados/${cedula}`, {
            method: "DELETE"
        })
        const data = await response.json()
        operationCounter++
    }
</script>

<main>
    <div class="border-2 p-4 shadow-xl rounded-md bg-white w-full relative">
        <button class="absolute right-2 top-2" on:click={closeTab}>
            <img src="{closeIcon}" alt="">
        </button>

        <h1 class="text-xl font-bold font-poppins">Afiliados</h1>

        <!-- SearchBar -->
        <div class="mt-4 w-2/5 flex items-center justify-center relative group">
            <input bind:value={search} class="border-2 rounded-md px-2 py-1 w-full" type="text">
            <button on:click={() => {operationCounter++}} class="size-8 absolute right-4">
                <img src="{searchIcon}" alt="" class="size-full">
            </button> 
            <Tooltip1 textBody="Buscar" messagePosition="right-[-80%]" origin="origin-left"/>
        </div>

        <div class="afiliados-table-container w-full mt-4 p-4">
            <table class="w-full relative">
                <thead class="text-left border-b-2 mb-2">
                    <th>
                        <button on:click={() => {
                            if (orden == "asc") {
                                orden = "desc"
                            } else {
                                orden = "asc"
                            }

                            operationCounter++
                        }}>
                            <img src="{arrowDown}" class="transition-all transform {orden === "asc" ? "rotate-180" : ""} duration-200 ease-linear" alt="">
                        </button>
                    </th>
                    <th>
                        <div class="{campo === "expediente" ? "text-red-600" : ""}" on:click={() => {campo = "expediente"; operationCounter++}}>
                            <p>Expediente</p> 
                        </div>
                    </th>
                    <th>
                        <div class="{campo === "nombre" ? "text-red-600" : ""}" on:click={() => {campo = "nombre"; operationCounter++}}>
                            <p>Nombre</p>
                        </div>
                    </th>
                    <th>
                        <div class="{campo === "apellido" ? "text-red-600" : ""}" on:click={() => {campo = "apellido"; operationCounter++}}>
                            <p>Apellido</p> 
                        </div>
                    </th>
                    <th>
                        <div class="{campo === "cedula" ? "text-red-600" : ""}" on:click={() => {campo = "cedula"; operationCounter++}}>
                            <p>Cedula</p>  
                        </div>
                    </th>
                    <th class="text-center">Eliminar</th>
                </thead>
                <tbody>
                    {#key operationCounter}
                        {#await getAfiliadosFrecuentes()}
                            <h1>Obteniendo Afiliados</h1>
                        {:then afiliados} 
                            {#if afiliados.length === 0}
                                <h1 class="absolute left-[50%] translate-x-[-50%]
                                text-lg font-bold font-poppins animate-pulse">Aún no ha sido añadido ningún afiliado.</h1>
                            {:else}
                                {#each afiliados as afiliado}
                                    <tr class="text-left border-b-2 hover:bg-slate-200 hover:border-slate-400
                                    transition-all duration-200 ease-linear cursor-pointer"
                                    id="row/{afiliado.cedula}"
                                    on:click={() => {selectAfiliado(
                                        {
                                            expediente: afiliado.expediente,
                                            nombre: afiliado.nombre,
                                            apellido: afiliado.apellido,
                                            cedula: afiliado.cedula
                                        }
                                    )}}>
                                        <td>
                                            <img src="{checkIcon}" class="scale-0 transition-all duration-200" alt="" id="selectedImg/{afiliado.cedula}">
                                        </td>
                                        <td>{afiliado.expediente}</td>
                                        <td>{afiliado.nombre}</td>
                                        <td>{afiliado.apellido}</td>
                                        <td>{afiliado.cedula}</td>
                                        <td class="text-center">
                                            <button class="group hover:bg-red-600 rounded-sm transition-all duration-300 ease-linear relative"
                                                on:click={() => {deleteAfiliado(afiliado.cedula)}}>
                                                <img src="{deleteIcon}" alt="" class="group-hover:invert filter">
                                            </button>                              
                                        </td>
                                    </tr>                           
                                {/each}
                            {/if}
                        {/await}
                    {/key}
                </tbody>
            </table>
        </div>

    </div>
</main>

<style lang="postcss">
    main {
        @apply fixed top-[10%] ml-28 w-3/5 min-h-[80vh];
    }

    .afiliados-table-container {
        @apply overflow-auto max-h-[75vh];
    }

    .afiliados-table-container table thead th div {
        @apply transition-all transform duration-100 ease-linear cursor-pointer;
    }
</style>