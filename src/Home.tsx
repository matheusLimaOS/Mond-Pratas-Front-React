import React from 'react';
import './CSS/Home.css';
import NavBar from "./Navbar";
import {Button, ButtonGroup, Card} from "react-bootstrap";
import {Link} from "react-router-dom";

function Home() {
  return (
      <div>
          <NavBar URL={""} />
          <div id="card">
              <Card className="mx-auto" id="card-g">
                  <Card.Header className="text-center">
                      Seja bem vindo!<br/>
                      O que deseja realizar?
                  </Card.Header>
                  <Card.Body className="cardinho">
                      <ButtonGroup className="btn-block" size='lg' >
                          <Link  to="/Venda">
                              <Button variant="outline-dark" size="lg" >
                                  VENDER
                              </Button>
                          </Link>
                          <Link to="/Inserir" >
                              <Button variant="outline-dark" size="lg" >
                                  INSERIR
                              </Button>
                          </Link>
                          <Link  to="/HistVendas">
                              <Button variant="outline-dark" size="lg">
                                  HISTÓRICO DE VENDAS
                              </Button>
                          </Link>
                      </ButtonGroup>
                  </Card.Body>
              </Card>
          </div>
      </div>
  );
}

export default Home;