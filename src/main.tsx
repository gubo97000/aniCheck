import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Vis from './Viz'
import Grid from '@material-ui/core/Grid';
import Nav from './Nav'
import { SharedStateProvider } from './Store'
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { css, jsx } from '@emotion/react'
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

const client = new ApolloClient({ uri: 'https://graphql.anilist.co', cache: new InMemoryCache() });

const theme = createMuiTheme({
  palette: {
    mode: 'light',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <SharedStateProvider>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Grid container>
            <Vis />
            <Nav />
          </Grid>
        </ThemeProvider>
      </ApolloProvider>
    </SharedStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
