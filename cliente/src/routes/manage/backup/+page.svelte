<script lang="ts">
    import ServerMessage from "$lib/components/ServerMessage/ServerMessage.svelte"
    import { base } from "$lib/index"

    // Images Import
    import fileUploadIcon from "$lib/images/upload_file_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import deleteIcon from "$lib/images/delete_24dp_FILL0_wght400_GRAD0_opsz24.svg"
    import databaseIcon from "$lib/images/database_24dp_FILL0_wght400_GRAD0_opsz24.svg"

	// Message from the Server Logic
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
    
    async function handleSubmit () {
        try {
            let request = await fetch(`${base}/backup/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: `include`,
            });

            const data = await request.json()
            if (request.status === 200) {
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = `${base}/backup/download`;
                    link.download = `backup.sql`; // Set the desired filename
                    link.click();
                }, 1000)
                showWarning(data.message, request.status)
            } else {
                showWarning(data.message, request.status)
            }
        } catch (err) {
            console.log(err)
        }
    }

    // Assuming you have a file input element in your HTML
    let fileInput: any;
    
    type FileData = {
        fileName: string,
        fileSize: string | number,
        lastModified: string | Date | number
    }

    let fileData: FileData = {
        fileName: ``,
        fileSize: ``,
        lastModified: `` 
    }

    function bindInputData() {
        fileData.fileName = fileInput.files[0].name
        fileData.fileSize = `${(fileInput.files[0].size / 1000).toFixed(3)} KB`
        function formatDate(date: any) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = date.getFullYear().toString().substr(-2); // Get the last two digits of the year
            return `${day}/${month}/${year}`;
        }        
        fileData.lastModified = formatDate(fileInput.files[0].lastModifiedDate)
    } 

    function deleteFile() {
        // Convert the FileList to an array
        const filesArray = Array.from(fileInput.files);
        
        // Filter out the file at the specified index
        const filteredFiles = filesArray.filter((_, index) => index !== 0);
        
        // Create a new DataTransfer object and add the remaining files
        const dataTransfer = new DataTransfer();
        filteredFiles.forEach((file:any) => dataTransfer.items.add(file));
        
        // Update the input's files with the new FileList
        fileInput.files = dataTransfer.files;        
        fileData.fileName = ``
        console.log(fileInput.files)
    }

    async function handleUpload() {
        // Create a new FormData instance
        const formData = new FormData();

        // Append the file to the FormData instance
        formData.append('backup_upload', fileInput.files[0]);

        try {
            let request = await fetch(`${base}/backup/upload`, {
                method: 'POST',
                credentials: `include`,
                body: formData
            });

            const data = await request.json()
            if (request.status === 200) {
                showWarning(data.message, request.status)
            } else {
                showWarning(data.message, request.status)
            }
        } catch (err) {
            console.log(err)
        }
    }
</script>

<main class="w-full relative">
    {#if warningState}
        <ServerMessage  messageFromTheServer={warningMessage}
                        serverStatus={serverStatus}
                        messagePosition="right-10 top-20"
                        position="fixed"/>       
    {/if}

    <!-- Section -->
    <div class="section">
        <h1 class="sectionTitle">Administrar Copias de Seguridad</h1>
        
        <!-- Modificar Usuario -->
        <div class="w-full border-t pt-4 mt-4 ">
            <h2>Crear Copia de Seguridad</h2>
            <p>Realice un respaldo de toda la información almacenada en la aplicación. Esto incluye: usuarios, <br>
                registros y configuraciones.
            </p>
            <button on:click={handleSubmit} class="submit-form-button mt-8 mr-4">
                <span class="inner bg-white">Generar Respaldo</span>
            </button>
        </div>
        
        <!-- Eliminar Usuario-->
        <div class="w-full border-t pt-4 mt-4">
            <h2>Restaurar Copia de Seguridad</h2>
            <p>Al realizar una restauración de copia de seguridad, se perderán todos los datos actualmente <br> 
                registrados, incluyendo usuarios y registros, y se reemplazarán por los almacenados en la copia <br>
                 de seguridad.</p>
                <br>
            <p>Se recomienda realizar una copia de seguridad de los datos actuales para evitar perdidas permanentes de informacion.</p>

            <div class="w-2/4 mt-8">
                <div class="w-3/4">
                    <div class="w-full">
                        <label class="group" for="fileInput">
                            <img class="size-16" src="{fileUploadIcon}" alt="">
                            <h3 class="font-poppins font-bold">Haga click y seleccione el archivo de respaldo correspondiente.</h3>

                            <div class="tooltip scale-0 right-[-110%] top-[0%] group-hover:scale-100">
                                <div class="tooltipInner">
                                    <p>
                                        <b class="text-red-600">Precaución: </b>
                                        Asegurese de seleccionar la copia de seguridad correcta al momento de subir el archivo.
                                    </p>
                                </div>
                            </div>
                        </label>
                        <input id="fileInput" type="file" on:input={bindInputData} name="backup_upload" bind:this={fileInput}> 

                        <div class="w-full
                                    mt-8 p-2
                                    flex items-start justify-start 
                                    border-2 border-slate-600 rounded-md
                                    transition-all transform duration-300 origin-top
                                    {fileData.fileName ? "scale-100" : "scale-0 fixed"}">

                            <img class="size-10 mt-2 mr-3 bg-slate-200 rounded-md" src="{databaseIcon}" alt="">
                            <div class="w-full overflow-scroll">
                                <p class="font-poppins font-bold text-md">Nombre: {fileData.fileName ? fileData.fileName : ""}</p>
                                <p class="text-sm">Tramaño: {fileData.fileSize ? fileData.fileSize : ""}</p>
                                <p>Ultima Modificación: {fileData.lastModified ? fileData.lastModified: ""}</p>
                            </div>

                            <button class="size-fit group 
                                           flex items-center justify-center
                                           rounded-md transition-all duration-300 ease-linear
                                           hover:bg-red-600 active:bg-red-50"
                                           on:click={deleteFile}>
                                <img class="w-8 filter group-hover:invert" src="{deleteIcon}" alt="">
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <button  on:click={handleUpload} class="submit-form-button mt-8">
                <span class="inner bg-white">Restaurar</span>
            </button>
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

    .section select {
        @apply w-full px-4 py-2 border-2 border-slate-600 rounded-md;
    }

    .section input{
        @apply w-full relative px-4 py-2 border-2 border-slate-600 rounded-md;
    }

    input[type="file"] {
        display: none;
    }
    
    .section label {
        @apply w-full h-[9rem] relative
        flex items-center justify-center
        border-2 border-slate-600 rounded-md border-dashed
        cursor-pointer;
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
        w-full h-fit
        inline-block transform border-2 border-black;
        user-select: none;
        transform: translate3d(-0.6em, -0.5em, 0);
        transition: transform 240ms cubic-bezier(0.175, 0.885, 0.320, 1.275);
        transition-delay: 220ms;
    }



    /* .section .submit-form-button {
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
    } */
</style>