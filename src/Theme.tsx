import { Avatar, Box, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, RadioGroup, TextField, ThemeProvider, useAutocomplete } from '@material-ui/core'
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
import { checkBoxStateType, globalStateType, seriesListElementType } from './Types';
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import { matchSorter } from 'match-sorter'
import SortMenu from './SortMenu';
import { getSortFc, useAsync, useDebounce } from './Utils';
import CompletitionMenu from './CompletitionMenu';
import DonutLargeRoundedIcon from '@material-ui/icons/DonutLargeRounded';
import SortIcon from '@material-ui/icons/Sort';
import FilterAltRoundedIcon from '@material-ui/icons/FilterAltRounded';
import { useWorker } from '@koale/useworker';
import { createTheme } from '@material-ui/core/styles';

const Theme: FC = ({ children }) => {
    const [state, setState] = useSharedState()
    const theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: state.user.color ?? "#3f51b5",
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}
export default Theme
