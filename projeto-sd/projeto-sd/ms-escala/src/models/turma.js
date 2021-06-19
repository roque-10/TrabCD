const mongoose = require("../connection")

const TurmaSchema = new mongoose.Schema({
    tag: {
          type: String
    },
    dia: {
        type: String
    },
    capacidade: {
        type: Number
    },
    vagas: {
        type: Number
    }
})

const Turma = mongoose.model('Turma', TurmaSchema)

module.exports = Turma