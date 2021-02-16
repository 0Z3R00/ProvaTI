const roteador = require('express').Router()
const NaoEncontrado = require('../../error/NaoEncontrado');
const Sobrenome = require('./Sobrenome');
const DAOSobrenome = require('./DAOSobrenome');



roteador.get('/', async (requisicao, resposta) => {
    
    const resultados = await DAOSobrenome.listar();
    filtrar(resultados);
    resposta.status(200).send(resultados);
});

roteador.get('/:idSobrenome', async (requisicao, resposta, proximo) => {
    try {

        const id = requisicao.params.idSobrenome;
        const sobrenome = new Sobrenome({ id: id });
        await sobrenome.carregar();
        filtrar(sobrenome);

        resposta.status(200).send(sobrenome);

    } catch (error) {
        proximo(error);
    }


});

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const dados = requisicao.body;
        const sobrenome = new Sobrenome(dados);
        await sobrenome.criar();
        resposta.status(201).send(sobrenome);

    } catch (error) {
        proximo(error);
    }
});

roteador.put('/:idSobrenome', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idSobrenome;
        const dados = requisicao.body;
        const dadosPessoa = Object.assign({}, dados, { id: id });
        const sobrenome = new Sobrenome(dadosPessoa);
        await sobrenome.atualizar();

        resposta.status(204).end();
    } catch (error) {
        proximo(error);
    }
});

roteador.delete('/:idSobrenome', async (requisicao, resposta, proximo) => {
    try {

        const id = requisicao.params.idSobrenome;
        const sobrenome = new Sobrenome({ id: id });
        await sobrenome.carregar();
        if (sobrenome.id > 0) {
            sobrenome.remover();
            resposta.status(204).send({
                status: `Perfil do Pessoa  removido com sucesso!!!`,
            });
        }else{
            throw new NaoEncontrado(sobrenome.id);
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
        'sobrenome',
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