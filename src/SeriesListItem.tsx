import { Avatar, Box, Checkbox, CircularProgress, FormControlLabel, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper, Radio, Typography } from '@material-ui/core'
import React, { useState, useRef, useLayoutEffect, useContext, useEffect, useMemo, FC } from 'react'
import { render } from 'react-dom'
import * as vis from "vis-network"
import cytoscape from 'cytoscape';

import { useQuery, gql } from '@apollo/client';
import Loader from './Loader';
import { keycharm } from 'vis-network';
import { seriesListElementType } from './Types';
import { useSharedState } from './Store';

interface props {
  index: number,
  style: any,
  data: { seriesList: seriesListElementType[] },
}

const SeriesListItem: FC<props> = ({ index, style, data }) => {
  const [state, setState] = useSharedState();
  const [checked, setChecked] = useState(false)
  // console.log(data)
  let serieEl = data.seriesList[index]
  let { series, seriesPrime } = serieEl
  let key = seriesPrime.id

  useLayoutEffect(() => {
    setChecked(state.seriesSelected?.seriesPrime.id == key)
  }, [state.seriesSelected])
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
        background: `url(${seriesPrime.bannerImage}) no-repeat center center`,
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
          // addState({ id: key, state: [checked, setChecked], series: series });
          // handleToggle(key)
          setState(state => { return { ...state, seriesSelected: serieEl } })
        }}
      >

        <ListItemText sx={{
          fontSize: "19px"
        }}
          id={key} primary={seriesPrime.title + " " + serieEl.stats["selected"].missWeight + " " + checked} />

        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress size={80} variant="determinate" color="primary" value={serieEl.stats["selected"].per} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography>{serieEl.stats["selected"].per}</Typography>
            {/* <CircularProgress variant="determinate" color="primary" value={serieEl.stats.mangaPer} /> */}
          </Box>
        </Box>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant="determinate" color="secondary" value={serieEl.stats["selected"].perWeight} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography>{serieEl.stats["selected"].perWeight}</Typography>
            {/* <CircularProgress variant="determinate" color="primary" value={serieEl.stats.animePer} /> */}
          </Box>
        </Box>

      </ListItem>
    </Box>
  )
}
export default SeriesListItem
