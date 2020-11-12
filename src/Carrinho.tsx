import React, {useState} from 'react';
import './CSS/Carrinho.css';
import NavBar from "./Navbar";
import {Card} from "react-bootstrap";
import Table from './Table'
import {Space} from "antd";
import {Button,Alert} from "reactstrap";
import api from "./axios";
import {Link} from "react-router-dom";

interface prodcarrinho{
    id_carrinho: number,
    id_produto:number,
    prod_descri: string,
    prod_valor: number,
    prod_quant: number,
    usuario: string,
    key: number
}

function Home() {
    let [Visivel,setVisivel] = useState(false);
    let [Color,setColor] = useState("success");
    let [Message,setMessage] = useState("");
    let [Atu,setAtu] = useState(false);
    let flag:boolean = false;
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
            dataIndex: "prod_descri",
            sorter: (a, b) => a.prod_descri.length - b.prod_descri.length,
        },
        {
            title: "Quantidade",
            dataIndex: "prod_quant",
            sorter: (a, b) => a.prod_quant - b.prod_quant,
        },
        {
            title: "Valor",
            dataIndex: "prod_valor",
            sorter: (a, b) => a.prod_valor - b.prod_valor,
        },
        {
            title: "Ação",
            key: "action",
            render: (record: prodcarrinho) => (
                <Space>
                    <Button onClick={() => {remove(record)}} color="dark" outline={true}>REMOVER</Button>
                </Space>
            )
        }
    ];

    function onDismiss() {
        setVisivel(false);
    };

    function remove(record:prodcarrinho) {
        api.delete("http://localhost:8080/carrinho/matholas/" + record.id_produto).then(prod => {
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
    function removeall(){
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
    async function sellall() {
        await api.get("http://localhost:8080/carrinho/matholas").then(async prods => {
            for (const prod of prods.data.produtos) {
                await api.put("http://localhost:8080/produto/carrinho/" + prod.id_produto,prod).then(prod =>{
                    api.delete("http://localhost:8080/carrinho/matholas/" + prod.data.idc);
                }).catch(error => {
                    flag=true;
                })
            }
        })
        if(!flag){
            setAtu(!Atu);
            setVisivel(true);
            setColor("success");
            setMessage("Venda finalizada com sucesso!");
        }
        else if(flag){
            setAtu(!Atu);
            setVisivel(true);
            setColor("danger");
            setMessage("O(s) Produtos restantes do carrinho, não podem ser vendidos, pois a quantidade é maior que a disponivel em estoque!");
        }

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
                        <Button onClick={() => {sellall()}} color="dark" outline={true}>FINALIZAR VENDA</Button>
                        <Link to="/Venda" className="b-c-v">
                            <Button color="dark" outline={true}>CONTINUAR VENDENDO</Button>
                        </Link>
                        <Button onClick={() => {removeall()}} color="dark" outline={true}>LIMPAR CARRINHO</Button>
                        <Alert color={Color} isOpen={Visivel} toggle={onDismiss}>{Message}</Alert>
                        <Table route={"carrinho/matholas"} colunc={colunc} atu={Atu} page={5}/>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Home;