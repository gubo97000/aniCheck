import {
  Avatar,
  Box,
  BoxProps,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  RadioGroup,
  TextField,
  useAutocomplete,
} from "@material-ui/core";
import React, {
  useState,
  useRef,
  useLayoutEffect,
  useContext,
  useEffect,
  useMemo,
  FC,
  Children,
  isValidElement,
} from "react";
// import useAutocomplete from '@material-ui/core/useAutocomplete';
import { render } from "react-dom";
import * as vis from "vis-network";
import cytoscape from "cytoscape";

import { useQuery, gql } from "@apollo/client";
import { useSharedState } from "./Store";
import Loader from "./Loader";
import { keycharm } from "vis-network";
import { globalStateType, seriesListElementType } from "./Types";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { matchSorter } from "match-sorter";
import SortMenu from "./SortMenu";
import { getSortFc, useAsync, useDebounce } from "./Utils";
import DonutLargeRoundedIcon from "@material-ui/icons/DonutLargeRounded";
import SortIcon from "@material-ui/icons/Sort";
import FilterAltRoundedIcon from "@material-ui/icons/FilterAltRounded";
import { useWorker } from "@koale/useworker";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";

const LoaderHead: FC<BoxProps> = (boxProps) => {
  const [state, setState] = useSharedState();

  return (
    <Box
      {...boxProps}
      sx={{
        ...boxProps.sx,
        display: "grid",
        //   gridTemplateRows: "60px",
        gridTemplateColumns: "1fr 50px 50px",
        gridTemplateRows: "50px",
        gridTemplateAreas: "'. help options'",
        placeItems: "center",
      }}
    >
      <IconButton
        sx={{
          //   m: "3px",
          p: "8px",
          backdropFilter: "blur(8px)",
          bgcolor: "rgba(255,255,255,0.5)",
          gridArea: "options",
          border: "1px solid",
          borderColor: "primary.main",
          color: "primary.main",
          ":hover": {
            bgcolor: "rgba(255,255,255,0.3)",
          },
        }}
        onClick={() => {
          state.modalOpenState?.[1](true);
        }}
      >
        <SettingsRoundedIcon />
      </IconButton>
      <IconButton
        sx={{
          //   m: "3px",
          p: "8px",
          backdropFilter: "blur(8px)",
          bgcolor: "rgba(255,255,255,0.5)",
          gridArea: "help",
          border: "1px solid",
          borderColor: "primary.main",
          color: "primary.main",
          ":hover": {
            bgcolor: "rgba(255,255,255,0.3)",
          },
        }}
        onClick={() => {
          state.modalInfoOpenState?.[1](true);
        }}
      >
        <HelpOutlineRoundedIcon />
      </IconButton>
    </Box>
  );
};
export default LoaderHead;
