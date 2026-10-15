
'use client'

import Graficos from "./components/Graficos"
import BancoDeDados from "./components/BancoDeDados"
import ReceitaOperacional from "./components/ReceitaOperacional"
import MargemContribuicao from "./components/MargemDeContribuicao"
import McGeral from "./components/McGeral"
import { useState } from "react"

interface Mes {
  mes: string
  valor: number
}

interface Cliente {
  nome: string
  receitaBase: number
  margemContribuicao: number
}

export default function DashboardFinanceiro() {
  const [meses, setMeses] = useState<Mes[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])

  return (
    <main className="min-h-screen w-full bg-[#100D3D] p-5">

      {/* Cards superiores */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">

        <ReceitaOperacional meses={meses} />

        <MargemContribuicao meses={meses} />

        <McGeral meses={meses} />

      </section>

      {/* Tabela e gráficos dos clientes */}
      <section className="mt-6 w-full rounded-lg bg-[#17145E] p-4">

        <Graficos
          meses={meses}
          clientes={clientes}
        />

      </section>

      {/* Geração dos dados */}
      <BancoDeDados
        setMeses={setMeses}
        setClientes={setClientes}
      />

    </main>
  )
}
