import { useCallback } from "react";

export const useVersionHistory = (dispatch) => {
  const restoreVersion = useCallback((docId, version) => {
    dispatch({
      type: "RESTORE_VERSION",
      payload: { docId, content: version.content, title: version.title },
    });
    dispatch({ type: "SHOW_TOAST", payload: { message: "Version restored", type: "info" } });
    setTimeout(() => dispatch({ type: "HIDE_TOAST" }), 2500);
  }, [dispatch]);

  return { restoreVersion };
};