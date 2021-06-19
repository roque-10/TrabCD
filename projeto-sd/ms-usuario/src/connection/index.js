const mongoose = require("mongoose")

let DB_URI = "mongodb://localhost:/projeto-sd"
if (process.env.MONGO_DB_URI) {
    DB_URI = process.env.MONGO_DB_URI
}

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.Promise = global.Promise

module.exports = mongoose