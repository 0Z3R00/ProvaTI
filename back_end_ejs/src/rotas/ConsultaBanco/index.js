const roteador = require('express').Router()
const DAOConsulta = require('./DAOConsulta');


roteador.post('/', async (requisicao, resposta) => {
 ;
    const {cod_nome, cod_sobrenome, cod_email} = requisicao.body;
    const resultados = await DAOConsulta.listar(cod_nome, cod_sobrenome, cod_email);
     
    resposta.status(200).send(resultados);
});



module.exports = roteador