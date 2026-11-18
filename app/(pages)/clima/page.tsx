"use client";

import { useState, FormEvent } from 'react';

interface Localidade {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface Previsao {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
}

function descricaoClima(codigo: number) {
  if (codigo === 0) return 'Céu limpo';
  if (codigo <= 3) return 'Parcialmente nublado';
  if (codigo === 45 || codigo === 48) return 'Neblina';
  if (codigo >= 51 && codigo <= 57) return 'Garoa';
  if (codigo >= 61 && codigo <= 67) return 'Chuva';
  if (codigo >= 71 && codigo <= 77) return 'Neve';
  if (codigo >= 80 && codigo <= 82) return 'Pancadas de chuva';
  if (codigo >= 85 && codigo <= 86) return 'Pancadas de neve';
  if (codigo >= 95) return 'Trovoadas';
  return 'Condição não disponível';
}

export default function Home() {
  const [cidade, setCidade] = useState<string>('');
  const [localidade, setLocalidade] = useState<Localidade | null>(null);
  const [clima, setClima] = useState<Previsao | null>(null);
  const [erro, setErro] = useState<string>('');
  const [carregando, setCarregando] = useState(false);

  const buscarClima = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nomeCidade = cidade.trim();
    if (!nomeCidade) {
      setErro('Digite o nome de uma cidade.');
      return;
    }

    try {
      setErro('');
      setCarregando(true);
      setClima(null);
      setLocalidade(null);

      const respostaGeocodificacao = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nomeCidade)}&count=1&language=pt&format=json`
      );
      if (!respostaGeocodificacao.ok) {
        throw new Error('Falha ao localizar a cidade.');
      }

      const dadosGeocodificacao: { results?: Localidade[] } =
        await respostaGeocodificacao.json();
      const lugar = dadosGeocodificacao.results?.[0];
      if (!lugar) {
        setErro('Cidade não encontrada.');
        return;
      }

      const parametros = new URLSearchParams({
        latitude: String(lugar.latitude),
        longitude: String(lugar.longitude),
        current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
        hourly: 'temperature_2m',
        timezone: 'auto',
      });
      const respostaClima = await fetch(
        `https://api.open-meteo.com/v1/forecast?${parametros.toString()}`
      );
      if (!respostaClima.ok) {
        throw new Error('Falha ao buscar a previsão.');
      }

      const dadosClima: Previsao = await respostaClima.json();
      setLocalidade(lugar);
      setClima(dadosClima);
    } catch {
      setErro('Não foi possível buscar o clima. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-900 text-white">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Previsão do Tempo 🌤️</h1>
        
        <form onSubmit={buscarClima} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Digite o nome da cidade..."
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={carregando}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition disabled:opacity-60"
          >
            {carregando ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {erro && <p className="text-red-400 text-center mb-4">{erro}</p>}

        {clima && (
          <div className="text-center bg-slate-700/50 p-6 rounded-xl border border-slate-600">
            <h2 className="text-xl font-semibold">{localidade?.name}, {localidade?.country}</h2>
            <p className="text-5xl font-bold my-4">{Math.round(clima.current.temperature_2m)}°C</p>
            <p className="capitalize text-slate-300">{descricaoClima(clima.current.weather_code)}</p>
            
            <div className="flex justify-around mt-6 text-sm text-slate-400">
              <div>
                <p>Umidade</p>
                <p className="font-bold text-white">{clima.current.relative_humidity_2m}%</p>
              </div>
              <div>
                <p>Vento</p>
                <p className="font-bold text-white">{clima.current.wind_speed_10m} km/h</p>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-600 pt-4">
              <h3 className="mb-3 font-semibold">Próximas horas</h3>
              <div className="grid grid-cols-3 gap-3 text-sm text-slate-300">
                {clima.hourly.time
                  .map((hora, indice) => ({ hora, indice }))
                  .filter(({ hora }) => hora >= clima.current.time)
                  .slice(0, 6)
                  .map(({ hora, indice }) => (
                    <div key={hora} className="rounded-lg bg-slate-700 p-2">
                      <p>{hora.slice(11, 16)}</p>
                      <p className="font-bold text-white">
                        {Math.round(clima.hourly.temperature_2m[indice])}°C
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}