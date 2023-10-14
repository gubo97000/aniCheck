import {createEndpoint} from 'comlink';

// Worker Instance
export const workerInstance = new ComlinkWorker<typeof import('../worker')>(
  new URL('../worker', import.meta.url),
  {
    name: 'AniCheckWorker',
  }
);

export const workerPort = await workerInstance[createEndpoint]();

export const talkingWorker = new Worker(
  new URL('./customWorker', import.meta.url),
  {
    type: 'module',
  }
);
