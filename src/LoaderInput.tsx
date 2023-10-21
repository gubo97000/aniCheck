import {
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
} from '@mui/material';
import React, {FC, useCallback} from 'react';

import {useLazyQuery} from '@apollo/client';
import EastRounded from '@mui/icons-material/EastRounded';
import Box, {BoxProps} from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import {problematicNodes} from './ProblematicNodes';
import * as Queries from './Queries';
import {useSharedState} from './Store';
import {
  COLOR_CODES,
  computeData,
  relationPriority,
  updateCompletion,
} from './Utils';
import {useStateWithLocalStorage} from './lib/Hooks';
import {workerInstance} from './lib/WebWorkersInterfaces';
import {useUpdateWorker} from './lib/useUpdateWorker';

const LoaderInput: FC<BoxProps> = ({...boxProps}) => {
  const [state, setState] = useSharedState();
  const [usr, setUsr] = useStateWithLocalStorage<string>('usr', '');
  const navigate = useNavigate();
  const {run, result} = useUpdateWorker();
  const statusWorker = 'FINISHED'; // TODO: delete this line

  const wComputeData = useCallback(
    async (
      data: any[],
      relationPriority: {
        [key: string]: number;
      },
      problematicEles: string[]
    ) => {
      console.log('ComputeData');
      return await workerInstance.wComputeData(
        data,
        relationPriority,
        problematicEles
      );
    },
    []
  );
  // useEffect(() => {
  //   if (!result) return;
  //   setState((state) =>
  //     updateCompletion({ ...state, seriesDict: getResult() })
  //   );
  // }, [result]);
  // const wComputeData = async (
  //   data: any[],
  //   relationPriority: {
  //     [key: string]: number;
  //   },
  //   problematicEles: string[]
  // ) => {
  //   console.log("ComputeData");
  //   return await workerInstance.wComputeData(
  //     data,
  //     relationPriority,
  //     problematicEles
  //   );
  // };

  const startQuery = () => {
    setState(state => {
      return {...state, status: ['ok', ' ']};
    });
    getUser({variables: {user: usr}});
  };

  const asyncCompute = async () => {
    // let seriesDict = await workerFn(
    //   [
    //     ...statusAnime.data.MediaListCollection.lists,
    //     ...statusManga.data.MediaListCollection.lists,
    //   ],
    //   relationPriority,
    //   problematicNodes
    // );
    const seriesDict = await wComputeData(
      [
        ...statusAnime.data.MediaListCollection.lists,
        ...statusManga.data.MediaListCollection.lists,
      ],
      relationPriority,
      problematicNodes
    );

    // setState(state => { return { ...state, seriesDict: seriesDict, } })
    setState(state => updateCompletion({...state, seriesDict: seriesDict}));
  };

  const syncCompute = () => {
    const seriesDict = computeData(
      [
        ...statusAnime.data.MediaListCollection.lists,
        ...statusManga.data.MediaListCollection.lists,
      ],
      relationPriority,
      problematicNodes
    );
    // setState(state => { return updateCompletion({ ...state, seriesDict: seriesDict, }) })
    setState(state => {
      return {...updateCompletion({...state, seriesDict: seriesDict})};
    });
    // setState(state => { return { ...state, seriesDict: seriesDict, } })
  };

  const computeUser = () => {
    setState(state => {
      return {
        ...state,
        user: {
          name: statusUser.data.User.name,
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
      run('fullUpdate', {user: statusUser.data.User.name});
      // getAnimeLists({
      //   variables: { user: usr, type: "ANIME" },
      // });
    },
  });
  const [getAnimeLists, statusAnime] = useLazyQuery(Queries.GET_LISTS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      getMangaLists({
        variables: {user: usr, type: 'MANGA'},
      });
    },
  });
  const [getMangaLists, statusManga] = useLazyQuery(Queries.GET_LISTS, {
    notifyOnNetworkStatusChange: true,
    onCompleted: asyncCompute,
    // onCompleted: syncCompute,
  });

  // useEffect(() => {
  //   let status: globalStateType['status'][0] = 'ok';
  //   let log: globalStateType['status'][1] = ' ';
  //   if (statusUser.loading) {
  //     status = 'loading';
  //     log = 'Loading User Info';
  //   } else if (statusAnime.loading) {
  //     status = 'loading';
  //     log = 'Loading your Anime List';
  //   } else if (statusManga.loading) {
  //     status = 'loading';
  //     log = 'Loading your Manga List';
  //   } else if (statusWorker == 'RUNNING') {
  //     status = 'loading';
  //     log = 'Computing received data';
  //   } else if (statusUser.error) {
  //     status = 'error';
  //     log = statusUser.error.message;
  //   } else if (statusAnime.error) {
  //     status = 'error';
  //     log = statusAnime.error.message;
  //   } else if (statusManga.error) {
  //     status = 'error';
  //     log = statusManga.error.message;
  //   }
  //   setState(state => {
  //     return {...state, status: [status, log]};
  //   });
  // }, [statusUser, statusAnime, statusManga, statusWorker]);

  return (
    <Box {...boxProps}>
      <FormControl
        sx={{m: 1, width: '100%'}}
        variant="standard"
        error={state.status[0] === 'error'}
      >
        <Input
          sx={{
            //   color: "white",
            fontSize: '20px',
          }}
          id="standard"
          placeholder="AniList Nick"
          // type={values.showPassword ? 'text' : 'password'}
          value={usr}
          onChange={event => {
            setUsr(event.target.value);
          }}
          onKeyPress={ev => {
            if (ev.key === 'Enter' && state.status[0] !== 'loading') {
              navigate(usr);
              startQuery();
            }
          }}
          endAdornment={
            <InputAdornment position="end">
              {state.status[0] === 'loading' ? (
                <CircularProgress />
              ) : (
                <IconButton
                  aria-label="get user anime"
                  onClick={() => {
                    navigate(usr);
                    startQuery();
                  }}
                  size="large"
                >
                  <EastRounded />
                </IconButton>
              )}
            </InputAdornment>
          }
        />
        <FormHelperText
          error={state.status[0] === 'error'}
          id="standard-weight-helper-text"
          sx={{}}
        >
          {state.status[1]}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};
export default LoaderInput;
