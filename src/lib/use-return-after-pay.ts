import { useEffect, useRef } from "react";

/** Calls `onReturn` when the user leaves the tab (e.g. to open the bank app) and comes back. */
export function useReturnAfterPay(active: boolean, onReturn: () => void) {
  const cb = useRef(onReturn);
  cb.current = onReturn;
  useEffect(() => {
    if (!active) return;
    let left = false;
    const away = () => { left = true; };
    const back = () => {
      if (left && document.visibilityState === "visible") { left = false; cb.current(); }
    };
    const onVis = () => (document.visibilityState === "hidden" ? away() : back());
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("blur", away);
    window.addEventListener("focus", back);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("blur", away);
      window.removeEventListener("focus", back);
    };
  }, [active]);
}
