import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  RadioGroup,
  Switch,
  TextField,
  Tooltip,
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
import SeriesListItem from "./SeriesListItem";
import {
  formatsType,
  globalStateType,
  seriesListElementType,
  sortType,
} from "./Types";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { matchSorter } from "match-sorter";
import {
  convertBulkTerm,
  FORMATS,
  FORMATS_IDS,
  getBulkStat,
  sortAlphabetical,
  sortComplete,
  updateCompletion,
  useStateWithLocalStorage,
} from "./Utils";
import xor from "lodash/xor";
import without from "lodash/without";
import { get, map, zipWith } from "lodash";
import { getUntrackedObject } from "react-tracked";
import { FilterGroup } from "./FilterGroup";

const CyFilterMenu: FC = () => {
  const [state, setState] = useSharedState();

  function handleClick(tag: typeof state.userOptions.cyFilter[number]) {
    setState((state) => {
      return {
        ...state,
        userOptions: {
          ...state.userOptions,
          cyFilter: xor(state.userOptions.cyFilter, [tag]) as formatsType[],
        },
      };
    });
  }
  function isSelected(tag: typeof state.userOptions.cyFilter[number]) {
    return state.userOptions.cyFilter.includes(tag) ? undefined : "outlined";
  }

  // useEffect(() => {
  //     // setState(state => { return { ...state, globalStats: { ...state.globalStats, tot: 1 } } })
  //     setState(state => updateCompletion(state))
  // }, [
  //     state.userOptions.cyFilter,
  // ])

  return (
    <FilterGroup
      name={"Formats to hide"}
      chips={[
        ...new Set(
          [...(state.seriesSelected?.series.nodes.map((n) => n.format)??[]),
          ...(state.userOptions.cyShowHidden
            ? state.seriesSelected?.serieComplete.nodes.map((n) => n.format)??[]
            : [])]
        ),
      ]}
      stateArray="cyFilter"
      dataset={FORMATS}
      sx={{ mt: 0 }}
      // disabled={state.userOptions.smartCompletion}
    />
  );
};
export default CyFilterMenu;
