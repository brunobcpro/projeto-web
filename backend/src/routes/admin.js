const express = require("express")
const router = express.Router()
const reading = require('../functions/reading.js')
const fs = require('fs');
const { parse } = require("path");
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/novoFuncionario", (req, res) => {
    const nome = req.body.nome;
    const login = req.body.login;
    const senha = req.body.senha;
    const salario = req.body.salario;
    const cargo = req.body.cargo;
    const idObra = parseInt(req.body.idObra);
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
    const nome = req.body.nome
    const login = req.body.login
    const senha = req.body.senha
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

router.delete('/excluirusuario/:id', (req, res) => {
    const idUsuarioParaExcluir = parseInt(req.body.id);

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


// Rota para cadastro de uma nova obra 

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

router.delete('/excluirObra/:id', (req, res) => {
    const idObraParaExcluir = parseInt(req.body.id); // Assume-se que o nome é único

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

router.post("/pedidos", (req, res) => {
    fs.readFile('pedidos.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao acessar controle de insumos');
        }

        const insumos = JSON.parse(data);
        return res.status(200).send(insumos);
    });
});


router.delete("/fornerceInsumos/:idPedido", (req, res) => {
    const idPedido = parseInt(req.body.idPedido);

    fs.readFile('pedidos.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao acessar controle de insumos');
        }

        const pedidos = JSON.parse(data);
        console.log(pedidos)
        const pedidoDesejado = pedidos.find(pedido => pedido.idPedido === idPedido); // Usando idPedido da URL
        if (!pedidoDesejado) {
            return res.status(404).send('Pedido não encontrado');
        }

        fs.readFile('insumos.json', 'utf8', (err, elemento) => {
            if (err) {
                console.error('Erro ao ler o arquivo:', err);
                return res.status(500).send('Erro ao acessar controle de insumos');
            }

            const insumos = JSON.parse(elemento);
            const insumoDesejado = insumos.find(insumo => insumo.id === pedidoDesejado.id);

            if (!insumoDesejado) {
                return res.status(404).send('Insumo não encontrado');
            }
            console.log(pedidoDesejado.quantidade)

            if (insumoDesejado.estoque >= pedidoDesejado.quantidade) {
                insumoDesejado.estoque -= pedidoDesejado.quantidade;
            } else {
                return res.status(400).send('Estoque insuficiente');
            }

            // Exclua o pedido
            // Gera um novo ID
            const novoId = pedidos.findIndex(pedido => pedido.idPedido === idPedido);
            console.log(novoId)

            // Adiciona o novo ID ao objeto do novo usuário
            id = novoId;

            pedidos.splice(id, 1);

            // Escreva os pedidos atualizados de volta no arquivo
            const novoConteudo1 = JSON.stringify(pedidos, null, 2);
            fs.writeFile('pedidos.json', novoConteudo1, 'utf8', (err) => {
                if (err) {
                    console.error('Erro ao escrever no arquivo:', err);
                    return res.status(500).send('Erro ao excluir o pedido');
                }

                // Atualize o estoque do insumo no arquivo 'insumos.json'
                const novoConteudo2 = JSON.stringify(insumos, null, 2);
                fs.writeFile('insumos.json', novoConteudo2, 'utf8', (err) => {
                    if (err) {
                        console.error('Erro ao escrever no arquivo:', err);
                        return res.status(500).send('Erro ao atualizar o estoque do insumo');
                    }

                    return res.status(200).send('Pedido excluído com sucesso e estoque atualizado');
                });
            });
        });
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
                const elementosEncontrados = elemento.filter(elemento => elemento.idObra === idDesejado)
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