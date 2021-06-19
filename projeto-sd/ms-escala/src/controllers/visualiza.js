const express = require("express")
const router = express.Router()
const Aluno = require("../models/aluno")
const Professor = require("../models/professor")
const Escala = require("../models/escala")

router.get("/aluno", async (req, res) => {
    try{
        const tipoUsuario = req.body.tipoUsuario

        if(tipoUsuario == 1){
            const turmaMatriculada = (await Aluno.findOne({ nome: req.body.nome })).turma

            if(turmaMatriculada != "") {
                return res.send({ turmaMatriculada })
            } else {
                return res.send("O aluno " + req.body.nome + " não está matriculado em uma turma !")
            }
        }
    } catch (error) {
        return res.status(400).send({ error })
    }
})

router.get("/professor", async (req, res) => {
    try {
        const tipoUsuario = req.body.tipoUsuario

        if(tipoUsuario == 2) {
            const escala = (await Professor.findOne({ nome: req.body.nome })).escala

            if(escala != []){
                return res.send({ escala })
            } else {
                return res.send("O professor " + req.body.nome + " não está escalada para uma turma !")
            }
        }
    } catch (error) {
        return res.status(400).send({ error })
    }
})

router.get("/gerente", async (req, res) => {
    try {
        const tipoUsuario = req.body.tipoUsuario

        if(tipoUsuario == 3) {
            const escala = await Escala.find({})

            return res.send({ escala })
        }
    } catch (error) {
        return res.status(400).send({ error })
    }
})

module.exports = app => app.use('/visualizar', router)