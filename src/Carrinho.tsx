import React, {useState} from 'react';
import './CSS/Carrinho.css';
import NavBar from "./Navbar";
import {ButtonGroup, Card, Form} from "react-bootstrap";
import Table from './Table'
import {Space} from "antd";
import {Button,Alert} from "reactstrap";
import api from "./axios";
import {Link} from "react-router-dom";


function Home() {
    let [Visivel,setVisivel] = useState(false);
    let [Color,setColor] = useState("success");
    let [Message,setMessage] = useState("");
    let [Atu,setAtu] = useState(false);
    const colunc: Array<Object> = [
        {
            title: "ID Carrinho",
            dataIndex: "id_carrinho"
        },
        {
            title: "ID",
            dataIndex: "id_produto"
        },
        {
            title: "Descrição",
            dataIndex: "prod_descri"
        },
        {
            title: "Quantidade",
            dataIndex: "prod_quant"
        },
        {
            title: "Valor",
            dataIndex: "prod_valor"
        },
        {
            title: "Ação",
            key: "action",
            render: (record) => (
                <Space>
                    <Button onClick={() => {remove(record)}} color="dark" outline={true}>REMOVER</Button>
                </Space>
            )
        }
    ];

    function onDismiss() {
        setVisivel(false);
    };

    function remove(record) {
        api.delete("http://localhost:8080/carrinho/matholas/" + record.id_carrinho ).then(prod => {
            setAtu(!Atu);
            setColor("success");
            setVisivel(true);
            setMessage("Produto removido com sucesso!");
        }).catch(error => {
            if(error.toString().indexOf("500") > 0){
                setVisivel(true);
                setColor("danger");
                setMessage("Erro da aplicação, contate o Desenvolvedor!");
            };
        })
    }
    function removeall() {
        api.delete("http://localhost:8080/carrinho/matholas").then(prod => {
            setAtu(!Atu);
            setColor("success");
            setVisivel(true);
            setMessage("Carrinho limpo com sucesso!");
        }).catch(error => {
            if(error.toString().indexOf("500") > 0){
                setVisivel(true);
                setColor("danger");
                setMessage("Erro da aplicação, contate o Desenvolvedor!");
            };
        })
    }

    return (
        <div>
            <NavBar URL={""} />
            <div id="card">
                <Card className="mx-auto" id="card-g">
                    <Card.Header className="text-center">
                        CARRINHO
                    </Card.Header>
                    <Card.Body className="cardinho">
                        <Link to="/Venda" className="b-c-v">
                            <Button color="dark" outline={true}>CONTINUAR VENDENDO</Button>
                        </Link>
                        <Button onClick={() => {removeall()}} color="dark" outline={true}>LIMPAR CARRINHO</Button>
                        <Alert color={Color} isOpen={Visivel} toggle={onDismiss}>{Message}</Alert>
                        <Table route={"carrinho/matholas"} colunc={colunc} atu={Atu} />
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Home;