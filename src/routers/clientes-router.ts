import express, { Router } from 'express'
import clientes from '../models/clientes'
import ClientesRepository from '../repositories/clientes-repository'

const clientesRouter = express.Router()

clientesRouter.post('/', (req,res) => {
    const clientes: clientes = req.body
    ClientesRepository.criar(clientes,(id) => {
        if (id) {
            res.status(201).location(`/clientes/${id}`).send()
        } else {
            res.status(400).send()
        }
    })
})

clientesRouter.get('/', (req, res) => {
	ClientesRepository.lerTodos((clientes) => res.json(clientes))
})

clientesRouter.get('/:id', (req, res) => {
	const id: number = +req.params.id
	ClientesRepository.ler(id, (clientes) => {
		if (clientes) {
			res.json(clientes)
		} else {
			res.status(404).send()
		}
	})
})

clientesRouter.put('/:id', (req, res) => {
	const id: number = +req.params.id
	ClientesRepository.atualizar(id, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

clientesRouter.delete('/:id', (req, res) => {
	const id: number = +req.params.id
	ClientesRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })
})
    
export default clientesRouter