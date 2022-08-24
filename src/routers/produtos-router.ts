import express from 'express'
import { createModuleResolutionCache } from 'typescript'
import Produtos from '../models/produtos'
import produtosRepository from '../repositories/produtos-repository'

const produtosRouter = express.Router()

produtosRouter.post('/', (req, res) => {
	const produtos: Produtos = req.body
	produtosRepository.criar(produtos, (id) => {
        if (id) {
           res.status(201).location(`/produtos/${id}`).send()
			//res.status(200).send(id)
        } else {
            res.status(400).send()
        }
    })
})
//
produtosRouter.get('/', (req, res) => {
	console.log("ueba")
	//produtosRepository.lerTodos((produtos) => console.log(produtos))
	produtosRepository.lerTodos((produtos) => res.json(produtos))
})

produtosRouter.get('/:id', (req, res) => {
	const id: number = +req.params.id
	produtosRepository.ler(id, (produtos) => {
		if (produtos) {
			res.json(produtos)
		} else {
			res.status(404).send()
		}
	})
})

produtosRouter.put('/:id', (req, res) => {
	const id: number = +req.params.id
	produtosRepository.atualizar(id, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

produtosRouter.delete('/:id', (req, res) => {
	const id: number = +req.params.id
	produtosRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})

export default produtosRouter