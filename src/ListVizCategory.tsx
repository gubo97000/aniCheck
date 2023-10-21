import React, {FC} from 'react';
import {useSharedState} from './Store';
import {formatsBulkTermsType} from './Types';

// import elk from "cytoscape-elk";
import {Typography} from '@mui/material';
import Box, {BoxProps} from '@mui/material/Box';
import CardItemA from './CardItemA';
import {convertBulkTerm} from './Utils';
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
