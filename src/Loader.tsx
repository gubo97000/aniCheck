import {
  Avatar,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";
import React, {
  useState,
  useRef,
  useLayoutEffect,
  useContext,
  useEffect,
  FC,
} from "react";
import { render } from "react-dom";
import * as vis from "vis-network";
import cytoscape, { EdgeCollection } from "cytoscape";
import siteIcon from "./favicon.png";

import { parseAndCheckHttpResponse, useLazyQuery } from "@apollo/client";
import { useSharedState } from "./Store";
import * as Queries from "./Queries";
import {
  COLOR_CODES,
  computeData,
  relationPriority,
  updateCompletion,
  useStateWithLocalStorage,
} from "./Utils";
import { globalStateType, seriesListElementType, statsType } from "./Types";
import EastRounded from "@material-ui/icons/EastRounded";
import { round } from "lodash";
import { avoidNodes, problematicNodes } from "./ProblematicNodes";
import { useWorker } from "@koale/useworker";
import { getUntrackedObject } from "react-tracked";
import { CheckBoxOutlineBlank } from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import LoaderHead from "./LoaderHead";
import Typography from "@material-ui/core/Typography";

const Loader: FC = () => {
  const [state, setState] = useSharedState();
  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          display: "grid",
          gridTemplateRows: "40px 10px 70px",
          gridTemplateColumns: "70px 1fr",
          gridTemplateAreas: "'head head' '. .' 'avatar username'",

          background: `url(${state.user.cover}) no-repeat center center`,

          backgroundSize: "cover",
          // borderRadius:"5px",
          overflow: "hidden",
          // boxShadow: "inset 0 -50px 10px -10px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Box //Shadow
          sx={{
            position: "absolute",
            background:
              "linear-gradient(180deg,rgba(6,13,34,0) 40%,rgba(6,13,34,.6))",
            width: "100%",
            height: "100%",
            zIndex: "0",
          }}
        />
        <LoaderHead
          sx={{
            gridArea: "head",
          }}
        />
        <Box
          sx={{
            gridArea: "avatar",
            placeSelf: "strech strech",
            m: "0 0 0 2px",
          }}
        >
          <Avatar
            sx={{ width: "100%", height: "100%" }}
            src={state.user.avatar ?? siteIcon}
            variant="rounded"
          >
            {/* <AssignmentIcon /> */}
          </Avatar>
        </Box>
        <Box
          sx={{
            gridArea: "username",
            placeSelf: "center start",
            ml: "2%",
            zIndex: "1",
          }}
        >
          <Typography color="white" variant="h5">
            {state.user.name ?? "AniCheck"}
          </Typography>
        </Box>
      </Box>
      {state.status[0] == "loading" ? <LinearProgress /> : undefined}
    </Box>
  );
};
export default Loader;
