<script lang="ts">
    import editPrestamoTabStore from '../../../stores/prestamoStore';

    // Components
    import EditPrestamoTab from "$lib/components/EditPrestamoTab/EditPrestamoTab.svelte"
    import ServerMessage from "$lib/components/ServerMessage/ServerMessage.svelte"
    import Tooltip1 from "$lib/components/tooltip/Tooltip1.svelte"

    // Images Import
    import editIcon from "$lib/images/edit_note_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import searchIcon from "$lib/images/search_24dp_FILL0_wght400_GRAD0_opsz24.svg"

    let prestamoEditionTabState = false; 
    let idProp: string | number;

    editPrestamoTabStore.subscribe(() => {
        prestamoEditionTabState = false 
        operationCounter++
    })

    function openEditionTab(id: string | number) {
        idProp = id
        if (!prestamoEditionTabState) {
            prestamoEditionTabState = true
            return
        }
    }
    
    const tableHeaders = ["Expediente", "Fecha", "Afiliado", "Cedula", "Cantidad", "Descargar"]

	// 
    let serverStatus = 400;
	let loginWarning = false;
    let warningMessage = ""    
    function showWarning(msg: string, status: number) {
        warningMessage = msg;
        serverStatus = status;
        loginWarning = true
        setTimeout(() => {
            loginWarning = false
        }, 5000)
    }

    let search = ""
    $: operationCounter = 0
    // let from: string = "2024-01-01";
    // let to: string = "2025-01-01";
    let from: string = "";
    let to: string = "";
    $: dateChange = `${from} ${to}`

    type Campos = "expediente" | "fecha" | "nombre" | "cedula" | "cantidad"
    type Orden = "DESC" | "ASC"

    let campo: Campos = "fecha";
    let orden: Orden = "ASC"; 

    async function getPrestamos() {
        let response = await fetch(`http://localhost:2606/prestamos/*?from=${from}&to=${to}&campo=${campo}&orden=${orden}&search=${search.toLowerCase()}`);
        const data = await response.json()
        if (response.status === 200) {
            showWarning(data.message, response.status)
            return data
        }
    }
    
    async function individualDownload(prestamoId: any) {
        let response = await fetch("http://localhost:2606/prestamos/createPrestamo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ 
                prestamoId: prestamoId
            })
        });
        let data = await response.json()
        if (response.status === 200) {
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = "http://localhost:2606/prestamos/downloadPrestamo";
                link.download = 'individualReport.pdf'; // Set the desired filename
                link.click();
            }, 1000)
            showWarning(data.message, response.status)
        } else {
            showWarning(data.message, response.status)
        }
    }

    async function grupalDownload() {
        let response = await fetch("http://localhost:2606/prestamos/createPrestamos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ 
                from: from,
                to: to
            })
        });
        let data = await response.json()
        if (response.status === 200) {
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = "http://localhost:2606/prestamos/downloadPrestamos";
                link.download = 'individualReport.pdf'; // Set the desired filename
                link.click();
                link.remove()
            }, 1000)
            showWarning(data.message, response.status)
        } else {
            showWarning(data.message, response.status)
        }
    }
</script>

