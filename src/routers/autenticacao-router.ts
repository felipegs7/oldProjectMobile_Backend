import express from 'express'
import { createModuleResolutionCache } from 'typescript'
import autenticacao from '../models/autenticacao'
import Login from '../models/login'
import usuarios from '../models/usuarios'
import usuariosRepository from '../repositories/usuarios-repository'


const autenticacaoRouter = express.Router()

autenticacaoRouter.post('/', (req, res) => {
    const login: Login = req.body
    const callback = (usuarios: usuarios) => {
        if (usuarios && usuarios.id){
            const autenticacao:autenticacao = {
                token: usuarios.id.toString()
            }
             
            res.status(200).json(autenticacao)
        } else {
            res.status(401).send()
        } 
               
    }
    usuariosRepository.verificar(login, callback);
})














export default autenticacaoRouter