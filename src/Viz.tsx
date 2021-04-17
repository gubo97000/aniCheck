import React, { useState, useRef, useLayoutEffect, useContext, useEffect } from 'react'
import { render } from 'react-dom'
import * as vis from "vis-network"
import cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import { Context } from './Store';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { globalStateType } from './Types';

function Viz() {
  // const graphBox = useRef(null)
  const [state, setState] = useContext(Context);
  let cyRef = useRef(null)
  // let cy:cytoscape.Core;
  // useEffec( ()=>{
  //   console.log(cyRef)
  //   let cy:cytoscape.Core=cyRef
  //   if (cy){
  //     console.log("called")
  //     console.log(cy)
  //     console.log()
  //     setState({...state, cy: cy.elements().components()})
  //   }

  // })
  useEffect(() => {
    let cy = cytoscape({
      container: cyRef.current,
      elements: [ // list of graph elements to start with
        { // node a
          data: { id: 'a' }
        },
        { // node b
          data: { id: 'b' }
        },
        { // edge ab
          data: { id: 'ab', source: 'a', target: 'b' }
        }
      ],
      // style: { "width": '100%', "height": '1vh' } as cytoscape.Stylesheet[],
      layout:{name:"cose"},
    })
    setState({ ...state, cyViz: cy })
  }, [])
  const receiveCy = (cy: cytoscape.Core) => {
    console.log(cy)
    // console.log("reCy")
    setState({ ...state, cyViz: cy })
  }

  const layout = { name: 'cose' };
  return (
    <Grid item xs={9}>
      <div ref={cyRef} style={{ width: '100%', height: '100%' }} ></div>
      {/* <CytoscapeComponent elements={[{data: { id: 'a' }}]} layout={layout}
        style={{ width: '100%', height: '100%' }} cy={receiveCy}
      >
      </CytoscapeComponent> */}
      {/* <div ref={graphBox}></div> */}
    </Grid>
  )

}
export default Viz