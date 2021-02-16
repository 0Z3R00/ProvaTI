const knex = require("../../database/connection");
const NaoEncontrado = require("../../error/NaoEncontrado");

module.exports = {
    async listar() {
        return await knex.select().from('tbs_sobrenome');
    },

    async inserir(sobrenome) {
        try {
            const result = await knex('tbs_sobrenome').insert({
                sobrenome: sobrenome.sobrenome,
                cod: sobrenome.cod
            });

            return result;

        } catch (error) {
            throw console.error(error);
        }
    },
    async pegarPorId(id) {
        const result = await knex('tbs_sobrenome').where('id', id);
        if (!result) {
            throw new NaoEncontrado(id);
        } else {
            return result;
        }


    },
    async atualizar(id, dadosParaAtualizar) {
        try {
            await knex('tbs_sobrenome')
                .where('id', id)
                .update(dadosParaAtualizar);
            return { status: 'Atualizado com sucesso' };
        } catch (error) {
            return { status: 'Erro ao atualizar ' };
        }
    },

    async remover(id) {
        await knex('tbs_sobrenome').where('id', id).del();
    }
}

