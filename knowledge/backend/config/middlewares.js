const bodyParser = require('body-parser')//faz um parse no body da reqquisição e entregar dados,,chamando dependencias require
const cors = require('cors')//cors: habilitar requisiçoes de origens diferentes,,só é possivel acessar api com cors abilitado

module.exports = app => {
    app.use(bodyParser.json())//metodo use p aplicar bodyParser e cors
    app.use(cors())
}