const express = require("express")
const router = express.Router()
const Turma = require("../models/turma")
const Escala = require("../models/escala")
const Aluno = require("../models/aluno")
const Professor = require("../models/professor")

router.post("/aluno", async (req, res) => {
    try {
        const tipoUsuario = req.body.tipoUsuario

        if(tipoUsuario == 3){
            const aluno = await Aluno.findOne({ nome: req.body.nome })
            const turmaAtual = await Turma.findOne({ tag: aluno.turma })
            const turmaProxima = await Turma.findOne({ tag: req.body.turma })
            
            if(turmaProxima.vagas > 0){
                if (turmaAtual) {
                    const alunos = (await Escala.findOne({ tag: turmaAtual.tag })).alunos
                    const index = alunos.indexOf(aluno.nome)
                    alunos.splice(index, 1)
                    
                    await Turma.findOneAndUpdate({ tag: turmaAtual.tag }, { $inc: { vagas: 1 } })
                    await Escala.findOneAndUpdate({ tag: turmaAtual.tag }, { $set: { alunos: alunos } })
                }

                await Aluno.findOneAndUpdate({ nome: aluno.nome }, { $set: { turma: turmaProxima.tag } })
                await Turma.findOneAndUpdate({ tag: turmaProxima.tag }, { $inc: { vagas: -1 } })

                const isEscalaExists = await Escala.findOne({ tag: turmaProxima.tag })

                if(!isEscalaExists) {
                    const objEscala = {
                          "tag": turmaProxima.tag
                        , "professor": ""
                        , "alunos": [aluno.nome]
                    }

                    await Escala.create(objEscala)
                } else {
                    const alunos = (await Escala.findOne({ tag: turmaProxima.tag })).alunos
                    alunos.push(aluno.nome)

                    await Escala.findOneAndUpdate({ tag: turmaProxima.tag }, { $set: { alunos: alunos } })
                }

                return res.send(req.body.nome + " foi matriculado(a) na turma " + req.body.turma + ".")
            } else {
                return res.send("Turma " + req.body.turma + " está lotada !")
            }
        } else {
            return res.send("Apenas gerentes podem matricular alunos em turmas !")
        }
    } catch(error) {
        return res.status(400).send({ error })
    }
})

router.post("/professor", async (req, res) => {
    try{
        const tipoUsuario = req.body.tipoUsuario

        if(tipoUsuario == 3){
            const professor = await Professor.findOne({ nome: req.body.nome })
            const escala = professor.escala
            
            if(escala.length < 10) {
                const professorAnteriorEscala = await Escala.findOne({ tag: req.body.turma })

                if(professorAnteriorEscala && professorAnteriorEscala.professor != "") {
                    const escalaProfessorAnterior = (await Professor.findOne({nome: professorAnteriorEscala.professor})).escala
                    const index = escalaProfessorAnterior.indexOf(req.body.turma)
                    escalaProfessorAnterior.splice(index, 1)

                    await Professor.findOneAndUpdate({ nome: professorAnteriorEscala.professor }, { $set: { escala: escalaProfessorAnterior } })
                }

                escala.push(req.body.turma)
                
                await Professor.findOneAndUpdate({ nome: professor.nome }, { $set: { escala: escala } })

                const isEscalaExists = await Escala.findOne({ tag: req.body.turma })

                if(!isEscalaExists) {
                    const objEscala = {
                          "tag": req.body.turma
                        , "professor": professor.nome
                        , "alunos": []
                    }

                    await Escala.create(objEscala)
                } else {
                    await Escala.findOneAndUpdate({ tag: req.body.turma }, { $set: { professor: professor.nome } })
                }
                return res.send("O professor " + req.body.nome + " foi escalado para a turma " + req.body.turma + ".")
            } else {
                return res.send("O professor " + req.body.nome + " já está com a carga horária cheia !")
            }
        } else {
            return res.send("Apenas gerentes podem escalar professores !")
        }
    } catch(error) {
        return res.status(400).send({ error })
    }
})

module.exports = app => app.use('/escalar', router)