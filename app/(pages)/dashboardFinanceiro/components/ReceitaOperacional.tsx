
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

const moeda = (valor: number) =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  })

export default function Graficos({ meses }: Props) {
  const receitaTotal = meses.reduce(
    (total, item) => total + item.valor,
    0
  )

  const melhorMes = meses.reduce(
    (melhor, atual) =>
      atual.valor > melhor.valor ? atual : melhor,
    { mes: "-", valor: 0 }
  )

  return (
    <main className="bg-[#100D3D]">
      <div className="mx-auto overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 via-blue-800 to-[#17145E] p-4 text-white shadow-xl">

        {/* Ícone decorativo */}
        <div className="pointer-events-none absolute right-5 top-4 opacity-15">
          <svg viewBox="0 0 120 120" width="120" height="120" fill="currentColor">
            <rect x="10" y="65" width="14" height="42" rx="3" />
            <rect x="34" y="48" width="14" height="59" rx="3" />
            <rect x="58" y="30" width="14" height="77" rx="3" />
            <rect x="82" y="14" width="14" height="93" rx="3" />
            <path
              d="M10 56 L39 34 L62 42 L94 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="94" cy="10" r="7" />
          </svg>
        </div>

        {/* Informações */}
        <div className="relative z-10">
          <p className="text-base font-bold">
            Receita Operacional
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            {moeda(receitaTotal)}
          </h1>

          <div className="mt-3">
            <p className="text-sm text-blue-100">
              Melhor mês: {melhorMes.mes}
            </p>

            <p className="mt-1 text-xl font-bold">
              {moeda(melhorMes.valor)}
            </p>
          </div>
        </div>

        {/* Gráfico */}
        <div className="relative mt-3 h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={meses}
              margin={{ top: 8, right: 2, left: 2, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="areaReceita"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#FFFFFF"
                    stopOpacity={0.55}
                  />
                  <stop
                    offset="100%"
                    stopColor="#FFFFFF"
                    stopOpacity={0.08}
                  />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="mes"
                tick={{ fill: "#BFDBFE", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />

              <YAxis hide />

              <Tooltip
                formatter={(valor) => moeda(Number(valor))}
                contentStyle={{
                  backgroundColor: "#17145E",
                  border: "1px solid #6475CF",
                  borderRadius: "8px",
                  color: "#FFFFFF",
                }}
              />

              <Area
                type="linear"
                dataKey="valor"
                stroke="#FFFFFF"
                strokeWidth={2.5}
                fill="url(#areaReceita)"
                dot={false}
                activeDot={{ r: 4, fill: "#FFFFFF" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>
    </main>
  )
}
