import React, {useState} from 'react';
import NavBar from "./Navbar";
import Table from "./Table";
import {Card, Col, Form} from "react-bootstrap";
import './CSS/Venda.css'
import {Button,Alert} from "reactstrap";
import api from "./axios";
import {Space} from "antd";

interface Produ{
    id:number,
    descricao: string,
    tamanho: number,
    user: string,
    quant: number,
    valor: number,
    escolha: number
}
interface produtos{
    ID: number,
    descricao:string,
    tamanho:number,
    quantidade:number,
    valor: number,
    usuario: string,
    key: number
}

function TELAVENDA() {
    let [Name,setName] = useState('');
    let [Visivel,setVisivel] = useState(false);
    let [Color,setColor] = useState("success");
    let [Message,setMessage] = useState("");
    let [Desc,setDesc] = useState("");
    let [Tamanho,setTamanho] = useState(0);
    let [Quantidade,setQuantidade] = useState(0);
    let [Valor,setValor] = useState(0);
    let [Escolha,setEscolha] = useState(0);
    let [ID,setID] = useState(0);
    let [Page,setPage] = useState(10);
    let [Trava,setTrava] = useState(true);
    let [Atu,setAtu] = useState(true);
    let prod: Produ = {
        id:ID,
        descricao: Desc,
        tamanho: Tamanho,
        quant: Quantidade,
        user: "matholas",
        valor: Valor,
        escolha: Escolha,
    };
    const colunc: Array<Object> = [
        {
            title: "ID",
            dataIndex: "ID"
        },
        {
            title: "Descrição",
            dataIndex: "descricao"
        },
        {
            title: "Tamanho",
            dataIndex: "tamanho"
        },
        {
            title: "Quantidade",
            dataIndex: "quantidade"
        },
        {
            title: "Valor",
            dataIndex: "valor"
        },
        {
            title: "Ação",
            key: "action",
            render: (text, record:produtos) => (
                <Space>
                    <Button
                        onClick={() => sell(record)}
                        color="dark"
                        outline={true}
                    >
                        VENDER
                    </Button>
                    <Button
                        onClick={() => remove(record)}
                        color="dark"
                        outline={true}
                    >
                        REMOVER
                    </Button>
                </Space>
            )
        }
    ];

    function onDismiss() {
        setVisivel(false);
    }
    function remove(products:produtos){
        setPage(5);
        setTrava(false);
        setID(products.ID);
        setDesc(products.descricao);
        setTamanho(products.tamanho);
        setQuantidade(products.quantidade);
        setValor(products.valor);
        setName("REMOVER")
        setEscolha(1);
    } {/*FUNCTION MOSTRAR FORM COM REMOVER*/}
    function sell(products:produtos){
        setPage(5);
        setTrava(false);
        setID(products.ID);
        setDesc(products.descricao);
        setTamanho(products.tamanho);
        setQuantidade(products.quantidade);
        setValor(products.valor);
        setName("VENDER")
        setEscolha(0);
    } {/*FUNCTION MOSTRAR FORM COM VENDER*/}
    function submitar(){
        console.log(prod);
        api.put("http://localhost:8080/produto/" + prod.id,prod).then(prod =>{
            if(prod.status.toString().indexOf('200')===0){
                setVisivel(true);
                setColor("success");
                setMessage("Produto colocado no carrinho com sucesso");
            }
            if(prod.status.toString().indexOf('201')===0){
                setAtu(!Atu);
                setVisivel(true);
                setColor("success");
                setMessage("Produto removido com sucesso");
            }
        }).catch(error => {
            if(error.toString().indexOf("409") > 0){
                setVisivel(true);
                setColor("danger");
                setMessage("Não permitido remover quantidade maior que a disponivel!");
            };
            if(error.toString().indexOf("405") > 0){
                setVisivel(true);
                setColor("danger");
                setMessage("Dados inseridos inválidos!");
            };
            if(error.toString().indexOf("403") > 0){
                setVisivel(true);
                setColor("danger");
                setMessage("Para remover com o valor zerado, use a opção 'REMOVER'!");
            };
            if(error.toString().indexOf("500") > 0){
                setVisivel(true);
                setColor("danger");
                setMessage("Erro na aplicação, Por favor entre em contato com o desenvolvedor!");
            };
        })
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
                        VENDER/REMOVER
                    </Card.Header>
                    <Card.Body>
                        <div hidden={Trava}>
                            <Form>
                                <Form.Row>
                                    <Form.Label column sm={2}>DESCRIÇÃO:</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            value={prod.descricao}
                                            id="desc"
                                            placeholder="Descrição do Produto"
                                            readOnly={true}
                                        />
                                        <br/>
                                    </Col>
                                </Form.Row> {/*FORM DESCRIÇÃO*/}
                                <Form.Row>
                                    <Form.Label column sm={2}>TAMANHO:</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            value={prod.tamanho}
                                            id="tam"
                                            placeholder="Tamanho do Produto"
                                            readOnly={true}
                                        />
                                        <br/>
                                    </Col>
                                </Form.Row> {/*FORM TAMANHO*/}
                                <Form.Row>
                                    <Form.Label column sm={2}>QUANTIDADE:</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            value={prod.quant}
                                            id="quant"
                                            onChange={change3}
                                            placeholder="Quantidade do Produto"
                                        />
                                        <br/>
                                    </Col>
                                </Form.Row> {/*FORM QUANTIDADE*/}
                                <Form.Row>
                                    <Form.Label column sm={2}>VALOR:</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            value={prod.valor}
                                            id="val"
                                            onChange={change4}
                                            placeholder="Valor do Produto"/><br/>
                                    </Col>
                                </Form.Row> {/*FORM VALOR*/}

                                <Button
                                    onClick={submitar}
                                    color="dark"
                                    outline={true}
                                >
                                    {Name}
                                </Button>
                                <Button
                                    onClick={() => {
                                        setTrava(true);
                                        setPage(10)
                                    }}
                                    className="btnda"
                                    color="danger"
                                    outline={true}
                                >
                                    CANCELAR
                                </Button>
                                <br/>
                                <Alert
                                    color={Color}
                                    isOpen={Visivel}
                                    toggle={onDismiss}
                                >
                                    {Message}
                                </Alert>
                            </Form>
                        </div>
                        <Table colunc={colunc} route="produtos" atu={Atu} page={Page}/>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default TELAVENDA;