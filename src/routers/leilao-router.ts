import express from 'express'
import { createModuleResolutionCache } from 'typescript'
import leilao from '../models/leilao'
import leilaoRepository from '../repositories/leiloes-repository'

const leilaoRouter = express.Router()

leilaoRouter.post('/', (req, res) => {
	const leilao: leilao = req.body
	leilaoRepository.criar(leilao, (id) => {
        if (id) {
           res.status(201).location(`/leilao/${id}`).send()
			//res.status(200).send(id)
        } else {
            res.status(400).send()
        }
    })
})
//
leilaoRouter.get('/', (req, res) => {
	console.log("ueba")
	//leilaoRepository.lerTodos((leilao) => console.log(leilao))
	leilaoRepository.lerTodos((leilao) => res.json(leilao))
})

leilaoRouter.get('/:id', (req, res) => {
	const id: number = +req.params.id
	leilaoRepository.ler(id, (leilao) => {
		if (leilao) {
			res.json(leilao)
		} else {
			res.status(404).send()
		}
	})
})

leilaoRouter.put('/:id', (req, res) => {
	const id: number = +req.params.id
	leilaoRepository.atualizar(id, req.body, (notFound) => {
		if (notFound) {
			res.status(404).send()
		} else {
			res.status(204).send()
		}
	})
})

leilaoRouter.delete('/:id', (req, res) => {
	const id: number = +req.params.id
	leilaoRepository.apagar(id, (notFound) => {
        if (notFound) {
            res.status(404).send()
        } else {
            res.status(204).send()
        }
    })

})

leilaoRouter.get('/ativo', (req, res) =>{
	
})

export default leilaoRouter