import { Avatar, Checkbox, FormControlLabel, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, Radio } from '@material-ui/core'
import React, { useState, useRef, useLayoutEffect, useContext, useEffect, useMemo } from 'react'
import { render } from 'react-dom'
import * as vis from "vis-network"
import cytoscape from 'cytoscape';

import { useQuery, gql } from '@apollo/client';
import { Context } from './Store';
import Loader from './Loader';
import { keycharm } from 'vis-network';
import { checkBoxStateType } from './Types';


export default function SeriesListItem({ 
    // key, 
    // addState, handleToggle,
    // series, seriesPrime,
    index, style, data }: {
        // key: string,
        // addState: (chkState: checkBoxStateType) => void,
        // handleToggle: (key: string) => void,
        // series: cytoscape.CollectionReturnValue,
        // seriesPrime: cytoscape.NodeSingular,
        index: number,
        style: any, 
        data:any
    }) {
    const [checked, setChecked] = useState(false)
    // console.log(data)
    
    let {addState, handleToggle, seriesList}= data
    let series:any = seriesList[index]?.series
    let seriesPrime:any = seriesList[index]?.seriesPrime
    let key = seriesList[index]?.seriesPrime.data("id")
    useMemo(() => { addState({ id: key, state: [checked, setChecked], series: series }) }, [])
    return (
        <ListItem key={key} style={style} role={undefined} button onClick={() => { handleToggle(key) }}>
            {/* <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={checked}
                    tabIndex={-1}
                    disableRipple
                    hidden
                    inputProps={{ 'aria-labelledby': key }}
                />
            </ListItemIcon> */}
            <ListItemText id={key} primary={seriesPrime.data("title")+ checked} />
            {/* <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                    <CommentIcon />
                </IconButton>
            </ListItemSecondaryAction> */}
        </ListItem>
    )
}
