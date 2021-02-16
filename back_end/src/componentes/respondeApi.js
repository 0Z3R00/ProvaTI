const axios = require('axios');
const qs = require('qs');

async function respondeApi(pessoa) {
    const data = qs.stringify({
        nome: pessoa.nome,
        sobrenome: pessoa.sobrenome,
        email: pessoa.email,
    });
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    const result = await axios.post(
        'http://138.68.29.250:8082/',
        data,
        headers
    );

    return result.data;
}

module.exports = respondeApi;