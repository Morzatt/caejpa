<!-- svelte-ignore tag-option-deprecated -->
<svelte:head>
    <title>Sistema de Administracion de Prestamos y Transacciones de la Caja de Ahorro de Empleados, Jubilados, Pensionados y Personal Administrativo del Estado Bolivar </title>
</svelte:head>

<script lang="ts">
    import "../app.css"
    import userInfo from "../stores/user"

    // Components Import
    import ServerMessage from "$lib/components/ServerMessage/ServerMessage.svelte";
    import SideBar from "$lib/components/sidebar/sidebar.svelte"
    import Tooltip1 from "$lib/components/tooltip/Tooltip1.svelte"
    import PwdRecoveryTab from "$lib/components/PwdRecoveryTab/PwdRecoveryTab.svelte"
    import Preguntas from "$lib/components/Preguntas/Preguntas.svelte"

    
    // Images Import
	import pwdIcon from "$lib/images/password_FILL0_wght400_GRAD0_opsz24.svg"
	import userIcon from "$lib/images/account_circle_FILL0_wght400_GRAD0_opsz24.svg"
    import officeCubicleImage from "$lib/images/Good team-bro.svg"
    import homeFromWorkImage from "$lib/images/Telework-bro.svg"
    import pwdRecoveryIcon from "$lib/images/lock_reset_FILL0_wght400_GRAD0_opsz24.svg"
    import logoUPT from "$lib/images/logonuevo.png"
    import logoGobernacion from "$lib/images/logoGobernacion.png"

    // Login Check Logic
    let logged: boolean = false;
    userInfo.subscribe((info: any) => {
        if (info) {
            logged = true
        }
    })
	
	// 
	let isChecked = true;
	const handleCheckboxChange = () => {
		isChecked = !isChecked
        pwdRecovery = false
	}

    // Password Recovery Logic
    let pwdRecovery = false;
    function showPasswordRecoveryTab() {
        pwdRecovery = !pwdRecovery;
    }

    // Save Security Questions
    let securityQuestions = false;
    function showSecurityQuestions() {
        securityQuestions = !securityQuestions
    }

	// Message from the Server Logic
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
    
	// Show Password Button Logic
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

	// Form Submit Logic
    let nombre = "" 
    let apellido = ""
	let password: string = "";
	let username: string = "";
	async function handleSubmit() {
		try {
            if (!isChecked) {
                const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])(?!.*\s).{8,32}$/
                if (!regex.test(password)){
                    showWarning(`Su contraseña no cumple con los parametros de seguridad minimos: debe de contener al menos 
                    8 caracteres, una letra mayuscula, una letra minuscula,
                    un caracter especial.`, 400)
                    return 
                }
            }
			const response = await fetch(isChecked ? 'http://localhost:2606/login' : "http://localhost:2606/register", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				credentials: "include",
				body: JSON.stringify({ 
                    nombre: nombre, 
                    apellido: apellido,
					username: username,
					password: password,
				})
			});
			const data = await response.json()

			if (response.status === 200) {
				showWarning(data.message, response.status)

                if (isChecked) {
                    location.reload()
                }

                if (!isChecked) {
                    showSecurityQuestions()
                }

				password = ""
			} else {
				showWarning(data.message, response.status)
			}
		} catch (err) {
			console.log(err)
		}	
	}
</script>

