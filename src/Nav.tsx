import { Avatar, Box, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, RadioGroup } from '@material-ui/core'
import React, { useState, useRef, useLayoutEffect, useContext, useEffect, useMemo } from 'react'
import { render } from 'react-dom'
import * as vis from "vis-network"
import cytoscape from 'cytoscape';

import { useQuery, gql } from '@apollo/client';
import { useSharedState } from './Store';
import Loader from './Loader';
import { keycharm } from 'vis-network';
import SeriesListItem from './SeriesListItem';
import { checkBoxStateType, globalStateType } from './Types';
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import SearchBox from './SearchBox';
import SeriesList from './SeriesList';
import OptionsModal from './OptionsModal';
import StatusFilter from './StatusFilter';




export default function Nav() {
  
  return (
    <Grid sx={{ height: "100vh" }} item xs={12} sm={3}>
      <OptionsModal />
      <Loader></Loader>
      <StatusFilter></StatusFilter>

      <SearchBox>
        <SeriesList></SeriesList>
      </SearchBox>
    </Grid>
  )
}