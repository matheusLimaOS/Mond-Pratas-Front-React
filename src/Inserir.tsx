import React, {useState} from 'react';
import NavBar from "./Navbar";
import Table from "./Table";
import {Card, Col, Form} from "react-bootstrap";
import './CSS/Venda.css'
import {Button,Alert} from "reactstrap";
import api from "./axios";

interface Produ{
    desc: string,
    tamanho: number,
    quantidade: number,
    valor: number
}

function TELAINSERIR() {
    let [Visivel,setVisivel] = useState(false);
    let [Color,setColor] = useState("success");
    let [Message,setMessage] = useState("");
    let [Desc,setDesc] = useState("");
    let [Tamanho,setTamanho] = useState(0);
    let [Quantidade,setQuantidade] = useState(0);
    let [Valor,setValor] = useState(0);
    let prod: Produ = {
        desc: Desc,
        tamanho: Tamanho,
        quantidade: Quantidade,
        valor: Valor
    };

    const colunc: Array<Object> = [
        {
            label: "ID",
            field: "ID"
        },
        {
            label: "Descrição",
            field: "descricao"
        },
        {
            label: "Tamanho",
            field: "tamanho"
        },
        {
            label: "Quantidade",
            field: "quantidade"
        },
        {
            label: "Valor",
            field: "valor"
        }
    ];
    function onDismiss() {
        setVisivel(false);
    };
    function submitar(){
        api.post("http://localhost:8080/produto",prod).then(prod =>{
            setVisivel(true);
            setMessage("DEU TUDO CERTO MLK BOM DO CARALHO FILHA DA PUTA");
        }).catch(error => {
            if(error.toString().indexOf("409") > 0){
                setVisivel(true);
                setColor("danger");
                setMessage("Produto já cadastrado!");
            };
            if(error.toString().indexOf("405") > 0){
                setVisivel(true);
                setColor("danger");
                setMessage("Dados inseridos inválidos!");
            };
            if(error.toString().indexOf("500") > 0){
                setVisivel(true);
                setColor("danger");
                setMessage("Erro na aplicação, Por favor entre em contato com o desenvolvedor!");
            };
        })
    }

    function change1(e){
        setDesc(e.target.value);
    }
    function change2(e){
        setTamanho(e.target.value);
    }
    function change3(e){
        setQuantidade(e.target.value);
    }
    function change4(e){
        setValor(e.target.value);
    }

    return (
        <div>
            <NavBar URL={"Venda"}/>

            <div id="card">
                <Card className="mx-auto" id="card-g">
                    <Card.Header className="text-center">
                        INSERIR
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Row>
                                    <Form.Label column sm={2}>DESCRIÇÃO:</Form.Label>
                                    <Col sm={10}>
                                    <Form.Control value={prod.desc} onChange={change1} id="desc" placeholder="Descrição do Produto"/><br/>
                                    </Col>
                            </Form.Row>
                            <Form.Row>
                                <Form.Label column sm={2}>TAMANHO:</Form.Label>
                                <Col sm={10}>
                                    <Form.Control value={prod.tamanho} onChange={change2} id="tam" placeholder="Tamanho do Produto"/><br/>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Form.Label column sm={2}>QUANTIDADE:</Form.Label>
                                <Col sm={10}>
                                    <Form.Control value={prod.quantidade} onChange={change3} id="quant" placeholder="Quantidade do Produto"/><br/>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Form.Label column sm={2}>VALOR:</Form.Label>
                                <Col sm={10}>
                                    <Form.Control value={prod.valor} onChange={change4} id="val" placeholder="Valor do Produto"/><br/>
                                </Col>
                            </Form.Row>
                            <Button onClick={submitar} color="dark" outline={true}>INSERIR</Button>
                            <br/>
                            <Alert color={Color} isOpen={Visivel} toggle={onDismiss}>{Message}</Alert>
                        </Form>
                        <Table colunc={colunc} route="produtos"/>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default TELAINSERIR;