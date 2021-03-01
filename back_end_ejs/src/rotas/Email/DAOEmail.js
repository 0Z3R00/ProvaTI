const knex = require("../../database/connection");
const NaoEncontrado = require("../../error/NaoEncontrado");

module.exports = {
    async listar() {
        return await knex.select().from('tbs_email');
    },

    async inserir(email) {
        try {
            const result = await knex('tbs_email').insert({
                email: email.email,
                cod: email.cod
            });

            return result;

        } catch (error) {
            throw console.error(error);
        }
    },
    async pegarPorId(id) {
        const result = await knex('tbs_email').where('id', id);
        if (!result) {
            throw new NaoEncontrado(id);
        } else {
            return result;
        }


    },
    async atualizar(id, dadosParaAtualizar) {
        try {
            await knex('tbs_email')
                .where('id', id)
                .update(dadosParaAtualizar);
            return { status: 'Atualizado com sucesso' };
        } catch (error) {
            return { status: 'Erro ao atualizar ' };
        }
    },

    async remover(id) {
        await knex('tbs_email').where('id', id).del();
    }
}

