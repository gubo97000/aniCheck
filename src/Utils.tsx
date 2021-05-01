import React from "react";
import { seriesListElementType } from "./Types";

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

function useStateWithLocalStorage<T>(localStorageKey: string, defaultValue: any = null): [T, React.Dispatch<React.SetStateAction<T>>] {
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

export { useStateWithLocalStorage };