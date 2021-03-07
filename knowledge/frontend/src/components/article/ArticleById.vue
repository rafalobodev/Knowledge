<template><!--artigos criados com url exibe .article-content pre codigo conteudo o img e em url /articles/1 ou 2, 3 aparece conteudo artigo-->
    <div class="article-by-id">
        <PageTitle icon="fa fa-file-o" :main="article.name" :sub="article.description" /><!--icone artigo, nome ser subido usa :-->
        <div class="article-content" v-html="article.content"></div><!--conteudo-->
    </div>
</template>

<script>
import 'highlightjs/styles/dracula.css'//estilo letra q sera usada no codigo de conteudo
import hljs from 'highlightjs/highlight.pack.js'//caminho
import { baseApiUrl } from '@/global' //importar url de global.js local 4000
import axios from 'axios'
import PageTitle from '../template/PageTitle' //page titulo padrão q tem artigos e categorias..

export default {
    name: 'ArticleById',
    components: { PageTitle },//registrando componentes do titulo padrão aartigo conteudo
    data: function() {
        return {
            article: {}//objeto do artigo unico q quer exibir na tela
        }
    },
    mounted() {//executar as chamadas
        const url = `${baseApiUrl}/articles/${this.$route.params.id}` //chama url dentro de mounted
        axios.get(url).then(res => this.article = res.data)//chama axios com get.. article recebe dados do backend
    },
    updated() {//update de algum import extra...
        document.querySelectorAll('.article-content pre.ql-syntax').forEach(e => {//faz um foreach:executa uma dada função em cada elemento de um array.
            hljs.highlightBlock(e)//aplicando hljs importado no conteudo em colocar de codigos ter variação de cores
        })
    }
}
</script>

<style>
    .article-content {/*texto */
        background-color: #FFF;
        border-radius: 8px;
        padding: 25px;
    }

    .article-content pre {/*codigos serão exibidos dentro de pre do conteudo em artigos */
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        background-color: #1e1e1e;
        color: #FFF;
    }

    .article-content img {/*imagens dentro do conteudo do artigo */
        max-width: 100%;/*dentro de 100 para não ultrapassar a largura permitida */
    }

    .article-content :last-child {/*ultimo elemento do artigo não tenha margem */
        margin-bottom: 0px;
    }
</style>
