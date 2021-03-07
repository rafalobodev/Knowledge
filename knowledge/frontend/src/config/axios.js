import axios from 'axios'
//requisiçoes de sucesso e de erro no axios
const success = res => res
const error = err => {
    if (401 === err.response.status) {//se erro 401 recarrega pagina ou volta login
        window.location = '/'
    } else {
        return Promise.reject(err)//se não 
    }
}

axios.interceptors.response.use(success, error)//passa ambos metodos e coloca no main.js importado para funcionar