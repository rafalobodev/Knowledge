<template><!--template com html geral com componentes feitos em cada arquivo, gerenciamento geral-->
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}"><!--hide-menu: oculta menu classe css tera grid quando sera aplicada ou não, quando não tiver usuario -->
		<Header title="Cod3r - Base de Conhecimento" 
			:hideToggle="!user"
			:hideUserDropdown="!user" /> <!--sem user usuario esconde Toggle e dropdown -->
		<Menu v-if="user" /><!--exibe menu se usuario estiver setado-->
		<Loading v-if="validatingToken" /><!--se validação token carregamento , se não-->
		<Content v-else />
		<Footer />
	</div>
</template>

<script>/*todo js, imports, exports do app principal */
import axios from "axios"//importa o axios para validar token
import { baseApiUrl, userKey } from "@/global" //key de logar.. e url
import { mapState } from "vuex"
import Header from "@/components/template/Header" //imports dos arquivos do site no app principal
import Menu from "@/components/template/Menu" //navegar de forma absoluta apartir do src colocando ./compone == @/compone..
import Content from "@/components/template/Content"
import Footer from "@/components/template/Footer"
import Loading from "@/components/template/Loading"/*importa carregamento no app geral */

export default {
	name: "App",
	components: { Header, Menu, Content, Footer, Loading },//exporta componentes importados
	computed: mapState(['isMenuVisible', 'user']), //state no app principal do menu abrir e fechar e do usuario user
	data: function() {
		return {
			validatingToken: true //inicia true
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true //recebe true o token

			const json = localStorage.getItem(userKey)//pega json no localStora usando userkey
			const userData = JSON.parse(json)//seta para os dados do usuario
			this.$store.commit('setUser', null)//seta set user para nulo

			if(!userData) {//se não esta setado 
				this.validatingToken = false //token é falso
				this.$router.push({ name: 'auth' })//retorna para auth login
				return
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)//passa await para esperar token

			if (res.data) {//se resultado.data
				this.$store.commit('setUser', userData)//validado seta no user data
				
				if(this.$mq === 'xs' || this.$mq === 'sm') {
					this.$store.commit('toggleMenu', false)
				}
			} else {
				localStorage.removeItem(userKey)//remove chave
				this.$router.push({ name: 'auth' })//volta para tela de login
			}

			this.validatingToken = false//remove item deixando false tbm
		}
	},
	created() {//created costuma ficar antes do mounterd
		this.validateToken()//puxa validação
	}
}
</script>

<style>/*css */
	* {
		font-family: "Lato", sans-serif; /*fonte da letra colocado dentro pasta public e arquivo index.html*/
	}

	body {
		margin: 0;/*para não deixar margem nenhum sobrando no corpo do site */
	}

	#app {
		-webkit-font-smoothing: antialiased; /*grayscale,grayscale:imprimir fontes de forma interessante suaviza a fonte */
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;/*ocupara a tela inteira da aplicação */
		display: grid;/*em grid bem divididas cada header content e footer */
		grid-template-rows: 60px 1fr 40px; /*organizando esta grid:header, conteudo fr, rodapé */
		grid-template-columns: 300px 1fr; /*menu da aplicação 300px */
		grid-template-areas: /*organizando areas de cada um */
			"header header"
			"menu content"
			"menu footer";
	}

	#app.hide-menu {/*#app:id ap, hide-menu:classe css de menu... areas novas de grid para fazer menu se esconder */
		grid-template-areas:
			"header header"
			"content content"
			"footer footer";
	}
</style>