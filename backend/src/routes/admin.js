const express = require("express")
const router = express.Router()
const reading = require('../functions/reading.js')
const fs = require('fs')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/novoFuncionario/:nome/:login/:senha/:salario/:cargo/:idObra", (req, res) => {
    const nome = req.params.nome;
    const login = req.params.login;
    const senha = req.params.senha;
    const salario = req.params.salario;
    const cargo = req.params.cargo;
    const idObra = parseInt(req.params.idObra);
    let id;

    // Verifica se todos os campos obrigatórios estão presentes e não são vazios
    if (!login || !senha || !salario || !cargo || !idObra || !nome) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    //importação do banco de dados usuarios e funcionarios
    fs.readFile('usuarios.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo de usuários:', err);
            return res.status(500).send('Erro ao cadastrar novo usuário');
        }

        const usuarios = JSON.parse(data);

        // Gera um novo ID
        const novoId = usuarios.length > 0 ? Math.max(...usuarios.map(user => user.id)) + 1 : 1;

        // Adiciona o novo ID ao objeto do novo usuário
        id = novoId;

        // Adição de usuario
        const novoUsuario = {
            nome: nome,
            senha: senha,
            tipo: "1",
            id: id
        }

        usuarios.push(novoUsuario);

        const novoConteudo1 = JSON.stringify(usuarios, null, 2);

        fs.writeFile('usuarios.json', novoConteudo1, 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo de usuários:', err);
                return res.status(500).send('Erro ao cadastrar novo usuário');
            }

            // Adição de funcionario
            fs.readFile('funcionarios.json', 'utf8', (err, elemento) => {
                if (err) {
                    console.error('Erro ao ler o arquivo de funcionários:', err);
                    return res.status(500).send('Erro ao cadastrar novo funcionário');
                }

                const funcionarios = JSON.parse(elemento);

                const novoFuncionario = {
                    id: id,
                    cargo: cargo,
                    salario: salario,
                    idObra: idObra,
                    nome: nome
                }
                funcionarios.push(novoFuncionario);

                const novoConteudo2 = JSON.stringify(funcionarios, null, 2);

                fs.writeFile('funcionarios.json', novoConteudo2, 'utf8', (err) => {
                    if (err) {
                        console.error('Erro ao escrever no arquivo de funcionários:', err);
                        return res.status(500).send('Erro ao cadastrar novo funcionário');
                    }
                    
                    return res.status(200).send('Novo funcionário cadastrado com sucesso com ID ' + id);
                });
            });
        });
    });
});


router.post("/novoAdm", (req, res) => {
    const nome = req.body.nome;
    const login = req.body.login;
    const senha = req.body.senha;
    let id;

    // Verifica se todos os campos obrigatórios estão presentes e não são vazios
    if (!login || !senha || !nome ) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    //importação do banco de dados usuarios e funcionarios
    fs.readFile('usuarios.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao cadastrar novo usuário');
        }
    
        const usuarios = JSON.parse(data);

        // Gera um novo ID
        const novoId = usuarios.length > 0 ? Math.max(...usuarios.map(user => user.id)) + 1 : 1;

        // Adiciona o novo ID ao objeto do novo usuário
        id = novoId;

        // Adição de usuario
        const novoUsuario = {
            nome: nome,
            senha: senha,
            tipo: "2",
            id: id
        }

        usuarios.push(novoUsuario);

        const novoConteudo1 = JSON.stringify(usuarios, null, 2);

        fs.writeFile('usuarios.json', novoConteudo1, 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                return res.status(500).send('Erro ao cadastrar novo usuário');
            }
            return res.status(200).send('Novo usuário cadastrado com sucesso com id ' + id);
        });
    });    
});


// Rota para excluir um usuário do sistema

