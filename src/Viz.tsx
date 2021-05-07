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
import Stack from '@material-ui/core/Stack';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import cola from 'cytoscape-cola';
import klay from 'cytoscape-klay';
import dagre from 'cytoscape-dagre';
import popper from 'cytoscape-popper';


function Viz() {
  // const graphBox = useRef(null)
  const [state, setState] = useSharedState();

  let cyRef = useRef(null)
  useEffect(() => {
    cytoscape.use(cola)
    cytoscape.use(klay)
    cytoscape.use(dagre)
    try {
      cytoscape.use(popper)
    } catch (error) {
      
    }
    

    let cy = cytoscape({
      container: cyRef.current,
      elements: [ // list of graph elements to start with
        { // node a
          data: { id: 'a', title: "Ani" }
        },
        { // node b
          data: { id: 'b', title: "Check" }
        },
        { // edge ab
          data: { id: 'ab', source: 'a', target: 'b' }
        }
      ],
      style: [
        {
          selector: 'node',
          style: {
            "label": 'data(title)',
            // "width": 100,
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
            'curve-style': "unbundled-bezier",
            'width': 5,
            'target-arrow-shape': 'triangle',
            // 'line-color': '#ffaaaa',
            // 'target-arrow-color': '#ffaaaa',
            'target-label': 'data(relation)',
            'target-text-offset': 80,
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
            "shape": "polygon",
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
    cy.on("cxttapend", "node", (evt) => {
      console.log("cxttapend on node")
      window.open(evt.target.data("siteUrl"), "_blank")
    })
    cy.on("tap", "node,edge", (evt) => {
      console.log(evt.target.data())
    })

    let node : any = cy.nodes().first();
    console.log(node)

    let pop = node.popper({
      content: () => {
        let div = document.createElement('div');
    
        div.innerHTML = 'Sticky Popper content';
    
        document.body.appendChild( div );
    
        return div;
      }
    });
    let update = () => {
      pop.update();
    };  
    node.on('position', update);
    
    cy.on('pan zoom resize', update);

    setState(state => { return { ...state, cyViz: cy } })
  }, [])

  const receiveCy = (cy: cytoscape.Core) => {
    console.log(cy)
    // console.log("reCy")
    setState(state => { return { ...state, cyViz: cy } })
  }

  const handleClick = () => {
    state.cyViz?.elements().makeLayout({
      name: "breadthfirst",

      // nodeDimensionsIncludeLabels: true,
      animate: true,
      // name: "cose",
      // roots: [state.seriesSelected.],
      // directed: true,
      // padding: 10
    }).run();
  }
  const handleClickCose = () => {
    state.cyViz?.elements().makeLayout({
      name: "klay",
      animate: true,
      nodeDimensionsIncludeLabels: true,
      klay: {
        // addUnnecessaryBendpoints: true, 
        layoutHierarchy: false,
      }

      // roots: [state.seriesSelected.],
      // directed: true,
      // padding: 10
    } as any).run();
  }
  const handleClickDagre = () => {
    state.cyViz?.elements().makeLayout({
      name: "dagre",
      animate: true,
      nodeDimensionsIncludeLabels: true,

      // roots: [state.seriesSelected.],
      // directed: true,
      // padding: 10
    }as any).run();
  }
  // const layout = { name: 'breadthfirst' };
  return (
    <Grid sx={{
      position: "relative",
    }} item xs={9}>
      <div ref={cyRef} style={{ width: '100%', height: '100vh' }} ></div>
      {/* <CytoscapeComponent elements={[{data: { id: 'a' }}]} layout={layout}
        style={{ width: '100%', height: '100%' }} cy={receiveCy}
      >
      </CytoscapeComponent> */}
      {/* <div ref={graphBox}></div> */}
      <Stack sx={{
        position: "absolute",
        top: "20%",
        right: "3%",
      }} spacing={2}>
        <Button onClick={handleClick}>Breathfirst</Button>
        <Button onClick={handleClickCose}>Klay</Button>
        <Button onClick={handleClickDagre}>Dagre</Button>

      </Stack>
    </Grid>
  )

}
export default Viz