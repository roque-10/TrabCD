const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.send (
        "microservice para o gerenciamento de usuários."
    )
})

require("./controllers/cadastro")(app)
require("./controllers/excluir")(app)

module.exports = app