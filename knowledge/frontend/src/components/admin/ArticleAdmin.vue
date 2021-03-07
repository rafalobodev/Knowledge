<template><!--admins article, category e user cadastro dos dados do adm -->
    <div class="article-admin">
        <b-form>
            <input id="article-id" type="hidden" v-model="article.id" /><!--nome-->
            <b-form-group label="Nome:" label-for="article-name">
                <b-form-input id="article-name" type="text"
                    v-model="article.name" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Nome do Artigo..." />
            </b-form-group>
            <b-form-group label="Descrição" label-for="article-description"><!--descrição formulario-->
                <b-form-input id="article-description" type="text"
                    v-model="article.description" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Nome da Descrição..." />
            </b-form-group>
            <b-form-group v-if="mode === 'save'"
                label="Imagem (URL):" label-for="article-imageUrl"><!--imagem url form-->
                <b-form-input id="article-imageUrl" type="text"
                    v-model="article.imageUrl" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe a URL da Imagem..." /><!--:readonly="mode === 'remove'" > não aparecer ao clicar lixeira a img url q saira pq tem save-->
            </b-form-group>
            <b-form-group v-if="mode === 'save'" 
                label="Categoria:" label-for="article-categoryId"><!--categoria form-->
                <b-form-select id="article-categoryId"
                    :options="categories" v-model="article.categoryId" />
            </b-form-group>
            <b-form-group v-if="mode === 'save'" 
                label="Autor:" label-for="article-userId">
                <b-form-select id="article-userId"
                    :options="users" v-model="article.userId" />
            </b-form-group>
            <b-form-group v-if="mode === 'save'"
                label="Conteúdo" label-for="article-content">
                <VueEditor v-model="article.content"
                    placeholder="Informe o Conteúdo do Artigo..." /><!--editor digitar conteudo de conhecimento-->
            </b-form-group><!--v-if="mode === 'save'"  > modo de salvar da tabela exceto name article-->
            <b-button variant="primary" v-if="mode === 'save'"
                @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="articles" :fields="fields">
            <template slot="actions" slot-scope="data"><!--slot poseção dos botoes actions-->
                <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" /><!--colocando paginação,size="md":tamanho médio, v-model="page":referencia alteraçoes-->
    </div><!--total-rows="count"=linhas totais paginação,:per-page="limit" = linhas por pagina quantas -->
</template>

<script>
import { VueEditor } from "vue2-editor" //editor digitavel label com varios itens de digitação negrito e tamanho letra e outros
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'ArticleAdmin',
    components: { VueEditor }, //regista vue editor
    data: function() {
        return {
            mode: 'save',
            article: {},
            articles: [],
            categories: [],//preencher combobox de categorias
            users: [],//combobox de usuario
            page: 1,//consulta paginada no backend
            limit: 0,//quantos elementos nas paginas
            count: 0,//quantas paginas para criar paginador
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'description', label: 'Descrição', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]//lista de artigos ja colocados,,sortable: true:coluna ordenada
        }
    },
    methods: {
        loadArticles() {//lista de artigos ja feitos
            const url = `${baseApiUrl}/articles?page=${this.page}`//passa parametro page q vai fazer paginação funcionar
            axios.get(url).then(res => {//id de article chamado por get
                this.articles = res.data.data// q esta no backend .data de : linha 61 articles.js
                this.count = res.data.count //count:quantas paginas geradas
                this.limit = res.data.limit //limite de 10 registros no maximo paginação backend
            })
        },
        reset() {
            this.mode = 'save'
            this.article = {}
            this.loadArticles()
        },
        save() {
            const method = this.article.id ? 'put' : 'post'
            const id = this.article.id ? `/${this.article.id}` : ''
            axios[method](`${baseApiUrl}/articles${id}`, this.article)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.article.id
            axios.delete(`${baseApiUrl}/articles/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadArticle(article, mode = 'save') {
            this.mode = mode
            axios.get(`${baseApiUrl}/articles/${article.id}`)//id de article chamado por get
                .then(res => this.article = res.data)//chama then para pegar resposta com this.article
        },
        loadCategories() {//categorias do combobox site..
            const url = `${baseApiUrl}/categories`
            axios.get(url).then(res => {
                this.categories = res.data.map(category => {//devolver como resposta com map um objeto category
                    return { value: category.id, text: category.path }//preencher text e value q é o que comboBox espera para ser renderizado
                })
            })
        },
        loadUsers() {//autor combobox
            const url = `${baseApiUrl}/users` //const url em users url
            axios.get(url).then(res => {
                this.users = res.data.map(user => {//map para resposta especifica em user abaixo o..
                    return { value: user.id, text: `${user.name} - ${user.email}` }//nome do usuario e email do usuario
                })
            })
        }
    },
    watch: {//faz watch em page.. quando page chamado chama loadArticles
        page() {
            this.loadArticles()
        }
    },
    mounted() {//carregar ciclo de vida usuarios com mounted com uso this abaixo
        this.loadUsers()//opçoes nome email na label combo
        this.loadCategories()//aparecendo as opçoes de categorias
        this.loadArticles()
    }
}
</script>

<style>

</style>