import React, { useState } from 'react';
import { Button, Form, Tab } from 'semantic-ui-react';
import api from '../../services/api';
import './styles.css';

export default function Formulario() {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(false);
    const [animal, setAnimal] = useState('');
    const [cor, setCor] = useState('');
    const [pais, setPais] = useState('');

    var panes = panes = [
        { menuItem: 'Animal', pane: animal},
        { menuItem: 'Cor', pane: cor },
        { menuItem: 'Pais', pane: pais},
      ];

    async function handleLogin(e) {
        e.preventDefault();   
        try {
            const pessoa = {
                nome,
                sobrenome,
                email
            }
            const responseCod = await api.post('cadastro', pessoa);
            const {cod_nome, cod_sobrenome, cod_email} = responseCod.data;
            const cods = {
                cod_nome,
                cod_sobrenome,
                cod_email
            }
            const responseBusca = await api.post('consulta', cods);
            const {tbs_animal, tbs_cores, tbs_paises} = responseBusca.data;
            setAnimal(tbs_animal[0].animal);
            setCor(tbs_cores[0].cor);
            setPais(tbs_paises[0].pais);

            if(tbs_animal.length > 0 && tbs_cores.length > 0 && tbs_paises.length > 0){
                
                setStatus(true);
                console.log(status)
            }
        } catch (err) {
          console.log(err);
        }
    }

    return (
            <Form className="corpo_form" onSubmit={handleLogin}>
                <section className="campos_form">
                    <Form.Field >
                        <label>Nome</label>
                        <input 
                        placeholder='Nome'
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field >
                        <label>Sobrenome</label>
                        <input 
                        placeholder='Sobrenome'
                        value={sobrenome}
                        onChange={e => setSobrenome(e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field >
                        <label>E-mail</label>
                        <input 
                        placeholder='E-mail'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Field>
                </section>
                <Button color='green' type='submit'>Enviar</Button>   
                { status === true ? <section className="campo_resp">
                    <Tab menu={{ color: 'orange', fluid: true, vertical: true, tabular: true }}  panes={panes} renderActiveOnly={false} />
                </section> : <p>Preencha o Formulario</p> }            
          </Form>
    );
}