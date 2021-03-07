import Vue from 'vue' //padrão
import VueMq from 'vue-mq' //importa dependencia

Vue.use(VueMq, {
    breakpoints: {
        xs: 576,
        sm: 768,
        md: 960,
        lg: 1140,
        xl: Infinity
    }
})//breakpoints para cada tamanho celular e telas