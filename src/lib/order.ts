export type OrderItem = { title: string; cents: number; charge: "principal" | "upsell" };
export type Order = {
  customer: { name: string; email: string; phone: string; document: string };
  items: OrderItem[];
  hasBumps: boolean;
  downsell: boolean;
  method?: "pix" | "card";
  upsellDecided?: boolean;
};

const KEY = "bg-order";

export function saveOrder(o: Order) {
  try { sessionStorage.setItem(KEY, JSON.stringify(o)); } catch {}
}
export function loadOrder(): Order | null {
  try { const r = sessionStorage.getItem(KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}
export function upsellEligible(o: Order | null) {
  return !!o && !o.hasBumps && o.method === "pix" && !o.upsellDecided;
}
export function nextPathAfterPrincipal(_o?: Order) {
  return "/pagamento-concluido" as const;
}
export function brl(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
