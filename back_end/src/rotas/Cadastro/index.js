const roteador = require('express').Router()
const respondeApi = require('../../componentes/respondeApi');
const Cadastro = require('./Cadastro');


roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const dados = requisicao.body;
        const result = await respondeApi(dados);
        
        const quebraCod = result.split('#'); 
        const user = {
            nome: dados.nome,
            cod_nome: parseInt(quebraCod[1]),
            sobrenome: dados.sobrenome,
            cod_sobrenome: parseInt(quebraCod[3]),
            email: dados.email,
            cod_email: parseInt(quebraCod[5]),
        }
        const cadastro = new Cadastro(user);
        await cadastro.criar();
        resposta.status(201).send(user);

    } catch (error) {
        proximo(error);
    }
});


module.exports = roteador;