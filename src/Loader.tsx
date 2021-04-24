import { Avatar, Button, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField } from '@material-ui/core'
import React, { useState, useRef, useLayoutEffect, useContext, useEffect } from 'react'
import { render } from 'react-dom'
import * as vis from "vis-network"
import cytoscape from 'cytoscape';

import { useLazyQuery } from '@apollo/client';
import { Context } from './Store';
import LoaderRes from './LoaderRes';
import * as Queries from "./Queries"
import { useStateWithLocalStorage } from './Utils';
import { globalStateType } from './Types';



function Loader() {
  const [state, setState] = useContext(Context);

  let [usr, setUsr] = useStateWithLocalStorage("usr")
  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsr(event.target.value)
  }

  const startQuery = (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(variables)
    getAnimeLists({
      variables: { user: usr, type: "ANIME" },
    })

  };

  const loadList = (data: any) => {
    let nodes = new Map()
    let edges = new Map()
    console.log(data)
    for (let list of data) {
      for (let entry of list.entries) {
        // if(nodes.get(entry.media.id)){
        //     // console.log(nodes.get(entry.media.id))
        //     console.log(nodes.get(entry.media.id).data.status)
        // }
        nodes.set(entry.media.id, {
          data: {
            id: entry.media.id,
            status: entry.status,
            format: entry.media.format,
            title: entry.media.title.userPreferred,
            siteUrl: entry.media.siteUrl,
            bannerImage: entry.media.bannerImage,
            startDate: [
              entry.media.startDate.year,
              entry.media.startDate.month,
              entry.media.startDate.day,
            ].join("-")
          }
        })
        for (let node of entry.media.relations.nodes) {
          if (!nodes.get(node.id)) {
            nodes.set(node.id, {
              data: {
                id: node.id,
                status: "NO",
                format: node.format,
                title: node.title.userPreferred,
                siteUrl: node.siteUrl,
                //BUG: For now is a feature
                bannerImage: entry.media.bannerImage,
                startDate: [
                  node.startDate.year,
                  node.startDate.month,
                  node.startDate.day,
                ].join("-")
              }
            })
          }
        }
        for (let edge of entry.media.relations.edges) {
          edges.set(edge.id, {
            data: {
              id: edge.id,
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
    if (!loading && !error && data) {
      let cy: cytoscape.Core = state.cy
      const [nodes, edges] = loadList([].concat(statusAnime.data.MediaListCollection.lists, data.MediaListCollection.lists))

      console.log(nodes, edges)
      cy.elements().remove()
      cy.add(Array.from(nodes.values()).concat(Array.from(edges.values())))
      let components = cy.elements().components()
      let seriesList = components.map((series) => {
        let serieSorted = series.sort((item1, item2) => {
          // let num1 = parseInt(item1.data("id"))
          // let num2 = parseInt(item2.data("id"))
          let num1 = Date.parse(item1.data("startDate"))
          let num2 = Date.parse(item2.data("startDate"))
          if (isNaN(num1)) {
            return 999
          } else if (isNaN(num2)) {
            return -1
          }
          return num1 - num2
        })
        return { seriesPrime: serieSorted.nodes()[0], series: serieSorted }
      })
      console.log(seriesList)
      setState({ ...state, seriesList: seriesList })
      console.log(state)
    }
  }

  const [getAnimeLists, statusAnime] = useLazyQuery(Queries.GET_LISTS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      getMangaLists({
        variables: { user: usr, type: "MANGA" },
      })
    },

  });
  const [getMangaLists, { loading, error, data, refetch, networkStatus, variables, }] = useLazyQuery(Queries.GET_LISTS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: computeList,

  });

  return (<div>
    <TextField id="username" value={usr} onChange={handleTextInput} label="Your AniList nick" />
    <Button variant="contained" onClick={startQuery} >Load</Button>
    {loading ? (<div>Loading</div>) : (<div>Done</div>)}
    {error ? (<p>Error: {error.message}</p>) : (<p>No Error</p>)}
    {/* <LoaderRes user={usr}></LoaderRes> */}
  </div>
  )

}
export default Loader