import React, { createContext, useContext, useReducer } from "react";
import axios from "axios"
export const StateContext = createContext();



export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
  
  export const useStateValue = () => useContext(StateContext);