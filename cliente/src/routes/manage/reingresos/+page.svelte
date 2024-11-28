<script lang="ts">
    import ServerMessage from "$lib/components/ServerMessage/ServerMessage.svelte"
    import addIcon from "$lib/images/person_add_FILL0_wght400_GRAD0_opsz24.svg"
    import Tooltip1 from "$lib/components/tooltip/Tooltip1.svelte"
    import searchIcon from "$lib/images/search_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import sendIcon from "$lib/images/send_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import {base} from "$lib/index"
	// 
    let serverStatus = 400;
	let warningState = false;
    let warningMessage = ""    
    const headers = ["Expediente", "Afiliado", "Cedula", "Reingresar"]
    const headersReingreso = ["Expediente", "Afiliado", "Cedula", "Motivo de Reingreso", "Fecha", "Usuario"]
    function showWarning(msg: string, status: number) {
        warningMessage = msg;
        serverStatus = status;
        warningState = true
            setTimeout(() => {
                warningState = false
            }, 5000)
    }
    let retirados = true 
    $: operationCounter = 0
    let searchParams = ""
    async function getRetirados(){
        const response = await fetch(`${base}/afiliados/retirados/*?searchParams=${searchParams.toLowerCase()}`)
        const data = await response.json()
        return data
    }

    async function getReingresados(){
        const response = await fetch(`${base}/afiliados/reingreso?searchParams=${searchParams.toLowerCase()}`)
        const data = await response.json()
        return data
    }

    let cedulaAnterior: number;
    async function showInputTab(cedula: number) {
        const tab = document.getElementById(`tab#${cedula}`)
        tab?.classList.remove("scale-0")
        // if (cedulaAnterior) {
        //     document.getElementById(`tab#${cedulaAnterior}`)?.classList.add("scale-0")
        // }
        // cedulaAnterior = cedula        
    }

    async function reingresarAfiliado(afiliado: any ) {
        const {expediente, nombre, apellido, cedula} = afiliado
        const input = document.getElementById(`input#${cedula}`) as HTMLInputElement
        const motivo = input.value
        if (motivo === "" || undefined) {
            showWarning("No se ha introducido ningún motivo de reingreso.", 400)
            return
        }
        try {
            const response = await fetch(`${base}/afiliados/reingreso`, {
                method: "POST",
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				credentials: "include",
				body: JSON.stringify({ 
                    expediente: expediente,
                    nombre: nombre,
                    apellido: apellido,
                    cedula: cedula,
                    motivo: motivo
				})
            })
            const data = await response.json()
            if (response.status === 200) {
                showWarning(data.message, response.status)
                operationCounter++
            } else {
                showWarning(data.message, response.status)
            }
        } catch (err) {
            console.log(err)
        }
    }
</script>

