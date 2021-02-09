module.exports = app => {//exportar
    function existsOrError(value, msg) {//validações se existe funciona se não da erro
        if(!value) throw msg //se não tiver setado valor lança mensagem erro
        if(Array.isArray(value) && value.length === 0) throw msg//segundo teste.. se retornou array vazio, não conseguiu o q queria
        if(typeof value === 'string' && !value.trim()) throw msg //string com espaços em branco lança mensagem tbm
    }
    
    function notExistsOrError(value, msg) {//se não existir ok.. se existir: erro
        try {
            existsOrError(value, msg)//passou sem erro nenhum
        } catch(msg) {//se erro catch apenas retorna tudo certo
            return
        }
        throw msg//se não der erro.. gera erro msg
    }
    
    function equalsOrError(valueA, valueB, msg) {//testar 2 valores se são iguais ou não
        if(valueA !== valueB) throw msg//valor a diferente b ai lança mensagem
    }

    return { existsOrError, notExistsOrError, equalsOrError }//retornar exportação com consig
}