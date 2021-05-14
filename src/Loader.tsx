import { Avatar, Button, CircularProgress, FormControl, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField } from '@material-ui/core'
import React, { useState, useRef, useLayoutEffect, useContext, useEffect, FC } from 'react'
import { render } from 'react-dom'
import * as vis from "vis-network"
import cytoscape, { EdgeCollection } from 'cytoscape';

import { parseAndCheckHttpResponse, useLazyQuery } from '@apollo/client';
import { useSharedState } from './Store';
import * as Queries from "./Queries"
import { computeData, relationPriority, updateCompletition, useStateWithLocalStorage } from './Utils';
import { globalStateType, seriesListElementType, statsType } from './Types';
import EastRounded from '@material-ui/icons/EastRounded';
import { round } from 'lodash';
import { avoidNodes, problematicNodes } from './ProblematicNodes';
import { useWorker } from '@koale/useworker';
import { getUntrackedObject } from 'react-tracked';



const Loader: FC = () => {
  const [state, setState] = useSharedState();
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");
  let [usr, setUsr] = useStateWithLocalStorage<string>("usr", "")
  const [workerFn, { status: statusWorker, kill: killWorker }] = useWorker(computeData, {
    remoteDependencies: ["https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.18.2/cytoscape.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/tslib/2.2.0/tslib.min.js"],
  })
  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsr(event.target.value)
  }

  const startQuery = () => {
    // console.log(variables)
    getAnimeLists({
      variables: { user: usr, type: "ANIME" },
    })

  };

  const asyncCompute = async () => {
    let seriesDict = await workerFn([...statusAnime.data.MediaListCollection.lists, ...statusManga.data.MediaListCollection.lists],
      relationPriority,
      problematicNodes
    )
    // setState(state => { return { ...state, seriesDict: seriesDict, } })
    setState(state => updateCompletition({ ...state, seriesDict: seriesDict, }))
  }

  const syncCompute = () => {
    let seriesDict = computeData([...statusAnime.data.MediaListCollection.lists, ...statusManga.data.MediaListCollection.lists],
      relationPriority,
      problematicNodes)
    // setState(state => { return updateCompletition({ ...state, seriesDict: seriesDict, }) })
    setState(state => { return { ...updateCompletition({ ...state, seriesDict: seriesDict, }) } })
    // setState(state => { return { ...state, seriesDict: seriesDict, } })
  }

  const [getAnimeLists, statusAnime] = useLazyQuery(Queries.GET_LISTS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      getMangaLists({
        variables: { user: usr, type: "MANGA" },
      })
    },

  });
  const [getMangaLists, statusManga] = useLazyQuery(Queries.GET_LISTS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: asyncCompute,
    // onCompleted: syncCompute,

  });

  useEffect(() => {
    if (statusAnime.loading || statusManga.loading || statusWorker == "RUNNING") {
      setLoading(true)
    } else {
      setLoading(false)
    }
    if (statusAnime.error) {
      setError(statusAnime.error.message)
    }
    else if (statusManga.error) {
      setError(statusManga.error.message)
    } else {
      setError(" ")
    }
  }, [statusAnime, statusManga, statusWorker])

  return (<div>
    {/* <TextField id="username" value={usr} onChange={handleTextInput} label="Your AniList nick" /> */}
    {/* <Button variant="contained" onClick={startQuery} >Load</Button> */}
    <Grid container
      direction="row"
      justifyContent="flex-start"
      alignItems="center" >
      <Grid item>
        <Avatar
          // sx={{ bgcolor: green[500] }} 
          variant='rounded'>
          {/* <AssignmentIcon /> */}
        </Avatar>
      </Grid>
      <Grid item>
        <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
          <Input
            id="standard-adornment-password"
            placeholder="AniList Nick"
            // type={values.showPassword ? 'text' : 'password'}
            value={usr}
            onChange={handleTextInput}
            onKeyPress={(ev) => { if (ev.key == "Enter") { startQuery() } }}
            endAdornment={
              <InputAdornment position="end">
                {loading ?
                  (<CircularProgress />)
                  : (<IconButton
                    aria-label="get user anime"
                    onClick={startQuery}
                  >
                    <EastRounded />
                  </IconButton>)}
              </InputAdornment>
            }
          />
          <FormHelperText id="standard-weight-helper-text">{error}</FormHelperText>
        </FormControl>
      </Grid>
    </Grid>

    {/* {loading ? (<div>Loading</div>) : (<div>Done</div>)} */}
    {/* {error ? (<p>Error: {error.message}</p>) : (<p>No Error</p>)} */}
    {/* <LoaderRes user={usr}></LoaderRes> */}
  </div>
  )

}
export default Loader