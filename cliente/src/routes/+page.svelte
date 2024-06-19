<script>
    import Chart from "svelte-frappe-charts"
    import manualIcon from "$lib/images/developer_guide_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import prestamoIcon from "$lib/images/payments_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import retirosIcon from "$lib/images/account_balance_wallet_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import reingresosIcon from "$lib/images/groups_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import leaveIcon from "$lib/images/move_item_24dp_FILL0_wght400_GRAD0_opsz24.svg" 

    async function getRetirosData() {
        const response = await fetch("http://localhost:2606/retiros/stats")
        const data = await response.json()
        return data 
    }
    async function getPrestamosData() {
        const response = await fetch("http://localhost:2606/prestamos/stats")
        const data = await response.json()
        return data 
    }
    async function getReingresosData() {
        const response = await fetch("http://localhost:2606/retiros/reingresos/stats")
        const data = await response.json()
        return data 
    }
</script>

<main class="rounded-md size-full">
    <div class="p-4">
        <h1 class="font-poppins relative font-bold text-3xl">Bienvenido a la aplicación</h1>
        <p class="w-fit flex mt-2">En caso de duda, no dude en consultar el
            <a href="/manual" class="text-blue-500 ml-2 w-fit flex items-center justify-around">
                <img src="{manualIcon}" alt="">
                Manual de Usuario.
            </a>
        </p>
    </div>

    <div class="p-3 w-full h-fit border-2 rounded-md shadow-lg">
        <h1 class="font-poppins text-xl">Panel de Control</h1>
        <h3 class="font-poppins text-lg">Estadísticas del Mes Actual</h3>

        <div class="tab">
            <div>
                <img src="{prestamoIcon}" alt="">
                <span>
                    <h2>Prestamos</h2>
                    {#await getPrestamosData() then data}
                        <p class="text-blue-600">{data.datasets[1].values[0]}</p>                       
                    {/await}
                </span>
            </div>
            <div>
                <img src="{retirosIcon}" alt="">
                <span>
                    <h2>Retiros Parciales</h2>
                    {#await getRetirosData() then data}
                        <p class="text-green-600">{data.datasets[1].values[0]}</p>                       
                    {/await}
                </span>
            </div>
            <div>
                <img src="{leaveIcon}" alt="">
                <span>
                    <h2>Retiros Totales</h2>
                    {#await getRetirosData() then data}
                        <p class="text-red-600">{data.datasets[3].values[0]}</p>                       
                    {/await}
                </span>
            </div>
            <div>
                <img src="{reingresosIcon}" alt="">
                <span>
                    <h2>Reingresos</h2>
                    {#await getReingresosData() then data}
                        <p class="text-pink-600">{data.result}</p>                       
                    {/await}
                </span>
            </div>
        </div>

        <div class="w-full flex items-center justify-around mt-4 gap-4 p-2">
            <div class="border-2 rounded-md w-2/4 bg-white">
                {#await getRetirosData()}
                    <h1 class="text-lg font-bold font-poppins animate-pulse">Obteniendo datos...</h1>
                {:then data} 
                    <Chart title="Retiros Parciales y Retiros totales" data={data} type="bar"/>                   
                {/await}
            </div>

            <div class="border-2 rounded-md w-2/4 bg-white">
                {#await getPrestamosData()}
                    <h1 class="text-lg font-bold font-poppins animate-pulse ">Obteniendo datos...</h1>
                {:then data} 
                    <Chart title="Prestamos otorgados durante el presente Mes" data={data} type="bar" colors={["#FACC1E", "#FA641E"]}/>                   
                {/await}
            </div>
        </div>
    </div>
</main>

<style lang="postcss">
    .tab {
        @apply w-full h-16 mt-3 flex items-center justify-start gap-6;
    }
    .tab div {
        @apply h-full w-fit flex items-center justify-around gap-2 p-3 rounded-md border-2 shadow-lg bg-white;
    }
    .tab div img {
        @apply size-10;
    }
    .tab div span h2 {
        @apply text-lg font-poppins font-bold;
    }
    .tab div span p{
        @apply text-lg font-bold font-poppins;
    }
</style>