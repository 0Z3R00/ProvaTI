const knex = require("../../database/connection");
const NaoEncontrado = require("../../error/NaoEncontrado");

module.exports = {

    async listar(cod_nome, cod_sobrenome, cod_email) {
        try {
            const tbs_nome = await knex.select().from('tbs_cod_nome').where('cod', cod_nome);
            const tbs_sobrenome = await knex.select().from('tbs_cod_sobrenome').where('cod', cod_sobrenome);
            const tbs_email = await knex.select().from('tbs_cod_email').where('cod', cod_email);

            if (tbs_nome.length > 0 && tbs_sobrenome.length > 0 && tbs_email.length > 0) {
                
                var nome_cod = parseInt(tbs_nome[0].cod);
                var nome_soma = tbs_nome[0].soma;
                var somaNome = nome_cod + nome_soma;

                var sobrenome_cod = parseInt(tbs_sobrenome[0].cod);
                var sobrenome_soma = tbs_sobrenome[0].soma;
                var somaSobrenome = sobrenome_cod + sobrenome_soma;

                var email_cod = parseInt(tbs_email[0].cod);
                var email_soma = parseInt(tbs_email[0].soma);
                var somaEmail = email_cod + email_soma;

                const totalSoma = somaNome + somaSobrenome + somaEmail;
                const animal = await knex.select().from('tbs_animais').where('total', totalSoma);
                const cores = await knex.select().from('tbs_cores').where('total', totalSoma);
                const paises = await knex.select().from('tbs_paises').where('total', totalSoma);

                

                if (animal.length > 0 && cores.length > 0 && paises.length > 0) {

                    const result = {
                        somaNome,
                        somaSobrenome,
                        somaEmail,
                        totalSoma,
                        animal,
                        cores,
                        paises
                    }

                    return result;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

