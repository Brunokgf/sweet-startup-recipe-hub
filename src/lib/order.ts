export type OrderItem = { title: string; cents: number; charge: "principal" | "upsell" };
export type Order = {
  customer: { name: string; email: string; phone: string; document: string };
  items: OrderItem[];
  hasBumps: boolean;
  downsell: boolean;
  upsellDecided?: boolean;
};

const KEY = "bg-order";

export function saveOrder(o: Order) {
  try { sessionStorage.setItem(KEY, JSON.stringify(o)); } catch {}
}
export function loadOrder(): Order | null {
  try { const r = sessionStorage.getItem(KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}
export function nextPathAfterPrincipal(o: Order) {
  return o.hasBumps ? "/pagamento-concluido" : "/oferta-especial";
}
export function brl(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
