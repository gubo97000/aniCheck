import * as cytoscape from "cytoscape";
// import cytoscape from "cytoscape";
import { useCallback, useEffect, useState } from "react";
import { avoidNodes } from "./ProblematicNodes";
import { useSharedState } from "./Store";
import { formatsType, globalStateType, relationsType, seriesListElementType, serieStatusType, statsType, userOptionType } from "./Types";

export function useStateWithLocalStorage<T>(localStorageKey: string, defaultValue: any = null): [T, React.Dispatch<React.SetStateAction<T>>] {
    try {
        JSON.parse(localStorage.getItem(localStorageKey) ?? JSON.stringify(defaultValue))
    } catch (error) {
        console.log("Old Data found, trying to reset")
        localStorage.removeItem(localStorageKey)
    }

    const [value, setValue] = useState<T>(
        JSON.parse(localStorage.getItem(localStorageKey) ?? JSON.stringify(defaultValue)) as T
    );

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
};

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
        "idle" | "pending" | "success" | "error"
    >("idle");
    const [value, setValue] = useState<T | null>(null);
    const [error, setError] = useState<E | null>(null);
    // The execute function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = useCallback(() => {
        setStatus("pending");
        setValue(null);
        setError(null);
        return asyncFunction()
            .then((response: any) => {
                setValue(response);
                setStatus("success");
            })
            .catch((error: any) => {
                setError(error);
                setStatus("error");
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
    return { execute, status, value, error };
};

//Sort Functions
export function sortWeight(rankedItems: any[], invert: boolean) {
    return rankedItems.sort((itm1, itm2) => {
        return invert ?
            itm1.item.stats["selected"].missWeight - itm2.item.stats["selected"].missWeight :
            itm2.item.stats["selected"].missWeight - itm1.item.stats["selected"].missWeight
    })
}

export function sortWeightPer(rankedItems: any[], invert: boolean) {
    return rankedItems.sort((itm1, itm2) => {
        return invert ?
            itm1.item.stats["selected"].perWeight - itm2.item.stats["selected"].perWeight :
            itm2.item.stats["selected"].perWeight - itm1.item.stats["selected"].perWeight
    })
}

export function sortComplete(rankedItems: any[], invert: boolean) {
    return rankedItems.sort((itm1, itm2) => {
        return invert ?
            itm1.item.stats["selected"].per - itm2.item.stats["selected"].per :
            itm2.item.stats["selected"].per - itm1.item.stats["selected"].per
    })
}

export function sortAlphabetical(rankedItems: any[], invert: boolean) {
    console.log(rankedItems)
    return rankedItems.sort((itm1, itm2) => {
        return invert ?
            itm1.rankedValue[0].localeCompare(itm2.rankedValue) :
            itm2.rankedValue[0].localeCompare(itm1.rankedValue)
    })
}

export function sortSize(rankedItems: any[], invert: boolean) {
    return rankedItems.sort((itm1, itm2) => {
        return invert ?
            (itm1.item.stats.serieMiss + itm1.item.stats.serieTot) - (itm2.item.stats.serieMiss + itm2.item.stats.serieTot) :
            (itm2.item.stats.serieMiss + itm2.item.stats.serieTot) - (itm1.item.stats.serieMiss + itm1.item.stats.serieTot)
    })
}

export function getSortFc(tag: string) {
    switch (tag) {
        case "weight%":
            return sortWeightPer

        case "complete%":
            return sortComplete

        case "alphabetical":
            return sortAlphabetical

        case "size":
            return sortSize

        case "missWeight":
            return sortWeight

        default:
            return sortAlphabetical
    }
}

//Completition Calculations
export const FORMATS_IDS: formatsType[] = ["TV", "TV_SHORT", "MOVIE", "SPECIAL", "OVA", "ONA", "MUSIC", "MANGA", "NOVEL", "ONE_SHOT"]
export const FORMATS = [
    { id: "TV", label: "TV", tooltip: "Anime broadcast on television" },
    { id: "TV_SHORT", label: "TV Short", tooltip: "Anime which are under 15 minutes in length and broadcast on television" },
    { id: "MOVIE", label: "Movie", tooltip: "Anime movies with a theatrical release" },
    { id: "SPECIAL", label: "Special", tooltip: "Special episodes that have been included in DVD/Blu-ray releases, picture dramas, pilots, etc" },
    { id: "OVA", label: "OVA", tooltip: "(Original Video Animation) Anime that have been released directly on DVD/Blu-ray without originally going through a theatrical release or television broadcast" },
    { id: "ONA", label: "ONA", tooltip: "(Original Net Animation) Anime that have been originally released online or are only available through streaming services." },
    { id: "MUSIC", label: "Music", tooltip: "Short anime released as a music video" },
    { id: "MANGA", label: "Manga", tooltip: "Professionally published manga with more than one chapter" },
    { id: "NOVEL", label: "Novel", tooltip: "Written books released as a series of light novels" },
    { id: "ONE_SHOT", label: "One Shot", tooltip: "Manga with just one chapter" }
]

export function convertBulkTerm(term: string, userOptions: userOptionType) {
    switch (term) {
        case "anime":
            return userOptions.animeComposition

        case "manga":
            return userOptions.mangaComposition

        default:
            return [term]
    }
}

export function getBulkStat(formatArr: string[], stats: statsType) {
    let tot: number = 0
    let miss: number = 0
    let got: number = 0
    let plan: number = 0
    let totWeight: number = 0
    let missWeight: number = 0
    let gotWeight: number = 0
    let planWeight: number = 0

    for (const format of formatArr) {
        tot += stats[format].tot ?? 0
        miss += stats[format].miss ?? 0
        got += stats[format].got ?? 0
        plan += stats[format].plan ?? 0
        totWeight += stats[format].totWeight ?? 0
        missWeight += stats[format].missWeight ?? 0
        gotWeight += stats[format].gotWeight ?? 0
        planWeight += stats[format].planWeight ?? 0
    }
    return { tot: tot, miss: miss, got: got, plan: plan, totWeight: totWeight, missWeight: missWeight, gotWeight: gotWeight, planWeight: planWeight }
}

/**
 * Compute completition for each series and global stats with the selected user parameter 
 * @param setState 
 */
export const updateCompletition = (state: globalStateType) => {
    let globalStats: globalStateType["globalStats"] = {
        tot: Object.keys(state.seriesDict).length,
        got: 0,
        miss: 0,
        plan: 0,
    }

    //Smart Completition Mode
    if (state.userOptions.smartCompletition) {
        for (const [id, value] of Object.entries(state.seriesDict)) {
            let serieTot: number = 0
            let serieMiss: number = 0
            let serieGot: number = 0
            let seriePlan: number = 0
            let serieTotWeight: number = 0
            let serieMissWeight: number = 0
            let serieGotWeight: number = 0
            let seriePlanWeight: number = 0

            for (const bulkTerm of ["anime", "manga", "NOVEL"]) {
                let { got, miss, tot, plan, totWeight, missWeight, gotWeight, planWeight } = getBulkStat(convertBulkTerm(bulkTerm, state.userOptions), value.stats)
                if (got != 0 || plan != 0) { //Add stats only if got at least one for bulk term
                    serieTot += tot
                    serieMiss += miss
                    serieGot += got
                    seriePlan += plan
                    serieTotWeight += totWeight
                    serieMissWeight += missWeight
                    serieGotWeight += gotWeight
                }
            }
            state.seriesDict[id].stats["selected"] = {
                tot: serieTot,
                miss: serieMiss,
                got: serieGot,
                plan: seriePlan,
                per: Math.floor((serieGot / serieTot) * 100),
                totWeight: serieTotWeight,
                missWeight: serieMissWeight,
                gotWeight: serieGotWeight,
                planWeight: seriePlanWeight,
                perWeight: Math.floor((serieGotWeight / serieTotWeight) * 100),
            }

            //Update Global Completition
            if (serieTot != 0) {
                if (serieGot == serieTot) {
                    state.seriesDict[id].status = "COMPLETE"
                    globalStats.got += 1
                } else if (serieGot + seriePlan == serieTot) {
                    state.seriesDict[id].status = "PLAN_TO_COMPLETE"
                    globalStats.plan += 1
                } else {
                    state.seriesDict[id].status = "NOT_COMPLETE"
                    globalStats.miss += 1
                }
            } else {
                state.seriesDict[id].status = "ERR"
            }
        }
    } else {
        //All selected format Mode
        for (const [id, value] of Object.entries(state.seriesDict)) {
            let { got, plan, miss, tot, totWeight, missWeight, gotWeight, planWeight } = getBulkStat(state.userOptions.completition, value.stats)
            state.seriesDict[id].stats["selected"] = {
                tot: tot,
                got: got,
                miss: miss,
                plan: plan,
                per: Math.floor((got / tot) * 100),
                totWeight: totWeight,
                gotWeight: gotWeight,
                planWeight: planWeight,
                missWeight: missWeight,
                perWeight: Math.floor((gotWeight / totWeight) * 100),
            }

            //Update Global Completition
            if (tot != 0) {
                if (got == tot) {
                    state.seriesDict[id].status = "COMPLETE"
                    globalStats.got += 1
                } else if (got + plan == tot) {
                    state.seriesDict[id].status = "PLAN_TO_COMPLETE"
                    globalStats.plan += 1
                } else {
                    state.seriesDict[id].status = "NOT_COMPLETE"
                    globalStats.miss += 1
                }
            } else {
                state.seriesDict[id].status = "ERR"
            }
        }
    }
    console.log(globalStats)
    return { ...state, globalStats: globalStats }

}

//Relations Order is important for priority
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
]
//use this to quickly get relation Priority
export const relationPriority = (() => {
    let dict: { [key: string]: number } = {}
    RELATIONS.map((v, i) => {
        dict[v] = i
    })
    return dict as { [key in relationsType]: number }
})()

