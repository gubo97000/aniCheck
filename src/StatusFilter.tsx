import { Avatar, Box, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Menu, MenuItem, RadioGroup, TextField, useAutocomplete } from '@material-ui/core'
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
import { checkBoxStateType, globalStateType, seriesListElementType, serieStatusType, sortType } from './Types';
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import { matchSorter } from 'match-sorter'
import { sortAlphabetical, sortComplete, useStateWithLocalStorage } from './Utils';
import Sort from "@material-ui/icons/Sort"
import NorthRoundedIcon from '@material-ui/icons/NorthRounded';
import SouthRoundedIcon from '@material-ui/icons/SouthRounded';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import AdjustRoundedIcon from '@material-ui/icons/AdjustRounded';
import CloudCircleIcon from '@material-ui/icons/CloudCircle';
import Stack from '@material-ui/core/Stack';
import xor from 'lodash/xor';

interface props {
    children: React.ReactNode[]
    statusId: serieStatusType;
}

const FilterButton: FC<props> = ({ children, statusId }) => {
    const [state, setState] = useSharedState();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setState(state => {
            return { ...state, userOptions: { ...state.userOptions, statusFilter: xor(state.userOptions.statusFilter, [statusId]) as serieStatusType[] } }
        })
    };

    const handleColor = () => {
        if (!state.userOptions.statusFilter.includes(statusId)) {
            return "primary"
        } else {
            return "default"
        }
    }

    return (
        <IconButton onClick={handleClick} color={handleColor()}>
            {children}
        </IconButton>
    );
}

const StatusFilter: FC = () => {
    const [state, setState] = useSharedState();

    return (
        <Box sx={{ margin: "auto" }}>
            <Stack direction="row" spacing={2}>
                <FilterButton statusId="COMPLETE">
                    <CheckCircleOutlineRoundedIcon />
                    {state.globalStats.got}
                </FilterButton>
                <FilterButton statusId="PLAN_TO_COMPLETE">
                    <CloudCircleIcon />
                    {state.globalStats.plan}
                </FilterButton>
                <FilterButton statusId="NOT_COMPLETE">
                    <AdjustRoundedIcon />
                    {state.globalStats.miss}
                </FilterButton>
                <FilterButton statusId="ERR">
                    <HighlightOffRoundedIcon />
                    {state.globalStats.tot - (state.globalStats.got + state.globalStats.miss + state.globalStats.plan)}
                </FilterButton>
            </Stack>
        </Box>




    );
}
export default StatusFilter
