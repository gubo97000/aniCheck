import { Avatar, Box, Button, Chip, FormControlLabel, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Menu, MenuItem, RadioGroup, Switch, TextField, Tooltip, useAutocomplete } from '@material-ui/core'
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
import { checkBoxStateType, formatsType, globalStateType, seriesListElementType, sortType } from './Types';
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import { matchSorter } from 'match-sorter'
import { convertBulkTerm, FORMATS, FORMATS_IDS, getBulkStat, sortAlphabetical, sortComplete, updateCompletition, useStateWithLocalStorage } from './Utils';
import xor from "lodash/xor"
import without from 'lodash/without';
import { get, zipWith } from 'lodash';
import { getUntrackedObject } from 'react-tracked';

const CompletitionMenu: FC = () => {
    const [state, setState] = useSharedState();

    function handleClick(compType: string) {
        setState((state) => {
            switch (compType) {
                case "smart":
                    return {
                        ...state, userOptions: {
                            ...state.userOptions, smartCompletition: !state.userOptions.smartCompletition
                        }
                    }
                case "all":
                    return {
                        ...state, userOptions: {
                            ...state.userOptions, completition: FORMATS_IDS
                        }
                    }

                default:
                    return {
                        ...state, userOptions: {
                            ...state.userOptions,
                            completition: xor(state.userOptions.completition, [compType]) as formatsType[]
                        }
                    }
            }


        })
    }
    function isSelected(compType: typeof state.userOptions.completition[number]) {
        return (state.userOptions.completition).includes(compType) ? undefined : "outlined"
    }

    function handleClickAnime(compType: string) {
        setState((state) => {
            switch (compType) {
                default:
                    return {
                        ...state, userOptions: {
                            ...state.userOptions,
                            animeComposition: xor(state.userOptions.animeComposition, [compType]) as formatsType[]
                        }
                    }
            }


        })
    }
    function isSelectedAnime(compType: typeof state.userOptions.completition[number]) {
        return (state.userOptions.animeComposition).includes(compType) ? undefined : "outlined"
    }

    function handleClickManga(compType: string) {
        setState((state) => {
            switch (compType) {
                default:
                    return {
                        ...state, userOptions: {
                            ...state.userOptions,
                            mangaComposition: xor(state.userOptions.mangaComposition, [compType]) as formatsType[]
                        }
                    }
            }


        })
    }
    function isSelectedManga(compType: typeof state.userOptions.completition[number]) {
        return (state.userOptions.mangaComposition).includes(compType) ? undefined : "outlined"
    }

    useEffect(() => {
        // setState(state => { return { ...state, globalStats: { ...state.globalStats, tot: 1 } } })
        setState(state => updateCompletition(state) )
    }, [
        state.userOptions.completition,
        state.userOptions.smartCompletition,
        state.userOptions.mangaComposition,
        state.userOptions.animeComposition,
    ])

    return (
        <div>
            <FormControlLabel
                control={
                    <Switch checked={state.userOptions.smartCompletition} onClick={() => handleClick("smart")} />
                } label="Smart Completition" />
        What is anime? {FORMATS.map((format) => {
                    if (["TV", "TV_SHORT", "MOVIE", "SPECIAL", "OVA", "ONA", "MUSIC",].includes(format.id)) {
                        return (
                            <Tooltip key={format.label} title={format.tooltip}>
                                <Chip
                                    variant={isSelectedAnime(format.id as typeof state.userOptions.completition[number])}
                                    disabled={!state.userOptions.smartCompletition}
                                    label={format.label}
                                    onClick={() => handleClickAnime(format.id)}
                                />
                            </Tooltip>
                        )
                    }
                    return
                })}
        What is Manga? {FORMATS.map((format) => {
                    if (["MANGA", "ONE_SHOT"].includes(format.id)) {
                        return (
                            <Tooltip key={format.label} title={format.tooltip}>
                                <Chip
                                    variant={isSelectedManga(format.id as typeof state.userOptions.completition[number])}
                                    disabled={!state.userOptions.smartCompletition}
                                    label={format.label}
                                    onClick={() => handleClickManga(format.id)}
                                />
                            </Tooltip>
                        )
                    }
                    return
                })}
            <FormControlLabel
                control={
                    <Switch checked={!state.userOptions.smartCompletition} onClick={() => handleClick("smart")} />
                } label="Custom" />

            <Button
                disabled={state.userOptions.smartCompletition}
                onClick={() => handleClick("all")} >Select All
        </Button>
            {FORMATS.map((format) => {
                return (
                    <Tooltip key={format.label} title={format.tooltip}>
                        <Chip
                            variant={isSelected(format.id as typeof state.userOptions.completition[number])}
                            disabled={state.userOptions.smartCompletition}
                            label={format.label}
                            onClick={() => handleClick(format.id)}
                        />
                    </Tooltip>
                )
            })}

        </div>
    );
}
export default CompletitionMenu
