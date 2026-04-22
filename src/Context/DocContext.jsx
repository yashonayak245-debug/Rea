import { createContext, useContext, useReducer } from "react";
import { docReducer, initialState } from "../reducer/docReducer";

const DocContext = createContext(null);

export function DocProvider({ children }) {
  const [state, dispatch] = useReducer(docReducer, initialState);
  return (
    <DocContext.Provider value={{ state, dispatch }}>
      {children}
    </DocContext.Provider>
  );
}

export function useDoc() {
  return useContext(DocContext);
}