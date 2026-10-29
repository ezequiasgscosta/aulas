'use client'
import { useState } from 'react'
import Header from './components/header'
import BancoDeDados from './components/BancoDeDados'
import Login from './(pages)/login/page'

interface usuario {
    id:number 
    nome:string 
    senha:string
}


export default function Blog () {
    const [usuarios,setUsuarios] = useState<usuario[]>([])

    return (
        <main className='absolute w-full'>
            <Header/>
            <BancoDeDados setUsuarios ={setUsuarios}/>
            <Login usuarios={usuarios}/>
            
        </main>
    )
}