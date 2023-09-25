import React, { FC } from "react";
import { createRoot } from "react-dom/client";
// import "overlayscrollbars/css/OverlayScrollbars.css";
import ReactDOM from "react-dom";
import "./index.css";
import Viz from "./Viz";
import Grid from "@mui/material/Grid";
import Nav from "./Nav";
import { SharedStateProvider, useSharedState } from "./Store";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { css, jsx } from "@emotion/react";
import { createTheme } from "@mui/material";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
// import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material/styles";
import Theme from "./Theme";
import Box from "@mui/material/Box";
import { BoxProps } from "@mui/material";
import ListViz from "./ListViz";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import { registerSW } from "virtual:pwa-register";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainApp from "./MainApp";
import SeriesList from "./SeriesList";
import MainRouting from "./MainRouting";
import { WebWorkerContext } from "./ProviderWebWorker";

// import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/aniCheck" element={<MainApp />}>
      <Route path=":userId" element={<SeriesList />}>
        <Route path=":serieID"> </Route>
      </Route>
    </Route>
  )
);

const updateSW = registerSW({
  onNeedRefresh() {
    // show a prompt to user
  },
  onOfflineReady() {
    // show a ready to work offline to user
  },
});
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <SharedStateProvider>
      <ApolloProvider client={client}>
        <Theme>
          <MainRouting />
          {/* <RouterProvider router={router} /> */}
        </Theme>
      </ApolloProvider>
    </SharedStateProvider>
  </React.StrictMode>
);

// serviceWorkerRegistration.register();
