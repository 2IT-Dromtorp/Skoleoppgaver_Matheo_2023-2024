<script>
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";

    onMount(()=>{
        if(!localStorage.getItem("jwt")){
            navigate("/login")
        }
    })

    const handleclick = () => {
        localStorage.removeItem("jwt")
        navigate("/login")
    }

    
</script>

{#if localStorage.getItem("jwt")}
    <p>Hehehe</p>
    <button on:click={handleclick}>

    </button>
{/if}