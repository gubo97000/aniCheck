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
import { globalStateType } from "./Types";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import SearchBox from "./SearchBox";
import SeriesList from "./SeriesList";
import OptionsModal from "./OptionsModal";
import StatusFilter from "./StatusFilter";
import { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import InfoModal from "./InfoModal";
import AniChika from "./AniChika";
import { Outlet } from "react-router-dom";

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
        boxShadow: 1,
        ...boxProps.sx,
      }}
      // xs={12} sm={3}
    >
      <OptionsModal />
      <InfoModal />
      <Box sx={{ gridArea: "top" }}>
        <Loader />
        {Object.keys(state.seriesDict).length ? <StatusFilter /> : undefined}
        {Object.keys(state.seriesDict).length ? <SearchBox /> : undefined}
      </Box>
      <Box sx={{ gridArea: "content" }}>
        {/* {Object.keys(state.seriesDict).length ? <SeriesList /> : <AniChika />} */}
        {Object.keys(state.seriesDict).length ? <Outlet /> : <AniChika />}
      </Box>
    </Box>
  );
};

export default Nav;
