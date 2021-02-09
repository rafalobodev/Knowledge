<template>
    <div class="content">
        <router-view></router-view><!--renderiza as rotas no template de conteudo-->
    </div>
</template>

<script>
export default {//tudo q diz respeito ao componente fica aqui
    name: 'Content'
}
</script>

<style>
    .content {/*classe content da template acima*/
        grid-area: content;/*ocupa espaço site baseia ao conteudo*/
        background-color: #efefef; /*cinza quase branco */
        padding: 20px; /*espaçamento */
    }
</style>
