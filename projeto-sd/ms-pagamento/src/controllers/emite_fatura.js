const express = require("express")
const router = express.Router()
const Fatura = require("../models/fatura")
const Aluno = require("../models/aluno")

router.post("/fatura", async (req, res) => {
    try {
        const tipoUsuario = req.body.tipoUsuario

        if(tipoUsuario == 4) {
            const objFatura = {
                  "nome": req.body.nome
                , "preco": req.body.preco
                , "situacao": "aberta"
            }

            await Fatura.create(objFatura)
            await Aluno.findOneAndUpdate({ nome: req.body.nome }, { $set: { 
                                                                        fatura: { 
                                                                              preco: req.body.preco
                                                                            , situacao: "aberta" 
                                                                        } 
                                                                    } })
                    
            return res.send("Fatura emitida em nome do aluno " + req.body.nome + ".")
        } else {
            return res.send("Apenas gerentes do financeiro podem realizar essa operação !")
        }
    } catch (error) {
        return res.status(400).send(error)
    }
})

module.exports = app => app.use('/emitir', router)