<main class="w-full relative">
    {#if warningState}
        <ServerMessage  messageFromTheServer={warningMessage}
                        messagePosition={"top-20 right-10"}
                        serverStatus={serverStatus}
                        position={"fixed"}/> 
    {/if}
    <!-- Section -->
    <div class="section">
        <h1 class="sectionTitle">Afiliados Retirados</h1>
        
        <!-- Modificar Retiro -->
        <div class="w-full border-t pt-4 mt-4">
            <h2>Modificar Retiro</h2>
            <p>Los Afiliados mostrados a continuación realizaron un retiro total de la Caja de Ahorro, por tanto, sus operaciones están bloqueadas.</p>
            <p>Si desea realizar un reingreso del Afiliado a la Caja de Ahorro deberá proporcionar un motivo de reingreso.</p>
            
            <!-- Filtrado -->
            <div class="w-full max-h-20 h-20 p-2">
               <div class="size-full flex items-center justify-start">
                    <div class="w-2/6 flex items-center justify-start relative group">
                        <input bind:value={searchParams} class="px-4 py-2 border-2 border-slate-600 rounded-md w-full" type="text">
                        <button on:click={() => {operationCounter++}} class="h-full w-[13%] bg-black absolute right-0 rounded-r-md
                                                                            flex items-center justify-center">
                            <img src="{searchIcon}" alt="" class="h-3/4 filter invert">
                        </button> 
                        <Tooltip1 textBody="Buscar" messagePosition="right-[-80%]" origin="origin-left"/>
                    </div>
               </div> 
            </div>       

            <!-- Filtrado -->
            <div class="w-full max-h-20 h-20 p-2">
               <div class="size-full flex items-center justify-start">
                    <div class="bb w-[25%] flex items-center justify-between rounded-md">
                        <button class="bb px-2 w-2/4 rounded-l-md  transition-all duration-200 ease-linear {retirados ? "bg-black text-white" : ""}"
                        on:click={() => {retirados = true}}>Retirados</button>

                        <button class="bb px-2 w-2/4 rounded-r-md transition-all duration-200 ease-linear {retirados ? "" : "bg-black text-white"}"
                        on:click={() => {retirados = false}}>Reingresados</button>
                    </div>
               </div> 
            </div>

            <!-- Tabla -->
            <div class="w-3/6 min-w-max mt-4">
                {#if retirados}
                    <table class="report-table">
                        <thead>
                            <tr>
                                {#each headers as header}
                                    <th>{header}</th>
                                {/each}
                            </tr>
                        </thead>
                        <tbody>
                            {#key operationCounter}
                                {#await getRetirados()}
                                    <tr><h1 class="text-lg font-poppins animate-pulse">Obteniendo Afiliados Retirados...</h1></tr>
                                {:then afiliados} 
                                    {#if afiliados.length === 0}
                                        <tr><h1 class="text-lg font-poppins animate-pulse">Obteniendo Afiliados Retirados...</h1></tr>
                                    {/if}
                                    {#each afiliados as afiliado}
                                        <tr>
                                            <td>{afiliado.expediente}</td>
                                            <td><b>{afiliado.nombre} {afiliado.apellido}</b></td>
                                            <td>{afiliado.cedula}</td>
                                            <td class="relative">
                                                <button class="size-8 rounded-md group hover:bg-green-600 flex items-center justify-center transition-all duration-200 ease-linear"
                                                on:click={() => {showInputTab(afiliado.cedula)}}>
                                                    <img src="{addIcon}" alt="" class="size-10/12 filter group-hover:invert ">
                                                </button>

                                                <div id="tab#{afiliado.cedula}" class="scale-0 rounded-md border-2 
                                                border-slate-600 p-2 bg-white w-max absolute top-[-120%] left-0 transition-all origin-bottom-left duration-100 ease-linear">
                                                    <button class="absolute right-4 top-1 font-extrabold"
                                                    on:click={()=>{document.getElementById(`tab#${afiliado.cedula}`)?.classList.add("scale-0")}}>X</button>
                                                    <h1 class="bg-white font-bold">Motivo de Reingreso:</h1>
                                                    <div class="w-full flex items-center justify-around px-4 gap-3 relative group">
                                                        <input id="input#{afiliado.cedula}" class="px-4 py-2 border-2 border-slate-600 rounded-md w-full" type="text">
                                                        <button class="size-max px-1 bg-black rounded-full flex items-center justify-center hover:bg-gray-800"
                                                            on:click={() => {reingresarAfiliado(afiliado)}}>
                                                            <img src="{sendIcon}" alt="" class="size-10 filter invert">
                                                        </button> 
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    {/each}
                                {/await}
                            {/key}
                        </tbody>
                    </table>
                {:else}
                    <table class="report-table">
                        <thead>
                            <tr>
                                {#each headersReingreso as header}
                                    <th>{header}</th>
                                {/each}
                            </tr>
                        </thead>
                        <tbody>
                            {#key operationCounter}
                                {#await getReingresados()}
                                    <tr><h1 class="text-lg font-poppins animate-pulse">Obteniendo Afiliados Reingresados...</h1></tr>
                                {:then afiliados} 
                                    {#if afiliados.length === 0}
                                        <tr><h1 class="text-lg font-poppins animate-pulse">Obteniendo Afiliados Reingresados...</h1></tr>
                                    {/if}
                                    {#each afiliados as afiliado}
                                        <tr>
                                            <td>{afiliado.expediente}</td>
                                            <td><b>{afiliado.nombre} {afiliado.apellido}</b></td>
                                            <td>{afiliado.cedula}</td>
                                            <td>{afiliado.motivo}</td>
                                            <td>{afiliado.fecha}</td>
                                            <td>{afiliado.usuario}</td>
                                        </tr>
                                    {/each}
                                {/await}
                            {/key}
                        </tbody>
                    </table>
                {/if}
            </div>
        </div>
    </div>
</main>

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

    .section input{
        @apply w-full relative px-4 py-2 border-2 border-slate-600 rounded-md;
    }

    .report-table {
        @apply w-full table-auto border-collapse border-spacing-[1px] text-left;
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