import React from 'react';
import {BrowserRouter as Router, Switch, Route, BrowserRouter} from 'react-router-dom';

import Home from './Home';
import Inserir from './Inserir';
import Venda from './Venda'
import Carrinho from './Carrinho'

import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/App.css';

function App(){
    return(
        <BrowserRouter>
            <Router>
                <Switch>
                    <Route path="/Home" component={Home}/>
                    <Route path="/Venda" component={Venda}/>
                    <Route path="/Inserir" component={Inserir}/>
                    <Route path="/Carrinho" component={Carrinho}/>
                    <Route path="/Logout">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </BrowserRouter>
    )
};

export default App;


