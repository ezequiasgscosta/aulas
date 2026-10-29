'use client'
interface usuario {
    id:number 
    nome:string 
    senha:string
}

interface Props {
    setUsuarios:(usuarios:usuario[]) => void
}

export default function BancoDeDados ({setUsuarios}:Props) {
const usuarios: usuario[] = [
    {id:1 , nome: "biel", senha:"123"}
]
setUsuarios(usuarios)
return null
}