const express = require("express")
const router = express.Router()
const Usuario = require("../models/usuario")
const Aluno = require("../models/aluno")
const Professor = require("../models/professor")
const Gerente = require("../models/gerente")
const Turma = require("../models/turma")
const Escala = require("../models/escala")
const Fatura = require("../models/fatura")

router.post("/usuario", async (req, res) => {
    try {
        const tipoUsuario = req.body.tipoUsuario

        if (tipoUsuario == 3) {
            const tipo = (await Usuario.findOne({ email: req.body.email })).tipo
            const id = (await Usuario.findOne({ email: req.body.email }))._id

            await Usuario.deleteOne({ email: req.body.email })

            if (tipo == 1) {
                const nome = (await Aluno.findOne({ _id: id })).nome
                const turma = (await Aluno.findOne({ nome: nome })).turma
                const alunos = (await Escala.findOne({ tag: turma })).alunos
                const index = alunos.indexOf(nome)
                alunos.splice(index, 1)

                await Aluno.deleteOne({ nome: nome })
                await Turma.findOneAndUpdate({ tag: turma }, { $inc: { vagas: 1 } })
                await Escala.findOneAndUpdate({ tag: turma }, { $set: { alunos: alunos } })
                await Fatura.deleteMany({ nome: nome, situacao: "fechada" })
            } else if (tipo == 2) {
                const nome = (await Professor.findOne({ _id: id })).nome

                await Professor.deleteOne({ nome: nome })
                await Escala.updateMany({ professor: nome }, { $set: { professor: "" } })
            } else if (tipo == 3 || tipo == 4) {
                const nome = (await Gerente.findOne({ _id: id })).nome

                await Gerente.deleteOne({ nome: nome })
            }

            return res.send("O usuário " + req.body.email + " foi excluído !")
        } else {
            return res.send("Apenas gerentes podem excluir usuários !")
        }
    } catch (error) {
        return res.status(400).send({ error })
    }
})

module.exports = app => app.use('/excluir', router)