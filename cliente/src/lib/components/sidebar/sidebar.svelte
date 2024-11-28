<script lang="ts">
    import userIcon from './images/account_circle_FILL0_wght400_GRAD0_opsz24.svg'
    import expandIcon from "./images/expand_more_FILL0_wght400_GRAD0_opsz24.svg"
    import homeIcon from "./images/home_FILL0_wght400_GRAD0_opsz24.svg"
    import { sidebarSections, clickOutside, type UserRoles } from "./sidebar.ts"
    import { userInfo } from "../../../stores/user.ts"
    import { onDestroy, onMount } from 'svelte';
    import { base } from '$lib';
    
    let userID = 0
    let userNombre = "Nombre"
    let userApellido = "Apellido"
    let username = "Nombre de Usuario"
    let role: UserRoles;

    let unsubscribe = userInfo.subscribe((info: any) => {
        if (info) {
            userID = info.id
            userNombre = info.nombre
            userApellido = info.apellido
            username = info.username
            role = info.role
        } 
    })

    $: toggleMenuState = false; 
    
    function drawToggleMenu() {
        if (toggleMenuState === false) {
            toggleMenuState = true
        } else {
            toggleMenuState = false
        }
    }

    async function logout() {
        const response  = await fetch(`${base}/logout`, {
            method: "GET",
            credentials: 'include'
        })   
        window.location.href = "/"
    }

    const filteredSections = sidebarSections.filter(section => {
        section.routes = section.routes.filter(route => {
            return route.access.includes(role)
        })
        return section.access.includes(role)
    })
    onDestroy(() => unsubscribe())
</script>
    
<div class="side-parent-container">
    <div class="side-child-container">
        <ul class="w-[100%] flex flex-col justify-center items-center">
            <li>
                <div class="w-[100%] relative bg-black 
                            flex justify-around items-center p-1
                            hover:bg-gray-900 rounded-lg
                            transition-all duration-100 cursor-pointer group">
                    
                    <div class="w-[80%] flex p-2 px-4 rounded-md justify-around items-center">
                        <img class="mr-2 size-9 filter invert" src="{userIcon}" alt="">
                        <span class="w-[80%]">
                            <p class="text-md font-semibold text-white">{`${userNombre} ${userApellido}`}</p>
                            <p class="text-sm text-white">{`${role}`}</p>
                        </span>
                    </div> 

                    <button on:click={() => {drawToggleMenu()}}
                            class="w-[10%] hover:rounded-md hover:bg-white transition-all duration-100">
                        <img class="flex items-center justify-center filter invert hover:filter-none" src="{expandIcon}" alt="">
                    </button>

                    {#if toggleMenuState}
                        <div use:clickOutside on:click_outside={drawToggleMenu} class="absolute top-10 right-0
                               bg-gray-950 rounded-md p-2 text-slate-50 text-sm">
                            <ul class="toggle-menu">
                                <li>
                                    <button class="w-[100%] p-1 border-b
                                                   flex justify-start items-center 
                                                   transition-all duration-100 cursor-pointer
                                                   hover:bg-slate-700 hover:rounded-sm
                                                   active:bg-slate-600"
                                            on:click="{() => {logout()}}">

                                        Cerrar Sesión
                                    </button> 
                                </li>
                            </ul>
                        </div>
                    {/if}
                </div> 
            </li>

            <li class="mt-7">
                <a href="/" class="sidebarA group">
                    <span>
                        <img class="group-hover:invert filter" src="{homeIcon}" alt="">
                        <p>Inicio</p>
                    </span>
                </a>
            </li>
            {#each filteredSections as sections}
                <h2 class="text-lg mt-8 font-bold w-full text-center border-b-2 border-slate-600 border-dotted">{sections.sectionName}</h2>
                {#each sections.routes as routes}
                    <li class="my-[2px]">
                        <a href="{routes.path}" class="sidebarA group">
                            <span>
                                <img class="filter group-hover:invert" src={routes.routeLogo} alt="">
                                <p>{routes.routeName}</p>
                            </span>
                        </a>
                    </li>   
                {/each}
            {/each}   
        </ul>
    </div>
</div>

<style lang="postcss">
    * {
        @apply font-poppins;
    }

    .side-parent-container {
        @apply overflow-auto w-[280px] h-screen border-r fixed rounded-r-sm p-2 bg-gray-50 
        shadow-xl flex items-center justify-center;
    }

    .side-child-container {
        @apply w-[100%] h-[100%] flex items-start justify-start;
    }

    li {
        @apply w-[100%];
    }

    .toggle-menu li a {
        @apply w-[100%] p-1 border-b flex justify-start items-center 
        transition-all duration-100 cursor-pointer;
    }

    .toggle-menu li a:hover {
        @apply bg-gray-700 rounded-sm;   
    }   

    .toggle-menu li a:active {
        @apply bg-gray-600;   
    }   

    .sidebarA {
        @apply w-[100%] border-b flex justify-center items-center p-1 py-[0.5rem]
        transition-all duration-200 ease-out cursor-pointer rounded-md;
    }

    .sidebarA:hover {
        @apply bg-black rounded-md text-white shadow-2xl font-bold scale-105 transform transition-all duration-200 ease-linear;
    }

    .sidebarA:active {
        @apply bg-gray-500;
    }

    .sidebarA span {
        @apply flex justify-start items-center w-[80%];
    }

    .sidebarA span img {
        @apply size-5 mx-2;
    }
</style>