
exports.up = function(knex, Promise) {//up exemplo cria algo.. OBS: sempre se cria novas migrates para fazer alteraçoes diferentes
    return knex.schema.createTable('categories', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.integer('parentId').references('id')//integer:numero inteiro do id da tabela categories
            .inTable('categories')
    })
};

exports.down = function(knex, Promise) {//down faz oposto tipo remove algo
    return knex.schema.dropTable('categories')
};
