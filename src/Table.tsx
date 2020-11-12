import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Table} from "antd";
import api from "./axios";

interface Props{
    colunc:Array<Object>,
    route:string,
    atu:boolean,
    page:number,
}

const Tabela = (props:Props) => {
    let [Data,setData] = useState();

    useEffect(()=>{
        api.get("http://localhost:8080/" + props.route).then(produtos =>{
            setData(produtos.data.produtos);
        }).catch(error =>{
            console.log(error);
        })
    },[props.route,props.atu]);
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