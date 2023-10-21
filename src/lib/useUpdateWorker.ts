import {Dispatch, useEffect, useState} from 'react';
import {singletonHook} from 'react-singleton-hook';
import {useSharedState} from '../Store';
import {talkingWorker} from './WebWorkersInterfaces';
//sabre
const IHateSingletonHookCreator = (
  action: 'fullUpdate',
  args: {user: string}
) => {
  console.log('Running');
  console.log(talkingWorker);
  talkingWorker.postMessage({
    type: 'start',
    action: action,
    arguments: {user: args.user},
  });
};

export const updateWorker = () => {
  const [state, setState] = useSharedState();
  const [status, setStatus] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  // const wrk = useRef<Worker>(talkingWorker);
  // const run = useCallback((action: "fullUpdate", args: { user: string }) => {
  //   console.log("Running");
  //   console.log(talkingWorker);
  //   talkingWorker.postMessage({
  //     type: "start",
  //     action: action,
  //     arguments: { user: args.user },
  //   });
  // }, []);
  const run = IHateSingletonHookCreator;

  // const getResult = () => {
  //   setResult(null);
  //   return result;
  // };

  useEffect(() => {
    console.log('Setting Up WorkerHook');
    talkingWorker.onmessage = e => {
      console.log(e);
      e.data.type === 'status' && setStatus([e.data.status, e.data.log]);
      e.data.type === 'result' && setResult(e.data);
      e.data.type === 'error' && setError(e.data.error);
    };
  }, []);

  return {run, status, result, setResult, setStatus, error};
};

export const useUpdateWorker = singletonHook(
  {
    run: IHateSingletonHookCreator,
    status: null,
    result: null,
    setResult: (() => {}) as Dispatch<any>,
    setStatus: (() => {}) as Dispatch<any>,
    error: null,
  },
  updateWorker
);
