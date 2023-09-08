//importação de modulos
  const express = require('express');
  const app = express();
  const fs = require('fs'); 
  const port = 3000;
  
// Rotas
    //importação dos arquivos rotas
      const admin = require("./routes/admin")
      const funcionario = require("./routes/funcionario")
  // Exemplo de rota de adm
    app.use("/admin", admin)

  // Exemplo de rota de funcionario
    app.use("/funcionario", funcionario)
  // Envio dos dados cadastro
    app.get('/', (req, res) => {
      fs.readFile('usuarios.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Erro ao ler o arquivo JSON:', err);
          return;
        }
      
        try {
          const jsonData = JSON.parse(data);
          res.send(jsonData[0]);
        } catch (parseError) {
          console.error('Erro ao fazer parse do JSON:', parseError);
        }
      });
    });

app.get('/', (req, res) => {
  res.send('olá');  
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
