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
import { formatsBulkTermsType, globalStateType } from "./Types";
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
type props = {
  category: formatsBulkTermsType;
};
const ListVizCategory: FC<props & BoxProps> = ({ category, ...boxProps }) => {
  // const graphBox = useRef(null)
  const [state, setState] = useSharedState();
  const nodes = state.seriesSelected?.series.nodes.filter((node) => {
    return convertBulkTerm(category, {
      ...state.userOptions,
      animeComposition: [
        "TV",
        "TV_SHORT",
        "MOVIE",
        "SPECIAL",
        "OVA",
        "ONA",
        "MUSIC",
      ],
      mangaComposition: ["MANGA", "ONE_SHOT"],
      novelComposition: ["NOVEL"],
    }).includes(node.format);
  });
  console.log(nodes);
  return nodes?.length ? (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: " 30px auto",
        gridTemplateAreas: "'name' 'eles'",
        ...boxProps.sx,
      }}
    >
      <Typography gridArea="name" variant="h5" color="text.primary" sx={{
          placeSelf:"center start",
          ml:1.8
      }}>
        {category.toUpperCase()}
      </Typography>
      <Box
        gridArea="eles"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignContent: "flex-start",
        }}
      >
        {nodes.map((node) => {
          return <CardItemA key={node.id} node={node} />;
        })}
      </Box>
    </Box>
  ) : (
    <Box />
  );
};
export default ListVizCategory;
