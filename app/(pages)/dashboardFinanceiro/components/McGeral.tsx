
"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface Mes {
  mes: string
  valor: number
}

interface Props {
  meses: Mes[]
}

const nomesMeses: Record<string, string> = {
  janeiro: "jan",
  fevereiro: "fev",
  marco: "mar",
  abril: "abr",
  maio: "mai",
  junho: "jun",
  julho: "jul",
  agosto: "ago",
  setembro: "set",
  outubro: "out",
  novembro: "nov",
  dezembro: "dez",
}

export default function GraficoPercentual({ meses }: Props) {
  const mediaGeral =
    meses.length > 0
      ? meses.reduce((total, item) => total + item.valor, 0) /
        meses.length
      : 0

  const melhorMes = meses.reduce(
    (melhor, atual) =>
      atual.valor > melhor.valor ? atual : melhor,
    { mes: "-", valor: 0 }
  )

  return (
    <div className="w-full max-w-md overflow-hidden rounded-lg bg-gradient-to-r from-fuchsia-500 via-purple-700 to-[#17145E] p-3 text-white shadow-xl">

      {/* Símbolo de porcentagem decorativo */}
      <div className="pointer-events-none absolute right-4 top-1 text-[80px] font-bold leading-none text-white/15">
        %
      </div>

      {/* Cabeçalho */}
      <div className="relative z-10">
        <h2 className="text-sm font-bold">
          % MC Geral
        </h2>

        <p className="mt-2 text-3xl font-extrabold">
          {mediaGeral.toFixed(0)}%
        </p>

        <p className="mt-2 text-sm text-white/90">
          Melhor mês: {nomesMeses[melhorMes.mes] 
            ? melhorMes.mes
            : melhorMes.mes}
        </p>

        <p className="mt-1 text-base font-bold">
          {melhorMes.valor.toFixed(0)}%
        </p>
      </div>

      {/* Gráfico */}
      <div className="relative mt-1 h-28 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={meses}
            margin={{ top: 2, right: 2, left: 2, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="gradientePercentual"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#FFFFFF"
                  stopOpacity={0.5}
                />
                <stop
                  offset="100%"
                  stopColor="#FFFFFF"
                  stopOpacity={0.12}
                />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="mes"
              tickFormatter={(mes) =>
                nomesMeses[mes] ?? mes
              }
              tick={{ fill: "#FCE7F3", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              interval={0}
            />

            <YAxis hide />

            <Tooltip
              formatter={(valor) => `${Number(valor).toFixed(1)}%`}
              contentStyle={{
                backgroundColor: "#30105D",
                border: "1px solid #E879F9",
                borderRadius: "8px",
                color: "#FFFFFF",
              }}
            />

            <Area
              type="linear"
              dataKey="valor"
              stroke="#FFFFFF"
              strokeWidth={2}
              fill="url(#gradientePercentual)"
              dot={false}
              activeDot={{ r: 4, fill: "#FFFFFF" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
