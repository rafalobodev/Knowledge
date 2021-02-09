const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)//entrar senha e email.. urls publicas disponiveis para qualquer um
    app.post('/validateToken', app.api.auth.validateToken)//validador

    app.route('/users')//url /users
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))//metodo q chama post a url e acessa arquivo user q possue metodo save para salvar
        .get(admin(app.api.user.get))//metodo get para pegar todos os usuarios do sistema linha 53 users.js

    app.route('/users/:id') //url +id parametro.. users.js linha 13
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))//PUT utilizado para criar ou editar um recurso ou inserir
        .get(admin(app.api.user.getById))//joga na rota url o getById da linha 61 do user.js.. e pegar usuario por id : users/1 ou users/2..mas não sera usado no sistema
        .delete(admin(app.api.user.remove))

    app.route('/categories')//criando as rotas..
        .all(app.config.passport.authenticate())
        .get(admin(app.api.category.get))
        .post(admin(app.api.category.save))

    // Cuidado com ordem! Tem que vir antes de /categories/:id
    app.route('/categories/tree')//arvores de ligação array de ligação
        .all(app.config.passport.authenticate())//filtro de segurança
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(admin(app.api.category.save))//put para alterar categoria
        .delete(admin(app.api.category.remove))

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.article.get))
        .post(admin(app.api.article.save))

    app.route('/articles/:id')//rota com id no final..
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(admin(app.api.article.save))
        .delete(admin(app.api.article.remove))

    app.route('/categories/:id/articles')//pegar artigos da categoria tal numero
        .all(app.config.passport.authenticate())
        .get(app.api.article.getByCategory)

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get)
}