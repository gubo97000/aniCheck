import { Avatar, Checkbox, FormControlLabel, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, Radio } from '@material-ui/core'
import React, { useState, useRef, useLayoutEffect, useContext, useEffect } from 'react'
import { render } from 'react-dom'
import * as vis from "vis-network"
import cytoscape from 'cytoscape';

import { useQuery, gql } from '@apollo/client';
import { Context } from './Store';
import Loader from './Loader';
import { keycharm } from 'vis-network';
import { checkBoxStateType } from './Types';


export default function SeriesListItem({ key, addState, handleToggle, series, seriesPrime }: {
    key: string,
    addState: (chkState: checkBoxStateType) => void,
    handleToggle: (key: string) => void,
    series: cytoscape.CollectionReturnValue,
    seriesPrime: cytoscape.NodeSingular
}) {
    const [checked, setChecked] = useState(false)
    const handleToggleChild = ()=>{
        handleToggle(key)
    }
    key = seriesPrime.data("id")
    addState({ id: key, state: [checked, setChecked], series: series })
    return (
        <ListItem key={key} role={undefined} dense button onClick={handleToggleChild}>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={checked}
                    tabIndex={-1}
                    disableRipple
                    hidden
                    inputProps={{ 'aria-labelledby': key }}
                />
            </ListItemIcon>
            <ListItemText id={key} primary={seriesPrime.data("title")} />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                    {/* <CommentIcon /> */}
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}
