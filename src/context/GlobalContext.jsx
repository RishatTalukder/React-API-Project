import React, { createContext, useContext } from "react";
import { useReducer } from "react";
import { reducer } from "./reducer";

const appContext = createContext();

export const useAppContext = () => {
  return useContext(appContext);
};

const initialState = {
  cocktails: [],
  loading: true,
  error: null,
  details: {},
  singleLoading: true,
  singleError: null,
};

const GlobalContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <appContext.Provider value={{ ...state, dispatch }}>
      {children}
    </appContext.Provider>
  );
};

export default GlobalContext;
