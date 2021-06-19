const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.send (
        "microservice para o gerenciamento de escalas."
    )
})

require("./controllers/escala")(app)
require("./controllers/visualiza")(app)

module.exports = app