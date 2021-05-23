import {
  Avatar,
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Radio,
  Typography,
} from "@material-ui/core";
import React, {
  useState,
  useRef,
  useLayoutEffect,
  useContext,
  useEffect,
  useMemo,
  FC,
} from "react";
import { render } from "react-dom";
import * as vis from "vis-network";
import cytoscape from "cytoscape";

import { useQuery, gql } from "@apollo/client";
import Loader from "./Loader";
import { keycharm } from "vis-network";
import { useSharedState } from "./Store";

import MenuBookIcon from "@material-ui/icons/MenuBook";
import TvIcon from "@material-ui/icons/Tv";
import MusicVideoIcon from "@material-ui/icons/MusicVideo";
import BookIcon from "@material-ui/icons/Book";
import TheatersIcon from "@material-ui/icons/Theaters";
import { formatToIcon } from "./Utils";

interface props {
  data: any;
}

function statusToColor(status: string) {
  switch (status) {
    case "NO":
      return "red";

    case "COMPLETED":
      return "green";

    default:
      return "grey.500";
  }
}

const GraphNode: FC<props> = ({ data }) => {
  return (
    <Paper
      sx={{
        width: 200,
        height: 60,
        border: "1px solid",
        borderColor: statusToColor(data.status),
        // overflow: "hidden",
        position: "relative",
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12} sx={{ height: "70%" }}>
          <Typography>{data.title}</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            borderTop: "solid 1px",
            borderColor: "grey.500",
            // backgroundColor: "green",
            height: "30%",
            fontSize: 13,
          }}
        >
          <Typography
            sx={{
              marginRight: "22px",
              textAlign: "center",
              fontSize: 13,
            }}
          >
            {data.startDate}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            borderTop: "solid 1px",
            borderColor: "grey.500",
            // backgroundColor: "red",
            height: "30%",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              marginLeft: "22px",
              textAlign: "center",
              fontSize: 13,
              textTransform: "capitalize",
            }}
          >
            {data.format.toLowerCase()}
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          position: "absolute",
          width: 50,
          height: 50,
          borderRadius: 20,
          border: "1px solid transparent",
          borderTopColor: "inherit",
          borderRightColor: "inherit",
          right: "35%",
          top: "58%",
          backgroundColor: "white",
          transform: "rotate(315deg)",
        }}
      >
        {" "}
        <Icon
          sx={{
            margin: "auto",
            width: "100%",
            transform: "rotate(45deg)",
            position: "absolute",
            right: "-3px",
            top: "9px",
          }}
        >
          {formatToIcon(data.format)}
        </Icon>
      </Box>
    </Paper>
  );
};
export default GraphNode;
