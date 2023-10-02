import { Box, Button, ButtonProps, Tab, Tabs } from "@mui/material";
import React, { FC } from "react";
// import useAutocomplete from '@mui/material/useAutocomplete';

import AdjustRoundedIcon from "@mui/icons-material/AdjustRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CloudCircleIcon from "@mui/icons-material/CloudCircle";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Tooltip from "@mui/material/Tooltip";
import without from "lodash/without";
import { useSharedState } from "./Store";
import { serieStatusType } from "./Types";

const StatusTabs: FC = () => {
  const [state, setState] = useSharedState();
  const onChange = (event: React.SyntheticEvent, newValue: serieStatusType) => {
    setState((state) => {
      return {
        ...state,
        userOptions: {
          ...state.userOptions,
          statusSelect: newValue,
        },
      };
    });
  };
  const sx = { padding: "0px 10px 5px 4px", height: "50px", minHeight: 0 };
  return (
    // <Box
    //   sx={{
    //     margin: "5px 0 0 0",
    //     display: "flex",
    //     justifyContent: "space-evenly",
    //     flexWrap: "wrap",
    //   }}
    // >
    <Tabs
      value={state.userOptions.statusSelect}
      sx={{ minHeight: 0, borderBottom: "1px solid lightgrey" }}
      onChange={onChange}
    >
      <Tab
        sx={sx}
        icon={<CheckCircleOutlineRoundedIcon />}
        value={"COMPLETE"}
        label={
          <div style={{ textTransform: "none" }}>
            {`Completed 
                ${state.globalStats?.got}`}
          </div>
        }
        iconPosition="start"
      />
      <Tab
        sx={sx}
        icon={<CloudCircleIcon />}
        value={"PLAN_TO_COMPLETE"}
        iconPosition="start"
        label={
          <div style={{ textTransform: "none" }}>
            {`Planned 
            ${state.globalStats?.plan}`}
          </div>
        }
      />
      <Tab
        sx={sx}
        icon={<AdjustRoundedIcon />}
        value={"NOT_COMPLETE"}
        iconPosition="start"
        label={
          <div style={{ textTransform: "none" }}>
            {`Missing 
        ${state.globalStats?.miss}`}
          </div>
        }
      />
      {(state.globalStats?.tot ?? 0) -
        ((state.globalStats?.got ?? 0) +
          (state.globalStats?.miss ?? 0) +
          (state.globalStats?.plan ?? 0)) ==
      0 ? undefined : (
        <Tab
          sx={sx}
          icon={<HighlightOffRoundedIcon />}
          value={"ERR"}
          iconPosition="start"
          label={
            <div style={{ textTransform: "none" }}>
              {`Out ${
                state.globalStats.tot -
                (state.globalStats.got +
                  state.globalStats.miss +
                  state.globalStats.plan)
              }`}
            </div>
          }
        />
      )}
    </Tabs>
    // </Box>
  );
};
export default StatusTabs;
