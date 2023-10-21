import cytoscape from 'cytoscape';
import React, {FC, useEffect, useRef} from 'react';
import {useSharedState} from './Store';

import dagre from 'cytoscape-dagre';
import klay from 'cytoscape-klay';
// import elk from "cytoscape-elk";
import Box, {BoxProps} from '@mui/material/Box';
import nodeHtmlLabel from 'cytoscape-node-html-label';
import {renderToString} from 'react-dom/server';
import CyToolbar from './CyToolbar';
import GraphNode from './GraphNode';
import {dataForCyto, getCyLayout} from './Utils';

const Viz: FC<BoxProps> = boxProps => {
  // const graphBox = useRef(null)
  const [state, setState] = useSharedState();

  const cyRef = useRef(null);
  const initCytoscape = () => {
    try {
      cytoscape.use(nodeHtmlLabel);
      // cytoscape.use(cola);
      cytoscape.use(klay);
      cytoscape.use(dagre);
      // // cytoscape.use(elk);
      // cytoscape.use(popper);
      // cytoscape.use(fcose);
    } catch (error) {
      /* empty */
    }

    const cy = cytoscape({
      headless: false,
      container: cyRef.current,
      wheelSensitivity: 0.3,
      elements: [
        // list of graph elements to start with
        {
          // node a
          data: {
            id: 'a',
            title: 'Welcome to AniCheck!',
            startDate: '2020-02-01',
            format: 'helo',
          },
        },
        {
          // node b
          data: {
            id: 'b',
            title: 'Insert a username then click on a serie!',
            startDate: '2020-02-01',
            format: 'HELO',
          },
        },
        {
          // edge ab
          data: {id: 'ab', source: 'a', target: 'b'},
        },
      ],
      style: [
        {
          selector: 'node',
          style: {
            // "label": 'data(title)',
            width: 200,
            height: 60,
            'background-color': 'white',
            shape: 'rectangle',
          },
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
            'curve-style': 'unbundled-bezier',
            // 'curve-style': "bezier",
            width: 2,
            'target-arrow-shape': 'triangle',
            // 'line-color': '#ffaaaa',
            // 'target-arrow-color': '#ffaaaa',
            'target-label': 'data(relation)',
            'target-text-offset': 35,
          },
        },
        {
          selector: 'edge[relation= "SEQUEL"]',
          style: {
            width: 5,
            'line-color': 'blue',
            'target-arrow-color': 'blue',
          },
        },
        {
          selector: 'edge[relation= "ADAPTATION"],edge[relation= "SOURCE"]',
          style: {
            'line-style': 'dashed',
            'line-dash-pattern': [10],
            width: 1,
            'line-color': 'cyan',
            'target-arrow-color': 'cyan',
          },
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
        {
          selector: '.hidden',
          style: {
            display: 'none',
          },
        },
      ],
      layout: {name: 'cose'},
    });
    cy.on('cxttapend', 'node', evt => {
      console.log('cxttapend on node');
      window.open(evt.target.data('siteUrl'), '_blank');
    });
    cy.on('tap', 'node,edge', evt => {
      console.log(evt.target.data());
    });

    //Adding Nice Node Layout as Label
    (cy as any).nodeHtmlLabel(
      [
        {
          query: 'node', // cytoscape query selector
          halign: 'center', // title vertical position. Can be 'left',''center, 'right'
          valign: 'center', // title vertical position. Can be 'top',''center, 'bottom'
          halignBox: 'center', // title vertical position. Can be 'left',''center, 'right'
          valignBox: 'center', // title relative box vertical position. Can be 'top',''center, 'bottom'
          cssClass: '', // any classes will be as attribute of <div> container for every title
          tpl(data: any) {
            return renderToString(<GraphNode data={data} />);
          },
        },
        {
          query: 'node:hidden',
          tpl: () => '',
        },
      ],
      {
        enablePointerEvents: true,
      }
    );
    return cy;
  };

  useEffect(() => {
    setState(state => {
      return {...state, cyViz: initCytoscape()};
    });
  }, []);

  useEffect(() => {
    setState(state => {
      state.cyViz = initCytoscape(); //TODO: This is the hackest hack ever because otherwise cyViz f disappear (not really) and app crash
      if (state.seriesSelected && state.cyViz) {
        console.log(state.seriesSelected);
        state.cyViz.elements().remove();

        // state.cyViz.style(getCyStyle(state))

        state.cyViz.add(dataForCyto(state.seriesSelected.series));
        state.cyViz.add(dataForCyto(state.seriesSelected.serieComplete, true));

        applyFilter(state.cyViz);

        console.log(cyRef.current);
        state.cyViz.center();

        state.cyViz.elements().makeLayout(getCyLayout(state)).run();

        state.cyViz?.fit(undefined, 50);
        state.cyViz?.panBy({x: -35, y: 0});
      }

      return {
        ...state,
        userOptions: {...state.userOptions, cyShowHidden: false},
      };
    });
  }, [state.seriesSelected]);

  // useEffect(() => {
  //   setState((state) => {
  //     if (state.seriesSelected && state.cyViz) {
  //       state.cyViz.elements().makeLayout(getCyLayout(state)).run();
  //       state.cyViz?.center();
  //     }

  //     return { ...state };
  //   });
  // }, [state.userOptions.cyLayout]);

  useEffect(() => {
    setState(state => {
      if (state.seriesSelected && state.cyViz) {
        applyFilter(state.cyViz);
        state.cyViz?.center();
        state.cyViz.elements().makeLayout(getCyLayout(state)).run();

        state.cyViz?.fit(undefined, 50);
        state.cyViz?.panBy({x: -35, y: 0});
      }

      return {...state};
    });
  }, [state.userOptions.cyFilter, state.userOptions.cyShowHidden]);

  const applyFilter = (cyViz: cytoscape.Core) => {
    //Restore all hidden nodes
    cyViz.elements().removeClass('hidden');
    //Add or Not Extra Elements
    if (state.seriesSelected?.serieComplete) {
      state.userOptions.cyShowHidden
        ? // ? cyViz.filter(".not-counted").removeClass("hidden")
          cyViz.add(dataForCyto(state.seriesSelected.serieComplete, true))
        : // : cyViz.filter(".not-counted").addClass("hidden");
          cyViz.filter('.not-counted').remove();
    }
    //Apply filters
    if (state.userOptions.cyFilter) {
      //Iterate all nodes and edges and add class hidden if inside cyFilter Array
      cyViz
        .filter(el => {
          return Object.values(el.data()).some((e: any) => {
            return state.userOptions.cyFilter.includes(e);
          });
        })
        .addClass('hidden');
    }
  };

  return (
    <Box
      {...boxProps}
      sx={{
        position: 'relative',
        display: {xs: 'none', sm: 'block'},
      }}
    >
      <Box
        ref={cyRef}
        style={{width: '100%', height: '100vh', overflow: 'hidden'}}
      />
      <CyToolbar />
    </Box>
  );
};
export default Viz;
