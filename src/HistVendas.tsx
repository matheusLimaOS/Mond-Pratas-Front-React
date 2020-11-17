import React from 'react';
import './CSS/Carrinho.css';
import NavBar from "./Navbar";
import Tabela from "./Table";
import {Space} from "antd";
import {Button} from "reactstrap";
import {Card,} from "react-bootstrap";
import {Link} from "react-router-dom";

function HistVenda() {
    const colunc: Array<Object> = [
        {
            title: "ID",
            dataIndex: "ID_venda"
        },
        {
            title: "Quantidade vendida",
            dataIndex: "qtd_vendido",
            sorter: (a, b) => a.qtd_vendido - b.qtd_vendido,
        },
        {
            title: "Valor vendido",
            dataIndex: "val_vendido",
            sorter: (a, b) => a.val_vendido - b.val_vendido,
        },
        {
            title: "Usuário",
            dataIndex: "user",
            sorter: (a, b) => a.user - b.user,
        },
        {
            title: "Data da venda",
            dataIndex: "horavenda"
        },
        {
            title: "Ação",
            key: "action",
            render: (text, record) => (
                <Space>
                    <Link to="/Venda" className="b-c-v">
                        <Button color="dark" outline={true}>DETALHES</Button>
                    </Link>
                </Space>
            )
        }
    ];

    return (
        <div>
            <NavBar URL={""}/>

            <div id="card">
                <Card className="mx-auto" id="card-g">
                    <Card.Header className="text-center">
                        HISTÓRICO DE VENDAS
                    </Card.Header>
                    <Card.Body>
                        <Tabela colunc={colunc} route="histovenda" atu={false} page={10} type="vendas"/>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}


export default HistVenda;