<script lang="ts">
    import ServerMessage from '$lib/components/ServerMessage/ServerMessage.svelte';

    let operationsCounter = 0
    async function getVariables() {
        const variablesRequest = await fetch("http://localhost:2606/variables")
        const variables = await variablesRequest.json()       
        return variables
    }

	// 
    let serverStatus = 400;
	let warningState = false;
    let warningMessage = ""    
    function showWarning(msg: string, status: number) {
        warningMessage = msg;
        serverStatus = status;
        warningState = true
            setTimeout(() => {
                warningState = false
            }, 5000)
    }

    let newGastosAdministrativos: number = 0;
    let newTransferenciaEfectiva: number = 0;
    let newPorcentajeIntereses: number = 0;

    async function gastosAdministrativos() {
        try {
            const response = await fetch('http://localhost:2606/variables/modify/gastos_administrativos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({
                    newGastosAdministrativos: newGastosAdministrativos
                })
            });

            let data = await response.json()

            if (response.status === 200) {
				showWarning(data.message, response.status)
                operationsCounter++
            } else {
				showWarning(data.message, response.status)
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function transferenciaEfectiva() {
        try {
            const response = await fetch('http://localhost:2606/variables/modify/transferencia_efectiva', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({
                    newTransferenciaEfectiva: newTransferenciaEfectiva 
                })
            });

            let data = await response.json()

            if (response.status === 200) {
				showWarning(data.message, response.status)
                operationsCounter++
            } else {
				showWarning(data.message, response.status)
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function porcentajeIntereses() {
        try {
            const response = await fetch('http://localhost:2606/variables/modify/porcentaje_intereses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({
                    newPorcentajeIntereses: newPorcentajeIntereses 
                })
            });
            
            let data = await response.json()

            if (response.status === 200) {
				showWarning(data.message, response.status)
                operationsCounter++
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
                        serverStatus={serverStatus}/> 
    {/if}
    <!-- Section -->
    <div class="section">
        <h1 class="sectionTitle">Administrar Montos Variables</h1>
        
        <!-- Gastos Administrativos -->
        <div class="w-full border-t pt-4 mt-4">
            <h2>Modificar Gastos Administrativos</h2>
            {#key operationsCounter}
                {#await getVariables() then variables}
                    <h3>Monto por concepto de Gastos Administrativos actual: <b>{variables[0].valor}Bs.</b></h3>                                  
                {/await}
            {/key}


            <div class="w-2/4 mt-8">
                <h3>Nuevo Monto: </h3>
                <input bind:value={newGastosAdministrativos} type="number">
            </div>

            <button on:click={gastosAdministrativos} class="submit-form-button"><span class="inner w-full">Modificar</span></button>
        </div>
        
        <!-- Transferencia Efectiva -->
        <div class="w-full border-t pt-4 mt-4">
            <h2>Modificar Porcentaje de Transferencia Efectiva</h2>
            {#key operationsCounter}
                {#await getVariables() then variables}
                    <h3>Monto porcentual por concepto de Transferencia Efectiva: <b>{variables[1].valor}%</b></h3>
                {/await}
            {/key}


            <div class="w-2/4 mt-8">
                <h3>Nuevo porcentaje: </h3>
                <input bind:value={newTransferenciaEfectiva} type="number">
            </div>

            <button on:click={transferenciaEfectiva} class="submit-form-button"><span class="inner w-full">Modificar</span></button>
        </div>

        <!-- Porcentaje de Intereses -->
        <div class="w-full border-t pt-4 mt-4">
            <h2>Modificar Porcentaje de Intereses</h2>
            {#key operationsCounter}
                {#await getVariables() then variables}
                    <h3>Monto porcentual por concepto de Intereses sobre el Prestamo: <b>{variables[2].valor}%</b></h3>
                {/await}
            {/key}


            <div class="w-2/4 mt-8">
                <h3>Nuevo porcentaje: </h3>
                <input bind:value={newPorcentajeIntereses} type="number">
            </div>

            <button on:click={porcentajeIntereses} class="submit-form-button"><span class="inner w-full">Modificar</span></button>
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
        @apply px-4 py-2 border-2 border-slate-600 rounded-md;
    }
    

    .section .submit-form-button {
        @apply font-poppins font-medium;
        font-weight: 700;
        background-color: #000000;
        border-radius: 0.6em;
        display: inline-block;
        margin: 1em;
        margin-top: 30px;
    }


    .section .submit-form-button .inner{
        @apply px-2 py-1;
        display: inline-block;
        background-color: #ffffff;
        border-radius: 0.6em;
        border: 0.3em solid #000000;
        cursor: pointer;
        user-select: none;
        transform: translate3d(0.6em, -0.6em, 0);
        transition: transform 240ms cubic-bezier(0.175, 0.885, 0.320, 1.275);
        transition-delay: 220ms;
    }

    .section .submit-form-button .inner:active{
        transform: translate3d(0, 0, 0);
        transition: transform 120ms cubic-bezier(0.230, 1.000, 0.320, 1.000);
    }
</style>