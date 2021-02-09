<template><!--template com html geral com componentes feitos em cada arquivo, gerenciamento geral-->
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}"><!--hide-menu:classe css tera grid quando sera aplicada ou não, no fechar do menu -->
		<Header title="Cod3r - Base de Conhecimento" 
			:hideToggle="!user"
			:hideUserDropdown="!user" /> <!---->
		<Menu v-if="user" />
		<Loading v-if="validatingToken" />
		<Content v-else />
		<Footer />
	</div>
</template>

<script>/*todo js, imports, exports do app principal */
import axios from "axios"
import { baseApiUrl, userKey } from "@/global"
import { mapState } from "vuex"
import Header from "@/components/template/Header" //imports dos arquivos do site no app principal
import Menu from "@/components/template/Menu" //navegar de forma absoluta apartir do src colocando ./compone == @/compone..
import Content from "@/components/template/Content"
import Footer from "@/components/template/Footer"
import Loading from "@/components/template/Loading"

export default {
	name: "App",
	components: { Header, Menu, Content, Footer, Loading },//exporta componentes
	computed: mapState(['isMenuVisible', 'user']), //state no app principal do menu abrir e fechar
	data: function() {
		return {
			validatingToken: true
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true

			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)

			if(!userData) {
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				return
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

			if (res.data) {
				this.$store.commit('setUser', userData)
				
				if(this.$mq === 'xs' || this.$mq === 'sm') {
					this.$store.commit('toggleMenu', false)
				}
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false
		}
	},
	created() {
		this.validateToken()
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