import React, {FC} from 'react';

import Box, {BoxProps} from '@mui/material/Box';
import {Outlet} from 'react-router-dom';
import AniChika from './AniChika';
import InfoModal from './InfoModal';
import OptionsModal from './OptionsModal';
import {useSharedState} from './Store';
import Header from './components/Header/Header';

const Nav: FC<BoxProps> = boxProps => {
  const [state, setState] = useSharedState();

  return (
    <Box
      {...boxProps}
      sx={{
        gridTemplateRows: 'auto 1fr',
        gridTemplateAreas: "'top' 'content'",
        display: state.userOptions.cyShowNav
          ? 'grid'
          : {xs: 'grid', sm: 'none'},
        boxShadow: 1,
        ...boxProps.sx,
      }}
      // xs={12} sm={3}
    >
      <OptionsModal />
      <InfoModal />
      <Box sx={{gridArea: 'top'}}>
        {/* <Loader /> */}
        <Header />
        {/* {Object.keys(state.seriesDict).length ? <SearchBox /> : undefined} */}
        {/* {Object.keys(state.seriesDict).length ? <StatusFilter /> : undefined} */}
        {/* {Object.keys(state.seriesDict).length ? <StatusTabs /> : undefined} */}
      </Box>
      <Box sx={{gridArea: 'content'}}>
        {/* {Object.keys(state.seriesDict).length ? <SeriesList /> : <AniChika />} */}
        {Object.keys(state.seriesDict).length ? <Outlet /> : <AniChika />}
      </Box>
    </Box>
  );
};

export default Nav;
