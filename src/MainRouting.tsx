import {BoxProps} from '@mui/material';
import React, {FC} from 'react';
import {useSharedState} from './Store';
// import { Outlet, Route } from "react-router-dom";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from 'react-router-dom';
import MainApp from './MainApp';
import NavSlides from './NavSlides';

const MainRouting: FC<BoxProps> = boxProps => {
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
          loader={({params}) => {
            if (state.user.name !== params.userId) return redirect('/');
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
            {' '}
          </Route>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default MainRouting;
