//importação de modulos

  const express = require('express');
  const app = express();
  const fs = require('fs'); 
  const port = 3000;
  
// Rotas

  //importação das rotas

    const admin = require("./routes/admin")
    const funcionario = require("./routes/funcionario")

    // Exemplo de rota de adm
      app.use("/admin", admin)

    // Exemplo de rota de funcionario
      app.use("/funcionario", funcionario)

app.get('/', (req,res) => {
  res.redirect("/home")
})

app.get('/home', (req,res) => {
  res.render("Página Principal")
})

app.get('/login', (req,res) => {
  res.render("Formulariodelogin")
})

// Leitura do arquivo JSON:

  app.get('/', (req, res) => {
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