/**
 * Compute received lists into usable data
 * 
 * @param data a list of the received lists
 * @param relationPriority 
 * @param problematicNodes 
 * @returns 
 */
export const computeData = (data: any[], relationPriority: { [key: string]: number }, problematicNodes: string[]) => {
    const cy = cytoscape({ headless: true })

    const avoidNodes = () => { return problematicNodes.map(id => { return `#${id}` }).join(", ") }
    const parseNode = (node: any,) => {
        // node.nextAiringEpisode ? console.log(node) : null
        const compWeight = (node: any) => {
            //Calculating the weight of the element
            if (node.status == "NOT_YET_RELEASED") return 1 //To avoid 100% weighted completition
            if (node.chapters) return node.chapters * 5
            if (node.volumes) return node.volumes * 50
            if (node.episodes && node.duration) return node.episodes * node.duration
            //Releasing in List, is a bit useless because for now weight is never used
            if (node.nextAiringEpisode?.episode && node.duration) return node.nextAiringEpisode?.episode * node.duration

            //THE APPROXIMATION ZONE
            //Releasing not in List, API won't let me get nextAiringEpisode
            let strDate = Object.values(node.startDate).filter(e => { return e != "FuzzyDate" && e }).join("-")
            let days = (Date.now() - Date.parse(strDate)) / 8.64e+7 //Get days passed from start date
            if (node.format == "MANGA") return Math.round(days / 8.2) * 5 //8.2 for approximation to One Piece episodes count
            if (node.format == "TV") return Math.round(days / 8.2) * 20
            return Math.round(days / 8.2) * 20
        }

        return {
            id: node.id,
            status: 'NO',
            airStatus: node.status,
            format: node.format ?? "SPECIAL",
            title: node.title.userPreferred,
            titles: [...Object.values(node.title), ...node.synonyms].filter((v) => !["MediaTitle", null].includes(v)),
            siteUrl: node.siteUrl,
            bannerImage: node.bannerImage,
            popularity: node.popularity,
            // ch: node.chapters,
            // ep: node.episodes,
            // ce: node.nextAiringEpisode?.episode,
            // du: node.duration,
            compWeight: compWeight(node),
            startDate: Object.values(node.startDate).filter(e => { return e != "FuzzyDate" && e }).join("-"),
        }
    }

    const loadList = (data: any) => {
        let nodes = new Map()
        let edges = new Map()
        console.log(data)
        for (let list of data) {
            for (let entry of list.entries) {
                nodes.set(entry.media.id, {
                    data: { ...parseNode(entry.media), status: entry.status, }
                })
                for (let node of entry.media.relations.nodes) {
                    if (!nodes.get(node.id)) {
                        nodes.set(node.id, {
                            data: { ...parseNode(node), status: 'NO' }
                        })
                    }
                }
                for (let edge of entry.media.relations.edges) {
                    edges.set(edge.id, {
                        data: {
                            id: "l" + edge.id,
                            source: entry.media.id,
                            target: edge.node.id,
                            relation: edge.relationType,
                        }
                    })
                }
            }
        }
        return [nodes, edges]
    }

    const [nodes, edges] = loadList(data)

    console.log(nodes, edges)
    cy.elements().remove() //In this case is useless
    cy.add(Array.from(nodes.values()).concat(Array.from(edges.values())))
    let components = cy.elements().components()

    //Split components with problematic connections and nodes
    let cleanedComponents: {
        series: cytoscape.CollectionReturnValue; serieComplete: cytoscape.CollectionReturnValue;
    }[] = []
    components.map((serieComplete) => {
        //Remove parallel edges
        let prunedEdges = serieComplete.edges().map((edge) => {
            let bestEdge = edge.parallelEdges().sort((ed1, ed2) => {
                return relationPriority[ed1.data("relation")] - relationPriority[ed2.data("relation")]
            })[0]
            switch (bestEdge.data("relation")) {
                case "ADAPTATION":
                    bestEdge.move({
                        source: bestEdge.data("target"),
                        target: bestEdge.data("source"),
                    })
                    bestEdge.data({
                        relation: "SOURCE"
                    })
                    break;

                case "PREQUEL":
                    bestEdge.move({
                        source: bestEdge.data("target"),
                        target: bestEdge.data("source"),
                    })
                    bestEdge.data({
                        relation: "SEQUEL"
                    })
                    break;

                default:
                    break;
            }
            return bestEdge
        })
        serieComplete.edges().remove()
        prunedEdges.map((e) => { e.restore() })
        // prunedEdges.map((e) => { cy.add(e) })
        serieComplete.filter(`node, edge[relation!='CHARACTER']`).difference(avoidNodes()).components().map((seriePart) => {
            //Avoid unwatched orphan nodes after split
            if (seriePart.nodes().length != seriePart.filter("node[status='NO']").length) {
                cleanedComponents.push({ series: seriePart, serieComplete: serieComplete })
            }
        })

    })

    //Create the representative of the serie
    let seriesListSorted = cleanedComponents.map((series) => {
        let serieSorted = series.series.sort((item1, item2) => {
            // let num1 = parseInt(item1.data("id"))
            // let num2 = parseInt(item2.data("id"))
            let num1 = parseInt(item1.data("popularity"))
            let num2 = parseInt(item2.data("popularity"))
            // let num1 = Date.parse(item1.data("startDate"))
            // let num2 = Date.parse(item2.data("startDate"))
            if (isNaN(num1)) {
                return 999
            } else if (isNaN(num2)) {
                return -1
            }
            // return num1 - num2 //id and startDate
            return num2 - num1 //popularity
        })
        return { seriesPrime: serieSorted.nodes()[0], series: serieSorted, serieComplete: series.serieComplete }
    })

    //Compute Stats
    let seriesList = seriesListSorted.map((serie) => {
        let stat: statsType = {};
        for (let format of ["TV", "TV_SHORT", "MOVIE", "SPECIAL", "OVA", "ONA", "MUSIC", "MANGA", "NOVEL", "ONE_SHOT"]) {
            let formatEl = serie.series.nodes().filter(`node[format='${format}']`)
            // if (serie.seriesPrime.data("id") == 21093) {
            //   console.log(format)
            //   console.log(formatEl.filter("node[status='NO']"))
            //   console.log(formatEl.filter("node[status='NO']").map((e) => { return e.data("compWeight") }))
            // }
            stat[format] = {
                tot: formatEl.length ?? 0,
                miss: formatEl.filter("node[status='NO']").length ?? 0,
                got: formatEl.filter("node[status='COMPLETED'],node[status='DROPPED'],node[status='REPEATING']").length ?? 0,
                plan: formatEl.filter("node[status='PLANNING'],node[status='CURRENT'],node[status='PAUSED']").length ?? 0,
                totWeight: (formatEl.map((e) => { return e.data("compWeight") }))?.reduce?.((a: number, b: number) => a + b, 0),
                missWeight: (formatEl.filter("node[status='NO']").map((e) => { return e.data("compWeight") }))?.reduce?.((a: number, b: number) => a + b, 0),
                gotWeight: (formatEl.filter("node[status='COMPLETED'],node[status='DROPPED'],node[status='REPEATING']").map((e) => { return e.data("compWeight") }))?.reduce?.((a: number, b: number) => a + b, 0),
                planWeight: (formatEl.filter("node[status='PLANNING'],node[status='CURRENT'],node[status='PAUSED']").map((e) => { return e.data("compWeight") }))?.reduce?.((a: number, b: number) => a + b, 0),
                // per: Math.round((formatEl.filter("node[status!='NO']").length / formatEl.length) * 100),
            }
        }
        return { ...serie, stats: stat, status: "ERR" as serieStatusType }
    })

    //Creating Serializable Dict
    let seriesDict: { [key: string]: seriesListElementType } = {}
    seriesList.map((serie) => {
        seriesDict[serie.seriesPrime.data("id")] = {
            ...serie,
            seriesPrime: serie.seriesPrime.data(),
            series: { nodes: serie.series.nodes().map(e => e.data()), edges: serie.series.edges().map(e => e.data()) },
            serieComplete: { nodes: serie.serieComplete.nodes().map(e => e.data()), edges: serie.serieComplete.edges().map(e => e.data()) }
        }
    })
    console.log(Object.values(seriesDict).length)
    return seriesDict
}

/** 
 * Wrap with {data: <> } each element of array of nodes and edges 
*/
export const dataForCyto = (serie: seriesListElementType["series"]) => {
    return [...serie.nodes, ...serie.edges].map(el => { return { data: el } })
}

export const COLOR_CODES: { [key: string]: string } = {
    "blue": "#3DB4F2",
    "purple": "#C063FF",
    "green": "#4CCA51",
    "orange": "#EF881A",
    "red": "#E13333",
    "pink": "#FC9DD6",
    "gray": "#677B94",
}