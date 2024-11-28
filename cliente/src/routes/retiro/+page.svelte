<script lang="ts">
    import Tooltip1 from '$lib/components/tooltip/Tooltip1.svelte';
    import ServerMessage from '$lib/components/ServerMessage/ServerMessage.svelte';
    import AfiliadoFrecuenteTab from "$lib/components/AfiliadoFrecuenteTab/AfiliadoFrecuenteTab.svelte"
    import afiliadoDataStore from '../../stores/afiliadoFrecuente';

    import type { PageData } from './$types';
    export let data: PageData;
    import contactIcon from "$lib/images/id_card_FILL0_wght400_GRAD0_opsz24.svg"
    import alertIcon from "$lib/images/priority_high_FILL0_wght400_GRAD0_opsz24.svg"
    import { base } from '$lib';

    const images = data.images

    let afiliadoFrecuenteTabState = false;
    afiliadoDataStore.subscribe(info => {
        if (info) {
            expediente = info.expediente
            nombre = info.nombre
            apellido = info.apellido
            cedula = info.cedula as number
            afiliadoFrecuenteTabState = info.tabState
        } 
    })

   $: expediente = ""
   $: fecha = ""
   $: nombre = ""
   $: apellido = ""
   $: cedula = 0
   $: total = 0
   $: motivo = ""
   $: modalidad = ""
   $: referencia = 0

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
            const response = await fetch(`${base}/retiros?afiliate=${afiliate}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(modalidad === "Transferencia" ? { 
                    expediente: expediente,
                    fecha: fecha,
                    nombre: nombre,
                    apellido: apellido,
                    cedula: cedula,
                    total: total,
                    motivo: motivo,
                    modalidad: modalidad,
                    referencia: referencia,
                } : {
                    expediente: expediente,
                    fecha: fecha,
                    nombre: nombre,
                    apellido: apellido,
                    cedula: cedula,
                    total: total,
                    motivo: motivo,
                    modalidad: modalidad,
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
                <th><p>Total</p></th>
                <td><p>{total} Bs</p></td>
            </tr>
            <tr>
                <th><p>Motivo</p></th>
                <td><p>{motivo}</p></td>
            </tr>
            <tr>
                <th><p>Modalidad</p></th>
                <td><p>{modalidad}</p></td>
            </tr>
            {#if modalidad === "Transferencia"}
            <tr>
                <th><p>Referencia</p></th>
                <td><p>REF-{referencia}</p></td>
            </tr>
            {/if}
        </table>
        <!-- <img class="absolute bottom-10 size-16 animate-bounce" src="{images?.arrowDown}" alt=""> -->
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
                            <Tooltip1 textBody="Fecha de la realización del retiro." 
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
        <p class="sectionTitle">Información del Retiro</p>

        <form action="">
            <table class="prestamo_table">
                <thead>
                    <tr>
                        <th class="group">
                            <p>Cantidad</p>
                            <div class="tooltip scale-0 top-[-150%] right-[-2px] group-hover:scale-100">
                                <div class="tooltipInner">
                                    Cantidad total en Bolívares.
                                </div>
                            </div>
                        </th>
                        <th class="group">
                            <p>Motivo</p>
                            <div class="tooltip scale-0 top-[-220%] right-[-2px] group-hover:scale-100">
                                <div class="tooltipInner">
                                    Tipo de Retiro de Fondos.
                                </div>
                            </div>
                        </th>
                        <th class="group">
                            <p>Modalidad</p>
                            <div class="tooltip scale-0 top-[-220%] right-[-2px] group-hover:scale-100">
                                <div class="tooltipInner">
                                    Modalidad del pago a realizado.
                                </div>
                            </div>
                        </th>
                    {#if modalidad === "Transferencia"}
                        <th class="group">
                            <p>Referencia</p>
                            <div class="tooltip scale-0 top-[-220%] right-[-2px] group-hover:scale-100">
                                <div class="tooltipInner">
                                    Porcentaje para los intereses del prestamo realizado.
                                </div>
                            </div>
                        </th>                           
                    {/if}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input bind:value={total} type="number">
                        </td>
                        <td>
                            <select name="" id="" bind:value={motivo} required>
                                <option value={null} selected>Seleccione un motivo de retiro</option>
                                <option value="Retiro Parcial">Retiro Parcial</option>
                                <option value="Retiro Total">Retiro Total</option>
                            </select>
                        </td>
                        <td>
                            <select name="" id="" bind:value={modalidad} required>
                                <option value={null} selected>Seleccione un motivo de retiro</option>
                                <option value="Efectivo">Efectivo</option>
                                <option value="Transferencia">Transferencia</option>
                            </select>
                        </td>
                    {#if modalidad === "Transferencia"}
                        <td>
                            <input bind:value={referencia} type="number">
                        </td>
                    {/if}
                    </tr>
                </tbody>
            </table>
        </form>

        {#if motivo === "Retiro Total"}
            <div class="p-2 border-2 rounded-sm w-2/4 mt-5">
                <span class="flex items-center justify-start">
                    <img src="{alertIcon}" alt="" class="size-7">
                    <h1 class="text-red-600 text-xl font-poppins">PRECAUCIÓN, RETIRO TOTAL DEL AFILIADO</h1>
                </span>
                <p>Al seleccionar el motivo de retiro total del afiliado, el anterior quedará 
                inhabilitado permanentemente de la aplicación, por lo que no se podrán realizar prestamos ni retiros
                parciales a su nombre</p>
            </div>
        {/if}
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

    .section table input:invalid {
        @apply border-red-500;
    }

    .section table select {
        @apply px-1 py-2 border-2 rounded-md border-slate-600 w-full;
    }
    .section table select:invalid{
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