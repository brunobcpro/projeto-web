const axios = require("axios")
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser");

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
  


axios.get('http://localhost:3000/')
    .then(response => console.log(response))
    .catch(error => console.log(error))