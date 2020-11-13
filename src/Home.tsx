import React from 'react';
import './CSS/Home.css';
import NavBar from "./Navbar";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";

function Home() {
  return (
      <div>
          <NavBar URL={""} />
          <div id="card">
              <Card className="mx-auto" id="card-g">
                  <Card.Header className="text-center">
                      O que deseja realizar?
                  </Card.Header>
                  <Card.Body className="cardinho">
                      <Link to="/Venda">
                          <Button variant="outline-dark" size="lg" block={true}>
                              VENDER
                          </Button>
                      </Link>
                      <Link to="/Inserir" >
                          <Button variant="outline-dark" size="lg" block={true}>
                              INSERIR
                          </Button>
                      </Link>
                      <Link to="/HistVendas" >
                          <Button className="teste" variant="outline-dark" size="lg" block={true}>
                              HISTÓRICO DE VENDAS
                          </Button>
                        </Link>

                  </Card.Body>
              </Card>
          </div>
      </div>
  );
}

export default Home;