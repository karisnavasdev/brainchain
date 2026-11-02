import { createContext, useContext, useEffect, useMemo, useState } from "react";

const KEY = "brainchain-fork-tasks";
const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [posted, setPosted] = useState([]);
  const [wallet, setWallet] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setPosted(parsed.posted ?? []);
        setWallet(parsed.wallet ?? "");
      }
    } catch {
      /* ignore broken local storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify({ posted, wallet }));
  }, [posted, wallet, ready]);

  const api = useMemo(
    () => ({
      posted,
      wallet,
      connect() {
        const bytes = crypto.getRandomValues(new Uint8Array(4));
        const hex = Array.from(bytes, (n) => n.toString(16).padStart(2, "0")).join("");
        setWallet(`0x${hex.slice(0, 4)}…${hex.slice(4)}`);
      },
      disconnect() {
        setWallet("");
      },
      postTask(brief, deadline) {
        const task = {
          id: `local-${Date.now()}`,
          num: 1000 + posted.length + 1,
          title: brief.trim(),
          brief: brief.trim(),
          deadline,
          status: "open",
          model: null,
          hire: null,
          grade: null,
          bounty: 1,
          paid: null,
          age: "just now",
          order: 1000 + posted.length,
          local: true,
          poster: wallet,
        };
        setPosted((list) => [task, ...list]);
        return task;
      },
    }),
    [posted, wallet],
  );

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}
