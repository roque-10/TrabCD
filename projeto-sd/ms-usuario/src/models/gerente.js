const mongoose = require("../connection")
const Usuario = require("./usuario")

const GerenteSchema = new mongoose.Schema({
    _id: {
          type: mongoose.Schema.Types.ObjectId
        , ref: Usuario.modelName
    },
    nome: {
        type: String
      , require: true
    },
    setor: {
        type: String
    }
})

const Gerente = mongoose.model('Gerente', GerenteSchema)

module.exports = Gerente