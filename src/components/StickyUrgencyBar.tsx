import { useState, useEffect } from "react";
import { Timer } from "lucide-react";
import { Link } from "@tanstack/react-router";

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(15 * 60 * 1000);

  useEffect(() => {
    const saved = localStorage.getItem("brigadeiro-timer");
    let end = saved ? parseInt(saved, 10) : Date.now() + 15 * 60 * 1000;
    if (!saved) localStorage.setItem("brigadeiro-timer", String(end));
    setTimeLeft(Math.max(0, end - Date.now()));

    const interval = setInterval(() => {
      const remaining = Math.max(0, end - Date.now());
      if (remaining === 0) {
        end = Date.now() + 15 * 60 * 1000;
        localStorage.setItem("brigadeiro-timer", String(end));
        setTimeLeft(15 * 60 * 1000);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <span className="font-mono text-lg font-black tabular-nums">
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </span>
  );
}

export function StickyUrgencyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // mostra depois de scrollar 300px
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-[#5d3a1a] text-white shadow-lg">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-2 sm:flex-row">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Timer className="h-4 w-4 text-amber-300" />
            <span>Oferta termina em</span>
            <CountdownTimer />
            <span className="hidden sm:inline">— aproveite o valor promocional</span>
          </div>
          <Link
            to="/checkout"
            className="rounded-full bg-amber-500 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-[#3d2314] shadow transition hover:bg-amber-400 hover:scale-105"
          >
            Quero Aproveitar
          </Link>
        </div>
      </div>
    </div>
  );
}
