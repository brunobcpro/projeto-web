const express = require('express')
const app = express()
const exphbs  = require('express-handlebars');
var handle = exphbs.create({
  defaultLayout: 'main'
  });
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');
  
const port = 3000

//Config
    //Template engine
    app.engine('handlebars', handle.engine);
    app.set('view engine', 'handlebars');
    
    // Body parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

//Rotas

  app.get('/login', function(req, res){
    res.render('login')
  })

  app.post('/add',function(req,res){
    if(req.body.login === "Bruno"){
      res.send("Login correto")
    }else{
      res.send("Login errado")
    }
  })

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})