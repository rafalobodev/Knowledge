import Vue from 'vue' /*rotas pra fazer conecção */
import VueRouter from 'vue-router' //faz as rotas vue

import Home from '@/components/home/Home' //navegar deforma absoluta com @ importa arquivo vue front
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory' //colocando rota importada para mapear ArticlesByCategory conteudo exibido
import ArticleById from '@/components/article/ArticleById' //importa nas rotas o artigo por id do no vo arquivo criado
import Auth from '@/components/auth/Auth' //import do auth na rota do front com back

import { userKey } from '@/global'/*para acessar o localstore com as infor lá */

Vue.use(VueRouter)//coloca em uso o vueRoter para criação das rotas

const routes = [{//criando as rotas, configurando e etc
    name: 'home',//primeira rota..
    path: '/',
    component: Home
}, {
    name: 'adminPages',//segunda rota..
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true } //para adm ter acesso atela de adm do sistema
}, {//criando rota dos artigos e categ ja criados o conteudo msm
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
}, {//nome, path da rota, e componente de acesso caminho entre front e o back
    name: 'articleById', //nome apenas rota arquivo
    path: '/articles/:id', //url
    component: ArticleById //componente q foi importado importado
}, {
    name: 'auth',
    path: '/auth',//rota do login
    component: Auth
}]

const router = new VueRouter({//recebendo rotas
    mode: 'history',//coloca modo hystory e não hash para ter url mais bonita por si dizer
    routes //coloca const routes para receber
})

router.beforeEach((to, from, next) => {//(to=qual tela q eu vou, de onde,e proximo)
    const json = localStorage.getItem(userKey)//json recebe key de storage

    if(to.matched.some(record => record.meta.requiresAdmin)) {//to=onde vai .. requiresAdmin=Administração do Sistema
        const user = JSON.parse(json)//analisa uma string JSON dados do db back
        user && user.admin ? next() : next({ path: '/' })//se for adm vai next.. usuario não for administrador volta para /
    } else {
        next()//se não vai p next
    }
})

export default router //exporta router
