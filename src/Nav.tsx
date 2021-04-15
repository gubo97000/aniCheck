import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, RadioGroup } from '@material-ui/core'
import React, { useState, useRef, useLayoutEffect, useContext, useEffect } from 'react'
import { render } from 'react-dom'
import * as vis from "vis-network"
import cytoscape from 'cytoscape';

import { useQuery, gql } from '@apollo/client';
import { Context } from './Store';
import Loader from './Loader';
import { keycharm } from 'vis-network';
import SeriesListItem from './SeriesListItem';
import { checkBoxStateType, globalStateType } from './Types';



export default function Nav() {
  const [state, setState]: [globalStateType, React.Dispatch<React.SetStateAction<globalStateType>>] = useContext(Context);
  // let checked: string="";
  let [checked, setChecked]= useState("")
  let checkBoxes: { [key: string]: checkBoxStateType } = {};

  const addState = (chkState: checkBoxStateType) => {
    checkBoxes[chkState.id] = {
      id: chkState.id,
      state: chkState.state,
      series: chkState.series
    }
  }
  const handleToggle = (key: string) => {
    // console.log("called",key, checked)
    if (checked) {
      console.log("Hello")
      checkBoxes[checked].state[1](false)
    }
    setChecked(key)
    checkBoxes[key].state[1](true)
    setState({ ...state, seriesSelected:checkBoxes[key].series })
    // state.cyViz?.layout.stop(); 
    state.cyViz?.elements().remove()
    state.cyViz?.add(checkBoxes[key].series)
    state.cyViz?.elements().makeLayout({name:"cose"}).run(); 
    state.cyViz?.center(); 

  };

  return (
    <div>
      <Loader></Loader>
      <p>{checked}</p>
      <List>
        {state.seriesList ? state.seriesList.map((seriesItem) => {
          return <SeriesListItem {...{
            // key: 1, 
            key: seriesItem.seriesPrime.data("id"),
            addState: addState,
            handleToggle: handleToggle,
            seriesPrime: seriesItem.seriesPrime,
            series: seriesItem.series
          }} >
          </SeriesListItem>
        }) : <p>None</p>}
      </List>
    </div>
  );
}