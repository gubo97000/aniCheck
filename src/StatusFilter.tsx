import {
  Avatar,
  Box,
  Button,
  ButtonProps,
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
import {
  globalStateType,
  seriesListElementType,
  serieStatusType,
  sortType,
} from "./Types";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { matchSorter } from "match-sorter";
import {
  sortAlphabetical,
  sortComplete,
  useStateWithLocalStorage,
} from "./Utils";
import Sort from "@material-ui/icons/Sort";
import NorthRoundedIcon from "@material-ui/icons/NorthRounded";
import SouthRoundedIcon from "@material-ui/icons/SouthRounded";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import AdjustRoundedIcon from "@material-ui/icons/AdjustRounded";
import CloudCircleIcon from "@material-ui/icons/CloudCircle";
import Stack from "@material-ui/core/Stack";
import xor from "lodash/xor";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Tooltip from "@material-ui/core/Tooltip";
import without from "lodash/without";

interface props {
  children: React.ReactNode[] | React.ReactNode;
  statusId: serieStatusType;
  tooltip?: string;
}

const FilterButton: FC<props & ButtonProps> = ({ children, statusId, tooltip, ...buttonProps }) => {
  const [state, setState] = useSharedState();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setState((state) => {
      return {
        ...state,
        userOptions: {
          ...state.userOptions,
          // Checkbox Version
          //   statusFilter: xor(state.userOptions.statusFilter, [
          //     statusId,
          // Radio Version
          statusFilter: without(
            ["COMPLETE", "PLAN_TO_COMPLETE", "NOT_COMPLETE", "ERR"],
            statusId
          ) as serieStatusType[],
        },
      };
    });
  };

  const isSelectedColor = () => {
    if (!state.userOptions.statusFilter.includes(statusId)) {
      return "primary";
    } else {
      return undefined;
    }
  };
  const isSelectedVariant = () => {
    if (!state.userOptions.statusFilter.includes(statusId)) {
      return "contained";
    } else {
      return "outlined";
    }
  };

  return (
    <Tooltip title={tooltip ?? false} disableInteractive>
      <Button
        onClick={handleClick}
        color={buttonProps.color}
        variant={isSelectedVariant()}
        startIcon={buttonProps.startIcon}
        {...buttonProps}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

const StatusFilter: FC = () => {
  const [state, setState] = useSharedState();

  return (
    <Box>
      <Box
        sx={{
          margin: "5px 0 0 0",
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {/* <Tabs centered>
        <Tab icon={<CheckCircleOutlineRoundedIcon />} label={`${state.globalStats.got}`} />
        <Tab icon={<CloudCircleIcon />} label={`${state.globalStats.plan}`} />
        <Tab icon={<AdjustRoundedIcon />} label={`${state.globalStats.miss}`} />
        <Tab icon={<HighlightOffRoundedIcon />} label={`${state.globalStats.tot - (state.globalStats.got + state.globalStats.miss + state.globalStats.plan)}`} />
      </Tabs> */}

        <FilterButton
          statusId="COMPLETE"
          tooltip="Completed"
          startIcon={<CheckCircleOutlineRoundedIcon />}
          color="primary"
        >
          {/* <CheckCircleOutlineRoundedIcon /> */}
          {state.globalStats?.got}
        </FilterButton>
        <FilterButton
          statusId="PLAN_TO_COMPLETE"
          tooltip="Plan To Complete"
          startIcon={<CloudCircleIcon />}
          color="secondary"
        >
          {/* <CloudCircleIcon /> */}
          {state.globalStats?.plan}
        </FilterButton>
        <FilterButton
          statusId="NOT_COMPLETE"
          tooltip="Not Completed"
          startIcon={<AdjustRoundedIcon />}
          color={undefined}
        >
          {/* <AdjustRoundedIcon /> */}
          {state.globalStats?.miss}
        </FilterButton>
        {(state.globalStats?.tot ?? 0) -
          ((state.globalStats?.got ?? 0) +
            (state.globalStats?.miss ?? 0) +
            (state.globalStats?.plan ?? 0)) ==
        0 ? undefined : (
          <FilterButton
            statusId="ERR"
            tooltip="Not Included with current options"
            startIcon={<HighlightOffRoundedIcon />}
            color={undefined}
          >
            {/* <HighlightOffRoundedIcon /> */}
            {(state.globalStats?.tot ?? 0) -
              ((state.globalStats?.got ?? 0) +
                (state.globalStats?.miss ?? 0) +
                (state.globalStats?.plan ?? 0))}
          </FilterButton>
        )}
      </Box>
      {/* <Typography>
        {without(
            ["COMPLETE", "PLAN_TO_COMPLETE", "NOT_COMPLETE", "ERR"],
            ...state.userOptions.statusFilter
          )}
    </Typography> */}
    </Box>
  );
};
export default StatusFilter;
