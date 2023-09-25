import { BoxProps, Box, Chip, useMediaQuery } from "@mui/material";
import React, { FC } from "react";
import ListViz from "./ListViz";
import Nav from "./Nav";
import { useSharedState } from "./Store";
import Viz from "./Viz";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import ViewModuleRoundedIcon from "@mui/icons-material/ViewModuleRounded";
import { Outlet, useLocation } from "react-router-dom";
import Notifier from "./Notifier";
import ManagerWorkerResult from "./ManagerWorkerResult";
import { useUpdateWorker } from "./lib/useUpdateWorker";

const MainApp: FC<BoxProps> = (boxProps) => {
  const [state, setState] = useSharedState();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 600px)");
  useUpdateWorker(); //Because someones other than me is shitty at coding
  // console.log(location.pathname.split("/").length);
  return (
    <>
      {isMobile ? (
        <Box sx={{ bgcolor: "background.default", height: "100%" }}>
          {location.pathname.split("/").length == 4 ? (
            state.userOptions.vizMode == "graph" ? (
              <Viz
                sx={{
                  height: "100vh",
                }}
              />
            ) : (
              <ListViz
                sx={{
                  height: "100vh",
                }}
              />
            )
          ) : (
            <Nav sx={{ height: "100vh" }}></Nav>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: state.userOptions.cyShowNav
              ? {
                  xs: "0px 100%",
                  sm: " calc(100% - 500px) 500px",
                }
              : {
                  xs: "0px 100%",
                  sm: "100% 0px",
                },
            gridTemplateAreas: "'viz nav'",
            height: "100vh",
            bgcolor: "background.default",
            position: "relative",
          }}
        >
          {state.userOptions.vizMode == "graph" ? (
            <Viz
              sx={{
                gridArea: "viz",
              }}
            />
          ) : (
            <ListViz
              sx={{
                gridArea: "viz",
              }}
            />
          )}
          {state.userOptions.vizMode == "graph" ? (
            <Chip
              sx={{ gridArea: "viz", position: "absolute", top: 10, right: 10 }}
              label={"List View"}
              icon={<ViewModuleRoundedIcon />}
              clickable={true}
              onClick={() => {
                setState((state) => {
                  return {
                    ...state,
                    userOptions: { ...state.userOptions, vizMode: "list" },
                  };
                });
              }}
            />
          ) : (
            <Chip
              sx={{ gridArea: "viz", position: "absolute", top: 10, right: 10 }}
              label={"Relations Graph"}
              icon={<AccountTreeRoundedIcon />}
              clickable={true}
              onClick={() => {
                setState((state) => {
                  return {
                    ...state,
                    userOptions: { ...state.userOptions, vizMode: "graph" },
                  };
                });
              }}
            />
          )}
          <Nav
            sx={{
              gridArea: "nav",
            }}
          />
        </Box>
      )}
      <Notifier />;
      <ManagerWorkerResult />;
    </>
  );
};

export default MainApp;
