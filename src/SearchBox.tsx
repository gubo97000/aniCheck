import { Avatar, Box, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, RadioGroup, TextField, useAutocomplete } from '@material-ui/core'
import React, { useState, useRef, useLayoutEffect, useContext, useEffect, useMemo, FC, Children, isValidElement } from 'react'
// import useAutocomplete from '@material-ui/core/useAutocomplete';
import { render } from 'react-dom'
import * as vis from "vis-network"
import cytoscape from 'cytoscape';

import { useQuery, gql } from '@apollo/client';
import { useSharedState } from './Store';
import Loader from './Loader';
import { keycharm } from 'vis-network';
import SeriesListItem from './SeriesListItem';
import { checkBoxStateType, globalStateType, seriesListElementType } from './Types';
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import { matchSorter } from 'match-sorter'
import SortMenu from './SortMenu';
import { getSortFc } from './Utils';


const SearchBox: FC = ({ children }) => {
  // console.log(props.children.props.children.props)
  const [state, setState] = useSharedState();
  let [query, setQuery] = useState("")
  let [res, setRes] = useState<seriesListElementType[]>([])
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    // console.log(state.seriesList.map(({ series }) => series)[0])
    setRes(matchSorter(
      Object.values(state.seriesDict ?? []),
      event.target.value,
      {
        keys: [item => item.series.map(serie => serie.data("title"))]
      })
    )
  }
  useEffect(() => {
    console.log(state.userOptions)
    setRes(matchSorter(
      Object.values(state.seriesDict ?? []),
      "",
      {
        keys: [item => item.series.map(serie => serie.data("title"))],
        sorter: (rankedItems) => { console.log(rankedItems); return getSortFc(state.userOptions.sort.type)(rankedItems, state.userOptions.sort.inverted) }

      })
    )
  }, [state.seriesList, state.userOptions.sort])
  return (
    <Box>
      <CompletitionMenu/>
      <TextField value={query} onChange={handleChange} />
      <SortMenu />
      {
        isValidElement(children) ? React.cloneElement(children, { seriesToRender: res }) : <p>Shouldn't display</p>
      }
    </Box>
  )
}
export default SearchBox