router.get('/excluirusuario/:id', (req, res) => {
    const idUsuarioParaExcluir = parseInt(req.params.id);

    fs.readFile('usuarios.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao excluir o usuário');
        }

        let usuarios = JSON.parse(data);

        // Encontrar o índice do usuário com o nome fornecido
        const indiceUsuarioParaExcluir = usuarios.findIndex(usuario => usuario.id === idUsuarioParaExcluir);

        if (indiceUsuarioParaExcluir === -1) {
            return res.status(404).send('Usuário não encontrado');
        }

        const tipoUsuarioParaExcluir = usuarios[indiceUsuarioParaExcluir].tipo;

        // Remover o usuário do array
        usuarios.splice(indiceUsuarioParaExcluir, 1);

        const novoConteudo1 = JSON.stringify(usuarios, null, 2);

        fs.writeFile('usuarios.json', novoConteudo1, 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                return res.status(500).send('Erro ao excluir o usuário');
            }

            if (tipoUsuarioParaExcluir === "1") {
                //excluir funcionario

                fs.readFile('funcionarios.json', 'utf8', (err, elemento) => {
                    if (err) {
                        console.error('Erro ao ler o arquivo:', err);
                        return res.status(500).send('Erro ao excluir o usuário');
                    }

                    const funcionarios = JSON.parse(elemento);

                    const indiceFuncinarioParaExcluir = funcionarios.findIndex(funcionario => funcionario.id === idUsuarioParaExcluir);

                    if (indiceFuncinarioParaExcluir === -1) {
                        return res.status(404).send('Funcionário não encontrado');
                    }

                    funcionarios.splice(indiceFuncinarioParaExcluir, 1);

                    const novoConteudo2 = JSON.stringify(funcionarios, null, 2);

                    fs.writeFile('funcionarios.json', novoConteudo2, 'utf8', (err) => {
                        if (err) {
                            console.error('Erro ao escrever no arquivo:', err);
                            return res.status(500).send('Erro ao excluir o funcionário');
                        }
                        return res.status(200).send('Funcionário excluído com sucesso');
                    });
                });
            } else {
                return res.status(200).send('Usuário excluído com sucesso');
            }
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

        // Gera um novo ID
        const novoId = funcionarios.length > 0 ? Math.max(...funcionarios.map(funcionario => funcionario.id)) + 1 : 1;

        // Adiciona o novo ID ao objeto do novo funcionário
        novoFuncionario.id = novoId;

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
    
    // Captura o input
    let novaObra = req.body

    // Verifica se todos os campos obrigatórios estão presentes e não são vazios
    if (!novaObra.obra || !novaObra.funcionarios || !novaObra.andamento || !novaObra.localizacao) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    fs.readFile('obras.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao cadastrar nova obra');
        }

        const obras = JSON.parse(data);
        
        // Gera um novo ID
        const novoId = obras.length > 0 ? Math.max(...obras.map(obra => obra.id)) + 1 : 1;

        // Adiciona o novo ID ao objeto do novo usuário
        id = novoId;

        novaObra.id = id;

        obras.push(novaObra);
        console.log(obras)

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

// Rota para deletar uma obra

router.get('/excluirObra/:id', (req, res) => {
    const idObraParaExcluir = parseInt(req.params.id); // Assume-se que o nome é único

    fs.readFile('obras.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao excluir a obra');
        }

        let obras = JSON.parse(data);

        // Encontra o índice da obra com o nome fornecido
        const indiceObraParaExcluir = obras.findIndex(obra => obra.id === idObraParaExcluir);

        if (indiceObraParaExcluir === -1) {
            return res.status(404).send('Obra não encontrada');
        }

        // Remove a obra do array
        obras.splice(indiceObraParaExcluir, 1);

        const novoConteudo = JSON.stringify(obras, null, 2);

        fs.writeFile('obras.json', novoConteudo, 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo:', err);
                return res.status(500).send('Erro ao excluir a obra');
            }
            return res.status(200).send('Obra excluída com sucesso');
        });
    });
})


// Rota para controle de insumos, registra as solicitações dos funcionários
router.get("/registrodeinsumos", (req,res) => {
    res.render("admin/registrodeinsumos")
});

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


