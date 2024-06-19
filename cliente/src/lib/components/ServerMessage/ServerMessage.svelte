<script lang="ts">
    import exclamationIcon from "$lib/images/error_FILL0_wght400_GRAD0_opsz24.svg"
    import checkIcon from "$lib/images/check_circle_FILL0_wght400_GRAD0_opsz24.svg"

    import { slide, fade } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    export let messageFromTheServer: string | undefined;
    export let position: string | undefined = undefined;
    export let messagePosition: string;
    export let serverStatus: number | string;
</script>

{#if serverStatus == 200}
    <div class="{position ? position : "absolute"}
                {messagePosition}
                max-w-[25rem]
                border border-green-300 bg-green-50 rounded-md p-4 
                flex items-start justify-around"
                transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}>
        <img src="{checkIcon}" alt="">
        <h1 class="ml-3 text-green-900">{messageFromTheServer}</h1> 
    </div>   
{:else}
    <div class="{position ? position : "absolute"}
                {messagePosition}
                max-w-[25rem]
                border border-red-300 bg-red-50 rounded-md p-4 
                flex items-start justify-around"
                transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}>
        <img src="{exclamationIcon}" alt="">
        <h1 class="ml-3 text-red-900">{messageFromTheServer}</h1> 
    </div>
{/if}