<div id="main" class="w-full {prestamoEditionTabState ? "blur-lg" : ""} transition-all duration-200 ease-linear">
    <!-- Section -->
    <div class="section">
        <h1 class="sectionTitle">Visualizar y Descargar Prestamos</h1>

        <!-- Modificar Usuario -->
        <div class="w-full border-t-2 pt-4">
             <!-- Search Bar -->
            <div id="search" class="w-full max-h-20 h-20 p-2">
               <div class="size-full flex items-center justify-start">
                    <div class="w-2/6 flex items-center justify-start relative group">
                        <input bind:value={search} class="px-4 py-2 border-2 border-slate-600 rounded-md w-full" type="text">
                        <button on:click={() => {operationCounter++}} class="h-full w-[13%] bg-black absolute right-0 rounded-r-md
                                                                            flex items-center justify-center">
                            <img src="{searchIcon}" alt="" class="h-3/4 filter invert">
                        </button> 
                        <Tooltip1 textBody="Buscar" messagePosition="right-[-80%]" origin="origin-left"/>
                    </div>

                    <div class="w-4/6 flex items-center justify-end">
                        <div class="w-2/4 h-full flex items-center justify-around">
                            <select bind:value={orden}>
                                <option value="ASC" selected>Ascendete</option>
                                <option value="DESC">Descendiente</option>
                            </select>

                            <select bind:value={campo}>
                                <option value="expediente">Expediente</option>
                                <option value="fecha" selected>Fecha</option>
                                <option value="nombre">Afiliado</option>
                                <option value="cedula">Cedula</option>
                                <option value="cantidad">Cantidad</option>
                            </select>
                        </div>
                    </div>
               </div> 
            </div>           

            <!-- Control de Tablas -->
            <div id="dateSet" class="w-full max-h-20 h-20 p-2">
               <div class="size-full flex justify-around items-center">
                    <span>
                        <input type="date" name="" id="" bind:value={from}>
                    </span>

                    <span >
                        <button class="bg-white border-2 border-slate-900
                                    px-4 py-2 rounded-md 
                                    font-poppins shadow-inner
                                    transition-all transform ease-linear duration-200
                                    hover:text-white hover:bg-black hover:shadow-lg"
                                    on:click={() => {grupalDownload()}}>
                            Descarga Grupal 
                        </button>
                    </span>

                    <span>
                        <input type="date" name="" id="" bind:value={to}>
                    </span>
               </div> 
            </div>

            <!-- Tabla -->
            <div class="w-full mt-4">
                <table class="report-table">
                    <thead>
                        <tr>
                            <th>
                                Editar
                            </th>
                            {#each tableHeaders as tableHeader}
                                <th>
                                    <h1>{tableHeader}</h1>
                                </th>                               
                            {/each}
                        </tr>
                    </thead>
                    <tbody>
                            {#key dateChange && operationCounter}
                                {#await getPrestamos()}
                                    <div class="absolute w-11/12 mt-12">
                                        <h1 class="text-2xl text-center animate-pulse font-poppins font-bold">No hay registros de prestamos en las fechas especificadas.</h1>
                                    </div>
                                {:then prestamos} 
                                    {#each prestamos as prestamo}
                                        <tr>
                                            <td>
                                                <button class="group rounded-md border-2 border-transparent hover:bg-black
                                                flex items-center justify-center size-9 transform ease-in-out 
                                                transition-all duration-200"
                                                on:click={() => openEditionTab(prestamo.id)}>
                                                    <img class="filter group-hover:invert size-full" src="{editIcon}" alt=""> 
                                                </button>
                                            </td>
                                            <td>
                                                <p><b>{prestamo.expediente}</b></p>
                                            </td>
                                            <td>
                                                <p>{prestamo.fecha}</p>
                                            </td>
                                            <td>
                                                <p><b>{prestamo.nombre} {prestamo.apellido}</b></p>
                                            </td>
                                            <td>
                                                <p>V-{prestamo.cedula}</p>
                                            </td>
                                            <td>
                                                <p><b>{prestamo.cantidad} Bs</b></p>
                                            </td>
                                            <td>
                                                <button class="bg-black text-white
                                                                px-4 py-2 rounded-md border-2
                                                                font-poppins shadow-inner
                                                                transition-all transform ease-linear duration-200
                                                              hover:text-black hover:bg-white hover:border-slate-700"
                                                        on:click={() => individualDownload(prestamo.id)}>
                                                    Descargar Autorización 
                                                </button>
                                            </td>
                                        </tr>                               
                                    {/each}
                                {/await}
                            {/key}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    {#if loginWarning} 
        <ServerMessage messageFromTheServer={"Registros correctamente obtenidos."}
                       serverStatus={serverStatus}
                       messagePosition="right-10 top-5"
                       position="fixed"/>    
    {/if}
</div>

{#if prestamoEditionTabState}
    <EditPrestamoTab id={idProp}/>
{/if}

<style lang="postcss">
    .section {
        @apply w-full h-fit mb-8 border-b;
    }    

    .section .sectionTitle {
        @apply text-2xl italic mb-4 font-poppins font-medium;
    }

    .section h2 {
        @apply text-xl italic mb-2 font-poppins;
    }

    .section #dateSet span {
        @apply w-1/3 h-full flex justify-center items-center;
    }

    .section #dateSet input{
        @apply w-3/5 relative px-4 py-2 border-2 border-slate-600 rounded-md font-poppins;
    }

    .section #search select {
        @apply px-4 py-2 border-2 border-slate-600 rounded-md font-poppins;
    }

    .section select:invalid {
        @apply border-red-400;
    }

    .report-table {
        @apply overflow-hidden w-full table-auto border-collapse border-spacing-[1px] text-left;
    }

    .report-table th {
        @apply  bg-white text-black p-1.5;
    }

    .report-table td {
        @apply border-y-2 border-slate-200 bg-white text-black p-1.5 shadow-sm rounded-md;

    }
    
    .report-table tr:nth-child(even) td {
        @apply bg-white text-black;
    }

    .report-table tr:nth-child(odd) td {
        @apply bg-gray-50 text-black;
    }
</style>