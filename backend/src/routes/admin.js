const express = require("express")
const router = express.Router()

// Rota para página principal do admin

router.get("/home", (req,res) =>{
    res.render("admin/home")
})

// Rota para o BI-Indices do andamento das obras

router.get("/indicesobras", (req,res) =>{
    res.render("admin/indicesobras")
})

// Mostras informações completas sobre todos os funcionários

router.get("/quadrodefuncionarios", (req,res) => {
    res.render("admin/quadrodefuncionarios")
})

// Rota para cadastro de um novo usuario do sistema

router.get("/novousuario", (req,res) => {
    res.render("admin/novousuario")
})

router.post("/novousuario", (req, res) => {
    const novoUsuario = req.body;

    // Verifica se todos os campos obrigatórios estão presentes e não são vazios
    if (!novoUsuario.nome || !novoUsuario.senha || !novoUsuario.tipo) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    fs.readFile('usuarios.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao cadastrar novo usuário');
        }

        const usuarios = JSON.parse(data);
        usuarios.push(novoUsuario);

        const novoConteudo = JSON.stringify(usuarios, null, 2);

        fs.writeFile('usuarios.json', novoConteudo, 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                return res.status(500).send('Erro ao cadastrar novo usuário');
            }
            return res.status(200).send('Novo usuário cadastrado com sucesso');
        });
    });
});

// Rota para excluir um usuário do sistema

router.delete('/excluirusuario', (req, res) => {
    const nomeUsuarioParaExcluir = req.body.nome; // Assume-se que o nome é único

    fs.readFile('usuarios.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao excluir o usuário');
        }

        let usuarios = JSON.parse(data);

        // Encontrar o índice do usuário com o nome fornecido
        const indiceUsuarioParaExcluir = usuarios.findIndex(usuario => usuario.nome === nomeUsuarioParaExcluir);

        if (indiceUsuarioParaExcluir === -1) {
            return res.status(404).send('Usuário não encontrado');
        }

        // Remover o usuário do array
        usuarios.splice(indiceUsuarioParaExcluir, 1);

        const novoConteudo = JSON.stringify(usuarios, null, 2);

        fs.writeFile('usuarios.json', novoConteudo, 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                return res.status(500).send('Erro ao excluir o usuário');
            }
            return res.status(200).send('Usuário excluído com sucesso');
        });
    });
});

// Rota para cadastro de um novo funcionario

router.get("/novofuncionario", (req,res) => {
    res.render("admin/novofuncionario")
})

router.post("/novofuncionario", (req, res) => {
    const novoFuncionario = req.body;

    // Verifica se todos os campos obrigatórios estão presentes e não são vazios
    if (!novoFuncionario.nome || !novoFuncionario.cargo || !novoFuncionario.salario) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    fs.readFile('funcionarios.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao cadastrar novo funcionário');
        }

        const funcionarios = JSON.parse(data);
        funcionarios.push(novoFuncionario);

        const novoConteudo = JSON.stringify(funcionarios, null, 2);

        fs.writeFile('funcionarios.json', novoConteudo, 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                return res.status(500).send('Erro ao cadastrar novo funcionário');
            }
            return res.status(200).send('Novo funcionário cadastrado com sucesso');
        });
    });
});


// Rota para cadastro de uma nova obra 

router.get("/novaobra", (req,res) => {
    res.render("admin/novaobra")
})

router.post("/novaobra", (req, res) => {
    const novaObra = req.body;

    // Verifica se todos os campos obrigatórios estão presentes e não são vazios
    if (!novaObra.obra || !novaObra.funcionarios || !novaObra.datadeinicio || !novaObra.previsao || !novaObra.localizacao) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    fs.readFile('obras.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao cadastrar nova obra');
        }

        const obras = JSON.parse(data);
        obras.push(novaObra);

        const novoConteudo = JSON.stringify(obras, null, 2);

        fs.writeFile('obras.json', novoConteudo, 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                return res.status(500).send('Erro ao cadastrar nova obra');
            }
            return res.status(200).send('Nova obra cadastrada com sucesso');
        });
    });
});

// Rota para controle de insumos, registra as solicitações dos funcionários

router.get("/registrodeinsumos", (req,res) => {
    res.render("admin/registrodeinsumos")
})

router.get("/registrodeinsumos", (req, res) => {
    fs.readFile('insumos.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao acessar controle de insumos');
        }

        const insumos = JSON.parse(data);
        return res.status(200).send(insumos);
    });
});

module.exports = router