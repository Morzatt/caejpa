<script lang="ts">
    import ServerMessage from "$lib/components/ServerMessage/ServerMessage.svelte"

    type Usuario = {
        id: string | number,
        nombre: string,
        apellido: string,
        username:string
        role: string
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
    $: operationCounter = 0
    let userToDelete: any = ""
    let userToUnlock:any =""
    let userToBlock: any = ""
    let userToModify: any = ""

    let newNombre = ""
    let newApellido = ""
    let newUsername = ""
    let newRole = ""

    async function getUsers(): Promise<Usuario[] | null> {
        const response = await fetch("http://localhost:2606/usuarios/*")
        const data = await response.json() as Usuario[]
        return data
    }
    async function getUser(id: number | string): Promise<Usuario | null> {
        const response = await fetch(`http://localhost:2606/usuarios/${id}`)
        const data = await response.json() as Usuario
        return data
    }
    async function blockUser(id: number | string) {
        const response = await fetch(`http://localhost:2606/usuarios/block/${id}`)
        const data = await response.json()
        if (response.status === 200) {
            showWarning(data.message, response.status)
            operationCounter++
        } else {
            showWarning(data.message, response.status)
        }
    }
    async function unlockUser(id: number | string) {
        const response = await fetch(`http://localhost:2606/usuarios/unlock/${id}`)
        const data = await response.json()
        if (response.status === 200) {
            showWarning(data.message, response.status)
            operationCounter++
        } else {
            showWarning(data.message, response.status)
        }
    }

    async function modifyUser (id: string |number) {
        const response = await fetch(`http://localhost:2606/usuarios/${id}?nombre=${newNombre}&apellido=${newApellido}&username=${newUsername}&role=${newRole}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        
        })
        const data = await response.json()      

        if (response.status === 200) {
            showWarning(data.message, response.status)
            operationCounter++
            newNombre = ""
            newApellido = ""
            newUsername = ""
            newRole = ""
        } else {
            showWarning(data.message, response.status)
        }
    }
    let deleteConfirmationTab = false
    async function deleteUser (id: string |number = userToDelete) {
        const response = await fetch(`http://localhost:2606/usuarios/${id}`, {method: "delete"})
        const data = await response.json()
        if (response.status === 200) {
            showWarning(data.message, response.status)
            operationCounter++
            deleteConfirmationTab = false
        } else {
            showWarning(data.message, response.status)
        }
    }
</script>

<main class="w-full relative transition-all duration-300 ease-linear {deleteConfirmationTab ? "blur-md" : ""}">
    {#if warningState}
        <ServerMessage  messageFromTheServer={warningMessage}
                        messagePosition={"top-20 right-10"}
                        serverStatus={serverStatus}
                        position={"fixed"}/> 
    {/if}
    <!-- Section -->
    <div class="section">
        <h1 class="sectionTitle">Administrar Usuarios</h1>
        
        <!-- Modificar Usuario -->
        <div class="w-full border-t pt-4 mt-4">
            <h2>Modificar Usuario</h2>
            <p>Seleccione un usuario para modificar sus datos. De sólo especificarse un campo, los demás se mantendrán iguales.</p>

            <div class="w-2/4 mt-8">
                Usuario a Modificar:
                <div class="w-2/4">
                    {#key operationCounter}
                        {#await getUsers()}
                            <h1 class="font-poppins font-bold text-xl animate-pulse">Cargando Usuarios...</h1>
                        {:then usuarios} 
                            {#if usuarios !== null}
                                <select name="" id="" bind:value={userToModify} required>
                                    {#each usuarios as usuario}
                                        <option value="{null}" selected>Seleccione un usuario para modificar</option>
                                        <option value="{usuario.id}">{usuario.username}</option>
                                    {/each}
                                </select>
                                
                                {#await getUser(userToModify) then user}
                                    <div class="mt-2">
                                        <p>Nuevo Nombre</p>
                                        <input type="text" name="nombre" bind:value={newNombre} placeholder="{user?.nombre}" required>
                                    </div>

                                    <div class="mt-2">
                                        <p>Nuevo Apellido</p>
                                        <input type="text" name="nombre" bind:value={newApellido} placeholder="{user?.apellido}" required>
                                    </div>

                                    <div class="mt-2">
                                        <p>Nuevo Nombre de Usuario</p>
                                        <input type="text" name="nombre" bind:value={newUsername} placeholder="{user?.username}" required>
                                    </div>                                   

                                    <div class="mt-2">
                                        <p>Nuevo Rol de Usuario</p>
                                        <select bind:value={newRole} placeholder="{user?.role}">
                                            <option value="" disabled selected class="text-gay-300">{user?.role}</option>
                                            <option value="Auditor">Auditor</option>
                                            <option value="Editor">Editor</option>
                                        </select>
                                    </div>
                                {/await}
                            {:else}
                                <h1 class="font-poppins font-bold text-xl">No ha sido creado ningún Usuario.</h1>
                            {/if}
                        {/await}                       
                    {/key}
                </div>
            </div>
            <button on:click={()=>modifyUser(userToModify)} class="submit-form-button"><span class="inner w-full">Modificar</span></button>
        </div>
        <!-- Bloquear Usuario-->
        <div class="w-full border-t pt-4 mt-4">
            <h2>Bloquear Usuario</h2>
            <p>Al bloquear un usuario, impedirá su acceso a la aplicación y a las funcionalidad internas de la misma mediante el bloqueo de inicio de sesion.</p>
            <p class="text-sm"><b>Nota:</b> Bloquear a un usuario no eliminará sus datos ni sus registros, sólo impedirá su acceso a la aplicación. <br>
            En caso de querer eliminar completamente los datos del usuario, dirigirse al apartado de <b class="text-red-600">Eliminar Usuario</b></p>

            <div class="w-2/4 mt-8">
                Usuario a bloquear:

                <div class="w-2/4 group relative">
                    {#key operationCounter}
                        {#await getUsers()}
                            <h1 class="font-poppins font-bold text-xl animate-pulse">Cargando Usuarios...</h1>
                        {:then usuarios} 
                            {#if usuarios !== null}
                                <select name="" id="" bind:value={userToBlock} required>
                                    {#each usuarios as usuario}
                                        <option value="{usuario.id}">{usuario.username}</option>
                                    {/each}
                                </select>
                            {:else}
                                <h1 class="font-poppins font-bold text-xl">No ha sido creado ningún Usuario.</h1>
                            {/if}
                        {/await}                       
                    {/key}
                    <div class="tooltip scale-0 right-[-110%] top-[0%] group-hover:scale-100">
                        <div class="tooltipInner">
                            <p><b class="text-red-600">Precaución: </b>El usuario que elija será bloqueado de manera indefinida.</p>
                        </div>
                    </div>
                </div>
            </div>
            <button on:click={() => blockUser(userToBlock)} class="submit-form-button"><span class="inner w-full">Bloquear</span></button>
        </div>
         <!-- Desbloquear Usuario-->
        <div class="w-full border-t pt-4 mt-4">
            <h2>Desbloquear Usuario</h2>
            <p>Al desbloquear un usuario, habilitará nuevamente el acceso del mismo a las funiconalidades de la aplicación.</p>

            <div class="w-2/4 mt-8">
                Usuario a Desbloquear:

                <div class="w-2/4 group relative">
                    {#key operationCounter}
                        {#await getUsers()}
                            <h1 class="font-poppins font-bold text-xl animate-pulse">Cargando Usuarios...</h1>
                        {:then usuarios} 
                            {#if usuarios !== null}
                                <select name="" id="" bind:value={userToUnlock} required>
                                    {#each usuarios as usuario}
                                        <option value="{usuario.id}">{usuario.username}</option>
                                    {/each}
                                </select>
                            {:else}
                                <h1 class="font-poppins font-bold text-xl">No ha sido creado ningún Usuario.</h1>
                            {/if}
                        {/await}                       
                    {/key}
                </div>
            </div>
            <button on:click={() => unlockUser(userToUnlock)} class="submit-form-button"><span class="inner w-full">Desbloquear</span></button>
        </div>       
        <!-- Eliminar Usuario-->
        <div class="w-full border-t pt-4 mt-4">
            <h2 class="text-red-800">Eliminar Usuario</h2>
            <p>Al eliminar un usuario, será eliminada toda su información junto a su acceso a las funcionalidades del sistema.</p>
            <p>No serán eliminados los prestamos registrados por el usuario eliminado, ni su información asociada.</p>

            <div class="w-2/4 mt-8">
                Usuario a Eliminar:

                <div class="w-2/4 group relative">
                    {#key operationCounter}
                        {#await getUsers()}
                            <h1 class="font-poppins font-bold text-xl animate-pulse">Cargando Usuarios...</h1>
                        {:then usuarios} 
                            {#if usuarios !== null}
                                <select name="" id="" bind:value={userToDelete} required>
                                    {#each usuarios as usuario}
                                        <option value="{usuario.id}">{usuario.username}</option>
                                    {/each}
                                </select>
                            {:else}
                                <h1 class="font-poppins font-bold text-xl">No ha sido creado ningún Usuario.</h1>
                            {/if}
                        {/await}                       
                    {/key}

                    <div class="tooltip scale-0 right-[-110%] top-[0%] group-hover:scale-100">
                        <div class="tooltipInner">
                            <p><b class="text-red-600">Precaución: </b>El usuario que elija será eliminado permanentemente del registro.</p>
                        </div>
                    </div>
                </div>
            </div>

            <button on:click={() => { 
            userToDelete === "" ? 
                showWarning("No se ha seleccionado ningún usuario para eliminar", 400) 
            :
                deleteConfirmationTab = !deleteConfirmationTab;
            }} class="submit-form-button"><span class="inner w-full">Eliminar</span></button>
        </div>
    </div>
</main>
{#if deleteConfirmationTab}
    <div class="fixed top-[50%] max-w-[40%] translate-y-[-50%] translate-x-[50%] border-2 rounded-md bg-white p-3">
        <div class="size-full">
            <h1 class="text-red-500 text-xl font-poppins font-bold">¡Precaucion! Eliminar Usuario</h1>
            <p>¿Está seguro de que desea eliminar éste Usuario? Una vez eliminado, la información es <b>irrecuperable.</b></p>
            <div class="flex items-center justify-end gap-6 border-t-2 border-slate-500 pt-3">
                <button class="border-2 border-black px-4 py-1 rounded-md font-poppins
                        hover:bg-black hover:text-white active:bg-gray-700
                        transition-all duration-200 ease-linear" 
                        on:click={() => {deleteConfirmationTab = !deleteConfirmationTab}}>Regresar</button> 

                <button class="px-4 py-1 bg-red-600 border-2 border-red-600 text-white font-poppins rounded-md
                hover:bg-red-500 active:bg-red-700 transition-all duration-200 ease-linear"
                        on:click={() => deleteUser(userToDelete)}>Eliminar</button>
            </div>
        </div>
    </div> 
{/if}

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

    .section select {
        @apply w-full px-4 py-2 border-2 border-slate-600 rounded-md;
    }

    .section input{
        @apply w-full relative px-4 py-2 border-2 border-slate-600 rounded-md;
    }

    .section img {
        @apply size-8 absolute right-2 top-[44%];
    }

    .section select:invalid {
        @apply border-red-400;
    }

    .section .tooltip {
        @apply border-2 border-black text-white rounded-md 
        absolute  inline-block
        w-full h-fit 
        transition-all duration-200 origin-left ;
        background-color: #e5e5f7;
        opacity: 0.8;
        background-size: 10px 10px;
        background-image: repeating-linear-gradient(45deg, #000000 0, #000000 1px, #e5e5f7 0, #e5e5f7 50%); 
    }

    .section .tooltip .tooltipInner {
        @apply bg-white text-black rounded-md p-1
        w-fit h-fit
        inline-block transform border-2 border-black;
        user-select: none;
        transform: translate3d(-0.6em, -0.5em, 0);
        transition: transform 240ms cubic-bezier(0.175, 0.885, 0.320, 1.275);
        transition-delay: 220ms;
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