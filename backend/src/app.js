
// Importação de modulos

  const express = require('express')
  const app = express()
  const fs = require('fs')
  const port = 3000;
  const cors = require('cors')

// Ativando módulos
  app.use(cors())

// Rotas

  // Importação das rotas

    const admin = require("./routes/admin")
    const funcionario = require("./routes/funcionario")

app.get('/', (req,res) => {
  res.redirect("/users")
})

// Leitura do arquivo JSON:

  app.get('/users', (req, res) => {
    fs.readFile('usuarios.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Erro ao ler o arquivo JSON:', err);
        return;
      }
    
      try {
        const jsonData = JSON.parse(data);
        res.send(jsonData);
      } catch (parseError) {
        console.error('Erro ao fazer parse do JSON:', parseError);
      }
    });
  });

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
