const express = require('express');
const app = express();
const fs = require('fs'); 
const cors = require('cors');

const port = 3000;

app.use(cors()) //habilitando cors na nossa aplicacao

// Rotas

app.get('/', function (req, res) {
  fs.readFile('bruno.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo JSON:', err);
      res.redirect('/login');
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

/*
app.get('/login', function (req, res) {
  res.render('login');
});
*/

app.post('/add', function (req, res) {
  const username = req.body.login;
  const password = req.body.senha;

  // Lê o arquivo bruno.json
  fs.readFile('bruno.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo JSON:', err);
      res.redirect('/login');
      return;
    }

    try {
      const jsonData = JSON.parse(data);

      // Verifica as credenciais
      if (jsonData.nome === username && jsonData.senha === password) {

        if (jsonData.tipo === "ADM"){
          res.render('adm',{bruno: jsonData});
        }else{
          res.render('funcionario')
        }  

      } else {
        res.redirect('/login');
      }
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON:', parseError);
      res.redirect('/login');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
