const config = require('../knexfile.js')
const knex = require('knex')(config)//importa knex q faz acesso ao banco de dados postgres e passa como arquivo de configuração

knex.migrate.latest([config])//para todas migrates do postgres funcionem sem precisar colocar no terminal assim q carregar backend
module.exports = knex //exporta knex no arquivo index