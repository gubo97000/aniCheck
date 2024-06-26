import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import AlbumRoundedIcon from '@mui/icons-material/AlbumRounded';
import BookIcon from '@mui/icons-material/Book';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import TheatersIcon from '@mui/icons-material/Theaters';
import TvIcon from '@mui/icons-material/Tv';
import cytoscape from 'cytoscape';
import {random} from 'lodash';
import React from 'react';
import {
  formatsBulkTermsType,
  formatsType,
  globalStateType,
  NodeType,
  relationsType,
  releaseStatusType,
  seriesListElementType,
  serieStatusType,
  statsType,
  statusType,
  userOptionType,
} from './Types';

/// CONSTANTS
export const FORMATS_IDS: formatsType[] = [
  'TV',
  'TV_SHORT',
  'MOVIE',
  'SPECIAL',
  'OVA',
  'ONA',
  'MUSIC',
  'MANGA',
  'ONE_SHOT',
  'NOVEL',
];
export const FORMATS: {
  [key in formatsType]: {
    id: formatsType;
    label: string;
    icon: React.ReactElement;
    tooltip: string;
  };
} = {
  TV: {
    id: 'TV',
    label: 'TV',
    icon: <TvIcon />,
    tooltip: 'Anime broadcast on television',
  },
  TV_SHORT: {
    id: 'TV_SHORT',
    label: 'TV Short',
    icon: <TvIcon />,
    tooltip:
      'Anime which are under 15 minutes in length and broadcast on television',
  },
  MOVIE: {
    id: 'MOVIE',
    label: 'Movie',
    icon: <TheatersIcon />,
    tooltip: 'Anime movies with a theatrical release',
  },
  SPECIAL: {
    id: 'SPECIAL',
    label: 'Special',
    icon: <TvIcon />,
    tooltip:
      'Special episodes that have been included in DVD/Blu-ray releases, picture dramas, pilots, etc',
  },
  OVA: {
    id: 'OVA',
    label: 'OVA',
    icon: <AlbumRoundedIcon />,
    tooltip:
      '(Original Video Animation) Anime that have been released directly on DVD/Blu-ray without originally going through a theatrical release or television broadcast',
  },
  ONA: {
    id: 'ONA',
    label: 'ONA',
    icon: <LanguageRoundedIcon />,
    tooltip:
      '(Original Net Animation) Anime that have been originally released online or are only available through streaming services.',
  },
  MUSIC: {
    id: 'MUSIC',
    label: 'Music',
    icon: <MusicVideoIcon />,
    tooltip: 'Short anime released as a music video',
  },
  MANGA: {
    id: 'MANGA',
    label: 'Manga',
    icon: <MenuBookIcon />,
    tooltip: 'Professionally published manga with more than one chapter',
  },
  NOVEL: {
    id: 'NOVEL',
    label: 'Novel',
    icon: <BookIcon />,
    tooltip: 'Written books released as a series of light novels',
  },
  ONE_SHOT: {
    id: 'ONE_SHOT',
    label: 'One Shot',
    icon: <MenuBookIcon />,
    tooltip: 'Manga with just one chapter',
  },
};
export const COLOR_CODES: {[key: string]: string} = {
  blue: '#3DB4F2',
  purple: '#C063FF',
  green: '#4CCA51',
  orange: '#EF881A',
  red: '#E13333',
  pink: '#FC9DD6',
  gray: '#677B94',
};
//Order is important for priority
export const RELATIONS: relationsType[] = [
  'CHARACTER',
  'SEQUEL',
  'SIDE_STORY',
  'SOURCE',
  'ALTERNATIVE',
  'SPIN_OFF',
  'SUMMARY',
  'COMPILATION',
  'CONTAINS',
  'PREQUEL',
  'ADAPTATION',
  'PARENT',
  'OTHER',
];
//use this to quickly get relation Priority
export const relationPriority = (() => {
  const dict: {[key: string]: number} = {};
  RELATIONS.map((v, i) => {
    dict[v] = i;
  });
  return dict as {[key in relationsType]: number};
})();

