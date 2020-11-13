import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom"
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
                    <NavLink className="navlogo" to="Home">
                        <img src={navlogo} alt={' '}/>
                        {'  '}
                        Mond Pratas
                    </NavLink>
                </Navbar.Brand>
                <Nav activeKey={props.URL} className="mr-auto">
                    <Nav.Item>
                        <NavLink className="navi" to="Venda">
                            {' '}
                            VENDA
                        </NavLink>
                    </Nav.Item>

                    <Nav.Item>
                        <NavLink className="navi" to="Inserir">
                            {' '}
                            INSERIR
                        </NavLink>
                    </Nav.Item>

                    <Nav.Item>
                        <NavLink className="navi" to="Carrinho">
                            {' '}
                            CARRINHO
                        </NavLink>
                    </Nav.Item>

                </Nav>
                <Nav>
                    <Nav.Item>
                        <NavLink className="navi" to="Logout">
                            {' '}
                            LOGOUT
                        </NavLink>
                    </Nav.Item>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar;