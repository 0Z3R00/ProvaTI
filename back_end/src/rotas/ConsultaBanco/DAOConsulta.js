const knex = require("../../database/connection");
const NaoEncontrado = require("../../error/NaoEncontrado");

module.exports = {

    async listar(cod_nome, cod_sobrenome, cod_email) {
        try {
            const tbs_nome = await knex.select().from('tbs_cod_nome').where('cod', cod_nome);
            var nome_cod = parseInt(tbs_nome[0].cod);
            var nome_soma = tbs_nome[0].soma;
            var somaNome = nome_cod + nome_soma;

            const tbs_sobrenome = await knex.select().from('tbs_cod_sobrenome').where('cod', cod_sobrenome);
            var sobrenome_cod = parseInt(tbs_sobrenome[0].cod);
            var sobrenome_soma = tbs_sobrenome[0].soma;
            var somaSobrenome = sobrenome_cod + sobrenome_soma;
          

            const tbs_email = await knex.select().from('tbs_cod_email').where('cod', cod_email);
            var email_cod = parseInt(tbs_email[0].cod);
            var email_soma = parseInt(tbs_email[0].soma);
            var somaEmail = email_cod + email_soma;
        
            const totalSoma = somaNome + somaSobrenome + somaEmail;
            const tbs_animal = await knex.select().from('tbs_animais').where('total', totalSoma);
            const tbs_cores = await knex.select().from('tbs_cores').where('total', totalSoma);
            const tbs_paises = await knex.select().from('tbs_paises').where('total', totalSoma);

            const result = {
                somaNome,
                somaSobrenome,
                somaEmail,
                totalSoma,
                tbs_animal,
                tbs_cores,
                tbs_paises
                
              
            }
            
            return result;

        } catch (error) {
            console.log(error);
        }
    }
}

