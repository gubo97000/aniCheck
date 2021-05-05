import React, { useState, useRef, useLayoutEffect, useContext, useEffect } from 'react'
import { render } from 'react-dom'
import * as vis from "vis-network"
import cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import { useSharedState } from './Store';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { globalStateType } from './Types';
import { book } from './cytoIcons';

function Viz() {
  // const graphBox = useRef(null)
  const [state, setState] = useSharedState();
  let cyRef = useRef(null)
  useEffect(() => {
    let cy = cytoscape({
      container: cyRef.current,
      elements: [ // list of graph elements to start with
        { // node a
          data: { id: 'a',title:"Ani" }
        },
        { // node b
          data: { id: 'b',title:"Check" }
        },
        { // edge ab
          data: { id: 'ab', source: 'a', target: 'b' }
        }
      ],
      style: [
        {
          selector: 'node',
          style: {
            "label": 'data(title)'
          }
        },
        {
          selector: 'node[status="NO"]',
          style: {
            'background-color': 'red',            
          }
        },
        {
          selector: 'node[status="COMPLETED"]',
          style: {
            'background-color': 'green',
          }
        },
        {
          selector: 'node[status="CURRENT"]',
          style: {
            'background-color': 'cyan',
          }
        },
        {
          selector: 'edge',
          style: {
            // 'curve-style': '',
            'width': 6,
            'target-arrow-shape': 'triangle',
            'line-color': '#ffaaaa',
            'target-arrow-color': '#ffaaaa',
            'target-label': 'data(relation)',
            'target-text-offset':80,
          }
        },
        // {
        //   selector: 'edge[relation= "SEQUEL"]',
        //   style: {
        //     "label":"Sequel",
        //   }
        // },
        // {
        //   selector: 'edge[relation= "SIDE_STORY"]',
        //   style: {
        //     "label":"Side Story",
        //   }
        // },
        // {
        //   selector: 'edge[relation= "OTHER"]',
        //   style: {
        //     "label":"Other",
        //   }
        // },
        // {
        //   selector: 'edge[relation= "ADAPTATION"]',
        //   style: {
        //     "label":"Adaptation",
        //   }
        // },
        // {
        //   selector: 'edge[relation= "SOURCE"]',
        //   style: {
        //     "label":"Source",
        //   }
        // },
        {
          selector: 'node[format="MANGA"]',
          style: {
            "border-width": "1px",
            "shape":"polygon",
            'shape-polygon-points': book
          }
        },
        {
          selector: 'node[format="NOVEL"]',
          style: {
            'shape': "triangle",
          }
        },
      ],
      layout: { name: "cose" },
    })
    cy.on("cxttapend","node", (evt)=>{
      console.log("cxttapend on node")
      window.open(evt.target.data("siteUrl"),"_blank")
    })
    cy.on("tap", "node,edge", (evt)=>{
      console.log(evt.target.data())
    })
    setState(state => {return{ ...state, cyViz: cy }})
  }, [])

  const receiveCy = (cy: cytoscape.Core) => {
    console.log(cy)
    // console.log("reCy")
    setState(state => {return{ ...state, cyViz: cy }})
  }

  const layout = { name: 'breadthfirst' };
  return (
    <Grid item xs={9}>
      <div ref={cyRef} style={{ width: '100%', height: '100vh' }} ></div>
      {/* <CytoscapeComponent elements={[{data: { id: 'a' }}]} layout={layout}
        style={{ width: '100%', height: '100%' }} cy={receiveCy}
      >
      </CytoscapeComponent> */}
      {/* <div ref={graphBox}></div> */}
    </Grid>
  )

}
export default Viz