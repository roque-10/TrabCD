const mongoose = require("../connection")

const AlunoSchema = new mongoose.Schema({
    _id: {
          type: mongoose.Schema.Types.ObjectId
        , ref: "usuarios"
    },
    nome: {
        type: String
      , require: true
    },
    turma: {
          type: String
    },
    fatura: {
        preco: {
            type: Number
        },
        situacao: {
            type: String
        }
    }
})

const Aluno = mongoose.model('Aluno', AlunoSchema)

module.exports = Aluno