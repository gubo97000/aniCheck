import { Box, BoxProps, IconButton } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
// import useAutocomplete from '@mui/material/useAutocomplete';
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Filter1Rounded,
  LogoutOutlined,
  SortOutlined,
} from "@mui/icons-material";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { initialState, useSharedState } from "./Store";
import { deleteCache } from "./lib/CacheUtils";
import { useSearchParams } from "react-router-dom";
import SortMenu from "./SortMenu";

const LoaderHead: FC<BoxProps> = (boxProps) => {
  const [state, setState] = useSharedState();
  const [search, setSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {}, [state.modalOpenState]); //Fixes a bug the set state function doesn't update after a change screen in mobile
  return (
    <Box
      {...boxProps}
      sx={{
        ...boxProps.sx,
        display: "grid",
        //   gridTemplateRows: "60px",
        gridTemplateColumns: "1fr 50px 50px 50px 50px",
        gridTemplateRows: "50px",
        gridTemplateAreas: "'. i1 i2 logout options'",
        placeItems: "center",
      }}
    >
      {searchParams.get("s") === null ? (
        <IconButton
          sx={{
            //   m: "3px",
            p: "8px",
            backdropFilter: "blur(8px)",
            bgcolor: "rgba(255,255,255,0.5)",
            gridArea: "i1",
            border: "1px solid",
            borderColor: "primary.main",
            color: "primary.main",
            ":hover": {
              bgcolor: "rgba(255,255,255,0.3)",
            },
          }}
          onClick={() => {
            setSearchParams({ ...Object.fromEntries(searchParams), s: "" });
          }}
          size="large"
        >
          <SearchRoundedIcon />
        </IconButton>
      ) : undefined}

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
      {/* <IconButton
        sx={{
          //   m: "3px",
          p: "0px",
          backdropFilter: "blur(8px)",
          bgcolor: "rgba(255,255,255,0.5)",
          gridArea: "i2",
          border: "1px solid",
          borderColor: "primary.main",
          color: "primary.main",
          ":hover": {
            bgcolor: "rgba(255,255,255,0.3)",
          },
        }}
        // onClick={() => {
        //   state.modalOpenState?.[1](true);
        // }}
        size="large"
      > */}
      <SortMenu
        sx={{
          gridArea: "i2",

          p: "0px",
          backdropFilter: "blur(8px)",
          bgcolor: "rgba(255,255,255,0.5)",
          border: "1px solid",
          borderRadius: "50%",
          borderColor: "primary.main",
          color: "primary.main",
          ":hover": {
            bgcolor: "rgba(255,255,255,0.3)",
          },
        }}
      />

      {/* <IconButton
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
      </IconButton> */}
      {/* <Chip
        style={{ position: "absolute", top: "75px", left: "350px" }}
        label="🧪 Work in Progress"
      /> */}
    </Box>
  );
};
export default LoaderHead;
