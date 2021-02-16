const validaEmail = require('../../componentes/validaEmail');
const CampoInvalido = require('../../error/CampoInvalido');
const NaoEncontrado = require('../../error/NaoEncontrado');
const DAOEmail = require('./DAOEmail');

class Email {
    constructor({ id, email, cod }) {
        this.id = id;
        this.email = email;
        this.cod = cod;
    }

    async listar() {
       await DAOEmail.listar();
    }

    async criar() {
        this.validar();
        await DAOEmail.inserir({
            email: this.email,
            cod: this.cod
        });
    }

    async carregar() {
        const result = await DAOEmail.pegarPorId(this.id);
        if (result.length > 0) {
            this.email = result[0].email;
            this.cod = result[0].cod;
        }else{
            throw new NaoEncontrado(this.id);
        }
    }

    async atualizar() {
        await DAOEmail.pegarPorId(this.id);
        const campos = ['email', 'cod'];
        const dadosParaAtualizar = {};

        campos.forEach(campo => {
            const valor = this[campo];

            if(valor == this.email){
                if (typeof valor !== 'string' && vvalidaEmail(valor) === false) {
                    throw new CampoInvalido('email');
    
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

        await DAOEmail.atualizar(this.id, dadosParaAtualizar);


    }

    async remover() {
        return await DAOEmail.remover(this.id);
    }


    validar() {
        const campos = ['email',  'cod']
        
        campos.forEach(campo => {
            const valor = this[campo];


            if(valor == this.email){
                if (validaEmail(valor) === false) {
                    throw new CampoInvalido('email');
        
                }
            }else{
                if (typeof valor !== 'number' || valor === 0 ) {
                    throw new CampoInvalido('cod');
    
                } 
            }

        })
    }

}

module.exports = Email;