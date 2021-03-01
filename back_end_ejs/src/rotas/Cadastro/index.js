const axios = require('axios');
const roteador = require('express').Router()
const respondeApi = require('../../componentes/respondeApi');
const Cadastro = require('./Cadastro');

roteador.get('/', async (requisicao, resposta, proximo) => {

    try {
        const { nome, sobrenome, email } = requisicao.query;

        const dados = {
            nome,
            sobrenome,
            email
        }

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

        const apiConsulta = await axios.post(
            'http://localhost:3050/api/consulta',
            cadastro
        );

        const { animal, cores, paises } = apiConsulta.data;
        const dadoAnimal = animal[0].animal;
        const dadoCor = cores[0].cor;
        const dadoPais = paises[0].pais;

        if (dadoAnimal.length > 0 && dadoCor.length > 0 && dadoPais.length > 0) {

            const card = {
                animal: dadoAnimal,
                pais: dadoPais,
                cor: dadoCor
            }

            resposta.render('pages/card.ejs', { dados: card })
        }
    } catch (error) {
        proximo(error);
    }

});

module.exports = roteador;