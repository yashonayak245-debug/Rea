import { useEffect } from "react";
import { useDebounce } from "./useDebounce";

export function useAutoSave(dispatch, activeDocId, docs, delay = 1500) {
  const save = useDebounce(() => {
    if (!activeDocId) return;
    dispatch({ type: "SET_SAVE_STATUS", payload: "saving" });
    setTimeout(() => {
      dispatch({ type: "SAVE_DOC", payload: activeDocId });
      dispatch({ type: "SHOW_TOAST", payload: { message: "✓ Document saved", type: "success" } });
      setTimeout(() => dispatch({ type: "HIDE_TOAST" }), 2500);
    }, 400);
  }, delay);

  useEffect(() => {
    const doc = docs.find((d) => d.id === activeDocId);
    if (doc) save();
  }, [docs.find((d) => d.id === activeDocId)?.content,
      docs.find((d) => d.id === activeDocId)?.title]);
}
