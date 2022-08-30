import express, { Router } from 'express'
import usuarios from '../models/usuarios'
import usuariosRepository from '../repositories/usuarios-repository'

const usuariosRouter = express.Router()

usuariosRouter.post('/', (req,res) => {
    const usuarios: usuarios = req.body
    usuariosRepository.criar(usuarios,(id) => {
        if (id) {
            res.status(201).location(`/usuarios/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})

usuariosRouter.get('/', (req, res) => {
	usuariosRepository.lerTodos((usuarios) => res.json(usuarios))
})

usuariosRouter.get('/:id', (req, res) => {
	const id: number = +req.params.id
	usuariosRepository.ler(id, (usuarios) => {
		if (usuarios) {
			res.json(usuarios)
		} else {
			res.status(404).send()
		}
	})
})

usuariosRouter.put('/:id', (req, res) => {
	const id: number = +req.params.id
	usuariosRepository.atualizar(id, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

usuariosRouter.delete('/:id', (req, res) => {
	const id: number = +req.params.id
	usuariosRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
    
export default usuariosRouter