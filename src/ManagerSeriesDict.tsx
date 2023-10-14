import {FC, useCallback, useEffect} from 'react';
import {useSharedState} from './Store';
import {useUpdateWorker} from './lib/useUpdateWorker';
import {getSortFc, updateCompletion} from './Utils';
import {isCachesAvailable} from './lib/CacheUtils';
import {globalStateType, serieStatusType, seriesListElementType} from './Types';
import {useSearchParams} from 'react-router-dom';
import {matchSorter} from 'match-sorter';
import {SERIE_STATUS} from './lib/consts';

//Ideally this component should be the only one processing the result from the worker
const ManagerSeriesDict: FC = () => {
  const [state, setState] = useSharedState();
  const [searchParams, setSearchParams] = useSearchParams();

  // Divide series dict into 4 arrays, one for each status
  const split = (series: seriesListElementType[]) => {
    console.log('seriesByStatus');
    const res: Partial<{
      [key in Partial<serieStatusType>]: seriesListElementType[];
    }> = {};
    for (const status of SERIE_STATUS) {
      res[status] = series.filter(serie => {
        return serie.status === status;
      });
    }
    console.log(res?.['COMPLETE']?.length ?? 0);
    return {...res};
  };

  const searchSort = (series: seriesListElementType[], query: string) => {
    return matchSorter(
      // Object.values(state.seriesDict ?? []).filter((serie) => {
      //   return !state.userOptions.statusFilter.includes(serie.status);
      // }),
      series,
      query,
      {
        keys: ['series.nodes.*.titles'],
        // Doesn't make sense to sort something that is sorted by pertinence
        sorter: query
          ? undefined
          : rankedItems => {
              return getSortFc(state.userOptions.sort.type)(
                rankedItems,
                state.userOptions.sort.inverted
              );
            },
      }
    );
  };

  useEffect(() => {
    if (!searchParams) return;
    console.log('Found filtering params');
    setState(state => {
      return {
        ...state,
        seriesByStatus: split(
          searchSort(
            Object.values(state.seriesDict),
            searchParams.get('s') ?? ''
          )
        ),
      };
    });
  }, [
    searchParams,
    state.seriesDictFlag,
    state.userOptions.sort.type,
    state.userOptions.sort.inverted,
  ]);

  return null;
};

export default ManagerSeriesDict;
