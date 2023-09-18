const express = require("express")
const router = express.Router()
const fs = require('fs');
const reading = require('../functions/reading.js')

/* importação dos dados
    const caminhoArquivoJson = path.join(__dirname, "../funcionarios.json");
    fs.readFile(caminhoArquivoJson,'utf-80',(err,data) => {
        if(err){
            console.error('Erro ao ler o arquivo JSON', err);
            return;
        }
    })
    const funcionarios = JSON.parse(data);
*/

router.get("/obrasEmAndamento", (req,res) => {
    res.send([])
})

//rotas acesso aos dados funcionarios

    //dados gerais funcionarios
    router.get('/informacoesPessoais/:id', (req, res) => {
        const idDesejado = parseInt(req.params.id);
    
        reading.elementoPorId("funcionarios.json", idDesejado, (err, elemento) => {
        if (err) {
            res.status(500).send('Erro ao buscar funcionario.');
        } else {
            res.send(elemento);
        }
        });
    });
    //dados obra desejada
    router.get('/obra/:id', (req, res) => {
        const idDesejado = parseInt(req.params.id);
      
        reading.elementoPorId("funcionarios.json", idDesejado, (err, elemento) => {
          if (err) {
            res.status(500).send('Erro ao buscar funcionario.');
          } else {
            const idObra = elemento.idObra; 
            reading.elementoPorId("obras.json", idObra, (err, elemento1) => {
              if (err) {
                res.status(500).send('Erro ao buscar obra.');
              } else {
                res.send(elemento1);
              }
            });
          }
        });
      });
      

module.exports = router