/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from "react";
import { UserContext } from "../context/userContext";
import { userReducer } from "../context/reducer";

type ContextProviderType = {
  children: React.ReactNode;
  accessToken: string | null;
};
export const ContextProvider: React.FC<ContextProviderType> = ({
  children,
  accessToken,
}) => {
  const [state, dispatch] = useReducer(userReducer, {
    userData: undefined,
    accessToken: accessToken,
  });

  useEffect(() => {
    dispatch({
      type: "SET_TOKEN_ACTION",
      payload: accessToken,
    });
  }, [accessToken]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
