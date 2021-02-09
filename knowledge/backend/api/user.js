const bcrypt = require('bcrypt-nodejs')//criptografia

module.exports = app => {//app passado para todas as dependencias declaradas algo principal
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation //coloca validaçoes

    const encryptPassword = password => { //criptografar senha gerando hash da senha
        const salt = bcrypt.genSaltSync(10) //genSaltSync: quantidade de passos para processar salt e gerar hash
        return bcrypt.hashSync(password, salt)//hash
    }

    const save = async (req, res) => {//salvar o usuario
        const user = { ...req.body }//...=operador spreed, body parser gerou parser ou clonando body
        if(req.params.id) user.id = req.params.id//se requisição parametro id tiver setado, coloca user.id = mesmo parametro req id

        if(!req.originalUrl.startsWith('/users')) user.admin = false
        if(!req.user || !req.user.admin) user.admin = false

        try {
            existsOrError(user.name, 'Nome não informado')//se não existir mostra mensagem
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de Senha inválida')
            equalsOrError(user.password, user.confirmPassword, 
                'Senhas não conferem')//equals para saber se senhas são iguais

            const userFromDB = await app.db('users')//app.db=conectado usando knex a tabela users
                .where({ email: user.email }).first() //onde pelo email pefando primeiro usuario
            if(!user.id) {//se não tiver id ou seja ja foi usado pois é unico
                notExistsOrError(userFromDB, 'Usuário já cadastrado')//se ja existir aviso
            }
        } catch(msg) {
            return res.status(400).send(msg) //erro do cliente
        }

        user.password = encryptPassword(user.password)//senha criptografando..
        delete user.confirmPassword//deleta a confirmação pois não sera inserida

        if(user.id) {//se tiver id
            app.db('users')
                .update(user)//faz update usuario
                .where({ id: user.id })//onde id é usuario .id
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())//se der certo update chama 204 de ok
                .catch(err => res.status(500).send(err))//caso de erro 500=servidor erro
        } else {// se não
            app.db('users')
                .insert(user)////inserindo
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {//metodo get para pegar todos os usuarios do sistema
        app.db('users')
            .select('id', 'name', 'email', 'admin')//pega 4 informaçoes
            .whereNull('deletedAt')
            .then(users => res.json(users))//passa os usuarios em json
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {//obter usuario pelo id
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })//pega id de requisição.id
            .whereNull('deletedAt')
            .first()//pegar apenas um unico resultado
            .then(user => res.json(user))//note user em singular não users acima
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles')
                .where({ userId: req.params.id })
            notExistsOrError(articles, 'Usuário possui artigos.')

            const rowsUpdated = await app.db('users')
                .update({deletedAt: new Date()})
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }//retorna metodos acima
}