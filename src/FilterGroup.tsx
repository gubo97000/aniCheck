import {
  Box,
  Button,
  Chip,
  IconButton,
  Switch,
  TextField,
  Tooltip,
  Typography,
  useAutocomplete,
} from "@material-ui/core";
import React, {
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
  statusType,
  userOptionType,
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
import { get, zipWith } from "lodash";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import ButtonBase from "@material-ui/core/ButtonBase";
import SelectAllRoundedIcon from "@material-ui/icons/SelectAllRounded";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import Divider from "@material-ui/core/Divider";

interface props<T = formatsType | statusType> {
  name: string;
  dataset: {
    [key: string]: { id: T; label: string; tooltip: string };
  };
  chips: T[];
  stateArray:
    | "animeComposition"
    | "mangaComposition"
    | "completion"
    | "novelComposition";
  disabled: boolean;
}
export const FilterGroup: FC<props> = ({
  name,
  dataset,
  chips,
  stateArray,
  disabled,
}) => {
  const [state, setState] = useSharedState();
  function handleClick(compType: string) {
    setState((state) => {
      switch (compType) {
        default:
          return {
            ...state,
            userOptions: {
              ...state.userOptions,
              [stateArray]: xor(state.userOptions[stateArray], [
                compType,
              ]) as formatsType[],
            },
          };
      }
    });
  }
  function handleSelectAll() {
    setState((state) => {
      return {
        ...state,
        userOptions: {
          ...state.userOptions,
          [stateArray]: chips,
        },
      };
    });
  }
  function handleDeselectAll() {
    setState((state) => {
      return {
        ...state,
        userOptions: {
          ...state.userOptions,
          [stateArray]: [],
        },
      };
    });
  }
  function isSelected(compType: string) {
    return state.userOptions[stateArray].includes(compType as any)
      ? "primary"
      : "default";
  }
  return (
    <Box
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 40px 40px",
        gridTemplateRows: "40px auto",
        gridTemplateAreas: "'name all none' 'chips chips chips'",
        placeItems: "center",
        m: "5px 0px",
      }}
    >
      <Typography sx={{ gridArea: "name", placeSelf: "center start" }}>
        {name}
      </Typography>
      <IconButton
        sx={{
          gridArea: "all",
        }}
        onClick={handleSelectAll}
        disabled={disabled}
      >
        <SelectAllRoundedIcon />
      </IconButton>
      <IconButton
        sx={{
          gridArea: "none",
        }}
        onClick={handleDeselectAll}
        disabled={disabled}
      >
        <HighlightOffRoundedIcon />
      </IconButton>
      <Box
        sx={{
          gridArea: "chips",
          border: "1px solid",
          display: "flex",
          borderRadius: "10px",
          borderColor: "grey.500",
          flexWrap: "wrap",
          p: "10px",
          placeSelf: "stretch",
        }}
      >
        {chips.map((chip) => {
          return (
            <Tooltip
              key={dataset[chip].id}
              title={dataset[chip].tooltip}
              placement="top"
              disableInteractive
            >
              <Chip
                color={isSelected(dataset[chip].id)}
                variant="outlined"
                disabled={disabled}
                label={dataset[chip].label}
                onClick={() => handleClick(dataset[chip].id)}
                sx={{
                  mx: 0.5,
                  my: 0.5,
                }}
              />
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
};
