import {
  Avatar,
  Box,
  BoxProps,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  RadioGroup,
  TextField,
  useAutocomplete,
} from "@mui/material";
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
// import useAutocomplete from '@mui/material/useAutocomplete';
import { render } from "react-dom";
import * as vis from "vis-network";
import cytoscape from "cytoscape";

import { useQuery, gql } from "@apollo/client";
import { initialState, useSharedState } from "./Store";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import { LogoutOutlined } from "@mui/icons-material";
import { deleteCache } from "./lib/CacheUtils";

const LoaderHead: FC<BoxProps> = (boxProps) => {
  const [state, setState] = useSharedState();
  useEffect(() => {}, [state.modalOpenState]); //Fixes a bug the set state function doesn't update after a change screen in mobile
  return (
    <Box
      {...boxProps}
      sx={{
        ...boxProps.sx,
        display: "grid",
        //   gridTemplateRows: "60px",
        gridTemplateColumns: "1fr 50px 50px 50px",
        gridTemplateRows: "50px",
        gridTemplateAreas: "'. logout help options'",
        placeItems: "center",
      }}
    >
      {state.user.name ? (
        <IconButton
          sx={{
            //   m: "3px",
            p: "8px",
            backdropFilter: "blur(8px)",
            bgcolor: "rgba(255,255,255,0.5)",
            gridArea: "logout",
            border: "1px solid",
            borderColor: "primary.main",
            color: "primary.main",
            ":hover": {
              bgcolor: "rgba(255,255,255,0.3)",
            },
          }}
          onClick={() => {
            //Delete cache
            deleteCache(state.user.name ?? "");
            //Clear state
            setState(initialState);
            //Redirect to login
            // window.location.href = "/aniCheck/";
          }}
          size="large"
        >
          <LogoutOutlined />
        </IconButton>
      ) : undefined}
      <IconButton
        sx={{
          //   m: "3px",
          p: "8px",
          backdropFilter: "blur(8px)",
          bgcolor: "rgba(255,255,255,0.5)",
          gridArea: "options",
          border: "1px solid",
          borderColor: "primary.main",
          color: "primary.main",
          ":hover": {
            bgcolor: "rgba(255,255,255,0.3)",
          },
        }}
        onClick={() => {
          state.modalOpenState?.[1](true);
        }}
        size="large"
      >
        <SettingsRoundedIcon />
      </IconButton>
      <IconButton
        sx={{
          //   m: "3px",
          p: "8px",
          backdropFilter: "blur(8px)",
          bgcolor: "rgba(255,255,255,0.5)",
          gridArea: "help",
          border: "1px solid",
          borderColor: "primary.main",
          color: "primary.main",
          ":hover": {
            bgcolor: "rgba(255,255,255,0.3)",
          },
        }}
        onClick={() => {
          console.log("clicked");
          console.log(state.modalInfoOpenState);
          setState((s) => {
            return {
              ...s,
              modalInfoOpenState: true,
            };
          });
          // state.modalInfoOpenState?.[1](true);
        }}
        size="large"
      >
        <HelpOutlineRoundedIcon />
      </IconButton>
    </Box>
  );
};
export default LoaderHead;
