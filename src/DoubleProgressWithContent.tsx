import {
  Avatar,
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Radio,
  Tooltip,
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
import { seriesListElementType } from "./Types";
import { useSharedState } from "./Store";

interface props {
  value1: number;
  value2: number;
  size?: number;
  sx?: any;
}

const DoubleProgressWithContent: FC<props> = ({
  value1,
  value2,
  size,
  sx,
  children,
}) => {
  return (
    <Box sx={{ ...sx, position: "relative", display: "inline-flex" }}>
      <Tooltip
        placement="right"
        title={
          `${value2 ? `${value2}% Planned` : ""}` +
          `${value1 && value2 ? " / " : ""}` +
          `${value1 ? `${value1}% Completed` : ""}`
        }
        disableInteractive
      >
        <CircularProgress
          variant="determinate"
          color="primary"
          value={value1}
          size={size ?? 40}
          thickness={5}
          sx={{ zIndex: 1 }}
        />
      </Tooltip>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress
          variant="determinate"
          color="secondary"
          value={value2 + value1}
          size={(size ?? 40) - 2}
          thickness={4.0}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
export default DoubleProgressWithContent;
