const mongoose = require("../connection")

const UsuarioSchema = new mongoose.Schema({
    email: {
          type: String
        , require: true
        , unique: true
    },
    senha: {
          type: String
        , require: true
    },
    tipo: {
          type: Number
        , require: true
    }
})

const Usuario = mongoose.model('Usuario', UsuarioSchema)

module.exports = Usuario