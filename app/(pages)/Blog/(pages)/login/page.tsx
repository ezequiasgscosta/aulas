'use client'
import { useState,useRef } from "react"
interface usuario {
    id:number 
    nome:string 
    senha:string
}
interface Props {
    usuarios:usuario[]
}

export default function login ({usuarios}:Props) {
    const texto = "Logar"
    const emailRef = useRef<HTMLInputElement>(null)
    const senhalRef = useRef<HTMLInputElement>(null)
    
    const Logar = () => {
        const emailDigitado = emailRef.current?.value
        const senhaDigitada = senhalRef.current?.value
        const usuarioEncontrado = usuarios.find(
            (u)=> u.nome === emailDigitado && u.senha === senhaDigitada
        )

        if(usuarioEncontrado) {
            alert("logado")
        }else{
            alert("erro")
        }
     
    }

    
    return (
        <main className="text-center grid gap-20  m-auto">

            <h1>Login</h1>
        <label htmlFor="email">
            <input type="email" ref={emailRef} name="email" id="email" placeholder="Email" />
        </label>

        <label htmlFor="senha">
            <input type="password" ref={senhalRef} name="senha" id="senha" placeholder="Senha"/>
        </label>
            

            <button onClick={Logar}>{texto}</button>
        </main>
    )
}