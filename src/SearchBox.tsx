import { Avatar, Box, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, RadioGroup, TextField, useAutocomplete } from '@material-ui/core'
import React, { useState, useRef, useLayoutEffect, useContext, useEffect, useMemo, FC, Children, isValidElement } from 'react'
// import useAutocomplete from '@material-ui/core/useAutocomplete';
import { render } from 'react-dom'
import * as vis from "vis-network"
import cytoscape from 'cytoscape';

import { useQuery, gql } from '@apollo/client';
import { Context } from './Store';
import Loader from './Loader';
import { keycharm } from 'vis-network';
import SeriesListItem from './SeriesListItem';
import { checkBoxStateType, globalStateType, seriesListElementType } from './Types';
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import { matchSorter } from 'match-sorter'




const SearchBox: FC = ({ children }) => {
  // console.log(props.children.props.children.props)
  const [state, setState] = useContext(Context);
  let [query, setQuery] = useState("")
  let [res, setRes] = useState<seriesListElementType[]>([])
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    // console.log(state.seriesList.map(({ series }) => series)[0])
    setRes(matchSorter(
      state.seriesList ?? [],
      event.target.value,
      { keys: [item => item.series.map(serie => serie.data("title"))] })
    )
  }
  useEffect(()=>{setRes(matchSorter(
    state.seriesList??[],
    "",
    { keys: [item => item.series.map(serie => serie.data("title"))] })
  )},[state])
  return (
    <Box>
      <TextField value={query} onChange={handleChange}/>
      {
        isValidElement(children) ? React.cloneElement(children, { seriesToRender:res }):<p>Shouldn't display</p>
      }
    </Box>
  )
}
export default SearchBox
