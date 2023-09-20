/**
 * Checks if the `caches` API is available in the current environment.
 * @returns A boolean indicating whether the `caches` API is available.
 */
export const isCachesAvailable = () => {
    return "caches" in self;
};

/**
 * Deletes a cache entry with the specified key.
 * @param key - The key of the cache entry to delete.
 */
export const deleteCache = async (key: string) => {
  try {
    await caches.delete(key);
  } catch (error) {
    console.log(error);
  }
};