//Completion Status Dict
export const STATUSES: {
  [key in statusType]: {
    id: key;
    label: string;
    icon: React.ReactElement;
    tooltip: string;
    color: 'primary' | 'secondary' | 'default' | undefined;
  };
} = {
  CURRENT: {
    id: 'CURRENT',
    label: 'Watching',
    icon: <PlayCircleOutlineRoundedIcon />,
    tooltip: 'Currently watching',
    color: 'secondary',
  },
  PLANNING: {
    id: 'PLANNING',
    label: 'Plan To Watch',
    icon: <CloudCircleIcon />,
    tooltip: 'Planning to watch the anime',
    color: 'secondary',
  },
  COMPLETED: {
    id: 'COMPLETED',
    label: 'Completed',
    icon: <CheckCircleOutlineRoundedIcon />,
    tooltip: 'Completly watched',
    color: 'primary',
  },
  DROPPED: {
    id: 'DROPPED',
    label: 'Dropped',
    icon: <CheckCircleOutlineRoundedIcon />,
    tooltip: "Looks like you didn't like it!",
    color: 'primary',
  },
  PAUSED: {
    id: 'PAUSED',
    label: 'Paused',
    icon: <PauseCircleOutlineRoundedIcon />,
    tooltip: 'Taking a pause?',
    color: 'secondary',
  },
  REPEATING: {
    id: 'REPEATING',
    label: 'Repeating',
    icon: <CheckCircleOutlineRoundedIcon />,
    tooltip: 'You must really like this one!',
    color: 'primary',
  },
  NO: {
    id: 'NO',
    label: 'Missing',
    icon: <AdjustRoundedIcon />,
    tooltip: 'NO',
    color: undefined,
  },
};
//Release Status Dict
const _RELEASE_STATUS: {
  [key in releaseStatusType]: {
    id: key;
    label: string;
    icon: React.ReactElement;
    tooltip: string;
    color: 'primary' | 'secondary' | 'default' | undefined;
  };
} = {
  FINISHED: {
    id: 'FINISHED',
    label: 'Finished',
    icon: <CloudCircleIcon />,
    tooltip: 'Has completed and is no longer being released',
    color: 'secondary',
  },
  RELEASING: {
    id: 'RELEASING',
    label: 'Releasing',
    icon: <CloudCircleIcon />,
    tooltip: 'Currently releasing',
    color: 'secondary',
  },
  NOT_YET_RELEASED: {
    id: 'NOT_YET_RELEASED',
    label: 'Not Yet Released',
    icon: <CheckCircleOutlineRoundedIcon />,
    tooltip: 'To be released at a later date',
    color: 'primary',
  },
  CANCELLED: {
    id: 'CANCELLED',
    label: 'Cancelled',
    icon: <CheckCircleOutlineRoundedIcon />,
    tooltip: 'Ended before the work could be finished',
    color: 'primary',
  },
  HIATUS: {
    id: 'HIATUS',
    label: 'Hiatus',
    icon: <CloudCircleIcon />,
    tooltip:
      'Is currently paused from releasing and will resume at a later date',
    color: 'secondary',
  },
  UNKNOWN: {
    id: 'UNKNOWN',
    label: 'Unknown',
    icon: <CloudCircleIcon />,
    tooltip: 'A true mistery!',
    color: 'secondary',
  },
};
// Preventing errors when accessing unknown status
export const RELEASE_STATUS = new Proxy(_RELEASE_STATUS, {
  get: function (target, prop, receiver) {
    return prop in target
      ? target[prop as releaseStatusType]
      : target['UNKNOWN'];
  },
});

/// Sort Functions
export function sortWeight(
  rankedItems: {item: seriesListElementType; [key: string]: any}[],
  invert: boolean
) {
  return rankedItems.sort((itm1, itm2) => {
    return invert
      ? (itm1.item.stats['selected'].missWeight ?? 0) -
          (itm2.item.stats['selected'].missWeight ?? 0)
      : (itm2.item.stats['selected'].missWeight ?? 0) -
          (itm1.item.stats['selected'].missWeight ?? 0);
  });
}