{#if logged}
    <SideBar/>

    <main class="flex w-screen h-screen">
        <div class="app-container">
            <slot/>
        </div>
    </main>
{:else}
    <div class="w-[8.6%] h-[100vh] absolute">
        <div>
            <img class="transform scale-125" src={logoGobernacion} alt="">
            <!-- <img src={logoUPT} alt=""> -->
        </div>
    </div>

    <main class="w-full h-fit 
                flex items-center justify-center 
                fixed left-[50%] top-[50%] 
                transform translate-x-[-50%] translate-y-[-50%]">
        
        <!-- Outer container-->
        <div class="p-4 w-[85%] duration-700 rounded-lg">
            <!-- Inner Cointainer -->
            <div class="w-full flex
                        border-2 border-slate-300 
                        rounded-md transition-all duration-300 transform"> 

                <!-- Actual Div -->
                <div class="relative min-h-[85vh]   
                            p-2 w-[50%] bg-gray-50
                            shadow-lg
                            transition-all
                            duration-700 {isChecked ? 'translate-x-[100%]' : ''}">
                                               
                    <div class="w-1/5 flex item-center justify-left relative group {isChecked ? "" : "hidden"}">
                        <button on:click={showPasswordRecoveryTab}>
                            <img class="size-12" src={pwdRecoveryIcon} alt="">
                        </button> 
                        <Tooltip1 textBody="Recuperar Contraseña" messagePosition="top-14 left-6" origin="origin-top-left"/>
                    </div>

                    <div class="transition-all duration-700
                                {pwdRecovery ? "scale-0 absolute origin-top" : "scale-100 origin-bottom"}">
                        <div class="transition-all ease-linear duration-300 {isChecked ? "text-center mt-2" : ""}">
                            <h1 class="p-3 text-4xl font-poppins font-bold text-slate-800">{isChecked ? 'Iniciar Sesión' : "Registrarse"}</h1>
                            <p class="px-3"> {isChecked ? "Acceda con su usuario y contraseña para comenzar a utilizar la aplicación." : "Cree un usuario para poder iniciar sesión"}</p>
                        </div>

                        <form on:submit|preventDefault={handleSubmit}
                            class="p-1 py-4 mt-6 w-[100%] flex flex-col justify-start items-center 
                                    gap-3">

                            {#if isChecked}
                                <!-- LOGIN -->
                                    <!-- username -->
                                    <span class="mt-4 w-[80%]">
                                        <input bind:value={username} class="w-[100%]" type="text" placeholder="Nombre de Usuario">
                                        <img src="{userIcon}" alt="">
                                    </span>
                                    <!--  -->

                                    <!-- password -->
                                    <span class="mt-4 w-[80%] group relative">
                                        <input bind:this={pwdInput} bind:value={password} type="password" class="w-[100%]" placeholder="Contraseña">
                                        <img class="hover:cursor-pointer" on:click={() => {showPwd()}} src="{pwdIcon}" alt="">
                                        
                                        <Tooltip1 textBody="Presione el icono para mostrar su contraseña"
                                                messagePosition="top-[-200%] right-0"
                                                origin="origin-right"/>
                                    </span>
                                    <!--  -->
                                <!-- LOGIN -->
                            {:else}
                                <!-- REGISTER -->
                                    <!-- Nombre y Apellido -->
                                    <div class="w-[100%] flex justify-around items-center">
                                        <span class="w-[50%] mx-2 group">
                                            <input class="w-[100%]" bind:value={nombre} name="nombre" type="text" placeholder="Nombre">
                                            <!-- <img src="{imagenes.nombre}" alt=""> -->
                                        </span>

                                        <span class="w-[50%] mx-2 group">
                                            <input class="w-[100%]" bind:value={apellido} name="apellido" type="text" placeholder="Apellido">
                                            <!-- <img src="{imagenes.apellido}" alt=""> -->
                                        </span>
                                    </div>
                                    <!--  -->
                        
                                    <!-- Username -->
                                    <span class="w-[80%] group">
                                        <input class="w-[100%]" bind:value={username} name="username" type="text" placeholder="Nombre de Usuario">
                                        <!-- <img src="{imagenes.username}" alt=""> -->
                                    </span>

                                    <!-- Contraseña -->
                                    <span class="w-[80%] group">
                                        <input class="w-[100%]"  bind:this={pwdInput} bind:value={password} type="password" placeholder="Contraseña">
                                        <img class="hover:cursor-pointer" on:click={() => {showPwd()}} src="{pwdIcon}" alt="">
                                        <Tooltip1 textBody="Presione el icono para mostrar su contraseña"
                                                messagePosition="top-[-200%] right-0"
                                                origin="origin-right"/>
                                    </span>
                                <!-- REGISTER -->
                            {/if}

                            <!-- submit -->
                            <div class="flexo">
                                <button class="bttn" type="submit">{isChecked ? "Acceder" : "Registrarse"}</button>
                            </div>
                            <!--  -->
                        </form>
                    </div>

                    <!-- PASSWORD RECOVERY TAB -->
                    <div class="transition-all duration-700
                               {pwdRecovery ? "scale-100 origin-top" : "scale-0 origin-bottom absolute"}">
                        <PwdRecoveryTab/>
                    </div>
                    <!-- PASSWORD RECOVERY TAB -->
                </div> 

                <div class="absolute top-0 min-h-[85vh] bg-blue-900
                            flex flex-col items-center justify-center
                            w-[50%] rounded-lg scale-[1.01]
                            duration-700 {isChecked ? '' : 'translate-x-[100%]'}">

                    <button class="size-full group" on:click={handleCheckboxChange}>
                        <img class="size-[100%] absolute top-0
                                    transition-all duration-1000 
                                    {isChecked ? "translate-x-[1%]" : "scale-0"}
                                    {isChecked ? "origin-left" : "origin-right"}" 
                            src="{homeFromWorkImage}" alt="">   

                        <img class="size-[100%] absolute top-0 
                                    transition-all duration-1000 
                                    {isChecked ? "scale-0" : "translate-x-[-1%] scale-100"}
                                    {isChecked ? "origin-left" : "origin-right"}" 
                            src="{officeCubicleImage}" alt="">

                            <Tooltip1  textBody="Presione la imagen para cambiar la modalidad" 
                                       messagePosition="top-4 {isChecked ? "right-4" : "left-4"}" 
                                       origin="origin-top"/>
                    </button>

                    {#if loginWarning}	
                       <ServerMessage  messagePosition="top-4 {isChecked ? "right-4" : "left-4"}" 
                                       serverStatus={serverStatus} 
                                       messageFromTheServer={warningMessage}/>
                    {/if}
                </div>
            </div>
        </div>
        <!--  -->
        {#if securityQuestions}
            <Preguntas username={username}/> 
        {/if}
    </main>	
{/if}

<style lang="postcss">
    .app-container {
        @apply max-h-fit relative left-[280px] px-7 py-7;
        width: calc(100% - 280px);
    }

    /* .app-container {
        @apply max-h-fit relative left-[250px] right-[20px] p-4;
        height: calc(100% - 60px);
        width: calc(100% - 250px);
    }     */

	form span {
        @apply border flex justify-center items-center relative rounded-md border-slate-700;
    }

    form span img {
        @apply size-8 absolute right-3;
    }

    form span input{
        @apply w-full px-4 py-2 border border-slate-600 rounded-md;
    }

    .flexo {
        /* @apply flex items-center justify-center; */
    }

    .bttn {
        @apply text-black;
        text-decoration: none;
        -webkit-transition: 0.3s all ease;
        transition: 0.3s ease all;
    }

    .bttn:hover {
        color: #fff;
    }

    .bttn:focus {
        color: #fff;
    }

    .bttn {
        @apply font-bold text-lg inline-block text-center w-fit px-8 py-1
        border-2 border-black rounded-md relative mt-4;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1);
    }

    .bttn:before {
        -webkit-transition: 0.5s all ease;
        transition: 0.5s all ease;
        position: absolute;
        top: 0;
        left: 50%;
        right: 50%;
        bottom: 0;
        opacity: 0;
        content: '';
        background-color: black;
        z-index: -2;
    }

    .bttn:hover:before {
        -webkit-transition: 0.5s all ease;
        transition: 0.5s all ease;
        left: 0;
        right: 0;
        opacity: 1;
    }
    .bttn:focus:before {
        transition: 0.5s all ease;
        left: 0;
        right: 0;
        opacity: 1;
    }
</style>