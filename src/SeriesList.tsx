import { Avatar, Box, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, RadioGroup } from '@material-ui/core'
import React, { useState, useRef, useLayoutEffect, useContext, useEffect, useMemo, FC } from 'react'
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
import SearchBox from './SearchBox';

interface props {
  seriesToRender?: seriesListElementType[]
}


const SeriesList: FC<props> = ({ seriesToRender }) => {
  // console.log(seriesToRender)
  
  const [state, setState] = useSharedState();
  let [seriesList, setSeriesList] = useState<seriesListElementType[]>([])

  useEffect(() => {
    setSeriesList(seriesToRender ?? state.seriesList ?? [])
  }, [seriesToRender, state.seriesList])
  // seriesToRender = seriesToRender ? seriesToRender : state.seriesList
  // console.log(seriesList)
  // let [checked, setChecked]= useState("")
  let [stupidFix, setStupidFix] = useState("Very Stupid Fix")
  let checked: string = useMemo(() => { return "" }, [stupidFix])
  var checkBoxes: { [key: string]: checkBoxStateType } = useMemo(() => { return {} }, [stupidFix])
  const addState = (chkState: checkBoxStateType) => {
    // console.log("addState " + chkState.id)
    checkBoxes[chkState.id] = {
      id: chkState.id,
      state: chkState.state,
      series: chkState.series
    }
    if (checked == chkState.id) {
      chkState.state[1](true)
    }
  }
  const remState = (id: string) => {
    // console.log("remState " + id)
    delete checkBoxes[id]
  }
  const handleToggle = (key: string) => {
    // console.log("called",key, checked)
    if (checked) {
      // console.log("Hello")
      checkBoxes?.[checked]?.state?.[1](false)
    }
    checked = key
    checkBoxes[key].state[1](true)
    // console.log(checked)
    // if (checked) {
    //   console.log("Hello")
    //   checkBoxes[checked].state[1](false)
    // }
    // setChecked(key)
    // checkBoxes[key].state[1](true)


    // setState({ ...state, seriesSelected:checkBoxes[key].series })
    // state.cyViz?.layout.stop(); 
    console.log(state.cyViz)
    console.log(state.seriesDict?.[key] ?? 0)
    state.cyViz?.elements().remove()
    state.cyViz?.add(checkBoxes[key].series)
    state.cyViz?.elements().makeLayout({
      name: "breadthfirst",
      // name: "cose",
      roots: [checked],
      // directed: true,
      // padding: 10
    }).run();
    state.cyViz?.center();

  };

  function itemKey(index: number) {
    // Find the item at the specified index.
    // In this case "data" is an Array that was passed to List as "itemData".
    const key = state.seriesList?.[index].seriesPrime.data("id") ?? "1";

    // Return a value that uniquely identifies this item.
    return key;
  }
  return (
    <Box sx={{ height: "80vh" }}>
      {state.seriesList ? (
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              height={height}
              itemSize={140}
              width={width}
              itemCount={seriesList?.length ?? 0}
              itemData={{
                addState: addState,
                remState: remState,
                handleToggle: handleToggle,
                seriesList: seriesList,
              }}
              itemKey={itemKey}
            >
              {SeriesListItem}
            </FixedSizeList>
          )
          }
        </AutoSizer>
      ) : <p>None</p>}
    </Box>
  )
}
export default SeriesList