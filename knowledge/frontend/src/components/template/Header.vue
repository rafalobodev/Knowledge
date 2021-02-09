<template><!--sc: scaffold cria a estrutura vue-->
    <header class="header">
        <a class="toggle" @click="toggleMenu" v-if="!hideToggle"><!--passa click do togglemenu methods, v-if="!hideToggl :se não estiver escondido o menu mostra-->
            <i class="fa fa-lg" :class="icon"></i><!--font awesome icone referenciado da linha 25 e : mostra q é valor boolean-->
        </a>
        <h1 class="title">
            <router-link to="/">{{ title }}</router-link>
        </h1><!--onde fica o titulo e rota principal / ao clicar titulo vai para rota principal-->
        <UserDropdown v-if="!hideUserDropdown" /><!--se drop estiver negado ou não é pra esconder, renderiza-->
    </header>
</template>

<script>
import UserDropdown from './UserDropdown' //importa para header da pagina a div arquivo UserDropdown.js

export default {
    name: 'Header',
    components: { UserDropdown },//coloca como componente esse UserDropdown
    props: {//colocar parametros do componente
        title: String,
        hideToggle: Boolean, //mostrar e esconder menu esquerdo da aplicação
        hideUserDropdown: Boolean //mostrar e esconder menu direito da aplicação
    },
    computed: {//propriedade computada
        icon() {
            return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down"  //estado store do icone seta visivel fa-angle-left== <, se não seta baixo down
        }
    },
    methods: {
        toggleMenu() {//metodo mostrar e esconder menu da aplicação
            this.$store.commit('toggleMenu')//chamar função toggleMenu para mudar store em abre menu true fecha false
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;/*area do cabeçario */
        background: linear-gradient(to right, #1e469a, #49a7c1);/*duas cores misturadas fundo site..esquerda azul,direitaazul fraco*/

        display: flex;/*flexivel posicionamento box */
        justify-content: center;/*conteudo cabeçario centro*/
        align-items: center;/*centralizado no box a escrita */
    }

    .title {
        font-size: 1.2rem;/*tamanho da fonte */
        color: #fff;
        font-weight: 100;/*peso font mais densa a letra */
        flex-grow: 1;/*titulo possa crescer dentro do header mantem nos locais certos*/
        text-align: center;/*e alinhar no meio  */
    }

    .title a {/*a=link html */
        color: #FFF;/*cor branca tirar azul padrão dos links */
        text-decoration: none;/*remove risco de link tbm com none */
    }

    .title a:hover {/*ao passar o mouse */
        color: #FFF;
        text-decoration: none;/*remover linha padrão de link */
    }

    header.header > a.toggle {/*a link toggle cabeçario seta e titulo... */
        width: 60px;
        height: 100%;
        color: #fff;
        justify-self: flex-start;/* Equivalente a 'start'. Observe que justificar-se é ignorado em layouts Flexbox. */
        text-decoration: none;

        display: flex;/*modo flex posicionamento */
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover {/*hover:ao passar mouse altera cor do click etc */
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);/*preto com transparencia grande ao passar o mouse */
    }
</style>
