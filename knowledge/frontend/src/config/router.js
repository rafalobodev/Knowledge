import Vue from 'vue' /*rotas pra fazer conecção */
import VueRouter from 'vue-router' //faz as rotas vue

import Home from '@/components/home/Home' //navegar deforma absoluta com @ importa arquivo vue front
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory'
import ArticleById from '@/components/article/ArticleById'
import Auth from '@/components/auth/Auth'

import { userKey } from '@/global'

Vue.use(VueRouter)//coloca em uso o vueRoter

const routes = [{//criando as rotas, configurando e etc
    name: 'home',//primeira rota..
    path: '/',
    component: Home
}, {
    name: 'adminPages',//segunda rota..
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
}, {
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
}, {
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById
}, {
    name: 'auth',
    path: '/auth',
    component: Auth
}]

const router = new VueRouter({//recebendo rota
    mode: 'history',//coloca modo hystory e não hash para ter url mais bonita por si dizer
    routes //coloca const routes para receber
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router //exporta router
