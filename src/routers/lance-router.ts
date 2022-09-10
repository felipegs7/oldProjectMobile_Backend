import express, { Router } from 'express'
import Lance from '../models/lance'
import usuarios from '../models/usuarios'
import lanceRepository from '../repositories/lance-repository'
import leiloesRepository from '../repositories/leiloes-repository'
import produtosRouter from './produtos-router'

const lanceRouter = express.Router()

  
    
    // lanceRouter.get('/:id/lances/mais_alto', (req, res) =>{
    //     const id: number = +req.params.id
    //     lanceRepository.lerAlto (id, (lance) => {
    //         if (lance) {
    //         res.status(200).json(lance)
    //         }else {
    //             res.status(404).send()
    //         }
    //     })
    
   
 

    lanceRouter.post('/', (req,res) => {
        const lance: Lance = req.body
        if (req.headers.token) {
            const token: string = req.headers.token.toString()
            lance.id_usuario = Number(token)
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
                                        console.error('POST /lances ERROR#1');
                                        res.status(400).send();
                                    }
                                } else {
                                    res.status(401).send();
                                }
                            })
                        } else {
                            console.error('POST /lances ERROR#2');
                            res.status(400).send();
                        }  
                    })
                } else {
                    console.error('POST /lances ERROR#3');
                    res.status(400).send();
                }
            })
        } else {
            console.error('POST /lances ERROR#4');
            res.status(400).send();
        }
        
    })




export default lanceRouter