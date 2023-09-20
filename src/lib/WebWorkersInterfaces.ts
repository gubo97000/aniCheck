// Worker Instance
export const workerInstance = new ComlinkWorker<typeof import("../worker")>(
    new URL("../worker", import.meta.url)
  );