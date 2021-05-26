import {
  Box,
  Switch,
} from "@material-ui/core";
import React, {
  useEffect,
  FC,
} from "react";

import { useSharedState } from "./Store";
import {
  formatsType,
} from "./Types";
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
        helperText="Only consider completion of thematic groups you have already started"
        onClick={() => handleClick("smart")}
        control={
          <Switch
            checked={state.userOptions.smartCompletion}
            onClick={() => handleClick("smart")}
          />
        }
      />
      <FilterGroup
        name={"Elements to consider Anime"}
        chips={["TV", "TV_SHORT", "MOVIE", "SPECIAL", "OVA", "ONA", "MUSIC"]}
        stateArray="animeComposition"
        dataset={FORMATS}
        disabled={!state.userOptions.smartCompletion}
      />
      <FilterGroup
        name={"Elements to consider Manga"}
        chips={["MANGA", "ONE_SHOT"]}
        stateArray="mangaComposition"
        dataset={FORMATS}
        disabled={!state.userOptions.smartCompletion}
      />
      <FilterGroup
        name={"Elements to consider Novel"}
        chips={["NOVEL"]}
        stateArray="novelComposition"
        dataset={FORMATS}
        disabled={!state.userOptions.smartCompletion}
      />
      <Divider variant="middle" sx={{
        my:2
      }} />
      <ButtonInputRow
        name="Custom Completion"
        helperText="Choose what elements to consider for completion in all series"
        onClick={() => handleClick("smart")}
        control={
          <Switch
            checked={!state.userOptions.smartCompletion}
            onClick={() => handleClick("smart")}
          />
        }
      />

      <FilterGroup
        name={"Elements to consider"}
        chips={FORMATS_IDS}
        stateArray="completion"
        dataset={FORMATS}
        disabled={state.userOptions.smartCompletion}
      />
    </Box>
  );
};
export default CompletionMenu;
