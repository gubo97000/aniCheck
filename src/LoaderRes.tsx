import { Avatar, Button, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, TextField } from '@material-ui/core'
import React, { useState, useRef, useLayoutEffect, useContext, useEffect } from 'react'
import { render } from 'react-dom'
import * as vis from "vis-network"
import cytoscape from 'cytoscape';

import { useQuery, gql } from '@apollo/client';
import { Context } from './Store';

const GET_LISTS = gql`
{
  MediaListCollection(userName: $user, type: ANIME) {
    lists {
      entries {
        id
        status
        media {
          id
          title {
            userPreferred
          }
          format
          coverImage {
            medium
            color
          }
          relations {
            edges {
              id
              relationType
              node {
                id
                title {
                  userPreferred
                }
                format
              }
            }
          }
        }
      }
      name
      isCustomList
      isSplitCompletedList
    }
  }
}
`;

function LoaderRes({ user }:{user:string}) {
  const graphBox = useRef(null)
  const [state, setState] = useContext(Context);
  const { loading, error, data, refetch, networkStatus, variables, } = useQuery(GET_LISTS, {
    variables: { user }, 
    notifyOnNetworkStatusChange: true,
  });


  function loadList() {
    let nodes = new Map()
    let edges = new Map()
    console.log(data)
    for (let list of data.MediaListCollection.lists) {
      for (let entry of list.entries) {
        nodes.set(entry.media.id, {
          data: {
            id: entry.media.id,
            status: entry.media.status,
            format: entry.media.format,
            title: entry.media.title.userPreferred,

          }
        })

        for (let edge of entry.media.relations.edges) {
          edges.set(edge.id, {
            data: {
              id: edge.id,
              source: entry.media.id,
              target: edge.node.id,
              relation: edge.relationType,
            }
          })

          if (!nodes.get(edge.node.id)) {
            nodes.set(edge.node.id, {
              data: {
                id: edge.node.id,
                status: "NO",
                format: edge.node.format,
                title: edge.node.title.userPreferred,
              }
            })
          }
        }
      }
    }
    console.log(nodes, edges)

    // setState({ ...state, data: Array.from(nodes.values()).concat(Array.from(edges.values())) })
    console.log(state)
  }

  console.log(variables)
  console.log(error)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  console.log(data)
  return (
    <div>Success!</div>
  )

}
export default LoaderRes