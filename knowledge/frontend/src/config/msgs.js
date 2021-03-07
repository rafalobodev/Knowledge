import Vue from 'vue'
import Toasted from 'vue-toasted'//usado para criar mensagens, repleto recursos, icones e açoes

Vue.use(Toasted, {//passa toasted como parametro
    iconPack: 'fontawesome',//usar biblioteca de icones do fontawesome
    duration: 3000 //com duração de 3 segundos
})

Vue.toasted.register(//registrar toast e criar duas mensagens uma sucesso outra de erro
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realidada com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Oops.. Erro inesperado.' : payload.msg,
    { type : 'error', icon : 'times' }
)