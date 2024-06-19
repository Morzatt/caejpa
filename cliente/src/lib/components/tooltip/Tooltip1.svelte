<script lang="ts">
export let textBody: string;
export let messagePosition:string;
export let origin: string;
export let position: string | undefined = undefined;
</script>

<div class="tooltip scale-0 {messagePosition} {origin} {position ? position : "absolute"} group-hover:scale-100">
    <div class="tooltipInner">
        {textBody}
    </div>
</div>

<style lang="postcss">
    .tooltip {
        @apply border-2 border-black text-white rounded-md 
        inline-block
        w-full h-fit max-w-[15rem]
        transition-all duration-200;
        background-color: #e5e5f7;
        background-size: 10px 10px;
        background-image: repeating-linear-gradient(45deg, #000000 0, #000000 1px, #e5e5f7 0, #e5e5f7 50%); 
    }

    .tooltip .tooltipInner {
        @apply bg-white text-black rounded-md p-1
        w-full h-fit
        inline-block transform border-2 border-black;
        user-select: none;
        transform: translate3d(-0.4em, -0.4em, 0);
        transition: transform 240ms cubic-bezier(0.175, 0.885, 0.320, 1.275);
        transition-delay: 220ms;
    }

</style>