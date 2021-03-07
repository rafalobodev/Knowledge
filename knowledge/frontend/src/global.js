import Vue from 'vue'

export const userKey = '__knowledge_user' //chave para login
export const baseApiUrl = 'http://localhost:4000' //exporta uma constante p api url q estara em produção na porta do backend

export function showError(e) {//variavel erro
    if(e && e.response && e.response.data) {//se todos estes 'e' estiver setado
        Vue.toasted.global.defaultError({ msg : e.response.data })//joga msg de erro generico especifico
    } else if(typeof e === 'string') {//se for e tipo string
        Vue.toasted.global.defaultError({ msg : e })//passa erro msg apenas e
    } else {
        Vue.toasted.global.defaultError()//se não erro padrão
    }
}

export default { baseApiUrl, showError, userKey }//exporta tudo acima