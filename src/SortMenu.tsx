import {
  Avatar,
  Box,
  Button,
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
import { globalStateType, seriesListElementType, sortType } from "./Types";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { matchSorter } from "match-sorter";
import {
  sortAlphabetical,
  sortComplete,
  useStateWithLocalStorage,
} from "./Utils";
import SortRoundedIcon from "@material-ui/icons/SortRounded";
import NorthRoundedIcon from "@material-ui/icons/NorthRounded";
import SouthRoundedIcon from "@material-ui/icons/SouthRounded";
import { BoxProps } from "@material-ui/core/Box";

const SortMenu: FC<BoxProps> = (boxProps) => {
  const [state, setState] = useSharedState();
  // console.log(state.userOptions.sort)
  const [sort, setSort] = useStateWithLocalStorage<sortType>(
    "sort",
    state.userOptions.sort
  );
  useEffect(() => {
    setState((state) => {
      return { ...state, userOptions: { ...state.userOptions, sort: sort } };
    });
  }, [sort]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelection = (chosenType: sortType["type"]) => {
    //If already chosen: invert
    if (sort.type == chosenType) {
      setSort({ type: chosenType, inverted: !sort.inverted });
    } else {
      setSort({ ...sort, type: chosenType });
    }
    // setAnchorEl(null);
  };

  return (
    <Box {...boxProps}>
      <IconButton
        id="sort-button"
        aria-controls="sort-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <SortRoundedIcon />
      </IconButton>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "sort-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          selected={sort.type == "complete%"}
          onClick={() => handleSelection("complete%")}
        >
          {sort.inverted ? <NorthRoundedIcon /> : <SouthRoundedIcon />}
          Complete %
        </MenuItem>

        <MenuItem
          selected={sort.type == "weight%"}
          onClick={() => handleSelection("weight%")}
        >
          {sort.inverted ? <NorthRoundedIcon /> : <SouthRoundedIcon />}
          Weighted Complete %
        </MenuItem>

        <MenuItem
          selected={sort.type == "alphabetical"}
          onClick={() => handleSelection("alphabetical")}
        >
          {sort.inverted ? <NorthRoundedIcon /> : <SouthRoundedIcon />}
          Alphabetical
        </MenuItem>

        <MenuItem
          selected={sort.type == "missWeight"}
          onClick={() => handleSelection("missWeight")}
        >
          {sort.inverted ? <NorthRoundedIcon /> : <SouthRoundedIcon />}
          Easy To Complete
        </MenuItem>

        {/* <MenuItem
                    selected={sort.type == "size"}
                    onClick={() => handleSelection("size")}>
                    {sort.inverted ? "Up" : "Do"} Size</MenuItem> */}
      </Menu>
    </Box>
  );
};
export default SortMenu;