export function sortWeightPer(
  rankedItems: {item: seriesListElementType; [key: string]: any}[],
  invert: boolean
) {
  return rankedItems.sort((itm1, itm2) => {
    const weight1 =
      (itm1.item.stats['selected'].gotPerWeight ?? 0) +
      (itm1.item.stats['selected'].planPerWeight ?? 0);
    const weight2 =
      (itm2.item.stats['selected'].gotPerWeight ?? 0) +
      (itm2.item.stats['selected'].planPerWeight ?? 0);
    return (invert ? -1 : 1) * (weight1 - weight2);
  });
}

export function sortComplete(
  rankedItems: {item: seriesListElementType; [key: string]: any}[],
  invert: boolean
) {
  return rankedItems.sort((itm1, itm2) => {
    const weight1 =
      (itm1.item.stats['selected']?.gotPer ?? 0) +
      (itm1.item.stats['selected']?.planPer ?? 0);
    const weight2 =
      (itm2.item.stats['selected']?.gotPer ?? 0) +
      (itm2.item.stats['selected']?.planPer ?? 0);
    return (invert ? -1 : 1) * (weight1 - weight2);
  });
}

export function sortAlphabetical(
  rankedItems: {item: seriesListElementType; [key: string]: any}[],
  invert: boolean
) {
  // console.log(rankedItems);
  return rankedItems.sort((itm1, itm2) => {
    return invert
      ? itm1.rankedValue[0].localeCompare(itm2.rankedValue)
      : itm2.rankedValue[0].localeCompare(itm1.rankedValue);
  });
}

export function sortSize(rankedItems: any[], invert: boolean) {
  return rankedItems.sort((itm1, itm2) => {
    return (invert ? -1 : 1) * (itm1.item.stats.tot - itm2.item.stats.tot);
  });
}

export function getSortFc(tag: string) {
  switch (tag) {
    case 'weight%':
      return sortWeightPer;

    case 'complete%':
      return sortComplete;

    case 'alphabetical':
      return sortAlphabetical;

    case 'size':
      return sortSize;

    case 'missWeight':
      return sortWeight;

    default:
      return sortAlphabetical;
  }
}

///Completion Calculations
/**
 * Return array of formats based on used preference.
 * @param term
 * @param userOptions
 * @returns
 */
export function convertBulkTerm(
  term: formatsType | formatsBulkTermsType,
  userOptions: userOptionType
) {
  switch (term) {
    case 'anime':
      return userOptions.animeComposition;

    case 'manga':
      return userOptions.mangaComposition;

    case 'novel':
      return userOptions.novelComposition;

    default:
      return [term];
  }
}

export function getBulkStat(formatArr: formatsType[], stats: statsType) {
  let tot = 0;
  let miss = 0;
  let got = 0;
  let plan = 0;
  let totWeight = 0;
  let missWeight = 0;
  let gotWeight = 0;
  let planWeight = 0;

  for (const format of formatArr) {
    tot += stats[format]?.tot ?? 0;
    miss += stats[format]?.miss ?? 0;
    got += stats[format]?.got ?? 0;
    plan += stats[format]?.plan ?? 0;
    totWeight += stats[format]?.totWeight ?? 0;
    missWeight += stats[format]?.missWeight ?? 0;
    gotWeight += stats[format]?.gotWeight ?? 0;
    planWeight += stats[format]?.planWeight ?? 0;
  }
  return {
    tot: tot,
    miss: miss,
    got: got,
    plan: plan,
    totWeight: totWeight,
    missWeight: missWeight,
    gotWeight: gotWeight,
    planWeight: planWeight,
  };
}

/**
 * Compute completion for each series and global stats with the selected user parameter
 * @param state
 * @returns A state to set
 */
