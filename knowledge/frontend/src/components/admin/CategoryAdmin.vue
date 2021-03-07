<template><!--parecido com userAdmin.vue mudando algums detalhes-->
    <div class="category-admin">
        <b-form>
            <input id="category-id" type="hidden" v-model="category.id" />
            <b-form-group label="Nome:" label-for="category-name">
                <b-form-input id="category-name" type="text"
                    v-model="category.name" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Nome da Categoria..." /><!--text-->
            </b-form-group>
            <b-form-group label="Categoria Pai:" label-for="category-parentId"><!--categoria pai > filhas.. combobox criando um save-->
                <b-form-select v-if="mode === 'save'"
                    id="category-parentId"
                    :options="categories" v-model="category.parentId" /><!--select:comboBox,:options="categories" do backend serão itens-->
                <b-form-input v-else
                    id="category-parentId" type="text"
                    v-model="category.path"
                    readonly /><!--readonly: para aparecer na combobox apçoes-->
            </b-form-group><!--v-model:conecta dados e elementos input ou ids,, não obrigatório não precisa required-->
            <b-button variant="primary" v-if="mode === 'save'"
                @click="save">Salvar</b-button><!--botão salvar categoria criada-->
            <b-button variant="danger" v-if="mode === 'remove'"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button><!--botão de resetar o cancelar algum processo-->
        </b-form>
        <hr>
        <b-table hover striped :items="categories" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadCategory(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'CategoryAdmin',
    data: function() {
        return {
            mode: 'save',
            category: {},
            categories: [],//categorias ja criadas inicia vazio 
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'path', label: 'Caminho', sortable: true },//path caminho pai e filhos de cada categoria
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadCategories() {
            const url = `${baseApiUrl}/categories`
            axios.get(url).then(res => {//ao querer excluir ou editar category banco
                // this.categories = res.data
                this.categories = res.data.map(category => {//faz um map em cada uma das categorias,map:invoca a função callback passada por argumento para cada elemento do Array e devolve um novo Array como resultado.
                    return { ...category, value: category.id, text: category.path }//retorna mais 2 atributos no caso
                })
            })
        },
        reset() {
            this.mode = 'save'
            this.category = {}
            this.loadCategories()
        },
        save() {
            const method = this.category.id ? 'put' : 'post'
            const id = this.category.id ? `/${this.category.id}` : ''
            axios[method](`${baseApiUrl}/categories${id}`, this.category)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {/*só é possivel excluir categoria filha até atingir pai */
            const id = this.category.id
            axios.delete(`${baseApiUrl}/categories/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadCategory(category, mode = 'save') {//msm q loadUser,, no caso vida modo save o botão de salvar se torna botão editar ou remover
            this.mode = mode
            this.category = { ...category }//clonado category para editar..
        }
    },
    mounted() {
        this.loadCategories()
    }
}
</script>

<style>

</style>