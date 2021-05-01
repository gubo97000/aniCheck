
import { makeStyles } from "@material-ui/core";
import cytoscape from "cytoscape";
import React, { createContext, FC, useContext, useReducer, useState } from "react";
import { createContainer } from "react-tracked";
import { globalStateType, userOptionType } from "./Types";
import { sortAlphabetical, useStateWithLocalStorage } from "./Utils";
// import Reducer from './Reducer'


const initialState: globalStateType = {
  cy: cytoscape({ headless: true }),
  userOptions: {
    sort: {
      type: "alphabetical",
      inverted: false,
    }
  },
  // seriesSelected: ,
  // seriesList: { seriesPrime: cytoscape({ headless: true }).elements(), series: cytoscape({ headless: true }).elements() },
}

const useGlobalState = () => useState(initialState);

export const {
  Provider: SharedStateProvider,
  useTracked: useSharedState,
} = createContainer(useGlobalState);

// const Context = createContext<ReturnType<typeof useGlobalState>>([initialState,()=>{}]);


// export const Store: FC= ({ children })=>{
//     // const [state, dispatch] = useReducer(Reducer, initialState);

//     return (
//         <Context.Provider  value={[state, setState]}>
//             {children}
//         </Context.Provider>
//     )
// };

