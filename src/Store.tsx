import cytoscape from "cytoscape";
import React, {
  createContext,
  FC,
  useContext,
  useReducer,
  useState,
} from "react";
import { createContainer } from "react-tracked";
import { globalStateType, userOptionType } from "./Types";
import { FORMATS_IDS, sortAlphabetical, useStateWithLocalStorage } from "./Utils";
// import Reducer from './Reducer'

const initialState: globalStateType = {
  cy: cytoscape({ headless: true }),
  userOptions: {
    themeMode:"auto",
    vizMode:"list",
    sort: {
      type: "alphabetical",
      inverted: false,
    },
    smartCompletion: true,
    completion: FORMATS_IDS,
    animeComposition: [
      "TV",
      "TV_SHORT",
      "MOVIE",
      "SPECIAL",
      "OVA",
      "ONA",
      "MUSIC",
    ],
    mangaComposition: ["MANGA", "ONE_SHOT"],
    novelComposition: ["NOVEL"],
    statusFilter: ["COMPLETE", "PLAN_TO_COMPLETE", "ERR"],
    cyShowHidden: false,
    cyShowNav: true,
    cyFormatFilter: [],
    cyLayout: "klay",
    cyFilter: [],
  },
  seriesDict: {},
  user: {},
  usersHist:[],
  globalStats: { tot: 0, miss: 0, got: 0, plan: 0 },
  status: ["ok", " "],
  // seriesSelected: ,
  // seriesList: { seriesPrime: cytoscape({ headless: true }).elements(), series: cytoscape({ headless: true }).elements() },
};

const useGlobalState = () => useState(initialState);

export const { Provider: SharedStateProvider, useTracked: useSharedState } =
  createContainer(useGlobalState);

// const Context = createContext<ReturnType<typeof useGlobalState>>([initialState,()=>{}]);

// export const Store: FC= ({ children })=>{
//     // const [state, dispatch] = useReducer(Reducer, initialState);

//     return (
//         <Context.Provider  value={[state, setState]}>
//             {children}
//         </Context.Provider>
//     )
// };
