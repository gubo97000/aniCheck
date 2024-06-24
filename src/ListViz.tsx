import React, {FC} from 'react';
import {useSharedState} from './Store';

// import elk from "cytoscape-elk";
import {Typography, useTheme} from '@mui/material';
import Box, {BoxProps} from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import ListVizHeader from '~components/ListViz/ListVizHeader';
import ListVizCategory from './ListVizCategory';

const ListViz: FC<BoxProps> = boxProps => {
  // const graphBox = useRef(null)
  const [state, setState] = useSharedState();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      {...boxProps}
      sx={{
        // pt: 'env(safe-area-inset-top)',
        position: 'relative',
        display: {sm: 'grid'},
        gridTemplateRows: '150px auto',
        gridTemplateAreas: "'header' 'list'",
        height: '100vh',
        overflow: 'auto',
        backgroundColor:
          state.userOptions.themeMode === 'light'
            ? state.seriesSelected?.seriesPrime.coverColor
            : `color-mix( in oklab, ${state.seriesSelected?.seriesPrime.coverColor}, ${theme.vars.palette.background.default})`,
        ...boxProps.sx,
      }}
    >
      <div
        style={{
          gridArea: 'header',
          height: '150px',
          // backgroundColor: 'green',
          position: 'sticky',
          top: 0,
          // top: 'calc(-1 * env(safe-area-inset-top))',
          zIndex: 1,
        }}
      >
        <ListVizHeader />
      </div>
      {state.seriesSelected ? (
        <Box gridArea="list">
          {(['anime', 'manga', 'novel'] as const).map(category => {
            return (
              <ListVizCategory
                key={category}
                category={category}
                sx={{mt: 2, pb: 4}}
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
