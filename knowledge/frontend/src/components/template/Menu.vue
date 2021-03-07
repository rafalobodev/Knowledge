<template><!--onde fica opçoes e barra pesquisa resumindo o menu onde fica as categorias -->
    <aside class="menu" v-show="isMenuVisible"><!--v-show:tornar visivel menu ou não com-->
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" placeholder="Digite para filtrar..."
                v-model="treeFilter" class="filter-field">
        </div><!--filtrar as categorias digitar e achar especifica tipo google-->
        <Tree :data="treeData" :options="treeOptions"
            :filter="treeFilter" ref="tree" /><!--ref: apenas uma referencia o tree, mostrando na tela as categorias-->
    </aside><!--aside deixa para canto no caso menu, tree: arvores de categoria com artigos...-->
</template><!--:filter="treeFilter" conexão com a tree o filter-->

<script>
import { mapState } from 'vuex' //mapeia um atributo da store dentro componente
import Tree from 'liquor-tree' //importando arvore q sera usada para colocar as categorias no site
import { baseApiUrl } from '@/global' //acessar o backend
import axios from 'axios' //para ter acesso aos serviços do backend

export default {
    name: 'Menu',
    components: { Tree }, //acessar os componentes de liquor tree q esta package json
    computed: mapState(['isMenuVisible']),//associar os atributos para mapear e pode tornar visivel
    data: function() {
        return {//retorna objetos nessa função
            treeFilter: '',//cria inicial de treeFilter
            treeData: this.getTreeData(),//renderizar a arvore do menu
            treeOptions: {//opçoes para mudar na arvore
                propertyNames: { 'text': 'name' },//apontar text para propriedade name
                filter: { emptyText: 'Categoria não encontrada' }//caso não encontrado
            }
        }
    },
    methods: {//metodo para obter os dados da arvore tree
        getTreeData() {
            const url = `${baseApiUrl}/categories/tree` //acessar url do back
            return axios.get(url).then(res => res.data)//retorna promisse do then q resolvida retorna res.data
        },
        onNodeSelect(node) {//apartir do node setar a rota..  'fazer a conexão da tree com categoria ao clicar no menu opçoes aparece artigos.....
            this.$router.push({//rota adicionar com push
                name: 'articlesByCategory',
                params: { id: node.id } //id da categoria pego do backend
            })

            if(this.$mq === 'xs' || this.$mq === 'sm') {//chama mq dependencia se for xs e sm extre pequeno
                this.$store.commit('toggleMenu', false)//mantem menu fechado apos escolher conteudo pois celular pequeno
            }
        }
    },
    mounted() {//para vincular tree com categorias do menu usa mounted
        this.$refs.tree.$on('node:selected', this.onNodeSelect)//ref referencia.tree componente e on para vincular(seleção nó node e chama com this)
    }
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);

        display: flex;
        flex-direction: column;/*em coluna */
        flex-wrap: wrap;/*permitir quebra de linha */
    }

    .menu a,
    .menu a:hover {/*link do menu as categorias nome */
        color: #fff;
        text-decoration: none;/*tira sublinhado padrão */
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover {/*ve na documentação likor tree ou especiona o codigo usado.. editar background do menu ao passa o mouse */
        background-color: rgba(255, 255, 255, 0.2);
    }

    .tree-arrow.has-child {/*atingir categorias filhas da tree */
        filter: brightness(2);/*deixa um pouco mais claro não muda muito */
    }

    .menu .menu-filter {/*ajustes da pesquisa da categ */
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #AAA;
    }

    .menu .menu-filter i {/*tag do i icone lupa da pesquisa */
        color: #AAA;/*cor diferente para ela aparecer */
        margin-right: 10px;
    }

    .menu input { /*melhoras no input */
        color: #CCC;
        font-size: 1.3rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }

    .tree-filter-empty {/*inpecionando no site encontra class de categoria nao encontrada ou documentação de tree */
        color: #CCC;
        font-size: 1.3rem;
        margin-left: 20px;
    }
</style>
