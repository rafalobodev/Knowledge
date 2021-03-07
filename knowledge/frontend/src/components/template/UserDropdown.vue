<template><!--faz parte do header o user-dropdown-->
    <div class="user-dropdown">
        <div class="user-button"><!--area do click q mostra o dropdown a direita site header administração-->
            <span class="d-none d-sm-block">{{ user.name }}</span><!--nome do usuario, d-none d-sm-block:Esconde apenas em telas xs-->
            <div class="user-dropdown-img"><!--componente gravata abaixo,imagens e links do usuario, :email.. interpretar valor e não ser string comum-->
                <Gravatar :email="user.email" alt="User" />
            </div>
            <i class="fa fa-angle-down"></i><!--fa fa-angle-down: é icone imagem para baixo seta-->
        </div>
        <div class="user-dropdown-content"><!--conteudo do drop de menu adm-->
            <router-link to="/admin" v-if="user.admin"><!--links router da roter.js, i fa fa-cogs:icone engrenagem,if apenas se for admin aparece-->
                <i class="fa fa-cogs"></i> Administração
            </router-link>
            <a href @click.prevent="logout"><i class="fa fa-sign-out"></i> Sair</a><!--prevent:prevenir a chamada padrão de um click-->
        </div>
    </div>
</template>

<script>
import { userKey } from '@/global' //importa a chave 
import { mapState } from 'vuex' //mapear usuario do story com vuex
import Gravatar from 'vue-gravatar'//coloca imagens e links do usuario

export default {
    name: 'UserDropdown', //nome do componente
    components: { Gravatar },//para usar o gravatar-vue dentro template
    computed: mapState(['user']),//chama mapState para user
    methods: {
        logout() {//deslogar 
            localStorage.removeItem(userKey)//remove a userkey chave
            this.$store.commit('setUser', null)//passa nulo em usuario
            this.$router.push({ name: 'auth' })//e faz push para tela de login
        }
    }
}
</script>

<style>
    .user-dropdown {/*onde tem imagem a direita e menu opçoes adm*/
        position: relative;/* conteudo dentro dropdown..position relative posiciona o elemento em relação a si mesmo*/
        height: 100%;
    }

    .user-button {
        display: flex;/*mostra na tela cria posicionamento alinhado */
        align-items: center;/*centraliza no header */
        color: #fff;/*cor do nome usuario */
        font-weight: 100;
        height: 100%;
        padding: 0px 20px;/*não ficar colado na tela:baixo px,direita para esquerda px  */
    }

    .user-dropdown:hover {
        background-color: rgba(0, 0, 0, 0.2);/*sombreamento ao passar mouse */
    }

    .user-dropdown-img {/*espaaçamento entre imagem e icone */
        margin: 0px 10px;/*margem pra não ficar colado */
    }

    .user-dropdown-img > img {/*imagem do tamanho correto */
        max-height: 37px;/*altura maxima imagem adm */
        border-radius: 5px;/*borda de 5px */
    }


    .user-dropdown-content {/*conteudo dropdown direita */
        position: absolute;/*para controlar position fica em absolute*/
        right: 0px;/*alinhado ao lado direito da tela totalmente */
        background-color: #f9f9f9;
        min-width: 170px;/*tamanho minimo  */
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);/*sombreamento */
        padding: 10px;/*afasta das laterais */
        z-index: 1;/*ordem de pilha prioridade elemento por(posição: absoluto, posição: relativa, posição: fixa ou posição: aderente). */

        display: flex;/*organizar usando flex mais facil */
        flex-direction: column;/*deixa em coluna as opçoes */
        flex-wrap: wrap;/*define se os itens flexíveis são forçados a ficarem na mesma linha ou se podem ser quebradas em varias linhas. */

        visibility: hidden;/*visibilidade inicia escondido */
        opacity: 0;/*opacidade não visivel */
        transition: visibility 0s, opacity 0.5s linear;/*transition quando tiver passando de um para o outro */
    }

    .user-dropdown:hover .user-dropdown-content {/*passando mouse no dropdown usuario abrir conteudo sem clicar */
        visibility: visible;/*coloca como visivel */
        opacity: 1;/*fica visivel */
    }

    .user-dropdown-content a {/*ajeitando conteudo drop.. */
        text-decoration: none;
        color: #000;
        padding: 10px;
    }

    .user-dropdown-content a:hover {/*passando mouse conteudo.. */
        text-decoration: none;
        color: #000;
        background-color: #EDEDED;
    }
</style>
