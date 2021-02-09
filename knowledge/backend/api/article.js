const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation //existsOrError pego em validations.js,, usando destructure acessando atributos arquivo dentro de um objeto

    const save = (req, res) => {//salvar e alterar
        const article = { ...req.body }//pega body
        if(req.params.id) article.id = req.params.id //se tiver id coloca id de artigo

        try {//validaçoes de erro ou não antes de persistir no artigo
            existsOrError(article.name, 'Nome não informado')
            existsOrError(article.description, 'Descrição não informada')
            existsOrError(article.categoryId, 'Categoria não informada')//obrigatorio ter categoria
            existsOrError(article.userId, 'Autor não informado') //se possue id setado
            existsOrError(article.content, 'Conteúdo não informado')
        } catch(msg) {
            res.status(400).send(msg)//erro lado client 400
        }

        if(article.id) {//se tiver id chama db artigo
            app.db('articles')
                .update(article)//faz update 
                .where({ id: article.id })//where no id para ter certeza q ta alterando apenas artigo q quer msm
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {//se não, vai incluir um artigo
            app.db('articles')
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {//função remover artigo
        try {
            const rowsDeleted = await app.db('articles')//rowsDeleted:se for 0 não existe se 1 existe...ver se gerou quantidade de linhas excluidas
                .where({ id: req.params.id }).del()//.del()=significa q vai excluir os artigos
            
            try {
                existsOrError(rowsDeleted, 'Artigo não foi encontrado.')//se for 0 de id erro ao excluir
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()//se não deu nenhum problema
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const limit = 10 // quantos artigos serão usados em cada pagina ou usado para paginação
    const get = async (req, res) => {//cria função get
        const page = req.query.page || 1 //recebe qual pagina é do artigo atraves do req.. se não tem exibe pagina 1

        const result = await app.db('articles').count('id').first()//armazena resultado na constante ,e count:quantas paginas geradas,first:pega primeiro registro
        const count = parseInt(result.count)//armazena resultado count

        app.db('articles')
            .select('id', 'name', 'description')//select feito para banco de dados
            .limit(limit).offset(page * limit - limit)//limite de 10 registros no maximo,offset:deslocamento para trazer os dados(page * limit - limit)=pagina2 vezes limite 10 ou seja 20 para pagina 2...
            .then(articles => res.json({ data: articles, count, limit }))//não vai retorna artigos diretamente.. cria data retornar articles, count, limit e ter o paginador
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {//para retornar apenas um unico artigo usando first
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => {//um artigo apenas
                article.content = article.content.toString()//passa conteudo artigo..toString:converte formato binario para o de string
                return res.json(article)//retorna em json article
            })
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res) => {//pegar os artigos por id por categoria
        const categoryId = req.params.id //iguala pra resumir
        const page = req.query.page || 1 //consulta getByCategory tbm sera paginada= caso não tenha informado page assume como page 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId) //consulta queries.js arquivo=raw,, recebe achar category id especifico
        const ids = categories.rows.map(c => c.id) //recebendo array de ids filhas recebidas por pai

        app.db({a: 'articles', u: 'users'})//pesquisa banco de dados abrevia a u
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })//oq sera retornado
            .limit(limit).offset(page * limit - limit)//limit:coloca um limite,offset:deslocamento, 
            .whereRaw('?? = ??', ['u.id', 'a.userId'])//iguala as tabelas a==u
            .whereIn('categoryId', ids) //whereIn:retorna valores que correspondem aos valores em uma lista ou subconsulta no caso os ids
            .orderBy('a.id', 'desc')//ordenar os artigos dos mais novos para os mais antigos desc:descrescente
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getByCategory }
}