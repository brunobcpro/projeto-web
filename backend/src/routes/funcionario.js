const express = require("express")
const router = express.Router()
const fs = require('fs');
const reading = require('../functions/reading.js')

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

    router.get('/solicitar/:id/:quantidade/:obra/', (req,res) => {
        const id = parseInt(req.params.id)
        const quantidade = req.params.quantidade
        const obra = req.params.obra

        if (!id || !quantidade || !obra ) {
          return res.status(400).send('Todos os campos são obrigatórios');
      }
      

      fs.readFile('pedidos.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao cadastrar novo pedido');
        }
      
        const pedidos = JSON.parse(data);

        // Gera um novo ID
      const novoId = pedidos.length > 0 ? Math.max(...pedidos.map(pedido => pedido.idPedido)) + 1 : 1;

      // Adiciona o novo ID ao objeto do novo usuário
      const idPedido = novoId;
      
      const novoPedido = {
        id : id,
        quantidade : quantidade,
        obra : obra,
        idPedido : idPedido
      }

        pedidos.push(novoPedido);

        const novoConteudo = JSON.stringify(pedidos, null, 2);

        fs.writeFile('pedidos.json', novoConteudo, 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                return res.status(500).send('Erro ao cadastrar novo pedido');
            }
            return res.status(200).send('Novo pedido cadastrado com sucesso');
        });
    });
});


      
      

module.exports = router