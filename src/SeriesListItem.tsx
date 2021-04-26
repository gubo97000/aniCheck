import { Avatar, Box, Checkbox, FormControlLabel, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper, Radio } from '@material-ui/core'
import React, { useState, useRef, useLayoutEffect, useContext, useEffect, useMemo } from 'react'
import { render } from 'react-dom'
import * as vis from "vis-network"
import cytoscape from 'cytoscape';

import { useQuery, gql } from '@apollo/client';
import { Context } from './Store';
import Loader from './Loader';
import { keycharm } from 'vis-network';
import { checkBoxStateType } from './Types';


export default function SeriesListItem({
  index, style, data }: {
    index: number,
    style: any,
    data: any,
  }) {
  const [checked, setChecked] = useState(false)
  // console.log(data)

  let { addState, remState, handleToggle, seriesList, test } = data
  let series: any = seriesList[index]?.series
  let seriesPrime: any = seriesList[index]?.seriesPrime
  let key = seriesList[index]?.seriesPrime.data("id")
  // useMemo(() => {  }, [])
  useLayoutEffect(() => {
    addState({ id: key, state: [checked, setChecked], series: series })
    return () => { remState(key) }
  }, [])
  return (
    <Box
      style={{ ...style }}
      sx={{
        // marginTop:"10px",
        // marginRight:"10px",
        // color: "red",
      }}
      key={key}
    >
      <ListItem sx={{
        // marginTop:"10px",
        marginBottom: "10px",
        border: "1px solid",
        borderColor: "grey.500",
        // bgcolor: 'background.paper',
        backgroundImage: `url(${seriesPrime.data("bannerImage")})`,
        backgroundSize: "cover",
        color: 'white',
        // boxShadow: 3,
        height: "calc(100% - 10px)",
        width: "calc(100% - 10px)",
        borderRadius: "5px",
        boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)",
      }}
        selected={checked}
        key={key}
        // role={undefined}
        button onClick={() => {
          addState({ id: key, state: [checked, setChecked], series: series });
          handleToggle(key)
        }}
      >

        <ListItemText sx={{
          fontSize: "10px"
        }}
          id={key} primary={seriesPrime.data("title")} />
        {/* <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                    <CommentIcon />
                </IconButton>
            </ListItemSecondaryAction> */}
      </ListItem>
    </Box>
  )
}
