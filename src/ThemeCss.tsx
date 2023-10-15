import {PaletteMode, ThemeProvider, StyledEngineProvider} from '@mui/material';
import React, {FC, Children, isValidElement, ReactNode} from 'react';
// import useAutocomplete from '@mui/material/useAutocomplete';

import {experimental_extendTheme as extendTheme} from '@mui/material/styles';
import {Experimental_CssVarsProvider as CssVarsProvider} from '@mui/material/styles';

import Color from 'color';

import {useSharedState} from './Store';

export const ThemeCss: FC<{children: ReactNode}> = ({children}) => {
  const [state, setState] = useSharedState();
  let theme = extendTheme({
    colorSchemes: {
      light: {
        palette: {},
      },
      dark: {
        palette: {},
      },
    },
  });
  if (state.user.color) {
    theme = extendTheme({
      colorSchemes: {
        light: {
          palette: {
            primary: {
              main: state.user.color,
            },
            secondary: {
              main: Color(state.user.color).rotate(180).rgb().string(),
            },
            background: {
              default: '#EDF1F5',
              paper: 'white',
              // paper:"#EDF1F5",
            },
          },
        },
        dark: {
          palette: {
            primary: {
              main: state.user.color,
            },
            secondary: {
              main: Color(state.user.color).rotate(180).rgb().string(),
            },
            background: {
              default: '#121212',
              paper: '#303030',
              // paper:"#EDF1F5",
            },
          },
        },
      },
    });
  }

  return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>;
};
export default ThemeCss;
