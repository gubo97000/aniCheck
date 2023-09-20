import {
  PaletteMode,
  ThemeProvider,
  StyledEngineProvider,
  useAutocomplete,
} from "@mui/material";
import React, {
  FC,
  Children,
  isValidElement,
  ReactNode,
} from "react";
// import useAutocomplete from '@mui/material/useAutocomplete';

import { useSharedState } from "./Store";

import { createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Color from "color";


// declare module '@mui/styles/defaultTheme' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   interface DefaultTheme extends Theme {}
// }


declare module "@mui/material/styles" {
  interface PaletteColor {
    ghost?: string;
  }
  interface SimplePaletteColorOptions {
    ghost?: string;
  }
}

const Theme: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useSharedState();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const mode = (() => {
    if (state.userOptions.themeMode == "auto") {
      return prefersDarkMode ? "dark" : ("light" as PaletteMode);
    } else {
      return state.userOptions.themeMode as PaletteMode;
    }
  })();

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: state.user.color ?? "#3f51b5",
        ghost: Color(state.user.color ?? "#3f51b5").alpha(0.3).string(),
      },
      secondary: {
        main: Color(state.user.color ?? "#3f51b5").rotate(180).rgb().string(),
        ghost: Color(state.user.color ?? "#3f51b5").rotate(180).alpha(0.3).string(),
      },
      background: {
        default: mode == "light" ? "#EDF1F5" : "#121212",
        paper: mode == "light" ? "white" : "#303030",
        // paper:"#EDF1F5",
      },
    },
  });
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};
export default Theme;
