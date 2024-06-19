<script lang="ts">
    import Tooltip1 from '$lib/components/tooltip/Tooltip1.svelte';
    import ServerMessage from '$lib/components/ServerMessage/ServerMessage.svelte';
    import AfiliadoFrecuenteTab from "$lib/components/AfiliadoFrecuenteTab/AfiliadoFrecuenteTab.svelte"
    import afiliadoDataStore from '../../stores/afiliadoFrecuente';

    import type { PageData } from './$types';
    export let data: PageData;
    import contactIcon from "$lib/images/id_card_FILL0_wght400_GRAD0_opsz24.svg"

    const images = data.images

    let afiliadoFrecuenteTabState = false;
    afiliadoDataStore.subscribe(info => {
        if (info) {
            expediente = info.expediente
            nombre = info.nombre
            apellido = info.apellido
            cedula = info.cedula
            afiliadoFrecuenteTabState = info.tabState
        } 
    })

   $: expediente = ""
   $: fecha = ""
   $: nombre = ""
   $: apellido = ""
   $: cedula = 0
   $: cantidad = 0
   $: gastosAdministrativos = data.variables[0].valor 
   $: servicioDeTransferencia = cantidad ? cantidad * data.variables[1].valor / 100 : 0
   $: montoGastosAdministrativos = cantidad ? cantidad - gastosAdministrativos - servicioDeTransferencia : 0
   $: porcentajeDeIntereses = data.variables[2].valor 
   $: montoDeIntereses = montoGastosAdministrativos ? montoGastosAdministrativos * porcentajeDeIntereses / 100 : 0
   $: total = montoGastosAdministrativos ? montoGastosAdministrativos - montoDeIntereses : 0 
   $: tiempoDePago = 0
   $: cuotaMensual = cantidad ? cantidad / tiempoDePago : 0
   $: cuotaQuincenal = cuotaMensual ? cuotaMensual / 2 : 0
   $: concepto = ""


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

    let afiliate: boolean = false;
    async function handleSubmit() {
        try {
            const response = await fetch(`http://localhost:2606/prestamos?afiliate=${afiliate}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({ 
                    expediente: expediente,
                    fecha: fecha,
                    nombre: nombre,
                    apellido: apellido,
                    cedula: cedula,
                    cantidad: cantidad,
                    gastosAdministrativos: gastosAdministrativos,
                    servicioDeTransferencia: servicioDeTransferencia,
                    montoGastosAdministrativos: montoGastosAdministrativos,
                    porcentajeDeIntereses: porcentajeDeIntereses,
                    montoDeIntereses: montoDeIntereses,
                    total: total,
                    tiempoDePago: tiempoDePago,
                    cuotaMensual: cuotaMensual,
                    cuotaQuincenal: cuotaQuincenal,
                    concepto: concepto 
                })
            });
			const data = await response.json()

			if (response.status === 200) {
				showWarning(data.message, response.status)
			} else {
				showWarning(data.message, response.status)
			}
        } catch (err) {
            console.log(err)
        }
    }   

    function getUp() {
        const getUpButton: any = document.querySelector("#getUp")
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                getUpButton.style.display = 'block';
            } else {
                getUpButton.style.display = 'none';
            }
        };
        getUpButton.onclick = function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Opcional: para un desplazamiento suave
            });
        };        
    }


    function showAfiliadoFrecuenteTab() {
        if (!afiliadoFrecuenteTabState) {
            afiliadoFrecuenteTabState = true
            return
        }
    }
</script>

<div id="main" class="w-full {afiliadoFrecuenteTabState ? "blur-md" : ""} transition-all duration-200 ease-linear">
    <!-- Section -->
    <div class="section flex justify-around border-2 rounded-md relative">
        {#if warningState}
            <ServerMessage  messageFromTheServer={warningMessage}
                            messagePosition={"top-20 right-10"}
                            serverStatus={serverStatus}/> 
        {/if}
        <div class="w-[50%]">
            <p class="text-xl font-poppins font-medium">Previsualización</p>
            <p class="mt-5">Los datos mostrados en la tabla de la derecha serán los datos enviados, procesados y almacenados. Por favor, asegurése de que son correctos, de rellenar todos los campos, y de que no ha cometido ningún error en la introducción de los datos.</p>
            <p class="mt-5">En caso de que desee modificar el valor de uno de los montos variables por defecto (p. ej., Gastos Administrativos, Porcentaje de Intereses, etc...),
                dirigirse al apartado de <b class="font-poppins font-medium">Administrar Prestamos</b>
            </p>
            <div class="w-full flex">
                <button on:click={handleSubmit} class="submit-form-button w-[40%]"><span class="inner w-full">Enviar</span></button>
            </div> 
        </div> 

        <table class="preview_table">
            <tr>
                <th><p>Expediente</p></th>
                <td><p>{expediente}</p></td>
            </tr>
            <tr>
                <th><p>Fecha</p></th>
                <td><p>{fecha}</p></td>
            </tr>
            <tr>
                <th><p>Nombre</p></th>
                <td><p>{nombre}</p></td>
            </tr>
            <tr>
                <th><p>Apellido</p></th>
                <td><p>{apellido}</p></td>
            </tr>
            <tr>
                <th><p>Cedula</p></th>
                <td><p>V- {cedula}</p></td>
            </tr>
            <tr>
                <th><p>100%</p></th>
                <td><p>{cantidad} Bs</p></td>
            </tr>
            <tr>
                <th><p>Gastos Administrativos</p></th>
                <td><p>{gastosAdministrativos} Bs</p></td>
            </tr>
            <tr>
                <th><p>Servicio de Transferencia Efectiva</p></th>
                <td><p>{servicioDeTransferencia.toFixed(2)} Bs</p></td>
            </tr>
            <tr>
                <th><p>Monto post-Gastos Administrativos</p></th>
                <td><p>{montoGastosAdministrativos.toFixed(2)} Bs</p></td>
            </tr>
            <tr>
                <th><p>Porcentaje de Intereses</p></th>
                <td><p>{porcentajeDeIntereses}%</p></td>
            </tr>
            <tr>
                <th><p>Monto de Intereses</p></th>
                <td><p>{montoDeIntereses.toFixed(2)} Bs</p></td>
            </tr>
            <tr>
                <th><p>Monto del Pago</p></th>
                <td><p>{total.toFixed(2)} Bs</p></td>
            </tr>
            <tr>
                <th><p>Tiempo</p></th>
                <td><p>{tiempoDePago} Meses</p></td>
            </tr>
            <tr>
                <th><p>Cuota Mensual</p></th>
                <td><p>{cuotaMensual.toFixed(2)} Bs</p></td>
            </tr>
            <tr>
                <th><p>Cuota Quincenal</p></th>
                <td><p>{cuotaQuincenal.toFixed(2)} Bs</p></td>
            </tr>
            <tr>
                <th><p>Concepto</p></th>
                <td><p>{concepto}</p></td>
            </tr>
        </table>
        <img class="absolute bottom-10 size-16 animate-bounce" src="{images?.arrowDown}" alt="">
    </div>

    <!-- Section -->
    <div class="section">
        <div class="w-full h-fit mb-4 flex items-center justify-end">
            <button class="w-1/4 p-1 shadow-inner
                        flex justify-around items-center
                        border-2 border-black rounded-md"
                        on:click={showAfiliadoFrecuenteTab}>
               <img src="{contactIcon}" alt="" class="size-8"> 
               <h3 class="font-poppins">Afiliados Frecuentes</h3>
            </button>
        </div>

        <p class="sectionTitle">Información del Empleado</p>
        <p class="mb-2">Introduzca toda información relacionada a los datos del empleado y la fecha de registro del prestamo.</p>
        <form action="">
            <table class="prestamo_table">
                <thead>
                    <tr>
                        <th class="group">
                            <p>Expediente</p>
                            <Tooltip1 textBody="Número de Expediente del Afiliado." 
                                      messagePosition="top-[-200%] right-[-2px]"
                                      origin="bottom"/>
                        </th>
                        <th class="group">
                            <p>Fecha</p>
                            <Tooltip1 textBody="Fecha de la realización del prestamo." 
                                      messagePosition="top-[-290%] right-[-2px]"
                                      origin="bottom"/>
                        </th>
                        <th class="group">
                            <p>Nombre</p>
                            <Tooltip1 textBody="Nombre del Afiliado." 
                                      messagePosition="top-[-150%] right-[-2px]"
                                      origin="bottom"/>
                        </th>
                        <th class="group">
                            <p>Apellido</p>
                            <Tooltip1 textBody="Apellido del Afiliado." 
                                      messagePosition="top-[-150%] right-[-2px]"
                                      origin="bottom"/>
                        </th>
                        <th class="group">
                            <p>Cedula</p>
                            <Tooltip1 textBody="Cedula del Afiliado. Debe de realizarse sin puntos" 
                                      messagePosition="top-[-200%] right-[-2px]"
                                      origin="bottom"/>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input bind:value={expediente} type="text">
                        </td>
                        <td>
                            <input bind:value={fecha} type="date" required>
                        </td>
                        <td>
                            <input bind:value={nombre} type="text">
                        </td>
                        <td>
                            <input bind:value={apellido} type="text">
                        </td>
                        <td>
                            <input bind:value={cedula} type="number">
                        </td>
                    </tr>
                </tbody>
            </table>
        </form> 

        <div class="flex justify-end items-center h-[2rem] w-full mt-2">
            <input id="customCheckbox" type="checkbox" class="form-checkbox h-4 w-4"
                   bind:checked={afiliate}>
            <label for="customCheckbox" class="ml-2 text-md font-medium text-gray-900">Añadir a <b class="font-poppins">Afiliados Frecuentes</b></label>
        </div>
    </div>

    <!-- Section -->
    <div class="section">
        <p class="sectionTitle">Información del Prestamo</p>

        <form action="">
            <table class="prestamo_table">
                <thead>
                    <tr>
                        <th class="group">
                            <p>Cantidad</p>
                            <div class="tooltip scale-0 top-[-150%] right-[-2px] group-hover:scale-100">
                                <div class="tooltipInner">
                                    Cantidad total en Bolívares
                                </div>
                            </div>
                        </th>
                        <th class="group">
                            <p>Gastos Administrativos</p>
                            <div class="tooltip scale-0 top-[-220%] right-[-2px] group-hover:scale-100">
                                <div class="tooltipInner">
                                    Cobro en Bolivares por concepto de Gastos Administrativos 
                                </div>
                            </div>
                        </th>
                        <th class="group">
                            <p>Porcentaje de Intereses</p>
                            <div class="tooltip scale-0 top-[-220%] right-[-2px] group-hover:scale-100">
                                <div class="tooltipInner">
                                    Porcentaje para los intereses del prestamo realizado.
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input bind:value={cantidad} type="number">
                        </td>
                        <td>
                            <h2 class="bg-white px-2 py-2 text-center rounded-md">{gastosAdministrativos} Bs.</h2>
                        </td>
                        <td>
                            <h2 class="bg-white px-2 py-2 text-center rounded-md">{porcentajeDeIntereses}%</h2>
                            <!-- <input bind:value={porcentajeDeIntereses} type="number"> -->
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
    <!-- Section -->
    <div class="section">
        <p class="sectionTitle">Información del Pago</p>

        <form action="">
            <table class="prestamo_table">
                <thead>
                    <tr>
                        <th class="group">
                            <p>Lapso del Pago</p>
                            <div class="tooltip scale-0 top-[-150%] right-[-2px] group-hover:scale-100">
                                <div class="tooltipInner">
                                    Lapso en meses dado al Afiliado para pagar el prestamo.
                                </div>
                            </div>
                        </th>
                        <th class="group">
                            <p>Concepto</p>
                            <div class="tooltip scale-0 top-[-150%] right-[-2px] group-hover:scale-100">
                                <div class="tooltipInner">
                                    Concepto del prestamo.
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input bind:value={tiempoDePago} type="number">
                        </td>
                        <td>
                            <input bind:value={concepto} type="text">
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>

    <button id="getUp" on:click={getUp} class="group">
        <img class="size-full filter invert transform rotate-180" src="{images?.arrowDown}" alt="">
        <Tooltip1 textBody="Subir" origin="origin-left" messagePosition=" right-[-150%] top-[20%]"/>
    </button>
</div>

{#if afiliadoFrecuenteTabState}
    <AfiliadoFrecuenteTab/>
{/if}

<style lang="postcss">
    .section {
        @apply w-full h-fit px-2 py-4 mb-8 border-b;
    }    

    .section .sectionTitle {
        @apply text-2xl italic mb-4;
    }

    .section .tooltip {
        @apply border-2 border-black text-white rounded-md 
        absolute inline-block
        w-full h-fit 
        transition-all duration-200 origin-bottom;
        background-color: #e5e5f7;
        background-size: 10px 10px;
        background-image: repeating-linear-gradient(45deg, #000000 0, #000000 1px, #e5e5f7 0, #e5e5f7 50%); 
    }

    .section .tooltip .tooltipInner {
        @apply bg-white text-black rounded-md p-1
        w-full h-fit
        inline-block transform border-2 border-black;
        user-select: none;
        transform: translate3d(-0.4em, -0.4em, 0);
        transition: transform 240ms cubic-bezier(0.175, 0.885, 0.320, 1.275);
        transition-delay: 220ms;
    }   

    .section .submit-form-button {
        @apply font-poppins;
        font-weight: 700;
        background-color: #000000;
        border-radius: 0.6em;
        display: inline-block;
        margin: 1em;
        margin-top: 30px;
    }

    .section table input {
        @apply px-1 py-2 border-2 rounded-md border-slate-600;
    }
    .section table input:required {
        @apply border-red-500;
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

    #getUp {
        @apply  bg-black rounded-full size-16 shadow-md bottom-28 relative bottom-0 left-0;
    }


/* PRESTAMO INPUTS TABLE */
.prestamo_table {
    overflow: auto;
    width: 100%;
}

.prestamo_table table {
    border: 1px solid #b3b3b3;
    height: 100%;
    width: 100%;
    table-layout: auto;
    border-collapse: collapse;
    border-spacing: 0.5px;
    text-align: center;
}

.prestamo_table th {
    @apply relative;
    border: 1px solid #b3b3b3;
    background-color: #000000;
    color: #ffffff;
    padding: 5px;
}

.prestamo_table td {
    border: 1px solid #b3b3b3;
    padding: 2px;
}

.prestamo_table tr:nth-child(even) td {
    background-color: #ffffff;
    color: #000000;
}

.prestamo_table tr:nth-child(odd) td {
    background-color: #ebeaea;
    color: #000000;
}

.prestamo_table input {
   @apply w-full rounded-sm m-0 p-0 border-2;
}



/* PREVIEW TABLE */
.preview_table {
    overflow: auto;
    width: 40%;
}

.preview_table table {
    border: 1px solid #6b6b6b;
    height: 100%;
    width: 100%;
    table-layout: auto;
    border-collapse: collapse;
    border-spacing: 0.5px;
    text-align: left;
}

.preview_table th {
    border: 1px solid #6b6b6b;
    background-color: #d4d4d4;
    color: #000000;
    padding: 5px;
}

.preview_table td {
    border: 1px solid #6b6b6b;
    background-color: #ffffff;
    color: #000000;
    padding: 5px;
}
</style>