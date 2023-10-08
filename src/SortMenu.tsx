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
} from "@mui/material";
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
// import useAutocomplete from '@mui/material/useAutocomplete';
import { render } from "react-dom";
import * as vis from "vis-network";
import cytoscape from "cytoscape";
import { useQuery, gql } from "@apollo/client";
import { useSharedState } from "./Store";
import { globalStateType, seriesListElementType, sortType } from "./Types";
import { sortAlphabetical, sortComplete } from "./Utils";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import { BoxProps } from "@mui/material/Box";
import { useStateWithLocalStorage } from "./lib/Hooks";

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
        sx={{ color: "primary.main" }}
        size="medium"
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
        {/* <MenuItem
          selected={sort.type == "complete%"}
          onClick={() => handleSelection("complete%")}
        >
          {sort.inverted ? <NorthRoundedIcon /> : <SouthRoundedIcon />}
          Complete %
        </MenuItem> */}

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
          Time To Complete
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
