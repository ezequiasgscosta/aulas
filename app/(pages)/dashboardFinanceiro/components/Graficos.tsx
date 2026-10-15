
"use client"

interface Mes {
  mes: string
  valor: number
}

interface Cliente {
  nome: string
  receitaBase: number
  margemContribuicao: number
}

interface Props {
  meses: Mes[]
  clientes: Cliente[]
}

const moeda = (valor: number) =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  })

export default function Graficos({ meses, clientes }: Props) {
  const maiorReceita = Math.max(
    ...clientes.map((c) => c.receitaBase),
    1
  )

  const maiorMargem = Math.max(
    ...clientes.map((c) => c.margemContribuicao),
    1
  )

  const totalReceita = clientes.reduce(
    (total, c) => total + c.receitaBase, 0
  )

  const totalMargem = clientes.reduce(
    (total, c) => total + c.margemContribuicao, 0
  )

  const percentualTotal =
    totalReceita > 0 ? (totalMargem / totalReceita) * 100 : 0

  return (
    <div className="w-full overflow-x-auto rounded-lg bg-[#17145E] p-3 text-white">

      <div className="min-w-[650px]">

        {/* Cabeçalho */}
        <div className="grid grid-cols-[1.25fr_1fr_1fr_56px] items-center border-b border-white/20 px-2 py-3 text-sm font-bold">
          <p>Fornecedor</p>
          <p className="text-center">Receita Operacional</p>
          <p className="text-center">Margem Contribuição</p>
          <p className="text-center">% MC</p>
        </div>

        {/* Clientes */}
        {clientes.map((cliente) => {
          const percentual =
            cliente.receitaBase > 0
              ? (cliente.margemContribuicao /
                  cliente.receitaBase) * 100
              : 0

          const larguraReceita =
            (cliente.receitaBase / maiorReceita) * 100

          const larguraMargem =
            (cliente.margemContribuicao / maiorMargem) * 100

          return (
            <div
              key={cliente.nome}
              className="grid grid-cols-[1.25fr_1fr_1fr_56px] items-stretch border-b border-white/20 text-sm"
            >

              {/* Fornecedor */}
              <div className="flex min-w-0 items-center gap-2 px-2 py-2">
                <span className="text-xs text-cyan-200">⊞</span>
                <span className="truncate">{cliente.nome}</span>
              </div>

              {/* Receita */}
              <div className="relative flex min-w-0 items-center justify-end border-l border-white/30 px-1">
                <div
                  className="absolute left-1 top-[15%] h-[70%] bg-[#0878D1]"
                  style={{ width: `${larguraReceita}%` }}
                />
                <span className="relative z-10 whitespace-nowrap px-1">
                  {moeda(cliente.receitaBase)}
                </span>
              </div>

              {/* Margem de contribuição */}
              <div className="relative flex min-w-0 items-center justify-end px-1">
                <div
                  className="absolute left-1 top-[15%] h-[70%] bg-[#00A780]"
                  style={{ width: `${larguraMargem}%` }}
                />
                <span className="relative z-10 whitespace-nowrap px-1">
                  {moeda(cliente.margemContribuicao)}
                </span>
              </div>

              {/* Percentual */}
              <div className="flex items-center justify-center bg-[#C653B5] px-1 font-medium">
                {percentual.toFixed(0)}%
              </div>

            </div>
          )
        })}

        {/* Total */}
        <div className="grid grid-cols-[1.25fr_1fr_1fr_56px] items-center py-3 text-sm font-bold">
          <p className="px-4">Total</p>
          <p className="text-center">{moeda(totalReceita)}</p>
          <p className="text-center">{moeda(totalMargem)}</p>
          <p className="text-center">
            {percentualTotal.toFixed(0)}%
          </p>
        </div>

      </div>
    </div>
  )
}
