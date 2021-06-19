const express = require("express")
const router = express.Router()
const Fatura = require("../models/fatura")
const Aluno = require("../models/aluno")

router.get("/faturaGeral", async (req, res) => {
    try {
        const tipoUsuario = req.body.tipoUsuario

        if (tipoUsuario == 4) {
            const faturas = await Fatura.find({})

            return res.send({ faturas })
        }
    } catch (error) {
        return res.status(400).send({ error })
    }
})

router.get("/fatura", async (req, res) => {
    try {
        const tipoUsuario = req.body.tipoUsuario

        if (tipoUsuario == 1) {
            const fatura = (await Aluno.find({ nome: req.body.nome }))[0].fatura
            
            return res.send({ fatura })
        }
    } catch (error) {
        return res.status(400).send({ error })
    }
})

module.exports = app => app.use('/visualizar', router)