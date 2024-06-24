import {ArrowBack} from '@mui/icons-material';
import {Box, IconButton, useMediaQuery, useTheme} from '@mui/material';
import {keyframes} from '@mui/system';
import React, {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSharedState} from '~/Store';

const resize = keyframes`
to{
height:50px;
// background-color:blue;
}`;
const ListVizHeader: FC = () => {
  const [state, setState] = useSharedState();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        // marginTop: 'env(safe-area-inset-top)',
        p: '8px',
        height: '150px',
        width: '100%',
        boxSizing: 'border-box',
        // backgroundColor: theme.vars.palette.background.default,
        backgroundColor: state.seriesSelected?.seriesPrime.coverColor
          ? `color-mix( in oklab, ${state.seriesSelected?.seriesPrime.coverColor}, ${theme.vars.palette.background.default})`
          : theme.vars.palette.background.default,

        '@supports (animation-timeline: scroll())': {
          animation: `${resize} linear both`,
          animationRange: '0 100px',
          animationTimeline: 'scroll()',
        },
        '@supports not (animation-timeline: scroll())': {
          p: '0px',
        },
      }}
    >
      <Box
        sx={{
          // position: 'sticky',
          display: 'grid',
          alignItems: 'center',
          // gridTemplateRows: 'env(safe-area-inset-top) 50px 100px',
          // marginTop: 'env(safe-area-inset-top)',
          gridTemplateRows: 'env(safe-area-inset-top) 50px 100px',
          gridTemplateColumns: '50px 1fr',
          gridTemplateAreas: "'. .' 'back title' 'info info'",
          // bgcolor: state.seriesSelected?.seriesPrime.coverColor,
          bgcolor: 'grey',
          background: `url(${
            state.seriesSelected?.seriesPrime.bannerImage ??
            state.seriesSelected?.seriesPrime.cover
          }) no-repeat center center`,
          backgroundSize: 'cover',
          height: 'inherit',
          width: 'inherit',
          borderRadius: '16px',
          overflow: 'hidden',
          zIndex: '1',
          // animation: `${resize} linear both`,
          // animationTimeline: 'scroll()',
          '@supports not (animation-timeline: scroll())': {
            borderRadius: '0px',
          },
        }}
      >
        {isMobile && (
          <Box //Blur Gradient
            sx={{
              '@supports not (animation-timeline: scroll())': {
                position: 'absolute',
                // background: `linear-gradient(180deg,rgba(${theme.vars.palette.background.defaultChannel}/ 1),rgba(0,0,0,0) 40%, rgba(${theme.vars.palette.background.defaultChannel} / 1))`,
                // background: `linear-gradient(rgba(0,0,0,0) 0%, ${Color(
                //   state.seriesSelected?.seriesPrime.coverColor
                // )})`,
                //black with opacity
                //   background: '#000000A0',
                width: '100%',
                height: '100%',
                zIndex: '0',
                // color: `${Color(state.seriesSelected?.seriesPrime.coverColor).alpha(0.5)}`,
                // filter: 'blur(10px)',
                backdropFilter: 'blur(20px)',
                maskImage: 'linear-gradient(to bottom, black, transparent)',
                // color: `rgba(${
                //   Color(state.seriesSelected?.seriesPrime.coverColor ?? 'HELP')
                //     .rgb()
                //     .string() ?? 'Help'
                // }))`,
              },
            }}
          />
        )}
        <div //Gradient
          style={{
            position: 'absolute',
            // background: `linear-gradient(180deg,rgba(${theme.vars.palette.background.defaultChannel}/ 1),rgba(0,0,0,0) 40%, rgba(${theme.vars.palette.background.defaultChannel} / 1))`,
            // background: `linear-gradient(rgba(0,0,0,0) 0%, ${
            //   state.seriesSelected?.seriesPrime?.coverColor
            //     ? state.userOptions.themeMode === 'light'
            //       ? state.seriesSelected?.seriesPrime.coverColor
            //       : `color-mix( in oklab, ${state.seriesSelected?.seriesPrime.coverColor}, ${theme.vars.palette.background.default})`
            //     : // ? Color(state.seriesSelected?.seriesPrime.coverColor)
            //       `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            // })`,
            //black with opacity
            //   background: '#000000A0',
            // width: '100%',
            height: '100%',
            zIndex: '0',
          }}
        />
        <div
          style={{
            gridArea: 'back',
            display: 'grid',
            height: '100%',
            placeItems: 'center',
          }}
        >
          <IconButton
            sx={{
              backdropFilter: 'blur(10px)',
              background: `rgba(${theme.vars.palette.background.defaultChannel}/ 0.5)`,
            }}
            onClick={() => {
              navigate('/');
              // navigate(-1);
            }}
          >
            <ArrowBack />
          </IconButton>
        </div>
        <Box
          sx={{
            gridArea: 'title',
            zIndex: '1',
            backdropFilter: 'blur(10px)',
            maxWidth: 'fit-content',
            // height: '100%',
            padding: '0 10px',
            borderRadius: '16px',
            overflow: 'hidden',
            background: `rgba(${theme.vars.palette.background.defaultChannel}/ 0.5)`,
            verticalAlign: 'middle',
            color: theme.palette.text.primary,
            fontSize: '1.2rem',
          }}
        >
          {/* <Typography variant="h5" sx={{textOverflow: 'ellipsis'}}> */}
          {state.seriesSelected?.seriesPrime.title}
          {/* </Typography> */}
        </Box>
      </Box>
    </Box>
  );
};
export default ListVizHeader;
