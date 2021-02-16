const CampoInvalido = require('../../error/CampoInvalido');
const NaoEncontrado = require('../../error/NaoEncontrado');
const DAONome = require('./DAONome');

class Nome {
    constructor({ id, nome, cod }) {
        this.id = id;
        this.nome = nome;
        this.cod = cod;
    }

    async listar() {
        await DAONome.listar();
    }

    async criar() {
        this.validar();
        const resultado = await DAONome.inserir({
            nome: this.nome,
            cod: this.cod
        });
       
    }

    async carregar() {
        const result = await DAONome.pegarPorId(this.id);
        if (result.length > 0) {
            this.nome = result[0].nome;
            this.cod = result[0].cod;
        }else{
            throw new NaoEncontrado(this.id);
        }
    }

    async atualizar() {
        await DAONome.pegarPorId(this.id);
        const campos = ['nome', 'cod'];
        const dadosParaAtualizar = {};

        campos.forEach(campo => {
            const valor = this[campo];

            if(valor == this.nome){
                if (typeof valor !== 'string' && valor.length <= 0) {
                    throw new CampoInvalido('nome');
    
                }else{
                    dadosParaAtualizar[campo] = valor
                }
            }else{
                if (typeof valor !== 'number' || valor === 0 ) {
                    throw new CampoInvalido('cod');
                } else{
                    dadosParaAtualizar[campo] = valor
                }
            }

        })

        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos()
        }

        await DAONome.atualizar(this.id, dadosParaAtualizar);


    }

    async remover() {
        return await DAONome.remover(this.id);
    }


    validar() {
        const campos = ['nome',  'cod']

        campos.forEach(campo => {
            const valor = this[campo];

            if(valor == this.nome){
                if (typeof valor !== 'string' && valor.length <= 0) {
                    throw new CampoInvalido('nome');
    
                }
            }else{
                if (typeof valor !== 'number' || valor === 0 ) {
                    throw new CampoInvalido('cod');
    
                } 
            }

        })
    }

}

module.exports = Nome;