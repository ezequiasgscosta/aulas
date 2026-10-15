'use client'

import { useEffect } from "react"

interface mes {
    mes:string
    valor:number
}

interface cliente{
    nome:string
    receitaBase:number
   margemContribuicao:number
};




interface props {
    setMeses:(meses:mes[]) => void
    setClientes:(clientes:cliente[]) => void
}
export default function BancoDeDados({setMeses,setClientes}:props) {
    useEffect(
        ()=>{
            const gerarNumero = () =>{
               const meses = [
                    {mes: "janeiro",valor : Math.floor(Math.random()*100) + 1},
                    {mes:"fevereiro", valor:Math.floor(Math.random()*100) + 1},
                    {mes:"marco", valor:Math.floor(Math.random()*100) + 1},
                    {mes:"abril", valor:Math.floor(Math.random()*100) + 1},
                    {mes:"maio", valor:Math.floor(Math.random()*100) + 1},
                    {mes:"junho", valor:Math.floor(Math.random()*100) + 1},
                    {mes:"julho", valor:Math.floor(Math.random()*100) + 1},
                    {mes:"agosto", valor:Math.floor(Math.random()*100) + 1},
                    {mes:"setembro", valor:Math.floor(Math.random()*100) + 1},
                    {mes:"outubro", valor:Math.floor(Math.random()*100) + 1},
                    {mes:"novembro", valor:Math.floor(Math.random()*100) + 1},
                    {mes:"dezembro", valor:Math.floor(Math.random()*100) + 1}
                    
                ]
                setMeses(meses)
            };
            gerarNumero();

           const clientes:cliente[] = [
            {nome:"CasasBahia", receitaBase: 100,margemContribuicao:0},
            {nome:"Americanas", receitaBase: 2364,margemContribuicao:0},
            {nome:"Pernanbucanas", receitaBase: 100,margemContribuicao:0},
            {nome: "Lojas100", receitaBase: 100,margemContribuicao:0},
            {nome: "OticasCarol", receitaBase: 100,margemContribuicao:0},
            {nome: "MercadoMineiro", receitaBase: 100,margemContribuicao:0},
            {nome: "Riachuelo", receitaBase: 100,margemContribuicao:0},
            {nome: "Unimed", receitaBase: 100,margemContribuicao:0},
            {nome: "SantaCasa", receitaBase: 100,margemContribuicao:0},
            {nome: "McDonalts", receitaBase: 100,margemContribuicao:0},
            {nome: "BurguerKing", receitaBase: 100,margemContribuicao:0},
            {nome: "TurboLanches", receitaBase: 100,margemContribuicao:0}
        ].map(
                    (cliente)=>(
                        
                        {...cliente,
                            margemContribuicao: cliente.receitaBase * 0.10}
                    )
                )
        setClientes(clientes)

            

            const intervalo = setInterval(gerarNumero,5000);
            
            return () => clearInterval(intervalo);

        },[setMeses,setClientes]
    )
    return (<></>)
}