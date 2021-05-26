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

type props = {
  name: string;
  helperText: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  control: React.ReactNode;
};
export const ButtonInputRow: FC<props> = ({
  name,
  helperText,
  onClick,
  control,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 25%",
        gridTemplateRows: "40% 60%",
        gridTemplateAreas: "'name s' 'help .'",
        alignItems: "start",
        m: "5px 0px",
      }}
    >
      <ButtonBase
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        onClick={onClick}
      />
      <Typography
        sx={{
          gridArea: "name",
        }}
        variant="subtitle1"
      >
        {name}
      </Typography>
      <Typography
        sx={{
          gridArea: "help",
          color: "text.secondary",
        }}
        variant="caption"
      >
        {helperText}
      </Typography>
      <Box
        sx={{
          gridArea: "s",
          placeSelf: "center end",
        }}
      >
        {control}
      </Box>
    </Box>
  );
};
