const roteador = require('express').Router();

const NaoEncontrado = require('../../error/NaoEncontrado');


roteador.get('/', async (requisicao, resposta) => {
    
    return resposta.render('pages/index.ejs');
});

module.exports = roteador