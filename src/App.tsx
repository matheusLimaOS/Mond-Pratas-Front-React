import React from 'react';
import {BrowserRouter as Router, Switch, Route, BrowserRouter} from 'react-router-dom';

import Home from './Home';
import Inserir from './Inserir';
import Venda from './Venda';
import Carrinho from './Carrinho';
import Login from './Login'
import CadUser from './CadUser'

import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/App.css';

function App(){
    return(
        <BrowserRouter>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/Home" component={Home}/>
                    <Route path="/Venda" component={Venda}/>
                    <Route path="/Inserir" component={Inserir}/>
                    <Route path="/Carrinho" component={Carrinho}/>
                    <Route path="/CadUser" component={CadUser}/>
                    <Route path="/Logout"/>
                </Switch>
            </Router>
        </BrowserRouter>
    )
};

export default App;


