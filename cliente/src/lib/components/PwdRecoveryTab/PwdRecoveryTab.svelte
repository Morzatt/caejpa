<script lang="ts">
    import pwdIcon from "$lib/images/password_FILL0_wght400_GRAD0_opsz24.svg"
    import ServerMessage from "$lib/components/ServerMessage/ServerMessage.svelte";
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
    import Tooltip1 from "../tooltip/Tooltip1.svelte";

    $: username = "";
    let pregunta1 = ""
    let pregunta2 = ""
    let newPwd: string = "";
    
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
    
    let pwdVisible = false;
    let pwdInput: any;

    function showPwd () {
        pwdVisible = !pwdVisible;

        if (!pwdVisible) {
            pwdInput.type = "text"
        } else {
            pwdInput.type = "password"
        }
    }

    async function getQuestions(username:string) {
        const request = await fetch("http://localhost:2606/register/getUserSecurityQuestions", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ 
                username: username
            })
        })
        const response = await request.json()
        return response 
    }

	async function handleSubmit() {
		try {
			const response = await fetch("http://localhost:2606/register/passwordRecovery", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				credentials: "include",
				body: JSON.stringify({ 
                    username: username,
                    newPassword: newPwd,
                    pregSeg1: pregunta1,
                    pregSeg2: pregunta2
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

<main class="rounded-md">
    <h1 class="text-4xl text-center font-poppins font-bold">Recuperar Contraseña</h1>

    <div class="w-full flex flex-col items-center mt-4 relative">
        {#if loginWarning}	
            <ServerMessage  messagePosition={"top-[-7rem] right-0"} 
                            serverStatus={serverStatus} 
                            messageFromTheServer={warningMessage}/>
        {/if}

        <div class="w-2/4 p-2 relative">
            <p>Nombre de Usuario:</p>
            <input bind:value={username} type="text"> 
        </div>

        {#await getQuestions(username) then preguntas}
            <div class="w-full"
                transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}>
                <div class="flex p-2">
                    <div class="w-[50%] px-2 ">
                        <h1 class="text-xl">Información Del Usuario</h1>
                        <span class="mt-[2.99rem] w-full relative group">
                            <p class="absolute top-[-2rem] w-full">Nueva Contraseña</p>
                            <input bind:this={pwdInput} bind:value={newPwd} type="password">
                            <img class="absolute right-4 top-[50%] translate-y-[-50%] size-9 hover:cursor-pointer" 
                                src="{pwdIcon}" 
                                alt=""
                                on:click={showPwd}>
                            <Tooltip1 textBody="Presione el icono para mostrar contraseña" messagePosition="right-0 top-[-4.5rem]" origin="origin-bottom"/>
                        </span>
                    </div>           

                    <div class="w-[50%] px-2">
                        <h1 class="text-xl">Preguntas de Seguridad</h1>
                        <div class="py-4">
                            <p class="mb-2">{preguntas[0].pregunta1}</p>
                            <input bind:value={pregunta1} type="text">
                        </div>
                        <div class="mt-2 w-full relative">
                            <p class="mb-2">{preguntas[0].pregunta2}</p>
                            <input bind:value={pregunta2}  type="text">
                        </div>
                    </div>
                </div>
            </div>

            <button class="mt-4 border py-2 px-12 bg-blue-700 text-white rounded-md
                            transition-all ease-linear duration-300 transform
                            hover:bg-blue-400 active:bg-blue-800"
                    on:click={handleSubmit}>Aceptar</button>
        {/await}
    </div>
</main>

<style lang="postcss">
	span {
        @apply flex justify-center items-center relative rounded-md ;
    }

    span img {
        @apply size-8 absolute right-3;
    }

    input{
        @apply w-full px-4 py-2 border-2 border-slate-600 rounded-md;
    }
</style>