export function updateCompletion(state: globalStateType) {
  const globalStats: globalStateType['globalStats'] = {
    tot: Object.keys(state.seriesDict).length,
    got: 0,
    miss: 0,
    plan: 0,
  };

  //Smart Completion Mode
  if (state.userOptions.smartCompletion) {
    for (const [id, value] of Object.entries(state.seriesDict)) {
      let serieTot = 0;
      let serieMiss = 0;
      let serieGot = 0;
      let seriePlan = 0;
      let serieTotWeight = 0;
      let serieMissWeight = 0;
      let serieGotWeight = 0;
      let seriePlanWeight = 0;
      let formatsIncluded: formatsType[] = [];

      for (const bulkTerm of ['anime', 'manga', 'novel'] as const) {
        const {
          got,
          miss,
          tot,
          plan,
          totWeight,
          missWeight,
          gotWeight,
          planWeight,
        } = getBulkStat(
          convertBulkTerm(bulkTerm, state.userOptions),
          value.stats
        );
        if (got !== 0 || plan !== 0) {
          //Add stats only if got at least one for bulk term
          serieTot += tot;
          serieMiss += miss;
          serieGot += got;
          seriePlan += plan;
          serieTotWeight += totWeight;
          serieMissWeight += missWeight;
          serieGotWeight += gotWeight;
          seriePlanWeight += planWeight;

          //Add considered formats
          formatsIncluded = [
            ...formatsIncluded,
            ...convertBulkTerm(bulkTerm, state.userOptions),
          ];
        }
      }
      //Saving Computed Stats
      state.seriesDict[id].stats['selected'] = {
        tot: serieTot,
        miss: serieMiss,
        got: serieGot,
        plan: seriePlan,
        gotPer: Math.floor((serieGot / serieTot) * 100) || 0,
        planPer: Math.floor((seriePlan / serieTot) * 100) || 0,
        totWeight: serieTotWeight,
        missWeight: serieMissWeight,
        gotWeight: serieGotWeight,
        planWeight: seriePlanWeight,
        missPerWeight: Math.ceil((serieMissWeight / serieTotWeight) * 100) || 0,
        gotPerWeight: Math.ceil((serieGotWeight / serieTotWeight) * 100) || 0,
        planPerWeight:
          Math.floor((seriePlanWeight / serieTotWeight) * 100) || 0,
      };
      //Saving Included Formats
      state.seriesDict[id].formatsIncluded = formatsIncluded;

      //Update Global Completion
      if (serieTot !== 0) {
        if (serieGot === serieTot) {
          state.seriesDict[id].status = 'COMPLETE';
          globalStats.got += 1;
        } else if (serieGot + seriePlan === serieTot) {
          state.seriesDict[id].status = 'PLAN_TO_COMPLETE';
          globalStats.plan += 1;
        } else {
          state.seriesDict[id].status = 'NOT_COMPLETE';
          globalStats.miss += 1;
        }
      } else {
        state.seriesDict[id].status = 'ERR';
      }
    }
  } else {
    //All selected format Mode
    for (const [id, value] of Object.entries(state.seriesDict)) {
      const {
        got,
        plan,
        miss,
        tot,
        totWeight,
        missWeight,
        gotWeight,
        planWeight,
      } = getBulkStat(state.userOptions.completion, value.stats);
      state.seriesDict[id].stats['selected'] = {
        tot: tot,
        got: got,
        miss: miss,
        plan: plan,
        gotPer: Math.floor((got / tot) * 100),
        planPer: Math.floor((plan / tot) * 100),
        totWeight: totWeight,
        gotWeight: gotWeight,
        planWeight: planWeight,
        missWeight: missWeight,
        missPerWeight: Math.ceil((missWeight / totWeight) * 100),
        gotPerWeight: Math.ceil((gotWeight / totWeight) * 100),
        planPerWeight: Math.ceil((planWeight / totWeight) * 100),
      };
      //Saving Included Formats
      state.seriesDict[id].formatsIncluded = state.userOptions.completion;

      //Update Global Completion
      if (tot !== 0) {
        if (got === tot) {
          state.seriesDict[id].status = 'COMPLETE';
          globalStats.got += 1;
        } else if (got + plan === tot) {
          state.seriesDict[id].status = 'PLAN_TO_COMPLETE';
          globalStats.plan += 1;
        } else {
          state.seriesDict[id].status = 'NOT_COMPLETE';
          globalStats.miss += 1;
        }
      } else {
        state.seriesDict[id].status = 'ERR';
      }
    }
  }
  console.log(globalStats);

  return {
    ...state,
    seriesDict: {...state.seriesDict},
    globalStats: globalStats,
    seriesDictFlag: random(100000000000),
  };
}

/// Data Manipulations
/**
 * Compute received lists into usable data
 *
 * @param data a list of the received lists
 * @param relationPriority
 * @param problematicNodes
 * @returns seriesDict
 */
