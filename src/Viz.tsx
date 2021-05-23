import React, {
  useState,
  useRef,
  useLayoutEffect,
  useContext,
  useEffect,
} from "react";
import { render } from "react-dom";
import * as vis from "vis-network";
import cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import { useSharedState } from "./Store";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { globalStateType } from "./Types";
import { book } from "./cytoIcons";
import Stack from "@material-ui/core/Stack";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import cola from "cytoscape-cola";
import klay from "cytoscape-klay";
import dagre from "cytoscape-dagre";
import popper from "cytoscape-popper";
import fcose from "cytoscape-fcose";
import nodeHtmlLabel from "cytoscape-node-html-label";
import { renderToString } from "react-dom/server";
import GraphNode from "./GraphNode";
import { dataForCyto, getCyLayout, getCyStyle } from "./Utils";
import Badge from "@material-ui/core/Badge";

function Viz() {
  // const graphBox = useRef(null)
  const [state, setState] = useSharedState();
  const [badge, setBadge] = useState(0);

  let cyRef = useRef(null);
  useEffect(() => {
    try {
      cytoscape.use(nodeHtmlLabel);
      cytoscape.use(cola);
      cytoscape.use(klay);
      cytoscape.use(dagre);
      cytoscape.use(popper);
      cytoscape.use(fcose);
    } catch (error) {}

    let cy = cytoscape({
      container: cyRef.current,
      wheelSensitivity: 0.3,
      elements: [
        // list of graph elements to start with
        {
          // node a
          data: {
            id: "a",
            title: "Welcome to AniCheck!",
            startDate: "2020-02-01",
            format: "helo",
          },
        },
        {
          // node b
          data: {
            id: "b",
            title: "Check",
            startDate: "2020-02-01",
            format: "HELO",
          },
        },
        {
          // edge ab
          data: { id: "ab", source: "a", target: "b" },
        },
      ],
      style: [
        {
          selector: "node",
          style: {
            // "label": 'data(title)',
            width: 200,
            height: 60,
            "background-color": "white",
            shape: "rectangle",
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
          selector: "edge",
          style: {
            "curve-style": "unbundled-bezier",
            // 'curve-style': "bezier",
            width: 2,
            "target-arrow-shape": "triangle",
            // 'line-color': '#ffaaaa',
            // 'target-arrow-color': '#ffaaaa',
            "target-label": "data(relation)",
            "target-text-offset": 80,
          },
        },
        {
          selector: 'edge[relation= "SEQUEL"]',
          style: {
            width: 5,
            "line-color": "blue",
            "target-arrow-color": "blue",
          },
        },
        {
          selector: 'edge[relation= "ADAPTATION"],edge[relation= "SOURCE"]',
          style: {
            "line-style": "dashed",
            "line-dash-pattern": [10],
            width: 1,
            "line-color": "cyan",
            "target-arrow-color": "cyan",
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
          selector: ".hidden",
          style: {
            display: "none",
          },
        },
      ],
      layout: { name: "cose" },
    });
    cy.on("cxttapend", "node", (evt) => {
      console.log("cxttapend on node");
      window.open(evt.target.data("siteUrl"), "_blank");
    });
    cy.on("tap", "node,edge", (evt) => {
      console.log(evt.target.data());
    });

    //Adding Nice Node Layout as Label
    (cy as any).nodeHtmlLabel([
      {
        query: "node", // cytoscape query selector
        halign: "center", // title vertical position. Can be 'left',''center, 'right'
        valign: "center", // title vertical position. Can be 'top',''center, 'bottom'
        halignBox: "center", // title vertical position. Can be 'left',''center, 'right'
        valignBox: "center", // title relative box vertical position. Can be 'top',''center, 'bottom'
        cssClass: "", // any classes will be as attribute of <div> container for every title
        tpl(data: any) {
          return renderToString(<GraphNode data={data} />);
        },
      },
      {
        query: "node:hidden",
        tpl: () => "",
      },
    ]);

    setState((state) => {
      return { ...state, cyViz: cy };
    });
  }, []);

  useEffect(() => {
    setState((state) => {
      if (state.seriesSelected && state.cyViz) {
        console.log(state.seriesSelected);

        updateBadge();
        state.cyViz.elements().remove();

        // state.cyViz.style(getCyStyle(state))

        state.cyViz.add(dataForCyto(state.seriesSelected.series));
        state.cyViz.add(dataForCyto(state.seriesSelected.serieComplete, true));

        applyFilter(state.cyViz);
        state.cyViz?.center();

        state.cyViz.elements().makeLayout(getCyLayout(state)).run();

        state.cyViz?.center();
      }

      return { ...state };
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
    setState((state) => {
      if (state.seriesSelected && state.cyViz) {
        updateBadge();

        applyFilter(state.cyViz);
        state.cyViz?.center();
        state.cyViz.elements().makeLayout(getCyLayout(state)).run();

        state.cyViz?.center();
      }

      return { ...state };
    });
  }, [state.userOptions.cyFilter, state.userOptions.cyShowHidden]);

  const handleClickLayout = (layoutTag: string) => {
    setState((state) => {
      let tempState = {
        ...state,
        userOptions: { ...state.userOptions, cyLayout: layoutTag },
      };
      state.cyViz?.elements().makeLayout(getCyLayout(tempState)).run();
      state.cyViz?.center();
      return tempState;
    });
  };

  const updateBadge = () => {
    if (!state.userOptions.cyShowHidden && state.seriesSelected) {
      if (state.seriesSelected?.serieComplete.nodes.length) {
        setBadge(state.seriesSelected?.serieComplete.nodes.length);
        return;
      }
    }
    setBadge(0);
    return;
  };

  const applyFilter = (cyViz: cytoscape.Core) => {
    cyViz.elements().removeClass("hidden");
    if (state.seriesSelected?.serieComplete) {
      state.userOptions.cyShowHidden
        ? // ? cyViz.filter(".not-counted").removeClass("hidden")
          cyViz.add(dataForCyto(state.seriesSelected.serieComplete, true))
        : // : cyViz.filter(".not-counted").addClass("hidden");
          cyViz.filter(".not-counted").remove();
    }

    if (state.userOptions.cyFilter) {
      cyViz
        .filter((el) => {
          return Object.values(el.data()).some((e: any) => {
            return state.userOptions.cyFilter.includes(e);
          });
        })
        .addClass("hidden");
    }
  };

  return (
    <Grid
      sx={{
        position: "relative",
        height: { xs: "50vh", md: "100vh" },
      }}
      item
      xs={12}
      sm={9}
    >
      <div ref={cyRef} style={{ width: "100%", height: "100%" }}></div>
      {/* <CytoscapeComponent elements={[{data: { id: 'a' }}]} layout={layout}
        style={{ width: '100%', height: '100%' }} cy={receiveCy}
      >
      </CytoscapeComponent> */}
      {/* <div ref={graphBox}></div> */}
      <Stack
        sx={{
          position: "absolute",
          top: "20%",
          right: "3%",
        }}
        spacing={2}
      >
        <Button onClick={() => handleClickLayout("breathfirst")}>
          Breathfirst
        </Button>
        <Button onClick={() => handleClickLayout("klay")}>Klay</Button>
        <Button onClick={() => handleClickLayout("dagre")}>Dagre</Button>
        <Button onClick={() => handleClickLayout("cola")}>Cola</Button>
        <Button onClick={() => handleClickLayout("fcose")}>Cose</Button>
        <Badge badgeContent={badge} color="primary">
          <Button
            onClick={() => {
              setState((state) => {
                return {
                  ...state,
                  userOptions: {
                    ...state.userOptions,
                    cyShowHidden: !state.userOptions.cyShowHidden,
                  },
                };
              });
            }}
          >
            hidden
          </Button>
        </Badge>
      </Stack>
    </Grid>
  );
}
export default Viz;
