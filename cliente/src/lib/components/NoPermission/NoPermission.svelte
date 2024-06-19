<script>
    import warning from "./images/warning-sign-icon-transparent-background-free-png.webp"
</script>

<main class="relative">
    <div class="h-[93vh]">
        <div class="gap-4 flex justify-end items-center">
            <div class="box1"></div>
            <div class="box1"></div>
        </div>
        <div class="gap-4 flex justify-start items-center">
            <div class="box1"></div>
            <div class="box1"></div>
            <div class="box1"></div>
            <div class="box1"></div>
            <div class="box1"></div>
        </div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="row"></div>
        <div class="flex items-center justify-around">
            <div class="box2"></div>
            <div class="box2"></div>
            <div class="box2"></div>
            <div class="box2"></div>
            <div class="box2"></div>
            <div class="box2"></div>
        </div>
        <div class="flex items-center justify-around">
            <div class="box2"></div>
            <div class="box2"></div>
            <div class="box2"></div>
            <div class="box2"></div>
            <div class="box2"></div>
            <div class="box2"></div>
        </div>
        <div class="flex items-center justify-around">
            <div class="box2"></div>
            <div class="box2"></div>
            <div class="box2"></div>
            <div class="box2"></div>
            <div class="box2"></div>
            <div class="box2"></div>
        </div>
        <div class="absolute top-[20%] right-[33%]">
            <div class="bg-white h-[200px] w-[420px] rounded-md shadow-xl
                        p-5 flex flex-col justify-around">
                <span class="flex gap-4 p-1">
                    <img class="size-7" src="{warning}" alt="">
                    <h1 class="text-xl font-bold">Acceso Denegado</h1>
                </span>

                <div class="p-1">
                    <p class="my-2">Para acceder al contenido y las funcionalidades es necesario que inicie sesión en la aplicación.</p>
                </div>

                <div class="my-4 flex items-center justify-end gap-3">
                    <a class="bg-none hover:text-slate-600 active:text-slate-400" href="/login">Iniciar Sesión</a>
                    <a class="bg-yellow-400 text-white  hover:bg-yellow-500 active:bg-yellow-200" href="/register">Registrarse</a>
                </div>
            </div>
        </div>
    </div>
</main>

<style lang="postcss">
    * {
        @apply rounded-md;
    }
    .row {
        @apply animate-pulse h-6 w-full my-4 bg-slate-300 ;
    }

    .box1 {
        @apply animate-pulse h-10 w-20 bg-slate-300;
    }

    .box2 {
        @apply animate-pulse w-[10rem] h-[5rem] my-4 mx-4 bg-slate-300 ;
    }

    a {
        @apply p-1 px-3 rounded-sm transition-all duration-200;
    }
</style>