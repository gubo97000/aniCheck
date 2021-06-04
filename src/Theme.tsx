import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  PaletteMode,
  RadioGroup,
  TextField,
  ThemeProvider,
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

import { useSharedState } from "./Store";

import { createTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Color from "color";

declare module "@material-ui/core/styles" {
  interface PaletteColor {
    ghost?: string;
  }
  interface SimplePaletteColorOptions {
    ghost?: string;
  }
}

const Theme: FC = ({ children }) => {
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
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default Theme;
