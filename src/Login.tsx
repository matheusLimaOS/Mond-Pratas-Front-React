import React, {useState} from 'react';
import './CSS/Home.css';
import NavBar from "./Navbar";
import {Card, Col, Form} from "react-bootstrap";
import {Alert,Button} from "reactstrap";
import api from "./axios";
import {Link} from "react-router-dom";

interface USER {
    user: string,
    pass: string
}

function Home() {
    let [Visivel,setVisivel] = useState(false);
    let [Message,setMessage] = useState("");
    let [Color,setColor] = useState("success");
    let [Usuario,setUsuario] = useState("");
    let [Senha,setSenha] = useState("");
    let user:USER = {
        user: Usuario,
        pass:Senha,
    }

    function change1(e){
        setUsuario(e.target.value)
    }
    function change2(e){
        setSenha(e.target.value)
    }
    function onDismiss(){
        setVisivel(false);
    }
    function submitar(){
        api.post("http://localhost:8080/users/login",user).then(user => {
            setVisivel(true);
            setColor("success");
            setMessage("Login realizado com sucesso!");
            setTimeout(function (){
                 window.location.href = "http://localhost:3000/Home";
            },2500);

        }).catch(error => {
            setVisivel(true);
            setColor("danger");
            if(error.toString().indexOf("404") > 0){
                setMessage("Usuario não cadastrado!");
            };
            if(error.toString().indexOf("401") > 0){
                setMessage("Senha Incorreta");
            };
            if(error.toString().indexOf("500") > 0){
                setMessage("Erro na aplicação, Por favor entre em contato com o desenvolvedor!");
            };
        })
    }

    return (
        <div>
            <NavBar URL={""} />
            <div id="card">
                <Card className="mx-auto" id="card-g">
                    <Card.Header className="text-center">
                        Seja bem vindo!
                    </Card.Header>
                    <Card.Body className="cardinho">
                        <Form>
                            <Form.Row>
                                <Form.Label column sm={1}>USUARIO:</Form.Label>
                                <Col sm={2}>
                                    <Form.Control
                                        value={user.user}
                                        id="usuario"
                                        onChange={change1}
                                        placeholder="Usuario"
                                    />
                                    <br/>
                                </Col>
                            </Form.Row> {/*FORM USUARIO*/}
                            <Form.Row>
                                <Form.Label column sm={1}>SENHA:</Form.Label>
                                <Col sm={2}>
                                    <Form.Control
                                        value={user.pass}
                                        id="senha"
                                        type="password"
                                        onChange={change2}
                                        placeholder="Senha"/><br/>
                                </Col>
                            </Form.Row> {/*FORM SENHA*/}

                            <Button
                                onClick={submitar}
                                color="dark"
                                outline={true}
                            >
                                LOGIN
                            </Button>
                            <Link to='/CadUser'>
                                <Button
                                    className="btnda"
                                    color="dark"
                                    outline={true}
                                >
                                    CADASTRAR USUARIO
                                </Button>
                            </Link>
                            <br/>
                            <Alert
                                color={Color}
                                isOpen={Visivel}
                                toggle={onDismiss}
                            >
                                {Message}
                            </Alert>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Home;