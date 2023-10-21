import React from 'react';
import {createRoot} from 'react-dom/client';
// import "overlayscrollbars/css/OverlayScrollbars.css";
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {ApolloProvider} from '@apollo/client/react';
import './index.css';
import {SharedStateProvider} from './Store';
import {ThemeCss as Theme} from './ThemeCss';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import MainApp from './MainApp';
import MainRouting from './MainRouting';
import SeriesList from './SeriesList';

// import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainApp />}>
      <Route path=":userId" element={<SeriesList />}>
        <Route path=":serieID"> </Route>
      </Route>
    </Route>
  )
);

// const updateSW = registerSW({
//   onNeedRefresh() {
//     // show a prompt to user
//   },
//   onOfflineReady() {
//     // show a ready to work offline to user
//   },
// });
const container = document.getElementById('root');
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
