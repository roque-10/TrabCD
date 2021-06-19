const mongoose = require("../connection")

const FaturaSchema = new mongoose.Schema({
    nome: {
          type: String
    },
    preco: {
          type: Number
    },
    situacao: {
          type: String
    }
})

const Fatura = mongoose.model('Fatura', FaturaSchema)

module.exports = Fatura