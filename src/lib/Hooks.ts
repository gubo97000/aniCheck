import {useCallback, useEffect, useState} from 'react';
// import {workerInstance} from './WebWorkersInterfaces';

/// HOOKS
//Local storage hook
export function useStateWithLocalStorage<T>(
  localStorageKey: string,
  defaultValue: any = null
): [T, React.Dispatch<React.SetStateAction<T>>] {
  try {
    JSON.parse(
      localStorage.getItem(localStorageKey) ?? JSON.stringify(defaultValue)
    );
  } catch (error) {
    console.log('Old Data found, trying to reset');
    localStorage.removeItem(localStorageKey);
  }

  const [value, setValue] = useState<T>(
    JSON.parse(
      localStorage.getItem(localStorageKey) ?? JSON.stringify(defaultValue)
    ) as T
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

//Possibly better version, still to check
function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}

// Debounce Hook
export function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

// Async Hook
export const useAsync = <T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'success' | 'error'
  >('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setStatus('pending');
    setValue(null);
    setError(null);
    return asyncFunction()
      .then((response: any) => {
        setValue(response);
        setStatus('success');
      })
      .catch((error: any) => {
        setError(error);
        setStatus('error');
      });
  }, [asyncFunction]);
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return {execute, status, value, error};
};

// Media Query Hook
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};

//
// export const useAPIs = () => {
//   const [state, setState] = useSharedState();
//   const wComputeData = useCallback(
//     async (
//       data: any[],
//       relationPriority: {
//         [key: string]: number;
//       },
//       problematicEles: string[]
//     ) => {
//       console.log('ComputeData');
//       return await workerInstance.wComputeData(
//         data,
//         relationPriority,
//         problematicEles
//       );
//     },
//     []
//   );
//   const computeUser = () => {
//     setState(state => {
//       return {
//         ...state,
//         user: {
//           name: statusUser.data.User.name,
//           color:
//             COLOR_CODES[statusUser.data.User.options.profileColor] ??
//             statusUser.data.User.options.profileColor,
//           avatar: statusUser.data.User.avatar.medium,
//           cover: statusUser.data.User.bannerImage,
//         },
//       };
//     });
//   };
//   const asyncCompute = async () => {
//     const seriesDict = await wComputeData(
//       [
//         ...statusAnime.data.MediaListCollection.lists,
//         ...statusManga.data.MediaListCollection.lists,
//       ],
//       relationPriority,
//       problematicNodes
//     );
//     // setState(state => { return { ...state, seriesDict: seriesDict, } })
//     setState(state => updateCompletion({...state, seriesDict: seriesDict}));
//   };
//   //Apollo queries creation
//   const [getUser, statusUser] = useLazyQuery(Queries.GET_USER, {
//     notifyOnNetworkStatusChange: true,
//     onCompleted: () => {
//       computeUser();
//       getAnimeLists({
//         variables: {user: state.user.name, type: 'ANIME'},
//       });
//     },
//   });
//   const [getAnimeLists, statusAnime] = useLazyQuery(Queries.GET_LISTS, {
//     notifyOnNetworkStatusChange: true,
//     onCompleted: () => {
//       getMangaLists({
//         variables: {user: state.user.name, type: 'MANGA'},
//       });
//     },
//   });
//   const [getMangaLists, statusManga] = useLazyQuery(Queries.GET_LISTS, {
//     notifyOnNetworkStatusChange: true,
//     onCompleted: asyncCompute,
//     // onCompleted: syncCompute,
//   });
//   useEffect(() => {
//     let status: globalStateType['status'][0] = 'success';
//     let log: globalStateType['status'][1] = ' ';
//     if (statusUser.loading) {
//       status = 'loading';
//       log = 'Loading User Info';
//     } else if (statusAnime.loading) {
//       status = 'loading';
//       log = 'Loading your Anime List';
//     } else if (statusManga.loading) {
//       status = 'loading';
//       log = 'Loading your Manga List';
//       // } else if (statusWorker == "RUNNING") {
//       //   status = "loading";
//       //   log = "Computing received data";
//     } else if (statusUser.error) {
//       status = 'error';
//       log = statusUser.error.message;
//     } else if (statusAnime.error) {
//       status = 'error';
//       log = statusAnime.error.message;
//     } else if (statusManga.error) {
//       status = 'error';
//       log = statusManga.error.message;
//     }
//     setState(state => {
//       return {...state, status: [status, log]};
//     });
//   }, [statusUser, statusAnime, statusManga]);
//   const startQuery = () => {
//     setState(state => {
//       return {...state, status: ['ok', ' ']};
//     });
//     getUser({variables: {user: state.user.name}});
//   };
//   const getLists = () => {
//     startQuery();
//   };

//   return {getLists};
// };
