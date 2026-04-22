import { useEffect } from "react";
import { INITIAL_USERS } from "../data/initialData";

export const useCollaborators = (dispatch) => {
  useEffect(() => {
    dispatch({ type: "SET_ACTIVE_USERS", payload: INITIAL_USERS.slice(1, 3) });

    const join = setInterval(() => {
      const online = INITIAL_USERS.slice(1).filter(() => Math.random() > 0.3);
      dispatch({ type: "SET_ACTIVE_USERS", payload: online });
    }, 5000);

    return () => clearInterval(join);
  }, []);
};