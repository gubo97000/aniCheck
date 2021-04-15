
import cytoscape from "cytoscape";
import React, { createContext, useReducer, useState } from "react";
import { globalStateType } from "./Types";
// import Reducer from './Reducer'


const initialState:globalStateType = {
    cy: cytoscape({ headless: true }),
    // seriesSelected: ,
    // seriesList: { seriesPrime: cytoscape({ headless: true }).elements(), series: cytoscape({ headless: true }).elements() },

}


const Store = ({ children }: { children: JSX.Element }) => {
    // const [state, dispatch] = useReducer(Reducer, initialState);
    const [state, setState] = useState(initialState);
    return (
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;