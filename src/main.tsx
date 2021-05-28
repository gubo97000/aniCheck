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

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});

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
      }}
    >
      <Viz
        sx={{
          gridArea: "viz",
        }}
      />
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
