
exports.up = function (knex, Promise) {//*knex migrate:make create_table_users     :terminal backend cria pasta migrates e cria a tabela users no caso arquivo com data e hora criada
    return knex.schema.createTable('users', table => {//passa nome users da tabela q quer criar
        table.increments('id').primary() //chave primaria de incremento id
        table.string('name').notNull()//notNull campo obrigatorio
        table.string('email').notNull().unique()//unique:tem q ser unico o email
        table.string('password').notNull()
        table.boolean('admin').notNull().defaultTo(false)//se é admin s ou não n,defaultTo:padrão ou inicialmente falso
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')//remove pois não mais necessario users apos criado
};
