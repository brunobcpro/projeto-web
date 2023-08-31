const express = require('express')
const app = express()
const port = 4000
const fs = require("fs")

app.get('/', (req, res) => {
  res.redirect('/login')  
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})