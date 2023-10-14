import React, {
  useState,
  useRef,
  useLayoutEffect,
  useContext,
  useEffect,
  FC,
} from 'react';
import {render} from 'react-dom';
import * as vis from 'vis-network';
import cytoscape from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import {useSharedState} from './Store';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {formatsBulkTermsType, globalStateType} from './Types';
import {book} from './cytoIcons';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import cola from 'cytoscape-cola';
import klay from 'cytoscape-klay';
import dagre from 'cytoscape-dagre';
// import elk from "cytoscape-elk";
import popper from 'cytoscape-popper';
import fcose from 'cytoscape-fcose';
import nodeHtmlLabel from 'cytoscape-node-html-label';
import {renderToString} from 'react-dom/server';
import GraphNode from './GraphNode';
import {
  convertBulkTerm,
  dataForCyto,
  FORMATS,
  getCyLayout,
  getCyStyle,
} from './Utils';
import Badge from '@mui/material/Badge';
import {BoxProps} from '@mui/material/Box';
import Box from '@mui/material/Box';
import CyToolbar from './CyToolbar';
import Icon from '@mui/material/Icon';
import {Typography} from '@mui/material';
import CardItemA from './CardItemA';
type props = {
  category: formatsBulkTermsType;
};
const ListVizCategory: FC<props & BoxProps> = ({category, ...boxProps}) => {
  // const graphBox = useRef(null)
  const [state, setState] = useSharedState();
  const nodes = state.seriesSelected?.series.nodes.filter(node => {
    return convertBulkTerm(category, {
      ...state.userOptions,
      animeComposition: [
        'TV',
        'TV_SHORT',
        'MOVIE',
        'SPECIAL',
        'OVA',
        'ONA',
        'MUSIC',
      ],
      mangaComposition: ['MANGA', 'ONE_SHOT'],
      novelComposition: ['NOVEL'],
    }).includes(node.format);
  });
  // console.log(nodes);
  return nodes?.length ? (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: ' 30px auto',
        gridTemplateAreas: "'name' 'eles'",
        ...boxProps.sx,
      }}
    >
      <Typography
        gridArea="name"
        variant="h5"
        color="text.primary"
        sx={{
          placeSelf: 'center start',
          ml: 1.8,
        }}
      >
        {category.toUpperCase()}
      </Typography>
      <Box
        gridArea="eles"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
        }}
      >
        {nodes.map(node => {
          return <CardItemA key={node.id} node={node} />;
        })}
      </Box>
    </Box>
  ) : (
    <Box />
  );
};
export default ListVizCategory;
