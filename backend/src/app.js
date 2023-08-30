const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");
const fs = require('fs'); 

const port = 3000;

// Config
const handle = exphbs.create({
  defaultLayout: 'main'
});

// Template engine
app.engine('handlebars', handle.engine);
app.set('view engine', 'handlebars');

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas

app.get('/', function (req, res) {
  res.redirect('/login');
});

app.get('/login', function (req, res) {
  res.render('login');
});

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
      if (jsonData.name === username && jsonData.senha === password) {
        if (jsonData.tipo === "ADM"){
          res.render('adm');
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
