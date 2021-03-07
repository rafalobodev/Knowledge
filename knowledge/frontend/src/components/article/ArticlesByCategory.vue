<template><!--artigos por categorias onde fica itens do artigos abaixo opçoes-->
    <div class="articles-by-category"><!--fa fa-folder-o: icone da pasta-->
        <PageTitle icon="fa fa-folder-o"
            :main="category.name" sub="Categoria" /><!--PageTitle: componente representa titulo da pagina-->
        <ul>
            <li v-for="article in articles" :key="article.id">
                <ArticleItem :article="article" /><!--componente q vai renderizar artigos conteudo-->
            </li>
        </ul>
        <div class="load-more"><!--para carregar mais artigos com categorias recebe getArti.. no conteudo com botão-->
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="getArticles">Carregar Mais Artigos</button><!--btn btn-lg btn-outline-primary:estetica botão azul,lg maior -->
        </div>
    </div>
</template>

<script>
import { baseApiUrl } from '@/global' //import da url base para fazer as requisiçoes
import axios from 'axios'//Axios é um cliente HTTP baseado em Promises para fazer requisições.
import PageTitle from '../template/PageTitle'//titulo padrão do menu e conteudos ja pronto
import ArticleItem from './ArticleItem' //importa artigos opçoes

export default {
    name: 'ArticlesByCategory',
    components: { PageTitle, ArticleItem },//referenciar template de outros arquivos q ficaram nesse
    data: function() {
        return {//q sera retornado no site os objetos..
            category: {},//objeto categorias inicia vazio
            articles: [],//array artigos em si vazio
            page: 1,//paginação conteudos itens artigo
            loadMore: true //para carregar mais artigos q inia verdadeiro
        }
    },
    methods: {
        getCategory() {//pegar apenas uma categoria
            const url = `${baseApiUrl}/categories/${this.category.id}`//usa a url e id da categoria especifica,${baseApiUrl}:para acessa backend com url
            axios(url).then(res => this.category = res.data)//chama axios para executar essa requisição.
        },
        getArticles() {//ter array de artigos
            const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`///articles?page=${this.page}` : uma consulta paginada
            axios(url).then(res => {//passa url para axios..
                this.articles = this.articles.concat(res.data)//seta artigos recebe artigo concat: acrescentar na lista artigos usando concat
                this.page++ //acrescentar a pagina de pagina em pagina

                if(res.data.length === 0) this.loadMore = false //se data tiver 0 comprimento de artigos coloca loadMore para false pois antes era true
            })
        }
    },
    watch: {//monitorar o componente de rotas, para responde a cada rota q ir abrindo modal, arquivos artigos etc
        $route(to) {//to=qual url q vai
            this.category.id = to.params.id //categoria recebe params do id 
            this.articles = []//pra abrir ao clique tem q zerar artigos
            this.page = 1 //zerar page tbm
            this.loadMore = true //load virar true

            this.getCategory()//e chamar os dois metodos pra funcionar
            this.getArticles()
        }
    },
    mounted() {//montado para executar
        this.category.id = this.$route.params.id // id categ recebe rota id parametros na url.. exemplo categories/1/articles
        this.getCategory()
        this.getArticles()//chamadas sendo disparadas
    }
}
</script>

<style>
    .articles-by-category ul {
        list-style-type: none;/*remove as bolinhas padrão de um ul html */
        padding: 0px;/*grudar mais no menu */
    }

    .articles-by-category .load-more {
        display: flex;
        flex-direction: column;/*em coluna ele centraliza com align-items*/
        align-items: center;
        margin-top: 25px;/*uma distancia bo botão com os artigos */
    }
</style>
