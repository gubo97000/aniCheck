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

const Theme: FC = ({ children }) => {
  const [state, setState] = useSharedState();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const mode = prefersDarkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: state.user.color ?? "#3f51b5",
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
