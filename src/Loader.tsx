import { Avatar, Button, CircularProgress, FormControl, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField } from '@material-ui/core'
import React, { useState, useRef, useLayoutEffect, useContext, useEffect, FC } from 'react'
import { render } from 'react-dom'
import * as vis from "vis-network"
import cytoscape, { EdgeCollection } from 'cytoscape';

import { parseAndCheckHttpResponse, useLazyQuery } from '@apollo/client';
import { useSharedState } from './Store';
import * as Queries from "./Queries"
import { COLOR_CODES, computeData, relationPriority, updateCompletition, useStateWithLocalStorage } from './Utils';
import { globalStateType, seriesListElementType, statsType } from './Types';
import EastRounded from '@material-ui/icons/EastRounded';
import { round } from 'lodash';
import { avoidNodes, problematicNodes } from './ProblematicNodes';
import { useWorker } from '@koale/useworker';
import { getUntrackedObject } from 'react-tracked';



const Loader: FC = () => {
  const [state, setState] = useSharedState();
  const [usr, setUsr] = useStateWithLocalStorage<string>("usr", "")
  const [workerFn, { status: statusWorker, kill: killWorker }] = useWorker(computeData, {
    remoteDependencies: ["https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.18.2/cytoscape.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/tslib/2.2.0/tslib.min.js",
    ],
  })

  const startQuery = () => {
    setState(state => { return { ...state, status: ["ok", " "] } })
    getUser({ variables: { user: usr } })
  };

  const asyncCompute = async () => {
    let seriesDict = await workerFn([...statusAnime.data.MediaListCollection.lists, ...statusManga.data.MediaListCollection.lists],
      relationPriority,
      problematicNodes
    )
    // setState(state => { return { ...state, seriesDict: seriesDict, } })
    setState(state => updateCompletition({ ...state, seriesDict: seriesDict, }))
  };

  const syncCompute = () => {
    let seriesDict = computeData([...statusAnime.data.MediaListCollection.lists, ...statusManga.data.MediaListCollection.lists],
      relationPriority,
      problematicNodes)
    // setState(state => { return updateCompletition({ ...state, seriesDict: seriesDict, }) })
    setState(state => { return { ...updateCompletition({ ...state, seriesDict: seriesDict, }) } })
    // setState(state => { return { ...state, seriesDict: seriesDict, } })
  };

  const computeUser = () => {
    setState(state => {
      return {
        ...state, user: {
          color: COLOR_CODES[statusUser.data.User.options.profileColor] ?? statusUser.data.User.options.profileColor,
          avatar: statusUser.data.User.avatar.medium,
        }
      }
    })
  }

  //Apollo queries creation
  const [getUser, statusUser] = useLazyQuery(Queries.GET_USER, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      computeUser()
      getAnimeLists({
        variables: { user: usr, type: "ANIME" },
      })
    },

  });
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
    let status: globalStateType["status"][0] = "ok"
    let log: globalStateType["status"][1] = " "

    if (statusUser.loading) {
      status = "loading"
      log = "Loading User Info"
    } else if (statusAnime.loading) {
      status = "loading"
      log = "Loading your Anime List"
    } else if (statusManga.loading) {
      status = "loading"
      log = "Loading your Manga List"
    } else if (statusWorker == "RUNNING") {
      status = "loading"
      log = "Computing received data"
    } else if (statusUser.error) {
      status = "error"
      log = statusUser.error.message
    } else if (statusAnime.error) {
      status = "error"
      log = statusAnime.error.message
    } else if (statusManga.error) {
      status = "error"
      log = statusManga.error.message
    }
    setState(state => { return { ...state, status: [status, log] } })
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
          src={state.user.avatar}
          variant='rounded'>
          {/* <AssignmentIcon /> */}
        </Avatar>
      </Grid>
      <Grid item>
        <FormControl sx={{ m: 1, width: '100%' }} variant="standard" error={state.status[0] == "error"}>
          <Input
            id="standard-adornment-password"
            placeholder="AniList Nick"
            // type={values.showPassword ? 'text' : 'password'}
            value={usr}
            onChange={(event) => { setUsr(event.target.value) }}
            onKeyPress={(ev) => { if (ev.key == "Enter" && state.status[0] != "loading") { startQuery() } }}
            endAdornment={
              <InputAdornment position="end">
                {state.status[0] == "loading" ?
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
          <FormHelperText error={state.status[0] == "error"} id="standard-weight-helper-text">{state.status[1]}</FormHelperText>
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