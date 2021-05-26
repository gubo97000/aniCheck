import React from "react";
import "overlayscrollbars/css/OverlayScrollbars.css";
import ReactDOM from "react-dom";
import "./index.css";
import Viz from "./Viz";
import Grid from "@material-ui/core/Grid";
import Nav from "./Nav";
import { SharedStateProvider } from "./Store";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { css, jsx } from "@emotion/react";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "./Theme";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import Box from "@material-ui/core/Box";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <SharedStateProvider>
      <ApolloProvider client={client}>
        <Theme>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: " calc(100% - 500px) 500px",
              gridTemplateAreas: " 'viz nav'",
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
        </Theme>
      </ApolloProvider>
    </SharedStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
