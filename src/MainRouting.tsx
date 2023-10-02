import { BoxProps, Box, Chip } from "@mui/material";
import React, { FC } from "react";
import ListViz from "./ListViz";
import Nav from "./Nav";
import { useSharedState } from "./Store";
import Viz from "./Viz";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import ViewModuleRoundedIcon from "@mui/icons-material/ViewModuleRounded";
// import { Outlet, Route } from "react-router-dom";
import MainApp from "./MainApp";
import SeriesList from "./SeriesList";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  useLocation,
} from "react-router-dom";
import { isNull } from "lodash";
import NavSlides from "./NavSlides";

const MainRouting: FC<BoxProps> = (boxProps) => {
  const [state, setState] = useSharedState();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        loader={() => {
          // console.log(state.user.name, window.location.href );
          return null;
        }}
        element={<MainApp />}
      >
        <Route
          index
          loader={() => {
            if (state.user.name) return redirect(`${state.user.name}`);
            return null;
          }}
        />
        <Route
          path=":userId"
          loader={({ params }) => {
            if (state.user.name != params.userId) return redirect("/");
            return null;
          }}
          // element={<SeriesList />}
          element={<NavSlides />}
        >
          <Route
            path=":serieID"
            // loader={({ params }) => {
            //   //If the url comes from outside check if it is valid,
            //   // triggers also if there is no selected series before
            //   console.log(state.seriesSelected?.seriesPrime.id, params.serieID)
            //   if (!state.seriesSelected && params.serieID){
            //     if (Object.keys(state.seriesDict).includes(params.serieID!)) {
            //       // console.log("setting ", state.seriesDict[params.serieID!]);
            //       setState((state) => {
            //         return {
            //           ...state,
            //           seriesSelected: state.seriesDict[params.serieID!],
            //         };
            //       });
            //       return null;
            //     } else return redirect("/aniCheck");
            //   }
            //   return null
            // }}
          >
            {" "}
          </Route>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default MainRouting;
