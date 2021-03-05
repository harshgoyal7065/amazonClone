import React,{createContext, useContext, useReducer} from "react";

//Prepares the Data Layer
export const StateContext= createContext();

//Wrap our app
export const StateProvider = ({reducer, initialState, children})=>
(
    <StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>
);

//Pull information of data layer
export const useStateValue= () => useContext(StateContext);