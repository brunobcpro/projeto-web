const express = require('express')
const app = express()
const port = 4000
const fs = require("fs")
const cors = require('cors')

app.use(cors())
app.use('/api', require("./routes/api"))

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})