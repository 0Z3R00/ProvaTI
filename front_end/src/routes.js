import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Formulario from './pages/Formulario';

export default function Routes() {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Formulario} />   
        </Switch>
    </BrowserRouter>
    );
}