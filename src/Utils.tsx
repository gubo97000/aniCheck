import React from "react";
import { useSharedState } from "./Store";
import { formatsType, globalStateType, seriesListElementType, statsType, userOptionType } from "./Types";

export function useStateWithLocalStorage<T>(localStorageKey: string, defaultValue: any = null): [T, React.Dispatch<React.SetStateAction<T>>] {
    try {
        JSON.parse(localStorage.getItem(localStorageKey) ?? JSON.stringify(defaultValue))
    } catch (error) {
        console.log("Old Data found, trying to reset")
        localStorage.removeItem(localStorageKey)
    }

    const [value, setValue] = React.useState<T>(
        JSON.parse(localStorage.getItem(localStorageKey) ?? JSON.stringify(defaultValue)) as T
    );

    React.useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
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
    return rankedItems.sort((itm1, itm2) => {
        console.log(itm1)
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
    let totWeight: number = 0
    let missWeight: number = 0
    let gotWeight: number = 0

    for (const format of formatArr) {
        tot += stats[format].tot ?? 0
        miss += stats[format].miss ?? 0
        got += stats[format].tot - stats[format].miss ?? 0
        totWeight += stats[format].totWeight ?? 0
        missWeight += stats[format].missWeight ?? 0
        gotWeight += stats[format].gotWeight ?? 0
    }
    return { tot: tot, miss: miss, got: got, totWeight: totWeight, missWeight: missWeight, gotWeight: gotWeight }
}

export function updateCompletition(setState: React.Dispatch<React.SetStateAction<globalStateType>>) {
    setState((state) => {
        if (state.userOptions.smartCompletition) {
            for (const [id, value] of Object.entries(state.seriesDict)) {
                let serieTot: number = 0
                let serieMiss: number = 0
                let serieGot: number = 0
                let serieTotWeight: number = 0
                let serieMissWeight: number = 0
                let serieGotWeight: number = 0

                for (const bulkTerm of ["anime", "manga", "NOVEL"]) {
                    let { got, miss, tot, totWeight, missWeight, gotWeight } = getBulkStat(convertBulkTerm(bulkTerm, state.userOptions), value.stats)
                    if (got != 0) {
                        serieTot += tot
                        serieMiss += miss
                        serieGot += got
                        serieTotWeight += totWeight
                        serieMissWeight += missWeight
                        serieGotWeight += gotWeight
                    }
                }
                state.seriesDict[id].stats["selected"] = {
                    tot: serieTot,
                    miss: serieMiss,
                    got: serieGot,
                    per: Math.floor((serieGot / serieTot) * 100),
                    totWeight: serieTotWeight,
                    missWeight: serieMissWeight,
                    gotWeight: serieGotWeight,
                    perWeight: Math.floor((serieGotWeight / serieTotWeight) * 100),
                }
            }
        } else {
            for (const [id, value] of Object.entries(state.seriesDict)) {
                let { got, miss, tot, totWeight, missWeight, gotWeight } = getBulkStat(state.userOptions.completition, value.stats)
                state.seriesDict[id].stats["selected"] = {
                    tot: tot,
                    got: got,
                    miss: miss,
                    per: Math.floor((got / tot) * 100),
                    totWeight: totWeight,
                    gotWeight: gotWeight,
                    missWeight: missWeight,
                    perWeight: Math.floor((gotWeight / totWeight) * 100),

                }
            }
        }
        return { ...state }
    })
}

//Relations
export const relationPriority:{ [key: string]: number } = {
    'CHARACTER': 1,
    'SEQUEL': 2,

    'SIDE_STORY': 3,

    'SOURCE': 4,
    'ADAPTATION': 5,

    'ALTERNATIVE': 6,

    'SPIN_OFF': 7,
    'SUMMARY': 8,

    'COMPILATION': 9,
    'CONTAINS': 10,

    'PREQUEL': 11,
    'PARENT': 12,
    'OTHER': 13,

}
