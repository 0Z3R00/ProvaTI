const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const roteadorNome = require('./rotas/Nome');
const roteadorSobrenome = require('./rotas/Sobrenome');
const roteadorEmail = require('./rotas/Email');
const roteadorCadastro = require('./rotas/Cadastro');
const roteadorConsulta = require('./rotas/ConsultaBanco');
const CampoInvalido = require('./error/CampoInvalido');
const NaoEncontrado = require('./error/NaoEncontrado');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3050;

app.use('/api/nome', roteadorNome);
app.use('/api/sobrenome', roteadorSobrenome);
app.use('/api/email', roteadorEmail);
app.use('/api/cadastro', roteadorCadastro);
app.use('/api/consulta', roteadorConsulta);
app.use((erro, requisicao, resposta, proximo) => {
    let status = 500

    if (erro instanceof CampoInvalido || erro instanceof NaoEncontrado ) {
        status = 400
    }
    resposta.status(status);
    resposta.send({
            status_requisição: erro.message,
            }
        )
})

app.listen(port, () => {
    console.log(`A API está sendo executada na url http://localhost:${port}/`);
});