export function computeData(
  data: any[],
  relationPriority: {[key: string]: number},
  problematicEles: string[]
) {
  console.log('ComputeData');
  const cy = cytoscape({headless: true});

  const avoidEles = () => {
    return problematicEles
      .map(id => {
        return `#${id}`;
      })
      .join(', ');
  };
  const parseNode = (node: any): NodeType => {
    // node.nextAiringEpisode ? console.log(node) : null
    const compWeight = (node: any) => {
      //Calculating the weight of the element
      if (node.status === 'NOT_YET_RELEASED') return 1; //To avoid 100% weighted completion
      if (node.chapters) return node.chapters * 5;
      if (node.volumes) return node.volumes * 50;
      if (node.episodes && node.duration) return node.episodes * node.duration;
      //Releasing in List, is a bit useless because for now weight is never used
      if (node.nextAiringEpisode?.episode && node.duration)
        return node.nextAiringEpisode?.episode * node.duration;

      //THE APPROXIMATION ZONE
      //Releasing not in List, API won't let me get nextAiringEpisode
      const strDate = Object.values(node.startDate)
        .filter(e => {
          return e !== 'FuzzyDate' && e;
        })
        .join('-');
      const days = (Date.now() - Date.parse(strDate)) / 8.64e7; //Get days passed from start date
      if (node.format === 'MANGA') return Math.round(days / 8.2) * 5; //8.2 for approximation to One Piece episodes count
      if (node.format === 'TV') return Math.round(days / 8.2) * 20;
      return Math.round(days / 8.2) * 20;
    };

    return {
      id: node.id,
      status: 'NO',
      airStatus: node.status ?? '',
      format: node.format ?? 'SPECIAL',
      title: node.title.userPreferred,
      titles: [...Object.values(node.title), ...node.synonyms].filter(
        v => !['MediaTitle', null].includes(v)
      ),
      siteUrl: node.siteUrl,
      bannerImage: node.bannerImage,
      popularity: node.popularity,
      cover: node.coverImage.extraLarge,
      coverColor: node.coverImage.color,
      // ch: node.chapters,
      // ep: node.episodes,
      // ce: node.nextAiringEpisode?.episode,
      // du: node.duration,
      compWeight: compWeight(node),
      startDate: Object.values(node.startDate)
        .filter(e => {
          return e !== 'FuzzyDate' && e;
        })
        .join('-'),
    };
  };

  const loadList = (data: any) => {
    const nodes = new Map();
    const edges = new Map();
    console.log(data);
    for (const list of data) {
      for (const entry of list.entries) {
        nodes.set(entry.media.id, {
          data: {...parseNode(entry.media), status: entry.status},
        });
        for (const node of entry.media.relations.nodes) {
          if (!nodes.get(node.id)) {
            nodes.set(node.id, {
              data: {...parseNode(node), status: 'NO'},
            });
          }
        }
        for (const edge of entry.media.relations.edges) {
          edges.set(edge.id, {
            data: {
              id: 'L' + edge.id,
              source: entry.media.id,
              target: edge.node.id,
              relation: edge.relationType,
            },
          });
        }
      }
    }
    return [nodes, edges];
  };

  const [nodes, edges] = loadList(data);

  console.log(nodes, edges);
  // cy.elements().remove()
  cy.add(Array.from(nodes.values()).concat(Array.from(edges.values())));
  const components = cy.elements().components();

  //Split components with problematic connections and nodes
  const cleanedComponents: {
    series: cytoscape.CollectionReturnValue;
    serieComplete: cytoscape.CollectionReturnValue;
  }[] = [];
  components.map(serieComplete => {
    //Remove parallel edges
    let edgesToKeep = cy.collection();
    serieComplete.edges().map(edge => {
      const bestEdge = edge.parallelEdges().sort((ed1, ed2) => {
        return (
          relationPriority[ed1.data('relation')] -
          relationPriority[ed2.data('relation')]
        );
      })[0];
      //Invert some edges for better layout
      switch (bestEdge.data('relation')) {
        case 'ADAPTATION':
          bestEdge.move({
            source: bestEdge.data('target'),
            target: bestEdge.data('source'),
          });
          bestEdge.data({
            relation: 'SOURCE',
          });
          break;

        case 'PREQUEL':
          bestEdge.move({
            source: bestEdge.data('target'),
            target: bestEdge.data('source'),
          });
          bestEdge.data({
            relation: 'SEQUEL',
          });
          break;

        default:
          break;
      }
      edgesToKeep = edgesToKeep.union(bestEdge);
    });
    serieComplete = serieComplete.nodes().union(edgesToKeep);
    edgesToKeep.map(e => {
      e.restore();
    });

    serieComplete
      .filter("node, edge[relation!='CHARACTER']")
      .difference(avoidEles())
      .components()
      .map(seriePart => {
        //Avoid unwatched orphan nodes after split
        if (
          seriePart.nodes().length !==
          seriePart.filter("node[status='NO']").length
        ) {
          // Finally save serie in list
          cleanedComponents.push({
            series: seriePart,
            serieComplete: serieComplete.subtract(seriePart),
          });
        }
      });
  });

  //Create the representative of the serie
  const seriesListSorted = cleanedComponents.map(series => {
    const serieSorted = series.series.sort((item1, item2) => {
      // let num1 = parseInt(item1.data("id"))
      // let num2 = parseInt(item2.data("id"))
      const num1 = parseInt(item1.data('popularity'));
      const num2 = parseInt(item2.data('popularity'));
      // let num1 = Date.parse(item1.data("startDate"))
      // let num2 = Date.parse(item2.data("startDate"))
      if (isNaN(num1)) {
        return 999;
      } else if (isNaN(num2)) {
        return -1;
      }
      // return num1 - num2 //id and startDate
      return num2 - num1; //popularity
    });
    return {
      seriesPrime: serieSorted.nodes()[0],
      series: serieSorted,
      serieComplete: series.serieComplete,
    };
  });

  //Compute Stats
  const seriesList = seriesListSorted.map(serie => {
    const stat: {[key in formatsType]?: statsType[formatsType | 'selected']} =
      {};
    for (const format of [
      'TV',
      'TV_SHORT',
      'MOVIE',
      'SPECIAL',
      'OVA',
      'ONA',
      'MUSIC',
      'MANGA',
      'NOVEL',
      'ONE_SHOT',
    ] as const) {
      const formatEl = serie.series
        .nodes()
        .filter(`node[format='${format}'][airStatus!="CANCELLED"]`); //TODO: This is a possible fix for the CANCELLED bug 🐛
      // if (serie.seriesPrime.data("id") == 21093) {
      //   console.log(format)
      //   console.log(formatEl.filter("node[status='NO']"))
      //   console.log(formatEl.filter("node[status='NO']").map((e) => { return e.data("compWeight") }))
      // }
      stat[format] = {
        tot: formatEl.length ?? 0,
        miss: formatEl.filter("node[status='NO']").length ?? 0,
        got:
          formatEl.filter(
            "node[status='COMPLETED'],node[status='DROPPED'],node[status='REPEATING']"
          ).length ?? 0,
        plan:
          formatEl.filter(
            "node[status='PLANNING'],node[status='CURRENT'],node[status='PAUSED']"
          ).length ?? 0,
        totWeight: formatEl
          .map(e => {
            return e.data('compWeight');
          })
          ?.reduce?.((a: number, b: number) => a + b, 0),
        missWeight: formatEl
          .filter("node[status='NO']")
          .map(e => {
            return e.data('compWeight');
          })
          ?.reduce?.((a: number, b: number) => a + b, 0),
        gotWeight: formatEl
          .filter(
            "node[status='COMPLETED'],node[status='DROPPED'],node[status='REPEATING']"
          )
          .map(e => {
            return e.data('compWeight');
          })
          ?.reduce?.((a: number, b: number) => a + b, 0),
        planWeight: formatEl
          .filter(
            "node[status='PLANNING'],node[status='CURRENT'],node[status='PAUSED']"
          )
          .map(e => {
            return e.data('compWeight');
          })
          ?.reduce?.((a: number, b: number) => a + b, 0),
        // per: Math.round((formatEl.filter("node[status!='NO']").length / formatEl.length) * 100),
      };
    }
    return {
      ...serie,
      stats: stat as statsType,
      status: 'ERR' as serieStatusType,
    };
  });

  //Creating Serializable Dict
  const seriesDict: {[key: string]: seriesListElementType} = {};
  seriesList.map(serie => {
    seriesDict[serie.seriesPrime.data('id')] = {
      ...serie,
      seriesPrime: serie.seriesPrime.data(),
      series: {
        nodes: serie.series.nodes().map(e => e.data()),
        edges: serie.series.edges().map(e => e.data()),
      },
      serieComplete: {
        nodes: serie.serieComplete.nodes().map(e => e.data()),
        edges: serie.serieComplete.edges().map(e => e.data()),
      },
    };
  });
  console.log(Object.values(seriesDict).length);
  return seriesDict;
}

