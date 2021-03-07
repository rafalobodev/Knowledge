<template><!--gif de carregamento-->
    <div class="loading">
        <img src="@/assets/loading.gif" alt="Loading">
    </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style>
    .loading {
        grid-area: content;/*ocupa no conteudo a area*/
        display: flex;
        justify-content: center;/*centraliza */
        align-items: center;
    }
</style>
