import {
  Box,
  BoxProps,
  Chip,
  IconButton,
  Tooltip,
  Typography
} from "@mui/material";
import React, { FC } from "react";
// import useAutocomplete from '@mui/material/useAutocomplete';

import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import SelectAllRoundedIcon from "@mui/icons-material/SelectAllRounded";
import xor from "lodash/xor";
import { useSharedState } from "./Store";
import {
  formatsType,
  statusType
} from "./Types";

interface props<T = formatsType | statusType> {
  name: string;
  dataset: {
    [key: string]: {
      id: T;
      label: string;
      tooltip: string;
      icon?: React.ReactElement;
    };
  };
  chips: T[];
  stateArray:
    | "animeComposition"
    | "mangaComposition"
    | "completion"
    | "novelComposition"
    | "cyFilter";
  disabled?: boolean;
}
export const FilterGroup: FC<props & BoxProps> = ({
  name,
  dataset,
  chips,
  stateArray,
  disabled,
  ...boxProps
}) => {
  const [state, setState] = useSharedState();
  function handleClick(compType: string) {
    setState((state) => {
      switch (compType) {
        default:
          return {
            ...state,
            userOptions: {
              ...state.userOptions,
              [stateArray]: xor(state.userOptions[stateArray], [
                compType,
              ]) as formatsType[],
            },
          };
      }
    });
  }
  function handleSelectAll() {
    setState((state) => {
      return {
        ...state,
        userOptions: {
          ...state.userOptions,
          [stateArray]: chips,
        },
      };
    });
  }
  function handleDeselectAll() {
    setState((state) => {
      return {
        ...state,
        userOptions: {
          ...state.userOptions,
          [stateArray]: [],
        },
      };
    });
  }
  function isSelected(compType: string) {
    return state.userOptions[stateArray].includes(compType as any)
      ? "primary"
      : "default";
  }
  return (
    <Box
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 40px 40px",
        gridTemplateRows: "40px auto",
        gridTemplateAreas: "'name all none' 'chips chips chips'",
        placeItems: "center",
        mt: 1,
        ...boxProps.sx
      }}
    >
      <Typography
        sx={{
          gridArea: "name",
          placeSelf: "center start",
          color: "text.primary",
          ...(disabled
            ? {
                color: "text.disabled",
                pointerEvents: "none",
              }
            : undefined),
        }}
      >
        {name}
      </Typography>
      <Tooltip
        key={"all"}
        title={"Select All"}
        placement="top"
        disableInteractive
      >
        <IconButton
          sx={{
            gridArea: "all",
          }}
          onClick={handleSelectAll}
          disabled={disabled}
          size="large">
          <SelectAllRoundedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip
        key={"none"}
        title={"Unselect All"}
        placement="top"
        disableInteractive
      >
        <IconButton
          sx={{
            gridArea: "none",
          }}
          onClick={handleDeselectAll}
          disabled={disabled}
          size="large">
          <HighlightOffRoundedIcon />
        </IconButton>
      </Tooltip>
      <Box
        sx={{
          gridArea: "chips",
          border: "1px solid",
          display: "flex",
          borderRadius: "10px",
          borderColor: "grey.500",
          flexWrap: "wrap",
          p: "10px",
          placeSelf: "stretch",
          ...(disabled
            ? {
                borderColor: "grey.400",
                pointerEvents: "none",
              }
            : undefined),
        }}
      >
        {chips.map((chip) => {
          return (
            <Tooltip
              key={dataset[chip].id}
              title={dataset[chip].tooltip}
              placement="top"
              disableInteractive
            >
              <Chip
                color={isSelected(dataset[chip].id)}
                variant="outlined"
                disabled={disabled}
                label={dataset[chip].label}
                icon={dataset[chip]?.icon}
                onClick={() => handleClick(dataset[chip].id)}
                sx={{
                  mx: 0.5,
                  my: 0.5,
                }}
              />
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
};