/**
 * Transform serie {edge, node} format to array [{data: ___ },...] for cytoscape
 */
export const dataForCyto = (
  serie: seriesListElementType['series'],
  notCounted = false
) => {
  if (notCounted)
    return [...serie.nodes, ...serie.edges].map(el => {
      return {data: el, classes: ['not-counted']};
    });
  return [...serie.nodes, ...serie.edges].map(el => {
    return {data: el};
  });
};

/// Cytoscape Viz functions
export const getCyLayout = (state: globalStateType) => {
  if (state.seriesSelected) {
    switch (state.userOptions.cyLayout) {
      case 'breathfirst':
        return {
          name: 'breadthfirst',
          roots: [state.seriesSelected.seriesPrime.id],
        };

      case 'klay':
        (state.cyViz?.style() as any)
          .selector('edge')
          .style('curve-style', 'bezier');
        return {
          name: 'klay',
          // animate: true,
          nodeDimensionsIncludeLabels: true,
          klay: {
            // addUnnecessaryBendpoints: true,
            edgeRouting: 'POLYLINE', // Defines how edges are routed (POLYLINE, ORTHOGONAL, SPLINES)
            layoutHierarchy: false,
            spacing: 40, // Overall setting for the minimal amount of space to be left between objects
            // nodeLayering:'LONGEST_PATH',
            nodeLayering: 'NETWORK_SIMPLEX',

            mergeEdges: true,
            thoroughness: 10, // How much effort should be spent to produce a nice layout...
          },
        } as any;

      case 'dagre':
        (state.cyViz?.style() as any)
          .selector('edge')
          .style('curve-style', 'bezier');
        return {
          name: 'dagre',
          // animate: true,
          nodeDimensionsIncludeLabels: true,

          rankSep: 80,
          // ranker: 'tight-tree', // 'network-simplex', 'tight-tree' or 'longest-path'
          // ranker: 'network-simplex', // 'network-simplex', 'tight-tree' or 'longest-path'
          // ranker: 'longest-path', // 'network-simplex', 'tight-tree' or 'longest-path'
        } as any;

      case 'elk':
        (state.cyViz?.style() as any)
          .selector('edge')
          .style('curve-style', 'bezier');
        return {
          name: 'elk',
          // animate: true,
          nodeDimensionsIncludeLabels: true,

          // roots: [state.seriesSelected.],
          // directed: true,
          // padding: 10
        } as any;

      case 'cola':
        return {
          name: 'cola',
          animate: true,
          nodeSpacing: () => {
            return 50;
          }, // extra spacing around nodes
          randomize: true,
          // nodeDimensionsIncludeLabels: true,
          // roots: [state.seriesSelected.],
          // directed: true,
          // padding: 10
        } as any;

      case 'fcose':
        return {
          name: 'fcose',

          // nodeDimensionsIncludeLabels: true,
          animate: true,
          nodeSeparation: 2000,
          nodeRepulsion: () => 45000000,
          // name: "cose",
          // roots: [state.seriesSelected.],
          // directed: true,
          // padding: 10
        } as any;

      default:
        return {
          name: 'random',
          roots: [state.seriesSelected.seriesPrime.id],
          // directed: true,
          // padding: 10
        };
    }
  }

  return {
    name: 'random',
  };
};

export const getCyStyle = (state: globalStateType) => {
  const style: cytoscape.Stylesheet[] = [];
  // {
  //     selector:
  // }
  return style;
};
