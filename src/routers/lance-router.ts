import express, { Router } from 'express'
import Lance from '../models/lance'
import usuarios from '../models/usuarios'
import lanceRepository from '../repositories/lance-repository'
import leiloesRepository from '../repositories/leiloes-repository'
import produtosRouter from './produtos-router'

const lanceRouter = express.Router()

lanceRouter.post('/', (req, res) => {
	const lance: Lance = req.body
	lanceRepository.criar(lance, (id) => {
        if (id) {
           res.status(201).location(`/lance/${id}`).send()
			//res.status(200).send(id)
        } else {
            res.status(400).send()
        }
    })

    lanceRouter.post('/', (req,res) => {
        const lance: Lance = req.body
        lanceRepository.criar(lance, (id) => {
            if (id) {
                lanceRepository.ler(id, function(lance) {
                    if (lance) {
                        leiloesRepository.ler(lance.id_leilao, function(leilao) {
                            if (leilao) {
                                const tempoLance = new Date(lance.tempo);
                                const terminoLeilao = new Date(leilao.termino);
                                if (tempoLance < terminoLeilao) {
                                    res.status(201).send()
                                } else {
                                    res.status(400).send();
                                }
                            } else {
                                res.status(401).send();
                            }
                        })
                    } else {
                        res.status(400).send();
                    }  
                })
            } else {
                res.status(400).send();
            }
        })
    })
})



export default lanceRouter