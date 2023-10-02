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
import { FORMATS_IDS, sortAlphabetical } from "./Utils";
// import Reducer from './Reducer'

export const initialState: globalStateType = {
  // cy: cytoscape({ headless: true }),
  userOptions: {
    themeMode: "auto",
    vizMode: "list",
    sort: {
      type: "alphabetical",
      inverted: false,
    },
    smartCompletion: true,
    listLayout: "g.4",
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
    statusFilter: ["COMPLETE", "PLAN_TO_COMPLETE", "ERR"], //To Be Phased out
    statusSelect: "NOT_COMPLETE",
    cyShowHidden: false,
    cyShowNav: true,
    cyFormatFilter: [],
    cyLayout: "klay",
    cyFilter: [],
  },
  seriesDict: {},
  user: {},
  usersHist: [],
  globalStats: { tot: 0, miss: 0, got: 0, plan: 0 },
  status: ["ok", " "],
  tempInfo: {
    usingCache: false,
  },
  // seriesSelected: ,
  // seriesList: { seriesPrime: cytoscape({ headless: true }).elements(), series: cytoscape({ headless: true }).elements() },
};

const cacheAvailable = "caches" in self;
let cachedState: Partial<globalStateType>;
if (cacheAvailable) {
  //Retrieve from cache older state
  const cache = await caches.open(
    `${(localStorage.getItem("usr") ?? "").slice(1, -1).toLowerCase().trim()}`
  );

  cachedState = await (await cache.match((await cache.keys())[0]))?.json();

  if (cachedState) {
    // history.pushState({}, "", `/aniCheck/${cachedState.user?.name}`);
    console.log(`📝 Found cache for user ${cachedState.user?.name}`);
    cachedState.tempInfo = { usingCache: true };
  }
}

console.log("✨ Creating initial State");
const useGlobalState = () => useState({ ...initialState, ...cachedState });

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
