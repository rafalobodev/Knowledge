<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard" 
            sub="Base de Conhecimento" /><!--fa fa-home:icone casa,main:conectado pagetitle,  sub:pagetitle-->
        <div class="stats"><!--div envolver estatisticas-->
            <Stat title="Categorias" :value="stat.categories"
                icon="fa fa-folder" color="#d54d50" />
            <Stat title="Artigos" :value="stat.articles"
                icon="fa fa-file" color="#3bc480" />
            <Stat title="Usuários" :value="stat.users"
                icon="fa fa-user" color="#3282cd" /><!--colocando arquivos categorias e usuarios e suas cores icones com backend conectado-->
        </div>
    </div>
</template>

<script>
//import PageTitle from '@components/template/PageTitle' //outra forma de import 
import PageTitle from '../template/PageTitle'//importa conectar pagetitle o home
import Stat from './Stat' //importa stat no home
import axios from 'axios' //para ser feita uma requisição no backend
import { baseApiUrl } from '@/global' //import da url base para fazer as requisiçoes

export default {
    name: 'Home',
    components: { PageTitle, Stat },//registrar para poder colocar no template
    data: function() {//data em vue é uma função q retorna um objeto
        return {
            stat: {}//objeto stat vazio retorna, tendo quantidade de usuarios e artigos categorias..
        }
    },
    methods: {//metodos vue..
        getStats() {//sera feito requisição backend
            axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)//para voltar as estatisticas do sistema onde stat = data
        }
    },
    mounted() {
        this.getStats()
    }
}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;/*espaçamento entre 3 arquivo catego.. usuario */
        flex-wrap: wrap;/* quebrar a linha caso for necessario não tenha espaço ou for pra celular, telas menores */
    }
</style>
