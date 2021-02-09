module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation //habilita validaçoes

    const save = (req, res) => {//save serve incluir ou alterar uma categoria
        const category = {
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId
        }
        
        if(req.params.id) category.id = req.params.id // se vier os parametros da requisição id id cat recebe id req

        try {//validações
            existsOrError(category.name, 'Nome não informado')//se existe nome ok, se não erro cai catch
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(category.id) {//se tiver setado
            app.db('categories')
                .update(category)//faz um update
                .where({ id: category.id })//add categoria pelo id
                .then(_ => res.status(204).send())//tudo ok
                .catch(err => res.status(500).send(err))
        } else {
            app.db('categories')
                .insert(category)//se não cai na inclusão
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {//metodo de remover categoria
        try {
            existsOrError(req.params.id, 'Código da Categoria não informado.')//se faltar id error

            const subcategory = await app.db('categories')//ver se tem subcategorias com await
                .where({ parentId: req.params.id })//parentid =id dos parametros
            notExistsOrError(subcategory, 'Categoria possui subcategorias.')//tendo assim parentesco id sub categorias não pode excluir

            const articles = await app.db('articles')//verificar artigos
                .where({ categoryId: req.params.id })
            notExistsOrError(articles, 'Categoria possui artigos.')//se tiver gera problema e não deleta

            const rowsDeleted = await app.db('categories')//rowsDeleted:para deletar realmente
                .where({ id: req.params.id }).del()//deletar
            existsOrError(rowsDeleted, 'Categoria não foi encontrada.')//caso erro vai catch

            res.status(204).send()//caso ok e deletou
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const withPath = categories => {//recebe uma lista de categorias para retornar denovo a lista de categorias
        const getParent = (categories, parentId) => {//passa categoria pai
            const parent = categories.filter(parent => parent.id === parentId)//chama filter:filtrar q recebe callback para achar parentid
            return parent.length ? parent[0] : null //se array tiver tamanho maior q 0 retorna verdadeiro, retorna parent[indice0]:se não nulo
        }

        const categoriesWithPath = categories.map(category => {//map:pegar algo especifico de categories ou no caso traformar categorias em outro array de categorias tendo path a mais
            let path = category.name //let=sempre mechendo em uma variavel
            let parent = getParent(categories, category.parentId)//recebendo parent de categoria

            while(parent) {
                path = `${parent.name} > ${path}` //concatena parent com path
                parent = getParent(categories, parent.parentId)//monta caminho encontra pai de parent
            }

            return { ...category, path }//Spread operator:Ele basicamente permite que expressões expandam o conteúdo de arrays em locais onde múltiplos elementos são esperados.
        })

        categoriesWithPath.sort((a, b) => {//sort: fazer ser em ordem alfabetica as categorias
            if(a.path < b.path) return -1 //retorna a primeiro
            if(a.path > b.path) return 1 //retorna 1 ou b
            return 0 //0 os dois são iguais
        })

        return categoriesWithPath //retorna categorias ordenados pelo path q seria nomes ex: css>js>html
    }

    const get = (req, res) => {//função get para retornar as categorias
        app.db('categories')//banco de dados categorias
            .then(categories => res.json(withPath(categories)))//pega array de categorias
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('categories')
            .where({ id: req.params.id })//pega id..
            .first()//pegando o primeiro
            .then(category => res.json(category))//passa categoria
            .catch(err => res.status(500).send(err))
    }

    const toTree = (categories, tree) => {//transformar array de categorias em arvores de ligação 
        if(!tree) tree = categories.filter(c => !c.parentId)//se arvore não estiver setado a tree recebe filter de categ e seta apenas categori id não setados
        tree = tree.map(parentNode => {//tree map pega parentNode:nós pais para encontrar filhos
            const isChild = node => node.parentId == parentNode.id //encontra filhos dos nós pais
            parentNode.children = toTree(categories, categories.filter(isChild))//chama filhos de forma recursiva a arvore, filter(isChild):pega filhos depois transformado em arvore
            return parentNode//retorna pra rodar
        })
        return tree//retorna estrutura arvore 
    }

    const getTree = (req, res) => {//getTree q sera retornado sobre arvores
        app.db('categories')
            .then(categories => res.json(toTree(categories)))//passa lista de categorias obtidas banco de dados passa json como resposta
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getTree }//para tudo funcionar retorna
}