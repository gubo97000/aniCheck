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
import InfoModal from "./InfoModal";

const Nav: FC<BoxProps> = (boxProps) => {
  const [state, setState] = useSharedState();
  
  return (
    <Box
      {...boxProps}
      sx={{
        gridTemplateRows: "auto 1fr",
        gridTemplateAreas: "'top' 'content'",
        display: state.userOptions.cyShowNav
          ? "grid"
          : { xs: "grid", sm: "none" },
        ...boxProps.sx,
      }}
      // xs={12} sm={3}
    >
      <OptionsModal />
      <InfoModal />
      <Box sx={{ gridArea: "top" }}>
        <Loader />
        <StatusFilter />
        <SearchBox />
      </Box>
      <Box sx={{ gridArea: "content" }}>
        <SeriesList />
      </Box>
    </Box>
  );
};

export default Nav;
