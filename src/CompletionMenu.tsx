import { Box, Switch } from "@mui/material";
import React, { useEffect, FC } from "react";

import { useSharedState } from "./Store";
import { formatsType } from "./Types";
import {
  convertBulkTerm,
  FORMATS,
  FORMATS_IDS,
  getBulkStat,
  sortAlphabetical,
  sortComplete,
  updateCompletion,
} from "./Utils";
import xor from "lodash/xor";
import Divider from "@mui/material/Divider";
import { ButtonInputRow } from "./ButtonInputRow";
import { FilterGroup } from "./FilterGroup";

const CompletionMenu: FC = () => {
  const [state, setState] = useSharedState();

  function handleClick(compType: string) {
    setState((state) => {
      switch (compType) {
        case "smart":
          return {
            ...state,
            userOptions: {
              ...state.userOptions,
              smartCompletion: !state.userOptions.smartCompletion,
            },
          };
        case "all":
          return {
            ...state,
            userOptions: {
              ...state.userOptions,
              completion: FORMATS_IDS,
            },
          };

        default:
          return {
            ...state,
            userOptions: {
              ...state.userOptions,
              completion: xor(state.userOptions.completion, [
                compType,
              ]) as formatsType[],
            },
          };
      }
    });
  }

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
        name="Smart Completion"
        helperText="Only consider completion of thematic groups you have already started. (E.g. If you read all manga of a series without watching any animation the series is completed anyway)"
        onClick={() => handleClick("smart")}
        control={
          <Switch
            checked={state.userOptions.smartCompletion}
            onClick={() => handleClick("smart")}
          />
        }
      />
      <FilterGroup
        name={"Formats to consider Anime"}
        chips={["TV", "TV_SHORT", "MOVIE", "SPECIAL", "OVA", "ONA", "MUSIC"]}
        stateArray="animeComposition"
        dataset={FORMATS}
        disabled={!state.userOptions.smartCompletion}
        sx={
          !state.userOptions.smartCompletion ? { display: "none" } : undefined
        }
      />
      <FilterGroup
        name={"Formats to consider Manga"}
        chips={["MANGA", "ONE_SHOT"]}
        stateArray="mangaComposition"
        dataset={FORMATS}
        disabled={!state.userOptions.smartCompletion}
        sx={
          !state.userOptions.smartCompletion ? { display: "none" } : undefined
        }
      />
      <FilterGroup
        name={"Formats to consider Novel"}
        chips={["NOVEL"]}
        stateArray="novelComposition"
        dataset={FORMATS}
        disabled={!state.userOptions.smartCompletion}
        sx={
          !state.userOptions.smartCompletion ? { display: "none" } : undefined
        }
      />
      <Divider
        variant="middle"
        sx={{
          my: 2,
        }}
      />
      <ButtonInputRow
        name="Custom Completion"
        helperText="Choose what formats to include for completion in a series"
        onClick={() => handleClick("smart")}
        control={
          <Switch
            checked={!state.userOptions.smartCompletion}
            onClick={() => handleClick("smart")}
          />
        }
      />

      <FilterGroup
        name={"Formats to consider"}
        chips={FORMATS_IDS}
        stateArray="completion"
        dataset={FORMATS}
        disabled={state.userOptions.smartCompletion}
        sx={
          state.userOptions.smartCompletion ? { display: "none" } : undefined
        }
      />
    </Box>
  );
};
export default CompletionMenu;
