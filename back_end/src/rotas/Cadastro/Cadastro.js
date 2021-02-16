const validaEmail = require('../../componentes/validaEmail');
const CampoInvalido = require('../../error/CampoInvalido');
const axios = require('axios');
const Nome = require('../Nome/Nome');
const Sobrenome = require('../Sobrenome/Sobrenome');
const Email = require('../Email/Email');

const api = axios.create({
    baseURL: 'http://localhost:3005/',
})

class Cadastro {
    constructor({ nome, sobrenome, email, cod_nome, cod_sobrenome, cod_email }) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.cod_nome = parseInt(cod_nome);
        this.cod_sobrenome = parseInt(cod_sobrenome);
        this.cod_email = parseInt(cod_email);
    }

    async criar() {
        this.validar();
        try {
            const nome = new Nome({
                nome: this.nome,
                cod: this.cod_nome
            });
            await nome.criar();
            

            const sobrenome = new Sobrenome({
                sobrenome: this.sobrenome,
                cod: this.cod_sobrenome
            });
            await sobrenome.criar();

            const email = new Email({
                email: this.email,
                cod: this.cod_email
            });
            await email.criar();
            
        } catch (error) {
            console.log(error);
        }

    }


    validar() {
        const campos = ['nome', 'sobrenome', 'email', 'cod_nome', 'cod_sobrenome', 'cod_email']

        campos.forEach(campo => {
            const valor = this[campo];


            if (valor == this.nome || valor == this.sobrenome) {
                if (typeof valor !== 'string' && valor.length <= 0) {
                    throw new CampoInvalido('email');

                }
            } else if (valor == this.email) {
                if (validaEmail(valor) === false) {
                    throw new CampoInvalido('email');

                }
            } else {
                if (typeof valor !== 'number' || valor === 0) {
                    throw new CampoInvalido('cod');

                }
            }

        })
    }

}

module.exports = Cadastro;