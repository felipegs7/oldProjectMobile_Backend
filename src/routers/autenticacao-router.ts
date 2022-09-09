import express from 'express'
import { createModuleResolutionCache } from 'typescript'
import autenticacao from '../models/autenticacao'
import usuarios from '../models/usuarios'
import autenticacaoRepository from '../repositories/autenticacao-repository'

const autenticacaoRouter = express.Router()

autenticacaoRouter.post('/', (req, res) => {
    const autenticacao: autenticacao = req.body
    autenticacaoRepository.criar(usuarios, (id) => {
        if (id) {
            res.status(201).location(`/autenticacao/${id}`).send()

        } else
        res.status(404).send()

    })

})














export default autenticacaoRouter