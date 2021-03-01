const roteador = require('express').Router()
const NaoEncontrado = require('../../error/NaoEncontrado');
const Email = require('./Email');
const DAOEmail = require('./DAOEmail');



roteador.get('/', async (requisicao, resposta) => {
    
    const resultados = await DAOEmail.listar();
    filtrar(resultados);
    resposta.status(200).send(resultados);
});

roteador.get('/:idEmail', async (requisicao, resposta, proximo) => {
    try {

        const id = requisicao.params.idEmail;
        const email = new Email({ id: id });
        await email.carregar();
        filtrar(email);

        resposta.status(200).send(email);

    } catch (error) {
        proximo(error);
    }


});

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const dados = requisicao.body;
        const email = new Email(dados);
        await email.criar();
        resposta.status(201).send(email);

    } catch (error) {
        proximo(error);
    }
});

roteador.put('/:idEmail', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idEmail;
        const dados = requisicao.body;
        const dadosPessoa = Object.assign({}, dados, { id: id });
        const email = new Email(dadosPessoa);
        await email.atualizar();

        resposta.status(204).end();
    } catch (error) {
        proximo(error);
    }
});

roteador.delete('/:idEmail', async (requisicao, resposta, proximo) => {
    try {

        const id = requisicao.params.idEmail;
        const email = new Email({ id: id });
        await email.carregar();
        if (email.id > 0) {
            email.remover();
            resposta.status(204).send({
                status: `Perfil do Pessoa  removido com sucesso!!!`,
            });
        }else{
            throw new NaoEncontrado(email.id);
        }

    } catch (error) {
        proximo(error);
    }
});




function filtrar(dados) {
    if (Array.isArray(dados)) {
        dados = dados.map(item => {
            return filtrarObjeto(item)
        })
    } else {
        dados = filtrarObjeto(dados)
    }

    return dados
}

function filtrarObjeto(dados) {
    const novoObjeto = {}
    const camposPublicos = [
        'email',
        'cod'
    ]
    camposPublicos.forEach((campo) => {
        if (dados.hasOwnProperty(campo)) {
            novoObjeto[campo] = dados[campo]
        }
    })

    return novoObjeto
}

module.exports = roteador