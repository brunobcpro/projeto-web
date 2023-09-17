const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;
const cors = require('cors');
const functions = require('./functions.js');

app.use(cors());
//Routes

  app.get('/users', (req, res) => {
    functions.arquivoJson("obras.json", (err, elemento) => {
      if (err) {
        res.status(500).send('Erro ao buscar elemento.');
      } else {
        res.send(elemento);
      }
    });
  });

// Importação das rotas

  const admin = require("./routes/admin")
  const funcionario = require("./routes/funcionario")
 
  app.use('/admin', admin)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
