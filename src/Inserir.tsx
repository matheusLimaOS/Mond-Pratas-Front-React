import React, {useState} from 'react';
import NavBar from "./Navbar";
import Table from "./Table";
import {Card, Col, Form} from "react-bootstrap";
import './CSS/Inserir.css'
import {Button,Alert} from "reactstrap";
import api from "./axios";
import {Space} from "antd";

interface Produ{
    id:number,
    desc: string,
    tamanho: number,
    quantidade: number,
    valor: number
}

function TELAINSERIR() {
    let [Visivel,setVisivel] = useState(false);
    let [Color,setColor] = useState("success");
    let [Message,setMessage] = useState("");
    let [ID,setID] = useState(0);
    let [Desc,setDesc] = useState("");
    let [Tamanho,setTamanho] = useState(0);
    let [Quantidade,setQuantidade] = useState(0);
    let [Valor,setValor] = useState(0);
    let [Trava,setTrava] = useState(false);
    let [Atu,setAtu] = useState(false);
    let prod: Produ = {
        id: ID,
        desc: Desc,
        tamanho: Tamanho,
        quantidade: Quantidade,
        valor: Valor
    };

    const colunc: Array<Object> = [
        {
            title: "ID",
            dataIndex: "ID"
        },
        {
            title: "Descrição",
            dataIndex: "descricao",
            sorter: (a, b) => a.descricao.length - b.descricao.length,
        },
        {
            title: "Tamanho",
            dataIndex: "tamanho",
            sorter: (a, b) => a.tamanho - b.tamanho,
        },
        {
            title: "Quantidade",
            dataIndex: "quantidade",
            sorter: (a, b) => a.quantidade - b.quantidade,
        },
        {
            title: "Valor",
            dataIndex: "valor",
            sorter: (a, b) => a.valor - b.valor,
        },
        {
            title: "Ação",
            key: "action",
            render: (text, record) => (
                <Space>
                    <Button onClick={() => edit(record)} color="dark" outline={true}>EDITAR</Button>
                </Space>
            )
        }
    ];

    function onDismiss() {
        setVisivel(false);
    };
    function submitar(){
        if(!Trava){
            api.post("http://localhost:8080/produto",prod).then(prod =>{
                setAtu(!Atu);
                setVisivel(true);
                setMessage("Produto Inserido com sucesso!");
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
        else{
            api.put("http://localhost:8080/produto/editar/" + prod.id,prod).then(prod =>{
                setAtu(!Atu);
                setVisivel(true);
                setMessage("Produto editado com sucesso!");
            }).catch(error => {
                if (error.toString().indexOf("409") > 0) {
                    setVisivel(true);
                    setColor("danger");
                    setMessage("Para remover produtos, vá na tela de Venda!");
                };
                if (error.toString().indexOf("405") > 0) {
                    setVisivel(true);
                    setColor("danger");
                    setMessage("Dados inseridos inválidos!");
                };
                if (error.toString().indexOf("500") > 0) {
                    setVisivel(true);
                    setColor("danger");
                    setMessage("Erro na aplicação, Por favor entre em contato com o desenvolvedor!");
                };
            })
        }
    }
    function edit(record){
        setID(record.ID);
        setDesc(record.descricao);
        setTamanho(record.tamanho);
        setQuantidade(record.quantidade);
        setValor(record.valor);
        setTrava(true);
    }
    function desedit(){
        setDesc('');
        setTamanho(1);
        setQuantidade(1);
        setValor(1);
        setTrava(false);
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
                        <div hidden={false}>
                            <Form>
                                <Form.Row>
                                        <Form.Label srOnly={false} column sm={2}>DESCRIÇÃO:</Form.Label>
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
                                <Button className="btnda" onClick={desedit} color="danger" outline={true} disabled={!Trava}>CANCELAR</Button>
                                <br/>
                                <Alert color={Color} isOpen={Visivel} toggle={onDismiss}>{Message}</Alert>
                            </Form>
                        </div>
                        <Table colunc={colunc} route="produtos" atu={Atu} page={5}/>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default TELAINSERIR;