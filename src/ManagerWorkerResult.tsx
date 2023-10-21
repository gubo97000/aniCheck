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
    if (isCachesAvailable()) {
      console.log(stateToCache);
      caches.open(state.user?.name?.toLowerCase() ?? '').then(ch => {
        ch.put(
          'cachedState',
          new Response(
            JSON.stringify({
              seriesDict: stateToCache.seriesDict,
              globalStats: stateToCache.globalStats,

              //Not really necessary here
              userOptions: state.userOptions,
              user: state.user,
              userHist: state.usersHist,
            }),
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

  return null;
};

export default ManagerWorkerResult;
