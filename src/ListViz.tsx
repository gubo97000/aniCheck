import React, {FC} from 'react';
import {useSharedState} from './Store';

// import elk from "cytoscape-elk";
import {Typography} from '@mui/material';
import Box, {BoxProps} from '@mui/material/Box';
import ListVizCategory from './ListVizCategory';

const ListViz: FC<BoxProps> = boxProps => {
  // const graphBox = useRef(null)
  const [state, setState] = useSharedState();

  return (
    <Box
      {...boxProps}
      sx={{
        position: 'relative',
        display: {sm: 'grid'},
        gridTemplateRows: '0px auto',
        gridTemplateAreas: "'toolbar' 'list'",
        height: '100vh',
        overflow: 'auto',
        ...boxProps.sx,
      }}
    >
      {state.seriesSelected ? (
        <Box gridArea="list">
          {(['anime', 'manga', 'novel'] as const).map(category => {
            return (
              <ListVizCategory
                key={category}
                category={category}
                sx={{mt: 2}}
              />
            );
          })}
        </Box>
      ) : (
        <Typography
          variant="h3"
          sx={{gridArea: 'list', placeSelf: 'center', textAlign: 'center'}}
          color="text.disabled"
        >
          Nothing to show yet. <br />
          Select a Series on the right
        </Typography>
      )}
    </Box>
  );
};
export default ListViz;
