
import { makeStyles } from "@material-ui/core";
import cytoscape from "cytoscape";
import React, { createContext, useReducer, useState } from "react";
import { globalStateType } from "./Types";
// import Reducer from './Reducer'


const initialState:globalStateType = {
    cy: cytoscape({ headless: true }),
    // seriesSelected: ,
    // seriesList: { seriesPrime: cytoscape({ headless: true }).elements(), series: cytoscape({ headless: true }).elements() },

}

export default function Store({ children }: { children: JSX.Element }){
    // const [state, dispatch] = useReducer(Reducer, initialState);
    const [state, setState] = useState(initialState);
    return (
        <Context.Provider  value={[state, setState]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext<[globalStateType, React.Dispatch<React.SetStateAction<globalStateType>>]>([initialState,()=>{}]);
