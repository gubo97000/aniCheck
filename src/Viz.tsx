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
import fcose from 'cytoscape-fcose';
import nodeHtmlLabel from 'cytoscape-node-html-label';
import { renderToString } from 'react-dom/server';
import GraphNode from './GraphNode';


function Viz() {
  // const graphBox = useRef(null)
  const [state, setState] = useSharedState();

  let cyRef = useRef(null)
  useEffect(() => {

    try {
      cytoscape.use(nodeHtmlLabel)
      cytoscape.use(cola)
      cytoscape.use(klay)
      cytoscape.use(dagre)
      cytoscape.use(popper)
      cytoscape.use(fcose)
    } catch (error) {

    }


    let cy = cytoscape({
      container: cyRef.current,
      elements: [ // list of graph elements to start with
        { // node a
          data: { id: 'a', title: "Ani", startDate:"2020-02-01", format: "helo" }
        },
        { // node b
          data: { id: 'b', title: "Check", startDate:"2020-02-01", format: "HELO" }
        },
        { // edge ab
          data: { id: 'ab', source: 'a', target: 'b' }
        }
      ],
      style: [
        {
          selector: 'node',
          style: {
            // "label": 'data(title)',
            "width": 200,
            "height": 60,
            'background-color': 'white',
            'shape': 'rectangle',

          }
        },


        // {
        //   selector: 'node[status="NO"]',
        //   style: {
        //     'background-color': 'red',
        //   }
        // },
        // {
        //   selector: 'node[status="COMPLETED"]',
        //   style: {
        //     'background-color': 'green',
        //   }
        // },
        // {
        //   selector: 'node[status="CURRENT"]',
        //   style: {
        //     'background-color': 'cyan',
        //   }
        // },
        {
          selector: 'edge',
          style: {
            'curve-style': "unbundled-bezier",
            // 'curve-style': "bezier",
            'width': 2,
            'target-arrow-shape': 'triangle',
            // 'line-color': '#ffaaaa',
            // 'target-arrow-color': '#ffaaaa',
            'target-label': 'data(relation)',
            'target-text-offset': 80,
          }
        },
        {
          selector: 'edge[relation= "SEQUEL"]',
          style: {
            'width': 5,
            "line-color": "blue",
            "target-arrow-color": "blue",
          }
        },
        {
          selector: 'edge[relation= "ADAPTATION"],edge[relation= "SOURCE"]',
          style: {
            "line-style": "dashed",
            "line-dash-pattern": [10],
            'width': 1,
            "line-color": "cyan",
            "target-arrow-color": "cyan",
          }
        },
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
        // {
        //   selector: 'node[format="MANGA"]',
        //   style: {
        //     "border-width": "1px",
        //     "shape": "polygon",
        //     'shape-polygon-points': book
        //   }
        // },
        // {
        //   selector: 'node[format="NOVEL"]',
        //   style: {
        //     'shape': "triangle",
        //   }
        // },
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

    // let node : any = cy.nodes().first();
    // console.log(node)

    // let pop = node.popper({
    //   content: () => {
    //     let div = document.createElement('div');

    //     div.innerHTML = 'Sticky Popper content';

    //     document.body.appendChild( div );

    //     return div;
    //   }
    // });
    // let update = () => {
    //   pop.update();
    // };  
    // node.on('position', update);
    // cy.on('pan zoom resize', update);
    function fixForNoTypeOfNodeHtmlLabel(cy:any){
      //Adding Nice Node Layout as Label
      cy.nodeHtmlLabel([
        {
          query: 'node', // cytoscape query selector
          halign: 'center', // title vertical position. Can be 'left',''center, 'right'
          valign: 'center', // title vertical position. Can be 'top',''center, 'bottom'
          halignBox: 'center', // title vertical position. Can be 'left',''center, 'right'
          valignBox: 'center', // title relative box vertical position. Can be 'top',''center, 'bottom'
          cssClass: '', // any classes will be as attribute of <div> container for every title
          tpl(data: any) {
            return renderToString(<GraphNode data={data} />);
          }
        }
      ]);
    }
    fixForNoTypeOfNodeHtmlLabel(cy)

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
      name: "fcose",

      // nodeDimensionsIncludeLabels: true,
      animate: true,
      nodeSeparation: 2000,
      nodeRepulsion: () => 45000000,
      // name: "cose",
      // roots: [state.seriesSelected.],
      // directed: true,
      // padding: 10
    }as any).run();
  }

  const handleClickKlay = () => {
    (state.cyViz?.style() as any).selector("edge").style("curve-style","bezier")
    state.cyViz?.elements().makeLayout({
      name: "klay",
      animate: true,
      nodeDimensionsIncludeLabels: true,
      klay: {
        // addUnnecessaryBendpoints: true, 
        edgeRouting: 'POLYLINE', // Defines how edges are routed (POLYLINE, ORTHOGONAL, SPLINES)
        layoutHierarchy: false,
        spacing: 40, // Overall setting for the minimal amount of space to be left between objects
        // nodeLayering:'LONGEST_PATH',
        nodeLayering:'NETWORK_SIMPLEX',
      
        mergeEdges: true,
        thoroughness: 50, // How much effort should be spent to produce a nice layout..
      }

      // roots: [state.seriesSelected.],
      // directed: true,
      // padding: 10
    } as any).run();
  }
  const handleClickCola = () => {
    state.cyViz?.elements().makeLayout({
      name: "cola",
      animate: true,
      nodeSpacing: ()=>{ return 50; }, // extra spacing around nodes
      randomize: true,
      // nodeDimensionsIncludeLabels: true,
      // roots: [state.seriesSelected.],
      // directed: true,
      // padding: 10
    } as any).run();
  }
  const handleClickDagre = () => {
    (state.cyViz?.style() as any).selector("edge").style("curve-style","bezier")
    state.cyViz?.elements().makeLayout({
      name: "dagre",
      animate: true,
      nodeDimensionsIncludeLabels: true,

      // roots: [state.seriesSelected.],
      // directed: true,
      // padding: 10
    } as any).run();
  }
  // const layout = { name: 'breadthfirst' };
  return (
    <Grid sx={{
      position: "relative",
    }} item xs={12} sm={9}>
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
        <Button onClick={handleClickKlay}>Klay</Button>
        <Button onClick={handleClickDagre}>Dagre</Button>
        <Button onClick={handleClickCola}>Cola</Button>
        <Button onClick={handleClickCose}>Cose</Button>

      </Stack>
    </Grid>
  )

}
export default Viz