import React from "react";
import { useSharedState } from "./Store";
import { globalStateType, seriesListElementType, statsType } from "./Types";

// const ReducerData = (state, action) => {
//     switch (action.type) {
//         case 'SET_POSTS':
//             return {
//                 ...state,
//                 posts: action.payload
//             };
//         case 'ADD_POST':
//             return {
//                 ...state,
//                 posts: state.posts.concat(action.payload)
//             };
//         case 'REMOVE_POST':
//             return {
//                 ...state,
//                 posts: state.posts.filter(post => post.id !== action.payload)
//             };
//         case 'SET_ERROR':
//             return {
//                 ...state,
//                 error: action.payload
//             };
//         default:
//             return state;
//     }
// };

export function useStateWithLocalStorage<T>(localStorageKey: string, defaultValue: any = null): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = React.useState<T>(
        JSON.parse(localStorage.getItem(localStorageKey) ?? JSON.stringify(defaultValue)) as T
    );

    React.useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
};



export function sortComplete(rankedItems: any[], invert: boolean) {
    return rankedItems.sort((itm1, itm2) => {
        return invert ?
            itm1.item.stats.seriePer - itm2.item.stats.seriePer :
            itm2.item.stats.seriePer - itm1.item.stats.seriePer
    })
}

export function sortAlphabetical(rankedItems: any[], invert: boolean) {
    return rankedItems.sort((itm1, itm2) => {
        return invert ?
            itm1.rankedValue.localeCompare(itm2.rankedValue) :
            itm2.rankedValue.localeCompare(itm1.rankedValue)


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
        case "complete%":
            return sortComplete

        case "alphabetical":
            return sortAlphabetical

        case "size":
            return sortSize

        default:
            return sortAlphabetical
    }
}

export function convertBulkTerm(term: string) {
    switch (term) {
        case "anime":
            return ["TV", "TV_SHORT", "MOVIE", "SPECIAL", "OVA", "ONA", "MUSIC",]

        case "manga":
            return ["MANGA", "ONE_SHOT"]

        default:
            return [term]
    }
}

export function getBulkStat(formatArr: string[], stats: statsType) {
    let tot: number = 0
    let miss: number = 0
    let got: number = 0

    for (const format of formatArr) {
        tot += stats[format].tot ?? 0
        miss += stats[format].miss ?? 0
        got += stats[format].tot - stats[format].miss ?? 0
    }
    return { tot: tot, miss: miss, got: got }
}

export function updateCompletition(setState:React.Dispatch<React.SetStateAction<globalStateType>>) {
    setState((state) => {
        if (state.userOptions.completition[0] == "smart") {
            for (const [id, value] of Object.entries(state.seriesDict)) {
                let serieTot: number = 0
                let serieMiss: number = 0
                let serieGot: number = 0
                for (const bulkTerm of ["anime", "manga", "NOVEL"]) {
                    let { got, miss, tot } = getBulkStat(convertBulkTerm(bulkTerm), value.stats)
                    if (got != 0) { 
                        serieTot += tot
                        serieMiss += miss
                        serieGot += got
                    }
                }
                state.seriesDict[id].stats["selected"] = {
                    tot: serieTot,
                    miss: serieMiss,
                    got: serieGot,
                    per: Math.round((serieGot / serieTot)*100),
                }
            }
        } else {
            for (const [id, value] of Object.entries(state.seriesDict)) {
                let { got, miss, tot } = getBulkStat(state.userOptions.completition, value.stats)
                state.seriesDict[id].stats["selected"] = {
                    tot: tot,
                    got: got,
                    miss: miss,
                    per: Math.round((got / tot)*100),
                }
            }
        }
        return { ...state }
    })
}