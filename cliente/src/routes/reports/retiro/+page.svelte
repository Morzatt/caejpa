<script lang="ts">

    // Components
    import ServerMessage from "$lib/components/ServerMessage/ServerMessage.svelte"
    import Tooltip1 from "$lib/components/tooltip/Tooltip1.svelte"

    // Images Import
    import eyeIcon from "$lib/images/visibility_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import editIcon from "$lib/images/edit_note_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import searchIcon from "$lib/images/search_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import deleteIcon from "$lib/images/delete_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import { base } from "$lib";

    let deleteConfirmationTab = false; 
    
    const tableHeaders = ["Fecha", "Afiliado", "Cedula", "Total", "Motivo", "Modalidad", "Referencia", "Eliminar"]

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

    type Campos = "fecha" | "nombre" | "cedula" | "total" | "modalidad" | "motivo"
    type Orden = "DESC" | "ASC"

    let campo: Campos = "fecha";
    let orden: Orden = "ASC"; 

    async function getRetiros() {
        let response = await fetch(`${base}/retiros/*?from=${from}&to=${to}&campo=${campo}&orden=${orden}&search=${search.toLowerCase()}`);
        const data = await response.json()
        if (response.status === 200) {
            showWarning(data.message, response.status)
            return data
        }
    }

    let idToDelete: number | undefined;
    async function deleteRetiro() {
        let response = await fetch(`${base}/retiros/${idToDelete}`, {method: "DELETE"})
        const data = await response.json()
        console.log(data)
        if (response.status === 200) {
            showWarning(data.message, response.status)
        } else {
            showWarning(data.message, response.status)
        }
        idToDelete = undefined;
        operationCounter++
        deleteConfirmationTab = false
    }

    async function grupalDownload() {
        let response = await fetch(`${base}/retiros/report?from=${from}&to=${to}`);
        let data = await response.json()
        if (response.status === 200) {
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = `${base}/retiros/download`;
                link.download = 'retirosReport.pdf'; // Set the desired filename
                link.click();
                link.remove()
            }, 1000)
            showWarning(data.message, response.status)
        } else {
            showWarning(data.message, response.status)
        }
    }
</script>

<div id="main" class="w-full {deleteConfirmationTab ? "blur-lg" : ""} transition-all duration-200 ease-linear">
    <!-- Section -->
    <div class="section">
        <h1 class="sectionTitle">Visualizar y Descargar Retiros</h1>

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
                                <option value="fecha" selected>Fecha</option>
                                <option value="nombre">Afiliado</option>
                                <option value="cedula">Cedula</option>
                                <option value="total">Total</option>
                                <option value="motivo">Motivo</option>
                                <option value="modalidad">Modalidad</option>
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
                                    on:click={grupalDownload}>
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
                            {#each tableHeaders as tableHeader}
                                <th>
                                    <h1>{tableHeader}</h1>
                                </th>                               
                            {/each}
                        </tr>
                    </thead>
                    <tbody>
                            {#key dateChange && operationCounter}
                                {#await getRetiros()}
                                    <div class="absolute w-11/12 mt-12">
                                        <h1 class="text-2xl text-center animate-pulse font-poppins font-bold">No hay registros de retiros en las fechas especificadas.</h1>
                                    </div>
                                {:then retiros} 
                                    {#each retiros as retiro}
                                        <tr>
                                            <!-- <td>
                                                <button class="group rounded-md border-2 border-transparent hover:bg-black
                                                flex items-center justify-center size-9 transform ease-in-out 
                                                transition-all duration-200"
                                                on:click={() => {}}>
                                                    <img class="filter group-hover:invert size-full" src="{eyeIcon}" alt=""> 
                                                </button>
                                            </td> -->
                                            <td>
                                                <p>{retiro.fecha}</p>
                                            </td>
                                            <td>
                                                <p><b>{retiro.nombre} {retiro.apellido}</b></p>
                                            </td>
                                            <td>
                                                <p>V-{retiro.cedula}</p>
                                            </td>
                                            <td>
                                                <p><b>{retiro.total} Bs</b></p>
                                            </td>
                                            <td>
                                                <p>{retiro.motivo}</p>
                                            </td>
                                            <td>
                                                <p><b>{retiro.modalidad} Bs</b></p>
                                            </td>
                                            <td>
                                                {#if retiro.referencia}
                                                    <p><b>REF- {retiro.referencia}</b></p>
                                                {/if}
                                            </td>
                                            <td>
                                                <button class="group rounded-md border-2 border-transparent bg-red-600 hover:bg-red-500
                                                flex items-center justify-center size-8 transform ease-in-out 
                                                transition-all duration-200"
                                                on:click={() => {deleteConfirmationTab = !deleteConfirmationTab; 
                                                    idToDelete = retiro.id}}>
                                                    <img class="filter invert size-full" src="{deleteIcon}" alt=""> 
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
{#if deleteConfirmationTab}
    <div class="fixed top-[50%] translate-y-[-50%] ml-[6%] border-2 rounded-md bg-white p-3">
        <div class="size-full">
            <h1 class="text-red-500 text-xl font-poppins font-bold">¡Precaucion! Eliminar Registro</h1>
            <p>¿Está seguro de que desea eliminar éste Retiro? Una vez eliminado, la información es <b>irrecuperable.</b></p>
            <p class="text-sm mt-2"><b>Nota:</b> al eliminar un Retiro Total, no se habilitará al Afiliado ni sus datos. Para esto, debe dirigirse al apartado de desbloqueo de Afiliado.</p>
            <div class="flex items-center justify-end gap-6 border-t-2 border-slate-500 pt-3">
                <button class="border-2 border-black px-4 py-1 rounded-md font-poppins
                        hover:bg-black hover:text-white active:bg-gray-700
                        transition-all duration-200 ease-linear" 
                        on:click={() => {deleteConfirmationTab = !deleteConfirmationTab}}>Regresar</button> 

                <button class="px-4 py-1 bg-red-600 border-2 border-red-600 text-white font-poppins rounded-md
                hover:bg-red-500 active:bg-red-700 transition-all duration-200 ease-linear"
                        on:click={deleteRetiro}>Eliminar</button>
            </div>
        </div>
    </div> 
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