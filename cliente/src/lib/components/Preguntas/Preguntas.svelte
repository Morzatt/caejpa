<script lang="ts">
    import { slide } from "svelte/transition";
    import { getPreguntas } from "./preguntas"; 
    import { quintOut } from "svelte/easing";
    import ServerMessage from "../ServerMessage/ServerMessage.svelte";
    import { base } from "$lib";

    export let username: string;

    let pregunta1 = "";
    let respuesta1 = "";

    let pregunta2 = "";
    let respuesta2 = "";

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

    async function handleSubmit() {
        try {
            const response = await fetch(`${base}/register/securityQuestions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({
                    usuario: username,
                    pregunta1: pregunta1,
                    respuesta1: respuesta1,
                    pregunta2: pregunta2,
                    respuesta2: respuesta2
                })
            });

            const data = await response.json()

			if (response.status === 200) {
				showWarning(data.message, response.status)
                location.reload()
			} else {
				showWarning(data.message, response.status)
			}
        } catch (err) {
            console.log(err)
        }	
    }
</script>

<div class="main h-[100%] w-[30%] fixed top-[50%] left-[50%] border-2 border-slate-300 rounded-md
            origin-bottom transition-all duration-500 shadow-2xl"
            transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}>
    <div class="size-full bg-white rounded-md relative">
        {#if loginWarning}	
            <ServerMessage  messagePosition={"top-10 right-[-24rem]"} 
                            serverStatus={serverStatus} 
                            messageFromTheServer={warningMessage}/>
        {/if}
        <!-- Section -->
        <div class="section">
            <div>
                <div class="p-2">
                    <h1 class="w-full font-poppins font-bold text-slate-700 text-center">Preguntas de Seguridad</h1>
                    <p class="mt-4 text-sm overflow-auto">Escoja y configure las preguntas de seguridad de su preferencia. <br>
                    Recuerde que estas preguntas serán utilizadas como metodo de autenticación en caso de necesitar una recuperación de contraseña.</p>
                </div>

                    <div class="mt-2 flex flex-col justify-start items-center w-full">
                    <span class="mt-2 w-[100%]">
                        <p>Pregunta de Seguridad 1:</p>
                        <div class="flex justify-around w-full items-center">
                            <select class="w-full border-2" name="" id="" bind:value={pregunta1}>
                                {#await getPreguntas()}
                                   <option value="{null}">No se pudo obtener las preguntas de seguridad disponibles</option> 
                                {:then preguntas} 
                                    <option value="{null}">Seleccione una pregunta de seguridad</option>
                                    {#each preguntas as pregunta}
                                        <option value="{pregunta}">{pregunta}</option>
                                    {/each}
                                {/await}
                            </select>
                        </div>
                    </span>
                    
                    <span class="mt-2">
                        <label for="member-name">Respuesta</label>
                        <input  class="border-2" type="text" bind:value={respuesta1}>
                    </span>

                    <span class="mt-8 w-[100%]">
                        <p>Pregunta de Seguridad 2:</p>
                        <div class="flex justify-around w-full items-center">
                            <select class="w-full border-2" name="" id="" bind:value={pregunta2}>
                                {#await getPreguntas()}
                                   <option value="{null}">No se pudo obtener las preguntas de seguridad disponibles</option> 
                                {:then preguntas} 
                                    <option value="{null}">Seleccione una pregunta de seguridad</option>
                                    {#each preguntas as pregunta}
                                        <option value="{pregunta}">{pregunta}</option>
                                    {/each}
                                {/await}                                      
                            </select>
                        </div>
                    </span>
                    
                    <span class="mt-2">
                        <label for="member-name">Respuesta</label>
                        <input  class="border-2" type="text" bind:value={respuesta2}>
                    </span>

                    <button class="mt-4 border py-2 px-12 bg-blue-700 text-white rounded-md
                                    transition-all ease-linear duration-300 transform
                                    hover:bg-blue-400 active:bg-blue-800"
                            on:click={handleSubmit}>Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    .main {
        transform: translate(-50%, -50%);
    }

    .section {
        @apply w-[100%] p-4 pb-10;
    }

    .section h1 {
        @apply text-2xl font-bold;
    }

    .section input {
        @apply w-full border-x-0 border-t-0 border-b-2 border-slate-800 py-1;
    }

    .section select {
        @apply w-full border-x-0 border-t-0 border-b-2 border-slate-800 py-1;
    }
    
    .section span {
        @apply w-full;
    }
 </style>