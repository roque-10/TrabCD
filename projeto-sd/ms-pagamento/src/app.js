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

require("./controllers/emite_fatura")(app)
require("./controllers/visualiza_fatura")(app)

module.exports = app