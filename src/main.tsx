import React, { FC } from "react";
import "overlayscrollbars/css/OverlayScrollbars.css";
import ReactDOM from "react-dom";
import "./index.css";
import Viz from "./Viz";
import Grid from "@material-ui/core/Grid";
import Nav from "./Nav";
import { SharedStateProvider, useSharedState } from "./Store";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { css, jsx } from "@emotion/react";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "./Theme";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import Box from "@material-ui/core/Box";
import { BoxProps } from "@material-ui/core";
import ListViz from "./ListViz";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import AccountTreeRoundedIcon from "@material-ui/icons/AccountTreeRounded";
import ViewModuleRoundedIcon from "@material-ui/icons/ViewModuleRounded";
import { registerSW } from 'virtual:pwa-register'
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});


const updateSW = registerSW({
  onNeedRefresh() {
    // show a prompt to user
  },
  onOfflineReady() {
    // show a ready to work offline to user
  },
})

const MainApp: FC<BoxProps> = (boxProps) => {
  const [state, setState] = useSharedState();
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: state.userOptions.cyShowNav
          ? {
              xs: "0px 100%",
              sm: " calc(100% - 500px) 500px",
            }
          : {
              xs: "0px 100%",
              sm: "100% 0px",
            },
        gridTemplateAreas: "'viz nav'",
        height: "100vh",
        bgcolor: "background.default",
        position: "relative",
      }}
    >
      {state.userOptions.vizMode == "graph" ? (
        <Viz
          sx={{
            gridArea: "viz",
          }}
        />
      ) : (
        <ListViz
          sx={{
            gridArea: "viz",
          }}
        />
      )}
      {state.userOptions.vizMode == "graph" ? (
        <Chip
          sx={{ gridArea: "viz", position: "absolute", top: 10, right: 10}}
          label={"List View"}
          icon={<ViewModuleRoundedIcon />}
          clickable={true}
          onClick={() => {
            setState((state) => {
              return {
                ...state,
                userOptions: { ...state.userOptions, vizMode: "list" },
              };
            });
          }}
        />
      ) : (
        <Chip
          sx={{ gridArea: "viz", position: "absolute", top: 10, right: 10 }}
          label={"Relations Graph"}
          icon={<AccountTreeRoundedIcon />}
          clickable={true}
          onClick={() => {
            setState((state) => {
              return {
                ...state,
                userOptions: { ...state.userOptions, vizMode: "graph" },
              };
            });
          }}
        />
      )}
      <Nav
        sx={{
          gridArea: "nav",
        }}
      />
    </Box>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <SharedStateProvider>
      <ApolloProvider client={client}>
        <Theme>
          <MainApp />
        </Theme>
      </ApolloProvider>
    </SharedStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// serviceWorkerRegistration.register();