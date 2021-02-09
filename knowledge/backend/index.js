const app = require('express')()//express q sera o servidor web
const consign = require('consign')
const db = require('./config/db')//importe arquivo db
const mongoose = require('mongoose')

require('./config/mongodb')

app.db = db//armazena na app db.js o knex.. podem usar banco de dados select, delete, etc
app.mongoose = mongoose

consign()// facilita pois ajuda a carregar todos os modulos nos outros arquivados sem necessidade de require
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')//consign p leitura pasta como api
    .then('./schedule')
    .then('./config/routes.js')//ou arquivo especifico apenas mantendo ordem de cada um
    .into(app)//dentro de app

app.listen(4000, () => {
    console.log('Backend executando...')
})