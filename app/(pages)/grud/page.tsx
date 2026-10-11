"use client"
import {useEffect, useState} from "react"
import React from "react"
type Tarefas = {
    id:number ;
    nome:string ;
    descricao:string ;
    prioridade: "alta" | "media" | "baixa",
}

export default function Grud() {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState(""); 
    const [prioridade,setPrioridade] = useState<Tarefas["prioridade"]>("media")
    const [idEditando,setIdEditando] = useState<number | null>(null)
    const [nomeEditando, setNomeEditando] = useState("");
    const [descricaoEditando, setDescricaoEditando] = useState("");
    const [prioridadeEditando, setPrioridadeEditando] = useState<Tarefas["prioridade"]>("media");


    const [ListaDeTarefas,setListaDeTarefas] = useState<Tarefas[]>( []);

        const [carregou, setCarregou] = useState(false);

        useEffect(() => {
            const tarefasSalvas = localStorage.getItem("minhasTarefas");
            if (tarefasSalvas) {
                setListaDeTarefas(JSON.parse(tarefasSalvas));
            }
            setCarregou(true); 
        }, []);

        useEffect(() => {
            if (carregou) {
                localStorage.setItem("minhasTarefas", JSON.stringify(ListaDeTarefas));
            }
        }, [ListaDeTarefas, carregou]);



    const ordem  = {
        alta:1,
        media:2,
        baixa:3,
    }

    const listaOrdenada = [...ListaDeTarefas].sort(
        (a,b)=>{
            return ordem[a.prioridade] - ordem[b.prioridade]
        }
    )

    const AdicionarTarefa = ()=>{
        if(nome.trim() === "" || descricao.trim() === "") {
            alert("preencha os campos");
            return;
        }

        const novaTarefa:Tarefas = {
            id: Date.now(),
            nome:nome,
            descricao:descricao,
            prioridade:prioridade
        };
        setListaDeTarefas([...ListaDeTarefas,novaTarefa])

        setNome("")
        setDescricao("")
    }

    //------------Apagar ------------
    const apagar = (id:number) =>{
        setListaDeTarefas(
            ListaDeTarefas.filter(
                (tarefas) => tarefas.id !== id
        )
      )
    }

    //----------Editar--------------
    const salvarEdicao = (id: number) => {
        const listaAtualizada = ListaDeTarefas.map(
            (tarefas) => {
                if (tarefas.id === id) {
                    return {
                        ...tarefas,
                        nome:nomeEditando,
                        descricao:descricaoEditando,
                        prioridade:prioridadeEditando
                    }
                }
                return tarefas;
            }
        )
        setListaDeTarefas(listaAtualizada)
        setIdEditando(null)
    }


    return (
        <main>
            <div>
                    <p>Adicionar Tarefa</p>
                <section className="grid grid-cols-4">
                    <input type="text" placeholder="tarefa" value={nome} onChange={(e) => setNome(e.target.value) }></input>
                    <input type="text" placeholder="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)}></input>
                    <select name="prioridade" id="prioridade" value={prioridade} onChange={(e)=>setPrioridade(e.target.value as Tarefas["prioridade"])}>

                        <option value="alta">Alta</option>
                        <option value="media">Média</option>
                        <option value="baixa">Baixa</option>
                    </select>
                    <button onClick={AdicionarTarefa}>Adicionar</button>
                </section>

                <section className="border w-[90%] h-screen">
                    <ul > 
                        {listaOrdenada.map(
                        (tarefas)=>(
                            <li key={tarefas.id} className="grid grid-cols-4 gap-1 w-[95%] border-b" onDoubleClick={()=>apagar(tarefas.id)}>
                                {idEditando === tarefas.id ? (
                                    <>
                                    <input type="text" value={nomeEditando} 
                                    onChange={(e)=>setNomeEditando(e.target.value)}
                                    onKeyDown={(e)=> e.key ==="Enter" && setIdEditando(null)}
                                    autoFocus
                                    />

                                    <input type="text" value={descricaoEditando} 
                                    onChange={(e)=>setDescricaoEditando(e.target.value)}
                                    onKeyDown={(e)=> e.key ==="Enter" && setIdEditando(null)}
                                    />

                                    <select 
                                        value={prioridadeEditando} 
                                        onChange={(e) => setPrioridadeEditando(e.target.value as Tarefas["prioridade"])}
                                        >
                                        <option value="alta">Alta</option>
                                        <option value="media">Média</option>
                                        <option value="baixa">Baixa</option>
                                    </select>

                                    </>
                                ) : (
                                    <>
                                <h1>{tarefas.nome}</h1>
                                <p>{tarefas.descricao}</p>
                                <p>{tarefas.prioridade}</p>
                                </>)

                            }
                                
                                {idEditando === tarefas.id ? (
                                    <button onClick={()=> salvarEdicao(tarefas.id)}>Salvar</button>
                                ) : (
                                    <button 
                                    onClick={
                                        ()=>{
                                            setIdEditando(tarefas.id)
                                            setNomeEditando(tarefas.nome)
                                            setDescricaoEditando(tarefas.descricao)
                                        }
                                    }
                                    >Editar</button>
                                )
                                
                                }
                            </li>
                        )
                    )}
                        
                    </ul>
                </section>


            </div>
        </main>
    )
}