import express from 'express'
import cors from 'cors'

import produtosRouter from './routers/produtos-router';
import usuariosRouter from './routers/usuarios-router';
import lanceRouter from './routers/lance-router';
import leilaoRouter from './routers/leilao-router';
import autenticacaoRouter from './routers/autenticacao-router';

// Porta do servidor
const PORT = process.env.PORT || 4000

// Host do servidor
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'

// App Express
const app = express()

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Endpoint raiz
app.get('/', (req, res) => {
	res.send('Bem-vindo!')
})

// Cors
app.use(cors({
	origin: '*'
}))

// Rotas
app.use('/produtos', produtosRouter)
app.use('/usuarios', usuariosRouter)
app.use('/lances', lanceRouter)  
app.use('/leiloes', leilaoRouter)
app.use('/autenticacao', autenticacaoRouter)

// Resposta padrão para quaisquer outras requisições:
app.use((req, res) => {
	res.status(404)
})
//
// Inicia o sevidor
app.listen(PORT, () => {
	console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})