//rotas para acesso das obras

    //rota para acessar todas as obras
    router.get('/obras', (req, res) => {
        reading.arquivoJson("obras.json", (err, elemento) => {
        if (err) {
            res.status(500).send('Erro ao buscar elemento.');
        } else {
            res.send(elemento);
        }
        });
    });

    //rota para acessar a obra especidica
    router.get('/obras/:id', (req, res) => {
        const idDesejado = parseInt(req.params.id);
    
        reading.elementoPorId("obras.json", idDesejado, (err, elemento) => {
        if (err) {
            res.status(500).send('Erro ao buscar elemento.');
        } else {
            res.send(elemento);
        }
        });
    });

    //rota para acessar o andamento de cada etapa da obra
    router.get('/obras/:id/andamento', (req, res) => {
        const idDesejado = parseInt(req.params.id);

        reading.elementoPorId("obras.json", idDesejado, (err, elemento) => {
            if (err) {
                res.status(500).send('Erro ao buscar o elemento');
            } else {
                if (elemento && elemento.andamentoObra) {
                    // Encontre a etapa desejada dentro do array de etapas
                    const etapaEncontrada = elemento.andamentoObra
                    res.send(etapaEncontrada);
                    
            } else {
                res.status(404).send('Elemento ou etapas não encontrados');
            }
            }
        });
    });

    //rota para acessar o andamento de cada etapa da obra
    router.get('/obras/:id/andamento/:etapa', (req, res) => {
        const idDesejado = parseInt(req.params.id);
        const etapaDesejada = parseInt(req.params.etapa);

        reading.elementoPorId("obras.json", idDesejado, (err, elemento) => {
            if (err) {
                res.status(500).send('Erro ao buscar o elemento');
            } else {
                if (elemento && elemento.andamentoObra) {
                    // Encontre a etapa desejada dentro do array de etapas
                    const etapaEncontrada = elemento.andamentoObra.find(etapa => etapa.etapa === etapaDesejada);
                    if (etapaEncontrada) {
                        res.send(etapaEncontrada);
                    } else {
                        res.status(404).send('Etapa não encontrada');
                    }
            } else {
                res.status(404).send('Elemento ou etapas não encontrados');
            }
            }
        });
    });

    //rota para o acesso dos funcionarios de uma determinada obra
    router.get('/obras/funcionarios/:id',(req,res) => {
        const idDesejado = parseInt(req.params.id);

        reading.arquivoJson("funcionarios.json",(err,elemento) => {
            if(err){
                res.status(500).send('Erro ao buscar o elemento.')
            } else {
                const elementosEncontrados = elemento.filter(elemento => elemento.idObra ===idDesejado)
                res.send(elementosEncontrados)
            }
        })
    })

//rotas para acesso dos insumos
    
    //rota para acessar os insumos
    router.get('/insumos', (req, res) => {
        reading.arquivoJson("insumos.json", (err, elemento) => {
        if (err) {
            res.status(500).send('Erro ao buscar elemento.');
        } else {
            res.send(elemento);
        }
        });
    });

    //rota para acessar o insumo por id
    router.get('/insumos/:id', (req, res) => {
        const idDesejado = parseInt(req.params.id);
    
        reading.elementoPorId("insumos.json", idDesejado, (err, elemento) => {
        if (err) {
            res.status(500).send('Erro ao buscar elemento.');
        } else {
            res.send(elemento);
        }
        });
    });

//rotas para acesso dos funcionarios

    //rota para acesso de todos os funcionarios
    router.get('/funcionarios', (req, res) => {
        reading.arquivoJson("funcionarios.json", (err, elemento) => {
        if (err) {
            res.status(500).send('Erro ao buscar elemento.');
        } else {
            res.send(elemento);
        }
        });
    });

    //rota para acesso de um funcionario por id
    router.get('/funcionarios/:id', (req, res) => {
        const idDesejado = parseInt(req.params.id);
    
        reading.elementoPorId("funcionarios.json", idDesejado, (err, elemento) => {
        if (err) {
            res.status(500).send('Erro ao buscar elemento.');
        } else {
            res.send(elemento);
        }
        });
    });

module.exports = router