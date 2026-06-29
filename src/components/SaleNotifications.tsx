import { useEffect, useState } from "react";
import { ShoppingBag, X } from "lucide-react";

const NAMES = [
  { name: "Mariana", city: "Porto Alegre - RS" },
  { name: "Juliana", city: "Belo Horizonte - MG" },
  { name: "Patrícia", city: "Curitiba - PR" },
  { name: "Thaís", city: "São Paulo - SP" },
  { name: "Camila", city: "Recife - PE" },
  { name: "Ana", city: "Salvador - BA" },
  { name: "Beatriz", city: "Fortaleza - CE" },
  { name: "Larissa", city: "Goiânia - GO" },
  { name: "Renata", city: "Manaus - AM" },
  { name: "Fernanda", city: "Rio de Janeiro - RJ" },
  { name: "Aline", city: "Florianópolis - SC" },
  { name: "Vanessa", city: "Brasília - DF" },
];

const MINUTES = ["2", "4", "7", "11", "14", "18", "23"];

export function SaleNotifications() {
  const [current, setCurrent] = useState<{ name: string; city: string; mins: string } | null>(null);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed) return;
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const show = () => {
      const person = NAMES[Math.floor(Math.random() * NAMES.length)];
      const mins = MINUTES[Math.floor(Math.random() * MINUTES.length)];
      setCurrent({ ...person, mins });
      timeout = setTimeout(() => {
        setCurrent(null);
        timeout = setTimeout(show, 8000 + Math.random() * 5000);
      }, 5500);
      i++;
    };

    timeout = setTimeout(show, 6000);
    return () => clearTimeout(timeout);
  }, [closed]);

  if (closed || !current) return null;

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-[300px] animate-slide-up-fade">
      <div className="flex items-start gap-3 rounded-xl bg-white px-3 py-3 pr-8 shadow-2xl ring-1 ring-black/10">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[#8b5e3c] to-[#5d3a1a] text-white">
          <ShoppingBag className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-bold leading-tight text-zinc-900">
            {current.name} de {current.city}
          </p>
          <p className="mt-0.5 text-[12px] leading-tight text-zinc-600">
            acabou de comprar o curso 🎉
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-wide text-zinc-400">
            há {current.mins} minutos · compra verificada
          </p>
        </div>
        <button
          type="button"
          onClick={() => setClosed(true)}
          aria-label="Fechar"
          className="absolute right-1.5 top-1.5 rounded-full p-1 text-zinc-400 hover:text-zinc-700"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
