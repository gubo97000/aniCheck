import { Avatar, Button, CircularProgress, FormControl, FormHelperText, Grid, IconButton, Input, InputAdornment, InputLabel, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField } from '@material-ui/core'
import React, { useState, useRef, useLayoutEffect, useContext, useEffect } from 'react'
import { render } from 'react-dom'
import * as vis from "vis-network"
import cytoscape from 'cytoscape';

import { parseAndCheckHttpResponse, useLazyQuery } from '@apollo/client';
import { useSharedState } from './Store';
import * as Queries from "./Queries"
import { updateCompletition, useStateWithLocalStorage } from './Utils';
import { seriesListElementType, statsType } from './Types';
import EastRounded from '@material-ui/icons/EastRounded';
import { round } from 'lodash';



function Loader() {
  const [state, setState] = useSharedState();
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");
  let [usr, setUsr] = useStateWithLocalStorage<string>("usr", "")

  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsr(event.target.value)
  }

  const startQuery = () => {
    // console.log(variables)
    getAnimeLists({
      variables: { user: usr, type: "ANIME" },
    })

  };

  const parseNode = (node: any,) => {
    // node.nextAiringEpisode ? console.log(node) : null
    const compWeight = (node: any) => {
      if (node.status == "NOT_YET_RELEASED") return 0
      if (node.chapters) return node.chapters * 5
      if (node.volumes) return node.volumes * 50
      if (node.episodes && node.duration) return node.episodes * node.duration
      //Releasing in List, is a bit useless
      if (node.nextAiringEpisode?.episode && node.duration) return node.nextAiringEpisode?.episode * node.duration

      //THE APPROXIMATION ZONE
      //Releasing not in List, API won't let me get nextAiringEpisode
      let strDate = [
        node.startDate.year,
        node.startDate.month,
        node.startDate.day,
      ].join("-")
      let days = (Date.now() - Date.parse(strDate)) / 8.64e+7
      if (node.format == "MANGA") return round(days / 8.2) * 5
      if (node.format == "TV") return round(days / 8.2) * 20
      return round(days / 8.2) * 20
    }

    return {
      id: node.id,
      status: 'NO',
      airStatus: node.status,
      format: node.format,
      title: node.title.userPreferred,
      titles: [...Object.values(node.title), ...node.synonyms].filter((v) => !["MediaTitle", null].includes(v)),
      siteUrl: node.siteUrl,
      bannerImage: node.bannerImage,
      popularity: node.popularity,
      // ch: node.chapters,
      // ep: node.episodes,
      // ce: node.nextAiringEpisode?.episode,
      // du: node.duration,
      compWeight: compWeight(node),
      startDate: [
        node.startDate.year,
        node.startDate.month,
        node.startDate.day,
      ].join("-")
    }
  }

  const loadList = (data: any) => {
    let nodes = new Map()
    let edges = new Map()
    console.log(data)
    for (let list of data) {
      for (let entry of list.entries) {
        nodes.set(entry.media.id, {
          data: { ...parseNode(entry.media), status: entry.status, }
        })
        for (let node of entry.media.relations.nodes) {
          if (!nodes.get(node.id)) {
            nodes.set(node.id, {
              data: { ...parseNode(node), status: 'NO' }
            })
          }
        }
        for (let edge of entry.media.relations.edges) {
          edges.set(edge.id, {
            data: {
              id: "l" + edge.id,
              source: entry.media.id,
              target: edge.node.id,
              relation: edge.relationType,
            }
          })
        }
      }
    }
    return [nodes, edges]
  }

  const computeList = () => {
    // if (!loading && !error) {
    let cy: cytoscape.Core = state.cy
    const [nodes, edges] = loadList([].concat(statusAnime.data.MediaListCollection.lists, statusManga.data.MediaListCollection.lists))

    console.log(nodes, edges)
    cy.elements().remove()
    cy.add(Array.from(nodes.values()).concat(Array.from(edges.values())))
    let components = cy.elements().components()

    //Split components with problematic connections
    let cleanedComponents: {
      series: cytoscape.CollectionReturnValue; serieComplete: cytoscape.CollectionReturnValue;
    }[] = []
    components.map((serieComplete) => {
      serieComplete.filter("edge[relation!='CHARACTER'],node").components().map((seriePart) => {
        //Avoid unwatched orphan nodes
        if (seriePart.nodes().length != seriePart.filter("node[status='NO']").length) {
          cleanedComponents.push({ series: seriePart, serieComplete: serieComplete })
        }
      })
    })

    //Create the representative of the serie
    let seriesListSorted = cleanedComponents.map((series) => {
      let serieSorted = series.series.sort((item1, item2) => {
        // let num1 = parseInt(item1.data("id"))
        // let num2 = parseInt(item2.data("id"))
        let num1 = parseInt(item1.data("popularity"))
        let num2 = parseInt(item2.data("popularity"))
        // let num1 = Date.parse(item1.data("startDate"))
        // let num2 = Date.parse(item2.data("startDate"))
        if (isNaN(num1)) {
          return 999
        } else if (isNaN(num2)) {
          return -1
        }
        // return num1 - num2 //id and startDate
        return num2 - num1 //popularity
      })
      return { seriesPrime: serieSorted.nodes()[0], series: serieSorted, serieComplete: series.serieComplete }
    })

    //Compute Stats
    let seriesList = seriesListSorted.map((serie) => {
      let stat: statsType = {};
      for (let format of ["TV", "TV_SHORT", "MOVIE", "SPECIAL", "OVA", "ONA", "MUSIC", "MANGA", "NOVEL", "ONE_SHOT"]) {
        let formatEl = serie.series.nodes().filter(`node[format='${format}']`)
        if (serie.seriesPrime.data("id") == 21093) {
          console.log(format)
          console.log(formatEl.filter("node[status='NO']"))
          console.log(formatEl.filter("node[status='NO']").map((e) => { return e.data("compWeight") }))
        }
        stat[format] = {
          tot: formatEl.length ?? 0,
          miss: formatEl.filter("node[status='NO']").length ?? 0,
          got: formatEl.filter("node[status!='NO']").length ?? 0,
          totWeight: (formatEl.map((e) => { return e.data("compWeight") }))?.reduce?.((a: number, b: number) => a + b, 0),
          missWeight: (formatEl.filter("node[status='NO']").map((e) => { return e.data("compWeight") }))?.reduce?.((a: number, b: number) => a + b, 0),
          gotWeight: (formatEl.filter("node[status!='NO']").map((e) => { return e.data("compWeight") }))?.reduce?.((a: number, b: number) => a + b, 0),
          // per: Math.round((formatEl.filter("node[status!='NO']").length / formatEl.length) * 100),
        }
      }
      return { ...serie, stats: stat }
    })

    //Creating Dict
    let seriesDict: { [key: string]: seriesListElementType } = {}
    seriesList.map((serie) => {
      seriesDict[serie.seriesPrime.data("id")] = serie
    })
    // console.log(seriesDict)
    setState(state => { return { ...state, seriesList: seriesList, seriesDict: seriesDict } })
    updateCompletition(setState)
    console.log(state)
    // }
  }

  const [getAnimeLists, statusAnime] = useLazyQuery(Queries.GET_LISTS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      getMangaLists({
        variables: { user: usr, type: "MANGA" },
      })
    },

  });
  // const [getMangaLists, { loading, error, data, refetch, networkStatus, variables, }] = useLazyQuery(Queries.GET_LISTS, {
  const [getMangaLists, statusManga] = useLazyQuery(Queries.GET_LISTS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: computeList,

  });

  useEffect(() => {
    if (statusAnime.loading || statusManga.loading) {
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
  }, [statusAnime, statusManga])

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