import { Avatar, Box, Button, Chip, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Menu, MenuItem, RadioGroup, TextField, useAutocomplete } from '@material-ui/core'
import React, { useState, useRef, useLayoutEffect, useContext, useEffect, useMemo, FC, Children, isValidElement } from 'react'
// import useAutocomplete from '@material-ui/core/useAutocomplete';
import { render } from 'react-dom'
import * as vis from "vis-network"
import cytoscape from 'cytoscape';

import { useQuery, gql } from '@apollo/client';
import { useSharedState } from './Store';
import Loader from './Loader';
import { keycharm } from 'vis-network';
import SeriesListItem from './SeriesListItem';
import { checkBoxStateType, globalStateType, seriesListElementType, sortType } from './Types';
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import { matchSorter } from 'match-sorter'
import { convertBulkTerm, getBulkStat, sortAlphabetical, sortComplete, updateCompletition, useStateWithLocalStorage } from './Utils';
import xor from "lodash/xor"
import without from 'lodash/without';
import { get } from 'lodash';

const CompletitionMenu: FC = () => {
    const [state, setState] = useSharedState();

    function handleClick(compType: string) {
        if (compType != "smart") {

        }
        switch (compType) {
            case "smart":
                setState((state) => {
                    return {
                        ...state, userOptions: {
                            ...state.userOptions, completition: ["smart"]
                        }
                    }
                });
                break;

            case "all":
                setState((state) => {
                    return {
                        ...state, userOptions: {
                            ...state.userOptions, completition: ["MANGA", "TV", "NOVEL",]
                        }
                    }
                });
                break;

            case "manga":
                setState((state) => {
                    return {
                        ...state, userOptions: {
                            ...state.userOptions,
                            completition: xor(without(state.userOptions.completition, "smart"), ["MANGA"]) as typeof state.userOptions.completition
                        }
                    }
                });
                break;
            case "TV":
                setState((state) => {
                    return {
                        ...state, userOptions: {
                            ...state.userOptions,
                            completition: xor(without(state.userOptions.completition, "smart"), ["TV"]) as typeof state.userOptions.completition
                        }
                    }
                });
                break;
            case "NOVEL":
                setState((state) => {
                    return {
                        ...state,
                        userOptions: {
                            ...state.userOptions,
                            completition: xor(without(state.userOptions.completition, "smart"), ["NOVEL"]) as typeof state.userOptions.completition
                        }
                    }
                });
                break;

            default:
                break;
        }
    }
    useEffect(() => {
        updateCompletition(setState)
    }, [state.userOptions.completition])
    function isSelected(compType: typeof state.userOptions.completition[number]) {
        return (state.userOptions.completition ?? []).includes(compType) ? undefined : "outlined"
    }
    return (
        <div>
            Completition Calculator
            <Chip variant={isSelected("smart")} label="Smart" onClick={() => handleClick("smart")} />

        Custom <Button onClick={() => handleClick("all")} >All</Button>
            <Chip variant={isSelected("MANGA")} label="Manga" onClick={() => handleClick("manga")} />
            <Chip variant={isSelected("TV")} label="Anime" onClick={() => handleClick("TV")} />
            <Chip variant={isSelected("NOVEL")} label="Novel" onClick={() => handleClick("NOVEL")} />
        </div>
    );
}
export default CompletitionMenu
