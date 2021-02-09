
exports.up = function(knex, Promise) {
    return knex.schema.createTable('articles', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('description', 1000).notNull()//descrição com 1000 carecteres
        table.string('imageUrl', 1000)//url da imagem do artigo
        table.binary('content').notNull()//binary:campo q ordena o conteudo do artigo
        table.integer('userId').references('id')//id usuario q cadastrou e esta referenciado ao id da tabela users
            .inTable('users').notNull()
        table.integer('categoryId').references('id')//tipo de categoria id
            .inTable('categories').notNull()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles')
};
