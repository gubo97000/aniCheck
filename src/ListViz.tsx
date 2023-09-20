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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { globalStateType } from "./Types";
import { book } from "./cytoIcons";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

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
import Badge from "@mui/material/Badge";
import { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import CyToolbar from "./CyToolbar";
import Icon from "@mui/material/Icon";
import { Typography } from "@mui/material";
import ListVizCategory from "./ListVizCategory";

const ListViz: FC<BoxProps> = (boxProps) => {
  // const graphBox = useRef(null)
  const [state, setState] = useSharedState();

  return (
    <Box
      {...boxProps}
      sx={{
        position: "relative",
        display: { sm: "grid" },
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
