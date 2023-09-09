const express = require("express")
const router = express.Router()

router.get("/home", (req,res) => {
    res.render("funcionario/home")
})

// Esta rota mostra apenas em qual obra o funcionario está trabalhando, já a do admin mostra todas as informações (nome, cargo e salário) do JSON de funcionarios 
router.get("/quadrodefuncionarios", (req,res) => {
    res.render("funcionario/quadrodefuncionarios")
})

router.get("/pedidosdeinsumos", (req,res) => {
    res.render("funcionario/pedidosdeinsumos")
})

router.post("/pedidosdeinsumos", (req, res) => {
    const novaSolicitacao = req.body;

    // Verifica se todos os campos obrigatórios estão presentes e não são vazios
    if (!novaSolicitacao.funcionario || !novaSolicitacao.obra || !novaSolicitacao.insumo || !novaSolicitacao.quantidade) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    fs.readFile('insumos.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao processar solicitação de insumos');
        }

        const insumos = JSON.parse(data);
        
        // Verifica se o insumo solicitado existe
        const insumoSolicitado = insumos.find(insumo => insumo.nome === novaSolicitacao.insumo);
        if (!insumoSolicitado) {
            return res.status(400).send('Insumo não encontrado');
        }

        // Verifica se a quantidade solicitada está disponível em estoque
        if (novaSolicitacao.quantidade > insumoSolicitado.estoque) {
            return res.status(400).send('Quantidade solicitada indisponível em estoque');
        }

        // Atualiza o estoque do insumo
        insumoSolicitado.estoque -= novaSolicitacao.quantidade;

        // Adiciona a solicitação ao arquivo de insumos
        insumos.push(novaSolicitacao);

        const novoConteudo = JSON.stringify(insumos, null, 2);

        fs.writeFile('insumos.json', novoConteudo, 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                return res.status(500).send('Erro ao processar solicitação de insumos');
            }
            return res.status(200).send('Solicitação de insumos processada com sucesso');
        });
    });
});

module.exports = router