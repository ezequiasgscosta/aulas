
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

export default function GraficoMargem({ meses }: Props) {
  const margemTotal = meses.reduce(
    (total, item) => total + item.valor,
    0
  )

  const melhorMes = meses.reduce(
    (melhor, atual) =>
      atual.valor > melhor.valor ? atual : melhor,
    { mes: "-", valor: 0 }
  )

  return (
    <div className=" w-full max-w-md overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 via-teal-700 to-[#17145E] p-4 text-white shadow-xl">

      {/* Ícone de pizza */}
      <div className="absolute right-5 top-5">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="white"
        >
          <path d="M22 3 A21 21 0 0 0 3 26 L22 26 Z" />
          <path d="M26 3 L26 24 L45 24 A21 21 0 0 0 26 3 Z" />
          <path d="M7 31 A21 21 0 0 0 45 29 L26 29 Z" />
        </svg>
      </div>

      {/* Informações */}
      <div className="relative z-10">
        <h2 className="text-sm font-bold">
          Margem de Contribuição
        </h2>

        <p className="mt-2 text-3xl font-extrabold tracking-tight">
          {moeda(margemTotal)}
        </p>

        <p className="mt-3 text-sm text-white/90">
          Melhor mês: {melhorMes.mes}
        </p>

        <p className="mt-1 text-base font-bold">
          {moeda(melhorMes.valor)}
        </p>
      </div>

      {/* Gráfico de área */}
      <div className="relative mt-2 h-28 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={meses}
            margin={{ top: 5, right: 2, left: 2, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="gradienteMargem"
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
              tick={{ fill: "#D1FAE5", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              interval={0}
            />

            <YAxis hide />

            <Tooltip
              formatter={(valor) => moeda(Number(valor))}
              contentStyle={{
                backgroundColor: "#17145E",
                border: "1px solid #6EE7B7",
                borderRadius: "8px",
                color: "#FFFFFF",
              }}
            />

            <Area
              type="linear"
              dataKey="valor"
              stroke="#FFFFFF"
              strokeWidth={2}
              fill="url(#gradienteMargem)"
              dot={false}
              activeDot={{ r: 4, fill: "#FFFFFF" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
