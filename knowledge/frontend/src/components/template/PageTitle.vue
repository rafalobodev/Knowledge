<template>
    <div class="page-title">
        <h1><i v-if="icon" :class="icon"></i> {{ main }}</h1><!--se icone tiver disponivel casa-->
        <h2>{{ sub }}</h2>
        <hr><!--separa titulo da parte do conteudo-->
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['icon', 'main', 'sub']//tres propriedades do template acima
}
</script>

<style>
    .page-title h1 {
        margin: 0px;
    }

    .page-title h2 {
        color: #777;
        margin-top: 5px;
        font-size: 1.3rem;/*tamanho letra em rem */
    }
</style>
