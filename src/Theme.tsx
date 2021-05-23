import { Avatar, Box, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, RadioGroup, TextField, ThemeProvider, useAutocomplete } from '@material-ui/core'
import React, { useState, useRef, useLayoutEffect, useContext, useEffect, useMemo, FC, Children, isValidElement } from 'react'
// import useAutocomplete from '@material-ui/core/useAutocomplete';

import { useSharedState } from './Store';
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
