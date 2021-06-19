const express = require("express")
const router = express.Router()
const Usuario = require('../models/usuario')
const Aluno = require("../models/aluno")
const Professor = require("../models/professor")
const Gerente = require("../models/gerente")

router.post('/usuario', async (req, res) => {
    try {
        const tipoUsuario = req.body.tipoUsuario
        const objUsuario = {
              "email": req.body.email
            , "senha": req.body.senha
            , "tipo": req.body.tipo 
        }

        if (tipoUsuario == 3) {
            const usuario = await Usuario.create(objUsuario)

            if (req.body.tipo == 1) {
                const objAluno = {
                      "_id": usuario._id
                    , "nome": req.body.nome
                    , "turma": ""
                    , "fatura": {
                          "preco": 80
                        , "situacao": "fechada"
                    }
                }

                const aluno = await Aluno.create(objAluno)

                return res.send({ usuario, aluno })
            } else if (req.body.tipo == 2) {
                const objProfessor = {
                      "_id": usuario._id
                    , "nome": req.body.nome
                    , "escala": []
                }

                const professor = await Professor.create(objProfessor)

                return res.send({ usuario, professor })
            } else if (req.body.tipo == 3 || req.body.tipo == 4) {
                const objGerente = {
                      "_id": usuario._id
                    , "nome": req.body.nome
                    , "setor": req.body.tipo == 3 ? "Gestão de Pessoal" : "Financeiro"
                }

                const gerente = await Gerente.create(objGerente)

                return res.send({ usuario, gerente })
            }
        } else {
            return res.send("Apenas gerentes podem realizar cadastros !")
        }
    } catch (error) {
        return res.status(400).send({error})
    }
})

module.exports = app => app.use('/cadastrar', router)