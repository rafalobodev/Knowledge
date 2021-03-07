const { authSecret } = require('../.env')//importa criptografia da senha
const jwt = require('jwt-simple')//Módulo de código e decodificação ou gera o token
const bcrypt = require('bcrypt-nodejs')//comparar as senhas banco de dados criptografado com a q recebeu p login

module.exports = app => {
    const signin = async (req, res) => {//async: trabalhar com await
        if (!req.body.email || !req.body.password) {//validar email e senha q ambos vem na requisição
            return res.status(400).send('Informe usuário e senha!')//retorna erro se não tiver email senha
        }

        const user = await app.db('users')//se vem email obtem usuario banco de dados
            .where({ email: req.body.email })//onde email pego body da requisição
            .first()//pega o primeiro..

        if (!user) return res.status(400).send('Usuário não encontrado!')//se não existir usuario erro

        const isMatch = bcrypt.compareSync(req.body.password, user.password)//comparar saber se deu match com senha usuario e req do body
        if (!isMatch) return res.status(401).send('Email/Senha inválidos!')//se não erro

       // Date.now() / 1000    : no console.log site gera a data em segundos deste primeiro de janeiro
        const now = Math.floor(Date.now() / 1000) //token possue uma validade q se divide por 1000

        const payload = {//conteudo do token jwt
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now, //iat: now:data de geração do token
            exp: now + (60 * 60 * 24 * 3) //data de expiração tendo q logar novamente(segundos, hora em minutos, dia 24 horas, 3 dias a mais )
        }

        res.json({//resposta token acima
            ...payload, // resposta
            token: jwt.encode(payload, authSecret) //gera o token em si
        })
    }

    const validateToken = async (req, res) => {//validando token..
        const userData = req.body || null //userData msm req.body senão nulo
        try {
            if(userData) {//se userData tiver setado
                const token = jwt.decode(userData.token, authSecret)//chama token e fazer decodificação token
                if(new Date(token.exp * 1000) > new Date()) {//se a data de espiração token for maior do q atual, token.exp * 1000 milisegundos
                    return res.send(true)//valido
                }
            }
        } catch(e) {
            // problema com o token
        }

        res.send(false)
    }

    return { signin, validateToken }
}