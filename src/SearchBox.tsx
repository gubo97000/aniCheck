import {
  Box,
  IconButton,
  TextField
} from "@mui/material";
import React, {
  FC,
  useEffect,
  useState
} from "react";
// import useAutocomplete from '@mui/material/useAutocomplete';

import { GridViewOutlined, ViewAgendaOutlined } from "@mui/icons-material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import InputAdornment from "@mui/material/InputAdornment";
import { matchSorter } from "match-sorter";
import SortMenu from "./SortMenu";
import { useSharedState } from "./Store";
import { seriesListElementType } from "./Types";
import { getSortFc, } from "./Utils";
import { useAsync, useDebounce } from "./lib/Hooks";

const SearchBox: FC = ({ }) => {
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
        gridTemplateColumns: "50% 1fr 50px 50px 50px",
        gridTemplateAreas: "'search . complete sort layout'",
        placeItems: "center",
        m: "0px 10px 0px 14px",
      }}
    >
      <TextField
        sx={{
          gridArea: "search",
          justifySelf: "left",
          "& .MuiOutlinedInput-notchedOutline":{
            border:"1px solid",
            borderColor:"#00000000"
          },
          // border:"3px solid black",
          // bgcolor:"primary.main"

          // bgcolor:"lightpink",
        }}
        size="small"
        // size="normal"
        // variant="filled"
        // margin="normal"
        value={query}
        // color="primary"
        onChange={handleChange}
        placeholder="Search Series"
        InputProps={{
          sx: {
            bgcolor: "primary.ghost",
            "& ::placeholder":{
              color:"primary.dark",
              fontWeight:"bold"
            },
            // borderRadius: "5px",
            // border: "0px solid",
          },
          startAdornment: (
            <InputAdornment position="start" sx={{
              color:"primary.main"
              }}>
              <SearchRoundedIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {query ? (
                <IconButton
                  onClick={() => {
                    setQuery("");
                  }}
                  size="large">
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
          state.modalOpenState?.[1](true, "completion_options");
        }}
        size="large">
        <DonutLargeRoundedIcon />
      </IconButton>
      <SortMenu
        sx={{
          gridArea: "sort",
        }}
      />
      <IconButton
        sx={{
          gridArea: "layout",
        }}
        onClick={() => {
          setState((state) => {
            return {
              ...state,
              userOptions:{
                ...state.userOptions,
                listLayout: ["g.1","g.4"][(["g.1","g.4"].indexOf(state.userOptions.listLayout)+1)%2]
              }
            };
          });
        }}
        size="large">
          {state.userOptions.listLayout == "g.1" ? <ViewAgendaOutlined/> : <GridViewOutlined/>}
          
      </IconButton>
    </Box>
  );
};
export default SearchBox;
