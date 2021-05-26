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

const Loader: FC = () => {
  const [state, setState] = useSharedState();
  const [usr, setUsr] = useStateWithLocalStorage<string>("usr", "");
  const [workerFn, { status: statusWorker, kill: killWorker }] = useWorker(
    computeData,
    {
      remoteDependencies: [
        "https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.18.2/cytoscape.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/tslib/2.2.0/tslib.min.js",
      ],
    }
  );

  const startQuery = () => {
    setState((state) => {
      return { ...state, status: ["ok", " "] };
    });
    getUser({ variables: { user: usr } });
  };

  const asyncCompute = async () => {
    let seriesDict = await workerFn(
      [
        ...statusAnime.data.MediaListCollection.lists,
        ...statusManga.data.MediaListCollection.lists,
      ],
      relationPriority,
      problematicNodes
    );
    // setState(state => { return { ...state, seriesDict: seriesDict, } })
    setState((state) =>
      updateCompletion({ ...state, seriesDict: seriesDict })
    );
  };

  const syncCompute = () => {
    let seriesDict = computeData(
      [
        ...statusAnime.data.MediaListCollection.lists,
        ...statusManga.data.MediaListCollection.lists,
      ],
      relationPriority,
      problematicNodes
    );
    // setState(state => { return updateCompletion({ ...state, seriesDict: seriesDict, }) })
    setState((state) => {
      return { ...updateCompletion({ ...state, seriesDict: seriesDict }) };
    });
    // setState(state => { return { ...state, seriesDict: seriesDict, } })
  };

  const computeUser = () => {
    setState((state) => {
      return {
        ...state,
        user: {
          color:
            COLOR_CODES[statusUser.data.User.options.profileColor] ??
            statusUser.data.User.options.profileColor,
          avatar: statusUser.data.User.avatar.medium,
          cover: statusUser.data.User.bannerImage,
        },
      };
    });
  };

  //Apollo queries creation
  const [getUser, statusUser] = useLazyQuery(Queries.GET_USER, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      computeUser();
      getAnimeLists({
        variables: { user: usr, type: "ANIME" },
      });
    },
  });
  const [getAnimeLists, statusAnime] = useLazyQuery(Queries.GET_LISTS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      getMangaLists({
        variables: { user: usr, type: "MANGA" },
      });
    },
  });
  const [getMangaLists, statusManga] = useLazyQuery(Queries.GET_LISTS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: asyncCompute,
    // onCompleted: syncCompute,
  });

  useEffect(() => {
    let status: globalStateType["status"][0] = "ok";
    let log: globalStateType["status"][1] = " ";
    if (statusUser.loading) {
      status = "loading";
      log = "Loading User Info";
    } else if (statusAnime.loading) {
      status = "loading";
      log = "Loading your Anime List";
    } else if (statusManga.loading) {
      status = "loading";
      log = "Loading your Manga List";
    } else if (statusWorker == "RUNNING") {
      status = "loading";
      log = "Computing received data";
    } else if (statusUser.error) {
      status = "error";
      log = statusUser.error.message;
    } else if (statusAnime.error) {
      status = "error";
      log = statusAnime.error.message;
    } else if (statusManga.error) {
      status = "error";
      log = statusManga.error.message;
    }
    setState((state) => {
      return { ...state, status: [status, log] };
    });
  }, [statusUser, statusAnime, statusManga, statusWorker]);

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
          }}
        />
        <LoaderHead sx={{
          gridArea:"head"
        }}/>
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
        <Box sx={{ gridArea: "username" }}>
          <FormControl
            sx={{ m: 1, width: "100%" }}
            variant="standard"
            error={state.status[0] == "error"}
          >
            <Input
              sx={{ color: "white", fontSize: "20px" }}
              id="standard-adornment-password"
              placeholder="AniList Nick"
              // type={values.showPassword ? 'text' : 'password'}
              value={usr}
              onChange={(event) => {
                setUsr(event.target.value);
              }}
              onKeyPress={(ev) => {
                if (ev.key == "Enter" && state.status[0] != "loading") {
                  startQuery();
                }
              }}
              endAdornment={
                <InputAdornment position="end">
                  {state.status[0] == "loading" ? (
                    <CircularProgress />
                  ) : (
                    <IconButton
                      aria-label="get user anime"
                      onClick={startQuery}
                    >
                      <EastRounded />
                    </IconButton>
                  )}
                </InputAdornment>
              }
            />
            <FormHelperText
              error={state.status[0] == "error"}
              id="standard-weight-helper-text"
            >
              {state.status[1]}
            </FormHelperText>
          </FormControl>
        </Box>
      </Box>
      {state.status[0] == "loading" ? <LinearProgress /> : undefined}
    </Box>
  );
};
export default Loader;
