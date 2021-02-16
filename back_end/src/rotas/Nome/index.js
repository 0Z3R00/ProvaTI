const roteador = require('express').Router()
const NaoEncontrado = require('../../error/NaoEncontrado');
const Nome = require('./Nome');
const DAONome = require('./DAONome');



roteador.get('/', async (requisicao, resposta) => {
    
    const resultados = await DAONome.listar();
    filtrar(resultados);
    resposta.status(200).send(resultados);
});

roteador.get('/:idNome', async (requisicao, resposta, proximo) => {
    try {

        const id = requisicao.params.idNome;
        const nome = new Nome({ id: id });
        await nome.carregar();
        filtrar(nome);

        resposta.status(200).send(nome);

    } catch (error) {
        proximo(error);
    }


});

roteador.post('/', async (requisicao, resposta, proximo) => {
    try {
        const dados = requisicao.body;
        const nome = new Nome(dados);
        await nome.criar();
        resposta.status(201).send(nome);

    } catch (error) {
        proximo(error);
    }
});

roteador.put('/:idNome', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idNome;
        const dados = requisicao.body;
        const dadosPessoa = Object.assign({}, dados, { id: id });
        const nome = new Nome(dadosPessoa);
        await nome.atualizar();

        resposta.status(204).end();
    } catch (error) {
        proximo(error);
    }
});

roteador.delete('/:idNome', async (requisicao, resposta, proximo) => {
    try {

        const id = requisicao.params.idNome;
        const nome = new Nome({ id: id });
        await nome.carregar();
        if (nome.id > 0) {
            nome.remover();
            resposta.status(204).send({
                status: `Perfil do Pessoa  removido com sucesso!!!`,
            });
        }else{
            throw new NaoEncontrado(nome.id);
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
        'nome',
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