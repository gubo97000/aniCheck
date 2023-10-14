import {problematicNodes} from '../ProblematicNodes';
import {computeData, relationPriority} from '../Utils';
import {GET_LISTS} from './queries';

const started = {fullUpdate: false};
// const self = self as DedicatedWorkerGlobalScope;
self.onmessage = async e => {
  const data: {
    type: 'start';
    action: 'fullUpdate';
    arguments: {user: string};
  } = e.data;
  console.log(e);

  if (data.type === 'start') {
    switch (data.action) {
      case 'fullUpdate':
        if (started.fullUpdate) {
          console.log('Already executing the action');
          return;
        }
        started.fullUpdate = true;
        self.postMessage({
          type: 'status',
          status: 'loading',
          log: 'Loading your Anime&Manga List',
        });

        const animeRes = fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            query: GET_LISTS,
            variables: {user: data.arguments.user, type: 'ANIME'},
          }),
        });

        const mangaRes = fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            query: GET_LISTS,
            variables: {user: data.arguments.user, type: 'MANGA'},
          }),
        });

        const [animeResponse, mangaResponse] = (await Promise.all([
          animeRes,
          mangaRes,
        ]).then(([animeRes, mangaRes]) =>
          Promise.all([animeRes.json(), mangaRes.json()])
        )) as [any, any];
        console.log(animeResponse, mangaResponse);

        self.postMessage({
          type: 'status',
          status: 'loading',
          log: '⚙ Computing received data',
        });

        const res = computeData(
          [
            ...animeResponse.data.MediaListCollection.lists,
            ...mangaResponse.data.MediaListCollection.lists,
          ],
          relationPriority,
          problematicNodes
        );

        self.postMessage({
          type: 'status',
          status: 'success',
          log: '✅ Computation Completed!',
        });
        self.postMessage({type: 'result', action: 'fullUpdate', result: res});
        started.fullUpdate = false;
        break;

      default:
        console.log('Unknown action');
        break;
    }
  }
};
