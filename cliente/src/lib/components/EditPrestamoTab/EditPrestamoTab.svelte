<script lang="ts">
    import type {PrestamoInfo} from "./types"
    import editPrestamoTabStore from "../../../stores/prestamoStore"
    import Tooltip1 from "$lib/components/tooltip/Tooltip1.svelte"
    export let id: string | number;

    // Images Import
    import deleteIcon from "$lib/images/delete_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import checkIcon from "$lib/images/check_circle_FILL0_wght400_GRAD0_opsz24.svg"
    import closeIcon from "$lib/images/close_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import fechaIcon  from "$lib/images/calendar_add_on_FILL0_wght400_GRAD0_opsz24.svg"
    import afiliadoIcon from "$lib/images/account_circle_FILL0_wght400_GRAD0_opsz24.svg"
    import expedienteIcon from  "$lib/images/badge_FILL0_wght400_GRAD0_opsz24.svg"
    import cedulaIcon from "$lib/images/id_card_FILL0_wght400_GRAD0_opsz24.svg"
    import cantidadIcon from "$lib/images/payments_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import gastosIcon from "$lib/images/sell_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import servicioIcon from "$lib/images/account_balance_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import porcentajeIcon from "$lib/images/account_balance_wallet_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import totalIcon from "$lib/images/production_quantity_limits_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import montoIcon from "$lib/images/attach_money_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import tiempoIcon from "$lib/images/schedule_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import mensualIcon from "$lib/images/savings_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import quincenalIcon from "$lib/images/savings_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import conceptoIcon from "$lib/images/description_24dp_FILL0_wght400_GRAD0_opsz24.svg"


    function closeTab() {
        editPrestamoTabStore.set(() => false)
    }
 
    async function getPrestamo(): Promise<PrestamoInfo> {
        const response = await fetch(`http://localhost:2606/prestamos/${id}`)
        const data: PrestamoInfo = await response.json()
        return data
    }
    let pagadoTab = false
    let confirmationTabState = false
    function confirmationTab() {
        confirmationTabState = !confirmationTabState 
    }

    async function deletePrestamo() {
        const response = await fetch(`http://localhost:2606/prestamos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(await response.json())
        closeTab()
    }
</script>

<main>
    <div class="border-2 p-6 shadow-xl rounded-md bg-white w-full relative pb-20">
        <button class="absolute right-2 top-2" on:click={closeTab}>
            <img src="{closeIcon}" alt="">
        </button>

        <h1 class="text-2xl font-bold font-poppins">Prestamo</h1>

        <div class="prestamo-table "> 
            {#await getPrestamo() then prestamo}
                <p><img src="{fechaIcon}" alt=""><b>Fecha: </b>  {prestamo.fecha}</p>
                <p><img src="{afiliadoIcon}" alt=""><b>Afiliado: </b> {prestamo.nombre} {prestamo.apellido}</p>
                <p><img src="{expedienteIcon}" alt=""><b>Expediente: </b> {prestamo.expediente}</p>
                <p><img src="{cedulaIcon}" alt=""><b>Cedula: </b> V-{prestamo.cedula}</p>
                <p><img src="{cantidadIcon}" alt=""><b>Cantidad Solicitada: </b> {prestamo.cantidad}Bs</p>
                <p><img src="{gastosIcon}" alt=""><b>Gastos Administrativos: </b> {prestamo.gastosAdministrativos}Bs</p>
                <p><img src="{servicioIcon}" alt=""><b>Servicio de Transferencia Efectiva: </b> {prestamo.servicioDeTransferencia}Bs</p>
                <p><img src="{porcentajeIcon}" alt=""><b>Porcentaje de Intereses: </b> {prestamo.porcentajeDeIntereses}%</p>
                <p><img src="{totalIcon}" alt=""><b>Total de Intereses: </b> {prestamo.montoDeIntereses}Bs</p>
                <p><img src="{montoIcon}" alt=""><b>Monto del Pago: </b> {prestamo.total}Bs</p>
                <p><img src="{tiempoIcon}" alt=""><b>Tiempo de Pago: </b> {prestamo.tiempoDePago} Meses</p>
                <p><img src="{mensualIcon}" alt=""><b>Cuota Mensual: </b> {prestamo.cuotaMensual}Bs</p>
                <p><img src="{quincenalIcon}" alt=""><b>Cuota Quincenal: </b> {prestamo.cuotaQuincenal}Bs</p>
                <p><img src="{conceptoIcon}" alt=""><b>Concepto: </b> {prestamo.concepto}</p>
            {/await}
        </div>

        <div class="w-2/4 {confirmationTabState ? "scale-100" : "scale-0"} bg-white 
                    p-2 rounded-md border-2 border-slate-500 mb-2 absolute bottom-4 left-14
                    transition-all duration-100 ease-linear origin-bottom-left">
            <h1 class="text-xl font-poppins text-red-600"><b>Eliminar Prestamo</b></h1>
            <h1>¿Está seguro de que desea eliminar éste prestamo? Una vez eliminado, la información es <b>irrecuperable.</b></h1>
            <div class="flex items-center justify-end gap-6 border-t-2 border-slate-500 pt-3">
                <button class="border-2 border-black px-4 py-1 rounded-md font-poppins
                               hover:bg-black hover:text-white active:bg-gray-700
                                transition-all duration-200 ease-linear" 
                                on:click={confirmationTab}>Regresar</button> 
                <button class="px-4 py-1 bg-red-600 border-2 border-red-600 text-white font-poppins rounded-md
                hover:bg-red-500 active:bg-red-700 transition-all duration-200 ease-linear"
                        on:click={deletePrestamo}>Eliminar</button>
            </div>
        </div>

        <button class="size-8 absolute bottom-4 left-4 rounded-md bg-red-600 active:bg-red-300 hover:bg-red-700 group transition-all ease-linear duration-200"
                on:click={() => {confirmationTab()}}>
            <img class="size-full filter rounded-md invert transition-all ease-linear duration-200" src="{deleteIcon}" alt="">
        </button> 
    </div>
</main>

<style lang="postcss">
    main {
        @apply fixed top-[5%] left-[60%] w-[75%] translate-x-[-50%] min-h-[80vh];
    }
    .prestamo-table {
        @apply w-full max-h-[75vh] mt-4 grid grid-cols-2 pb-8 border-b-2;
    }
    .prestamo-table p{
        @apply flex border-2 border-slate-300 w-full gap-2 text-lg transform p-2 bg-white transition-all duration-100 ease-linear;
    }
    .prestamo-table p img {
        @apply border-r-2 border-black pr-3;
    }
</style>