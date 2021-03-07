<template>
    <div class="user-admin">
        <b-form><!--formulario vem vue-bootstrap-->
            <input id="user-id" type="hidden" v-model="user.id" /><!--input:geral,hidden:oculto p usuários quando enviado,v-model:ligação id-->
            <b-row><!--linhas q serão nome ocupa 6 e email ocupa 6 total 12-->
                <b-col md="6" sm="12"><!--colunas md="6":dispositivo medio p cima ,,sm="12" pequeno e extra pequeno 12 -->
                    <b-form-group label="Nome:" label-for="user-name"><!--label-for:id nome-->
                        <b-form-input id="user-name" type="text"
                            v-model="user.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome do Usuário..." /><!--b-form-input:digitavel,required:campo requerido-->
                    </b-form-group><!--:readonly="mode === 'remove'" >ao clicar em remove aparece nome da id q quer remover se poder editala-->
                </b-col>
                <b-col md="6" sm="12"><!--email-->
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text"
                            v-model="user.email" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o E-mail do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-form-checkbox id="user-admin" v-show="mode === 'save'"
                v-model="user.admin" class="mt-3 mb-3">
                Administrador?
            </b-form-checkbox><!--checkbox adm,vuebootstrap> mt-3:margem top 3 e mb-3:margem bottom 3-->
            <b-row v-show="mode === 'save'"><!--v-show="mod..se estiver no modo save mostra senha se não não mostra -->
                <b-col md="6" sm="12"><!--senha-->
                    <b-form-group label="Senha:" label-for="user-password">
                        <b-form-input id="user-password" type="password"
                            v-model="user.password" required
                            placeholder="Informe a Senha do Usuário..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12"><!--senha conf..-->
                    <b-form-group label="Confirmação de Senha:" 
                        label-for="user-confirm-password">
                        <b-form-input id="user-confirm-password" type="password"
                            v-model="user.confirmPassword" required
                            placeholder="Confirme a Senha do Usuário..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save">Salvar</b-button><!--botão para salvar, v-if se estara disponivel se for modo === save-->
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove">Excluir</b-button><!--excluir metodo remove postgres-->
                    <b-button class="ml-2" @click="reset">Cancelar</b-button><!--ml-2:margem leaft 2,-->
                </b-col>
            </b-row>
        </b-form>
        <hr><!--hr:um pouco espaçamento amais-->
        <b-table hover striped :items="users" :fields="fields"><!-- lista tabela usuarios, hover: ao passar mouse,striped:tabela zebrada, aponta: users, fields campo ordenados-->
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2"><!--mr-2:margem right 2-->
                    <i class="fa fa-pencil"></i>
                </b-button><!--fa fa-pencil:icone caneta,variant="warning" amarelo botão,@click="loadUser(data.item)"==item selecionado naquela linha-->
                <b-button variant="danger" @click="loadUser(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global' //acessar baseApiUrl uma constanete endereço do backend onde sera feito varias requisisoes apartir dele,  o global apartir diretamente src pasta
import axios from 'axios' //Axios é um cliente HTTP baseado em Promises para fazer requisições.

export default {
    name: 'UserAdmin',
    data: function() {//atributo data aponta p uma função q retorna um objeto
        return {//tendo 3 atributos abaixo
            mode: 'save',//modo save serve para alterar botão do usuario, save com id já put, save sem id post, save botão remover metodo delete
            user: {},//usuario q sera cadastrado.. inicia vazio
            users: [],//array de usuarios
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true },
                { key: 'admin', label: 'Administrador', sortable: true,
                    formatter: value => value ? 'Sim' : 'Não' },//formatter:formatar valor padrão true para sim
                { key: 'actions', label: 'Ações' }//açoes de alterar e excluir usuario
            ]
        }//descrição dos campos pelo b-table, sortable:aceita a ordenação para true
    },
    methods: {//metodos p salvar, excluir, dar clear na tela e outros
        loadUsers() {//carregar os usuarios no backend
            const url = `${baseApiUrl}/users` 
            axios.get(url).then(res => {
                this.users = res.data //carregando em data
            })
        },
        reset() {//criando o reset botão interação
            this.mode = 'save' //coloca modo save 
            this.user = {} //q zera o usuario
            this.loadUsers() //e atualiza carrega usuarios reset
        },
        save() {//botão save, faz requisição para backend
            const method = this.user.id ? 'put' : 'post' //se id ja estiver setado sera put>editar : se não post novo usuario 
            const id = this.user.id ? `/${this.user.id}` : '' //se id estiver setado no final da url coloca /id se não vazio
            axios[method](`${baseApiUrl}/users${id}`, this.user)//axios[method put ou post](passa url), this.usuario parametro req
                .then(() => {//dando certo chama then
                    this.$toasted.global.defaultSuccess()//mostra msg sucesso
                    this.reset()//reset tem loadUsers q atualiza usuarios
                })
                .catch(showError)//caso de erro
        },
        remove() {//metodo remove botão banco de dados..
            const id = this.user.id
            axios.delete(`${baseApiUrl}/users/${id}`)//delete no id especifico
                .then(() => {
                    this.$toasted.global.defaultSuccess()//sucesso exclussão
                    this.reset()
                })
                .catch(showError)
        },
        loadUser(user, mode = 'save') {//loadUser recebe save
            this.mode = mode //seta o modo
            this.user = { ...user }//seta usuario,   ...:spread, ou carregar usuario especifico id para editar algo
        }
    },
    mounted() {//carregar ciclo de vida usuarios com mounted
        this.loadUsers()//usando this Invocado logo após a instância ter sido montada
    }
}
</script>

<style>

</style>
