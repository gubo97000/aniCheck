import {FC, useEffect} from 'react';
import {useSharedState} from './Store';
import {globalStateType} from './Types';
import {updateCompletion} from './Utils';
import {isCachesAvailable} from './lib/CacheUtils';
import {useUpdateWorker} from './lib/useUpdateWorker';

//Ideally this component should be the only one processing the result from the worker
const ManagerWorkerResult: FC = () => {
  const {run, result, setResult} = useUpdateWorker();
  const [state, setState] = useSharedState();

  //Caching the results
  const updateCache = (stateToCache: Partial<globalStateType>) => {
    // const username = `${(localStorage.getItem('usr') ?? '')
    //   .slice(1, -1)
    //   .toLowerCase()
    //   .trim()}`;
    const username = stateToCache.user?.name;
    if (isCachesAvailable()) {
      if (!username) {
        console.log('No user found');
        return;
      }
      console.log(stateToCache);
      caches.open(username.toLowerCase()).then(ch => {
        ch.put(
          '/cachedState',
          new Response(
            // JSON.stringify({
            //   seriesDict: stateToCache.seriesDict,
            //   globalStats: stateToCache.globalStats,

            //   //Not really necessary here
            //   userOptions: state.userOptions,
            //   user: state.user,
            //   userHist: state.usersHist,
            // }),
            JSON.stringify(stateToCache),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
        ).then(
          () => console.log('Cache updated'),
          () => console.log('Cache not updated')
        );
      });
    } else {
      console.log('Caches not available');
    }
    return stateToCache;
  };

  useEffect(() => {
    if (!result) return;
    console.log('Processing result');
    switch (result.action) {
      case 'fullUpdate':
        setState(state => {
          return {
            ...state,
            ...updateCache(
              updateCompletion({...state, seriesDict: result.result})
            ),
          };
        });
        break;
    }
    setResult(null);
  }, [result]);

  //This shouldn't be here, but it's a quick fix
  useEffect(() => {
    console.log('Options changed, saving to cache');
    setState(state => {
      return {
        ...state,
        ...updateCache({...state, userOptions: state.userOptions}),
      };
    });
  }, [state.userOptions]);

  return null;
};

export default ManagerWorkerResult;
