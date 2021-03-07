<template><!--itens do artigo clicaveis escolher de dentro da categoria opçoes-->
    <div class="article-item">
        <router-link :to="{ name: 'articleById', params: { id: article.id } }"><!--router-link:link clicavel do artigo recebe nome conteudo artito pego no rotas e articlebyid.vue-->
            <div class="article-item-image d-none d-sm-block"><!--dispositivo muito pequeno some a imagem com none e exibe pra cima-->
                <img v-if="article.imageUrl"
                    :src="article.imageUrl"
                    height="150" width="150" alt="Article"><!--v-if se article imagem tiver setado, src colocar img e tamanhos-->
                <img v-else
                    src="@/assets/article.png"
                    height="150" width="150" alt="Article"><!--se não tiver setado imagem colocar uma padrão de assets caminho import-->
            </div>
            <div class="article-item-info">
                <h2>{{ article.name }}</h2>
                <p>{{ article.description }}</p>
                <span class="article-item-author">
                    <strong>Autor: </strong>{{ article.author }}
                </span><!--nome artigo desc e author-->
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'ArticleItem',//nome padrão
    props: ['article'] //recebe como parametro artigo
}
</script>

<style>
    .article-item {/*classe css */
        border-radius: 8px;/*raio nas bordas */
        margin-bottom: 20px; /*espeçamento abaixo artigos e carregar mais tbm */
        background-color: #FFF;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .article-item a {
        display: flex;/*para trabalhar com o layout dele */
        align-items: flex-start;
        text-decoration: none;
        color: #000;
    }

    .article-item-info h2 {
        font-size: 1.7rem;
    }

    .article-item-image {/*ajuste da imagem do artigo */
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid #AAA;
    }

    .article-item-image img {
        border-radius: 5px;
    }

    .article-item-info {
        display: flex;
        align-self: stretch;/*crescer as informaçoes gera espaçamento extra ao q esta ao redor */
        flex-direction: column;
    }

    .article-item-info p {/*cor e tamanho da fonte da letra*/
        flex: 1;
        color: #555;
        font-size: 1.1rem;
    }
</style>
