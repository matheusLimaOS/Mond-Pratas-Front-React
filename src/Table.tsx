import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Table} from "antd";
import api from "./axios";

interface Props{
    colunc:Array<Object>,
    route:string,
    atu:boolean,
    page:number,
    type:string
}

const Tabela = (props:Props) => {
    let [Data,setData] = useState();

    useEffect(()=>{
        api.get("http://localhost:8080/" + props.route).then(produtos => {
            if(props.type==="produtos")
                setData(produtos.data.produtos);
            else
                setData(produtos.data.vendas);
        }).catch(err => {
            console.log(err);
        })
    },[props.route,props.atu,props.type]);
    return (
        <div>
            <Table
                pagination={{
                    pageSize:props.page
                }}
                bordered={true}
                columns={props.colunc}
                dataSource={Data}
            />
        </div>
    );
};
export default Tabela;