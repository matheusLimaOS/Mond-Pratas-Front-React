import React, {useEffect, useState} from 'react';
import {MDBTable, MDBTableBody, MDBTableHead} from "mdbreact";
import api from "./axios";

import './CSS/Table.css';

interface props{
    colunc:Array<object>,
    route:string,
}

function Table(Props: props) {
    let [rows,setrows] = useState(    {
        "ID": 0,
        "descricao": "",
        "tamanho": 0,
        "quantidade": 0,
        "valor": 0,
    });

    useEffect(()=>{
        api.get("http://localhost:8080/"+Props.route).then(produtos =>{
            setrows(produtos.data);
        }).catch(error =>{
            console.log(error);
        })
    },[Props.route]);

    return (
        <MDBTable scrollY hover>
            <MDBTableHead columns={Props.colunc} />
            <MDBTableBody rows={rows["produtos"]}/>
        </MDBTable>
    );
}

export default Table;