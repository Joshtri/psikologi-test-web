// hooks/usePrompt.js
import { useContext, useEffect } from "react";
import {
  UNSAFE_NavigationContext as NavigationContext,
  useLocation,
} from "react-router-dom";

export function usePrompt(message, when) {
  const navigator = useContext(NavigationContext).navigator;
  const location = useLocation();

  useEffect(() => {
    if (!when) return;

    const push = navigator.push;

    const blocker = (tx) => {
      const allow = window.confirm(message);
      if (allow) {
        unblock();
        tx.retry(); // lanjutkan navigasi
      }
    };

    const unblock = navigator.block((tx) => {
      if (tx.location.pathname !== location.pathname) {
        blocker(tx);
      }
    });

    return unblock;
  }, [navigator, when, message, location.pathname]);
}
