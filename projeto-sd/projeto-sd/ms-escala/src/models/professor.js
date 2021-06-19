const mongoose = require("../connection")

const ProfessorSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
      , ref: "professors"
    },
    nome: {
        type: String
        , require: true
    },
    escala: {
        type: [String]
    }
})

const Professor = mongoose.model('Professor', ProfessorSchema)

module.exports = Professor