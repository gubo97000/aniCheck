import React, {
  useState,
  useRef,
  useLayoutEffect,
  useContext,
  useEffect,
  FC,
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
// import elk from "cytoscape-elk";
import popper from "cytoscape-popper";
import fcose from "cytoscape-fcose";
import nodeHtmlLabel from "cytoscape-node-html-label";
import { renderToString } from "react-dom/server";
import GraphNode from "./GraphNode";
import {
  convertBulkTerm,
  dataForCyto,
  FORMATS,
  getCyLayout,
  getCyStyle,
} from "./Utils";
import Badge from "@material-ui/core/Badge";
import { BoxProps } from "@material-ui/core/Box";
import Box from "@material-ui/core/Box";
import CyToolbar from "./CyToolbar";
import Icon from "@material-ui/core/Icon";
import { Typography } from "@material-ui/core";
import CardItemA from "./CardItemA";
import ListVizCategory from "./ListVizCategory";

const ListViz: FC<BoxProps> = (boxProps) => {
  // const graphBox = useRef(null)
  const [state, setState] = useSharedState();

  return (
    <Box
      {...boxProps}
      sx={{
        position: "relative",
        display: { xs: "none", sm: "grid" },
        gridTemplateRows: "0px auto",
        gridTemplateAreas: "'toolbar' 'list'",
        height: "100vh",
        overflow: "auto",
        ...boxProps.sx,
      }}
    >
      {state.seriesSelected ? (
        <Box gridArea="list">
          {(["anime", "manga", "novel"] as const).map((category) => {
            return (
              <ListVizCategory
                key={category}
                category={category}
                sx={{ mt: 2 }}
              />
            );
          })}
        </Box>
      ) : (
        <Typography
          variant="h3"
          sx={{ gridArea: "list", placeSelf: "center", textAlign: "center" }}
          color="text.disabled"
        >
          Nothing to show yet. <br />
          Select a Series on the right
        </Typography>
      )}
    </Box>
  );
};
export default ListViz;
