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
import { useSharedState } from "./Store";
import Loader from "./Loader";
import { keycharm } from "vis-network";
import SeriesListItem from "./SeriesListItem";
import { globalStateType } from "./Types";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import SearchBox from "./SearchBox";
import SeriesList from "./SeriesList";
import OptionsModal from "./OptionsModal";
import StatusFilter from "./StatusFilter";
import { BoxProps } from "@material-ui/core/Box";
import Box from "@material-ui/core/Box";

const Nav: FC<BoxProps> = (boxProps) => {
  return (
    <Box {...boxProps} 
    // sx={{ height: { xs: "50vh", md: "100vh" } 
  // }} 
    // xs={12} sm={3}
    >
      <OptionsModal />
      <Loader />
      <StatusFilter />

      <SearchBox />
      <SeriesList />
    </Box>
  );
};

export default Nav;
