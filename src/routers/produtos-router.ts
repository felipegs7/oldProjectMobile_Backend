import express from 'express'
import Produtos from '../models/produtos'
import produtosRepository from '../repositories/produtos-repository'

const produtosRouter = express.Router()

produtosRouter.post('/produtos', (req, res) => {
	const produtos: Produtos = req.body
	produtosRepository.criar(produtos, (id) => {
        if (id) {
            res.status(201).location(`/produtos/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})

produtosRouter.get('/produtos', (req, res) => {
	produtosRepository.lerTodos((produtos) => res.json(produtos))
})

produtosRouter.get('/produtos/:id', (req, res) => {
	const id: number = +req.params.id
	produtosRepository.ler(id, (produtos) => {
		if (produtos) {
			res.json(produtos)
		} else {
			res.status(404).send()
		}
	})
})

produtosRouter.put('/produtos/:id', (req, res) => {
	const id: number = +req.params.id
	produtosRepository.atualizar(id, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

produtosRouter.delete('/produtos/:id', (req, res) => {
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