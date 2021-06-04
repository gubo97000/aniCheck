import { Box, Switch } from "@material-ui/core";
import React, { useEffect, FC } from "react";

import { useSharedState } from "./Store";
import { formatsType, userOptionType } from "./Types";
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
import Divider from "@material-ui/core/Divider";
import { ButtonInputRow } from "./ButtonInputRow";
import { FilterGroup } from "./FilterGroup";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const GeneralOptionsMenu: FC = () => {
  const [state, setState] = useSharedState();

  const handleChangeTheme = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState((state) => {
      return {
        ...state,
        userOptions: {
          ...state.userOptions,
          themeMode: event.target.value as userOptionType["themeMode"],
        },
      };
    });
  };
  const handleChangeViz = (event: React.ChangeEvent<{ value: unknown }>) => {
    setState((state) => {
      return {
        ...state,
        userOptions: {
          ...state.userOptions,
          vizMode: event.target.value as userOptionType["vizMode"],
        },
      };
    });
  };

  useEffect(() => {
    // setState(state => { return { ...state, globalStats: { ...state.globalStats, tot: 1 } } })
    setState((state) => updateCompletion(state));
  }, [
    state.userOptions.completion,
    state.userOptions.smartCompletion,
    state.userOptions.mangaComposition,
    state.userOptions.animeComposition,
  ]);

  return (
    <Box>
      <ButtonInputRow
        name="Theme"
        helperText="Auto will set the theme based on your system options"
        control={
          <Select
            labelId="select-theme"
            id="select-theme"
            value={state.userOptions.themeMode}
            onChange={handleChangeTheme}
            sx={{ width: "100px" }}
          >
            <MenuItem value={"auto"}>Auto</MenuItem>
            <MenuItem value={"light"}>Light</MenuItem>
            <MenuItem value={"dark"}>Dark</MenuItem>
          </Select>
        }
      />
      <ButtonInputRow
        name="Visualization Type"
        helperText="Graph is best for showing relashionships. List (WIP) for a more ordered display."
        sx={{mt:2}}
        control={
          <Select
            labelId="select-visualization"
            id="select-visualization"
            value={state.userOptions.vizMode}
            onChange={handleChangeViz}
            sx={{ width: "100px" }}
          >
            <MenuItem value={"graph"}>Graph</MenuItem>
            <MenuItem value={"list"}>List</MenuItem>
            {/* <MenuItem value={"dark"}>Dark</MenuItem> */}
          </Select>
        }
      />
    </Box>
  );
};
export default GeneralOptionsMenu;
