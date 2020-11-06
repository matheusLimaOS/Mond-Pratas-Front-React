import React from 'react';
import {BrowserRouter as Router, Switch, Route, BrowserRouter} from 'react-router-dom';

import Home from './Home';
import Venda from './Venda';

import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/App.css';

function App(){
    return(
        <BrowserRouter>
            <Router>
                <Switch>
                    <Route path="/Home" component={Home}>
                    </Route>
                    <Route path="/Venda" component={Venda}>
                    </Route>
                    <Route path="/Inserir">
                        <Home/>
                    </Route>
                    <Route path="/Carrinho">
                        <Home/>
                    </Route>
                    <Route path="/Logout">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </BrowserRouter>
    )
};

export default App;


