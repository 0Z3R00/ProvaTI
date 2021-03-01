const CampoInvalido = require('../../error/CampoInvalido');
const NaoEncontrado = require('../../error/NaoEncontrado');
const DAOSobrenome = require('./DAOSobrenome');

class Sobrenome {
    constructor({ id, sobrenome, cod }) {
        this.id = id;
        this.sobrenome = sobrenome;
        this.cod = cod;
    }

    async listar() {
       await DAOSobrenome.listar();
    }

    async criar() {
        this.validar();
        const resultado = await DAOSobrenome.inserir({
            sobrenome: this.sobrenome,
            cod: this.cod
        });
    }

    async carregar() {
        const result = await DAOSobrenome.pegarPorId(this.id);
        if (result.length > 0) {
            this.sobrenome = result[0].sobrenome;
            this.cod = result[0].cod;
        }else{
            throw new NaoEncontrado(this.id);
        }
    }

    async atualizar() {
        await DAOSobrenome.pegarPorId(this.id);
        const campos = ['sobrenome', 'cod'];
        const dadosParaAtualizar = {};

        campos.forEach(campo => {
            const valor = this[campo];

            if(valor == this.sobrenome){
                if (typeof valor !== 'string' && valor.length <= 0) {
                    throw new CampoInvalido('sobrenome');
    
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
            throw new DadosNaoFornecidos();
        }

        await DAOSobrenome.atualizar(this.id, dadosParaAtualizar);


    }

    async remover() {
        return await DAOSobrenome.remover(this.id);
    }


    validar() {
        const campos = ['sobrenome',  'cod']

        campos.forEach(campo => {
            const valor = this[campo];

            if(valor == this.sobrenome){
                if (typeof valor !== 'string' && valor.length <= 0) {
                    throw new CampoInvalido('sobrenome');
    
                }
            }else{
                if (typeof valor !== 'number' || valor === 0 ) {
                    throw new CampoInvalido('cod');
    
                } 
            }

        })
    }

}

module.exports = Sobrenome;