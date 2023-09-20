import React, { useState, useEffect, useMemo, FC } from "react";

import { useQuery, gql } from "@apollo/client";
import { useSharedState } from "./Store";
import { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import InfoModal from "./InfoModal";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import { Stack, Button, Badge, Divider, Tooltip } from "@mui/material";
import { getCyLayout } from "./Utils";
import IconButton from "@mui/material/IconButton";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import CenterFocusStrongRoundedIcon from "@mui/icons-material/CenterFocusStrongRounded";
import Popper from "@mui/material/Popper";
import CyFilterMenu from "./CyFilterMenu";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ClickAwayListener from "@mui/material/ClickAwayListener";

type props = {
  // badge: number;
};

const CyToolbar: FC<props & BoxProps> = ({ ...boxProps }) => {
  const [state, setState] = useSharedState();
  const [extraBadge, setExtraBadge] = useState(0);
  const [filterBadge, setFilterBadge] = useState(0);

  const handleClickLayout = (layoutTag: string) => {
    setState((state) => {
      let tempState = {
        ...state,
        userOptions: { ...state.userOptions, cyLayout: layoutTag },
      };
      state.cyViz?.elements().makeLayout(getCyLayout(tempState)).run();
      state.cyViz?.fit(undefined, 50);
      state.cyViz?.panBy({ x: -35, y: 0 });
      return tempState;
    });
  };

  const isSelectedLayout = (layoutTag: string) => {
    return state.userOptions.cyLayout == layoutTag ? "primary" : "default";
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClickFilter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  useEffect(() => {
    setState((state) => {
      setExtraBadge(() => {
        if (!state.userOptions.cyShowHidden && state.seriesSelected) {
          return state.seriesSelected?.serieComplete.nodes.length;
        }
        return 0;
      });

      setFilterBadge(() => {
        return state.cyViz?.filter(".hidden").length ?? 0;
      });

      return { ...state };
    });
  }, [
    state.cyViz,
    state.seriesSelected,
    state.userOptions.cyFilter,
    state.userOptions.cyShowHidden,
  ]);

  // useEffect(() => {
  //   setState((state) => {
  //     setFilterBadge(() => {
  //       return state.cyViz?.filter(".hidden").length ?? 0;
  //     });

  //     return { ...state };
  //   });
  // }, [
  //   state.userOptions.cyFilter,
  // ]);

  return (
    <Box
      {...boxProps}
      sx={{
        ...boxProps.sx,
        // boxShadow:1,
      }}
      // xs={12} sm={3}
    >
      <Box
        sx={{
          position: "absolute",
          top: "calc(20% - 60px)",
          right: "20px",
          bgcolor:"background.paper",
          boxShadow: 1,
          borderRadius: "50px",
        }}
      >
        <Tooltip
          title={
            state.userOptions.cyShowNav ? "Hide Side Nav" : "Show Side Nav"
          }
          placement="left"
          disableInteractive
        >
          <IconButton
            onClick={() => {
              setState((state) => {
                return {
                  ...state,
                  userOptions: {
                    ...state.userOptions,
                    cyShowNav: !state.userOptions.cyShowNav,
                  },
                };
              });
            }}
            size="large">
            {state.userOptions.cyShowNav ? (
              <ArrowForwardIosRoundedIcon />
            ) : (
              <ArrowBackIosRoundedIcon />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Stack
        sx={{
          position: "absolute",
          top: "20%",
          right: "20px",
          bgcolor:"background.paper",
          boxShadow: 1,
          borderRadius: "10px",
        }}
        spacing={0.5}
      >
        <Tooltip title="Center View" placement="left" disableInteractive>
          <IconButton
            onClick={() => {
              state.cyViz?.fit(undefined, 50);
              state.cyViz?.panBy({ x: -35, y: 0 });
            }}
            size="large">
            <CenterFocusStrongRoundedIcon />
          </IconButton>
        </Tooltip>
        <Divider />
        <Tooltip title="Horizontal Layout" placement="left" disableInteractive>
          <IconButton
            onClick={() => handleClickLayout("klay")}
            color={isSelectedLayout("klay")}
            size="large">
            <AccountTreeRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Vertical Layout" placement="left" disableInteractive>
          <IconButton
            sx={{
              transform: "rotate(90deg)",
            }}
            onClick={() => handleClickLayout("dagre")}
            color={isSelectedLayout("dagre")}
            size="large">
            <AccountTreeRoundedIcon />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title="Elk Layout" placement="left" disableInteractive>
          <IconButton
            sx={{
              transform: "rotate(90deg)",
            }}
            onClick={() => handleClickLayout("elk")}
            color={isSelectedLayout("elk")}
          >
            <AccountTreeRoundedIcon />
          </IconButton>
        </Tooltip> */}
        <Divider />
        <Box>
          <Tooltip
            title={
              state.seriesSelected?.serieComplete.nodes.length == 0
                ? "No related series"
                : state.userOptions.cyShowHidden
                ? "Showing Related"
                : `Show ${extraBadge} Related Elements`
            }
            placement="left"
            disableInteractive
          >
            <Badge badgeContent={extraBadge} color="primary">
              <IconButton
                onClick={() => {
                  setState((state) => {
                    return {
                      ...state,
                      userOptions: {
                        ...state.userOptions,
                        cyShowHidden: !state.userOptions.cyShowHidden,
                      },
                    };
                  });
                }}
                color={state.userOptions.cyShowHidden ? "primary" : "default"}
                disabled={state.seriesSelected?.serieComplete.nodes.length == 0}
                size="large">
                <AddCircleRoundedIcon />
              </IconButton>
            </Badge>
          </Tooltip>
        </Box>
        <Divider />
        <ClickAwayListener
          onClickAway={() => {
            setAnchorEl(null);
          }}
        >
          <Box>
            <Tooltip
              title={
                filterBadge ? `Hiding ${filterBadge} Nodes` : "Filter Nodes"
              }
              placement="left"
              disableInteractive
            >
              <Badge badgeContent={filterBadge} color="primary">
                <IconButton
                  onClick={handleClickFilter}
                  color={
                    state.userOptions.cyFilter.length != 0
                      ? "primary"
                      : "default"
                  }
                  size="large">
                  <FilterAltRoundedIcon />
                </IconButton>
              </Badge>
            </Tooltip>
            <Popper
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              placement="left"
              disablePortal={false}
              modifiers={[
                {
                  name: "flip",
                  enabled: true,
                  options: {
                    altBoundary: true,
                    rootBoundary: "viewport",
                    padding: 8,
                  },
                },
                {
                  name: "preventOverflow",
                  enabled: true,
                  options: {
                    altAxis: true,
                    altBoundary: true,
                    tether: true,
                    rootBoundary: document,
                    padding: 8,
                  },
                },
                {
                  name: "arrow",
                  enabled: true,
                  options: {
                    element: anchorEl,
                  },
                },
              ]}
            >
              <Box
                sx={{
                  bgcolor: "white",
                  p: 2,
                  borderRadius: "10px",
                  width: "300px",
                  boxShadow: 1,
                }}
              >
                <CyFilterMenu />
              </Box>
            </Popper>
          </Box>
        </ClickAwayListener>
      </Stack>
    </Box>
  );
};

export default CyToolbar;
