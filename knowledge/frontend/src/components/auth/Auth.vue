<template><!--tela de logar e cadastrar-->
    <div class="auth-content">
        <div class="auth-modal"><!--modal-->
            <img src="@/assets/logo.png" width="200" alt="Logo" /><!--logo imagem coder, alt: se nome logo tiver errado aparece nome logo-->
            <hr>
            <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div><!--cadastro inicia falso mostra login titulo-->

            <input v-if="showSignup" v-model="user.name" type="text" placeholder="Nome"><!--se nup nome do usuario-->
            <input v-model="user.email" name="email" type="text" placeholder="E-mail"><!--email padrão-->
            <input v-model="user.password" name="password" type="password" placeholder="Senha">
            <input v-if="showSignup" v-model="user.confirmPassword"
                type="password" placeholder="Confirme a Senha"><!--se nup confirm senha-->

            <button v-if="showSignup" @click="signup">Registrar</button><!--botão se nup registrar se não in logar-->
            <button v-else @click="signin">Entrar</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
                <span v-else>Não tem cadastro? Registre-se aqui!</span>
            </a><!--link altera de prevent=previni comportamento padrão apenas e apareça cadastro ou signup-->
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '@/global' //
import axios from 'axios'

export default {
    name: 'Auth',
    data: function() {
        return {
            showSignup: false,//falso mostra o login e true o cadastrar
            user: {} //nome do usuario email do usuario senha .... dados
        }
    },
    methods: {
        signin() {
            axios.post(`${baseApiUrl}/signin`, this.user)//usuario q quer enviar do back pra fazer post do login
                .then(res => {//feito com sucesso pega res para setar..
                    this.$store.commit('setUser', res.data)//store resultado e ususario
                    localStorage.setItem(userKey, JSON.stringify(res.data))//seta usando userkey e converte json string
                    this.$router.push({ path: '/' })//faz push pra aplicação
                })
                .catch(showError)
        },
        signup() {//cadastro
            axios.post(`${baseApiUrl}/signup`, this.user)//post url cadastro se tudo certo
                .then(() => {
                    this.$toasted.global.defaultSuccess()//mostra mensagem de sucesso apenas
                    this.user = {}//deixa vazio user pronto para login
                    this.showSignup = false //muda para tela de login deixando false
                })
                .catch(showError)
        }
    }
}
</script>

<style>
    .auth-content {/*classe de auth */
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #FFF;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

        display: flex;/*util para fazer layout */
        flex-direction: column;/*em coluna */
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {/*input do modal */
        border: 1px solid #BBB;/*cor da borda largura */
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;/*desabilita a linha azul */
    }

    .auth-modal button {
        align-self: flex-end;/*final da modal */
        background-color: #2460ae;
        color: #FFF;
        padding: 5px 15px;
    }

    .auth-modal a {/*link de troca de login para registrar */
        margin-top: 35px;
    }

    .auth-modal hr {/*<hr> */
        border: 0;/*linha fina */
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
    }/*gerar um efeito na borda degrade */
</style>
