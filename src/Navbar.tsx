import React from 'react';
import {Nav, Navbar,NavLink} from "react-bootstrap";
import {NavLink as Navlink} from "react-router-dom"
import "./CSS/Navbar.css";
import navlogo from "./img/img2.png";

interface Props{
    URL:string
}

function NavBar(props:Props) {
    return (
        <div id="NavBar">
            <Navbar bg="white" variant="light">
                <Navbar.Brand>
                    <Navlink className="navlogo" to="Home">
                        <img src={navlogo} alt={' '}/>
                        {'  '}
                        Mond Pratas
                    </Navlink>
                </Navbar.Brand>
                <Nav activeKey={props.URL} className="mr-auto">
                    <Nav.Item>
                        <Nav.Link>
                            <Navlink className="navi" to="Venda">
                                {' '}
                                VENDA
                            </Navlink>
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <NavLink>
                            <Navlink className="navi" to="Inserir">
                                {' '}
                                INSERIR
                            </Navlink>
                        </NavLink>
                    </Nav.Item>

                    <Nav.Item>
                        <NavLink>
                            <Navlink className="navi" to="Carrinho">
                                {' '}
                                CARRINHO
                            </Navlink>
                        </NavLink>
                    </Nav.Item>

                </Nav>
                <Nav>
                    <Nav.Item>
                        <NavLink>
                            <Navlink className="navi" to="Logout">
                                {' '}
                                LOGOUT
                            </Navlink>
                        </NavLink>
                    </Nav.Item>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar;