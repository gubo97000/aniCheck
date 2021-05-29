import {
  Avatar,
  Box,
  Grid,
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
import SeriesListItem from "./SeriesListItem";
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
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";

const SearchBox: FC = ({ children }) => {
  // console.log(props.children.props.children.props)
  const [state, setState] = useSharedState();
  const [query, setQuery] = useState("");
  const debQuery = useDebounce(query, 800);
  const [res, setRes] = useState<seriesListElementType[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  //Completely useless async function, left here as a reminder of my stupidity
  const aSearch = () => {
    return new Promise<seriesListElementType[]>((resolve, reject) => {
      let res = matchSorter(
        Object.values(state.seriesDict ?? []).filter((serie) => {
          return !state.userOptions.statusFilter.includes(serie.status);
        }),
        debQuery,
        {
          keys: ["series.nodes.*.titles"],
          sorter: debQuery
            ? undefined
            : (rankedItems) => {
                console.log(rankedItems);
                return getSortFc(state.userOptions.sort.type)(
                  rankedItems,
                  state.userOptions.sort.inverted
                );
              },
        }
      );
      resolve(res);
    });
  };
  const { execute, status, value: asyncRes, error } = useAsync(aSearch, false);

  const search = () => {
    setState((state) => {
      return {
        ...state,
        seriesToRender: matchSorter(
          Object.values(state.seriesDict ?? []).filter((serie) => {
            return !state.userOptions.statusFilter.includes(serie.status);
          }),
          debQuery,
          {
            keys: ["series.nodes.*.titles"],
            sorter: debQuery
              ? undefined
              : (rankedItems) => {
                  return getSortFc(state.userOptions.sort.type)(
                    rankedItems,
                    state.userOptions.sort.inverted
                  );
                },
          }
        ),
      };
    });
  };

  useEffect(() => {
    search();
  }, [
    debQuery,
    state.seriesDict,
    state.userOptions.sort,
    state.userOptions.completion,
    state.userOptions.statusFilter,
    state.userOptions.smartCompletion,
    state.userOptions.animeComposition,
    state.userOptions.mangaComposition,
  ]);
  return (
    <Box
      sx={{
        // position: "relative",
        display: "grid",
        gridTemplateRows: "60px",
        gridTemplateColumns: "50% 1fr 50px 50px",
        gridTemplateAreas: "'search . complete sort'",
        placeItems: "center",
        m: "0px 10px 0px 14px",
      }}
    >
      <TextField
        sx={{
          gridArea: "search",
          justifySelf: "left",
          // bgcolor:"primary.light"

          // bgcolor:"lightpink",
        }}
        size="small"
        // size="normal"
        // variant="filled"
        // margin="normal"
        value={query}
        // color="primary"
        onChange={handleChange}
        placeholder="Search"
        InputProps={{
          sx: {
            bgcolor: "grey.300",
            // borderRadius: "5px",
            // border: "0px solid",
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {query ? (
                <IconButton onClick={()=>{setQuery("")}}>
                  <ClearRoundedIcon />
                </IconButton>
              ) : undefined}
            </InputAdornment>
          ),
        }}
      />
      <IconButton
        sx={{
          gridArea: "complete",
        }}
        onClick={() => {
          state.modalOpenState?.[1](true);
        }}
      >
        <DonutLargeRoundedIcon />
      </IconButton>
      <SortMenu
        sx={{
          gridArea: "sort",
        }}
      />
    </Box>
  );
};
export default SearchBox;
