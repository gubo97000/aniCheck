import {Box, useColorScheme} from '@mui/material';
import React, {FC, useEffect} from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {ButtonInputRow} from './ButtonInputRow';
import {useSharedState} from './Store';
import {userOptionType} from './Types';
import {updateCompletion} from './Utils';

const GeneralOptionsMenu: FC = () => {
  const [state, setState] = useSharedState();
  const {mode, setMode} = useColorScheme();

  const handleChangeTheme = (event: SelectChangeEvent) => {
    setMode(event.target.value as 'light' | 'dark' | 'system');
  };
  const handleChangeViz = (event: SelectChangeEvent) => {
    setState(state => {
      return {
        ...state,
        userOptions: {
          ...state.userOptions,
          vizMode: event.target.value as userOptionType['vizMode'],
        },
      };
    });
  };

  useEffect(() => {
    // setState(state => { return { ...state, globalStats: { ...state.globalStats, tot: 1 } } })
    setState(state => updateCompletion(state));
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
            value={mode}
            onChange={handleChangeTheme}
            sx={{width: '100px'}}
          >
            <MenuItem value={'system'}>System</MenuItem>
            <MenuItem value={'light'}>Light</MenuItem>
            <MenuItem value={'dark'}>Dark</MenuItem>
          </Select>
        }
      />
      <ButtonInputRow
        name="Visualization Type"
        helperText="Graph is best for showing relashionships. List (WIP) for a more ordered display."
        sx={{mt: 2}}
        control={
          <Select
            labelId="select-visualization"
            id="select-visualization"
            value={state.userOptions.vizMode}
            onChange={handleChangeViz}
            sx={{width: '100px'}}
          >
            <MenuItem value={'graph'}>Graph</MenuItem>
            <MenuItem value={'list'}>List</MenuItem>
            {/* <MenuItem value={"dark"}>Dark</MenuItem> */}
          </Select>
        }
      />
    </Box>
  );
};
export default GeneralOptionsMenu;
