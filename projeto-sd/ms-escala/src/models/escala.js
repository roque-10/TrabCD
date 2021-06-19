const mongoose = require("../connection")

const EscalaSchema = new mongoose.Schema({
    tag: {
          type: String
        , unique: true
    },
    professor: {
        type: String
    },
    alunos: {
        type: [String]
    }
})

const Escala = mongoose.model('Escala', EscalaSchema)

module.exports = Escala