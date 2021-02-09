const { db } = require('./.env')

module.exports = {//knex ja instalado de forma global no projeto.. no terminal cria knexfile.js no backend q possui a configuração com o banco de dados
	client: 'postgresql',
	connection: db,
	pool: {//pool de conecçoes minimo 2 conections max 10
		min: 2,
		max: 10
	},
	migrations: {//tabala de migração..
		tableName: 'knex_migrations'
	}
};
