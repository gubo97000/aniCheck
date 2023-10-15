import {Avatar, IconButton} from '@mui/material';
import React, {FC} from 'react';
import siteIcon from '/pwaicon.png';

// import div from "@mui/material/div";
import {ArrowBack} from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import {useSearchParams} from 'react-router-dom';
import LoaderHead from '~/LoaderHead';
import StatusTabs from '~/StatusTabs';
import {useSharedState} from '~/Store';
import SearchField from '~components/Header/SearchField';

const Header: FC = () => {
  const [state, setState] = useSharedState();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div data-mui-color-scheme="dark">
      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateRows: '50px 70px',
          gridTemplateColumns: '50px 200px 1fr',
          gridTemplateAreas:
            "'icon user head' 'statusTabs statusTabs statusTabs'",
          alignItems: 'end',

          background: `url(${state.user.cover}) no-repeat center center`,

          backgroundSize: 'cover',
          // borderRadius:"5px",
          overflow: 'hidden',
          // divShadow: "inset 0 -50px 10px -10px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div //Shadow
          style={{
            position: 'absolute',
            // background:
            //   "linear-gradient(180deg,rgba(6,13,34,0) 40%,rgba(6,13,34,.6))",
            //black with opacity
            background: '#000000A0',
            width: '100%',
            height: '100%',
            zIndex: '0',
          }}
        />
        <LoaderHead
          style={{
            gridArea: 'head',
          }}
        />
        {searchParams.get('s') !== null ? (
          <>
            <div
              style={{
                gridArea: 'icon',
                display: 'grid',
                height: '100%',
                placeItems: 'center',
              }}
            >
              <IconButton
                sx={{}}
                onClick={() => {
                  setSearchParams({});
                }}
              >
                <ArrowBack />
              </IconButton>
            </div>
            <div
              style={{
                gridArea: 'user',
                display: 'flex',
                placeItems: 'center',
                height: '100%',
                width: '100%',
              }}
            >
              <SearchField />
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                gridArea: 'icon',
                // placeSelf: "strech strech",
                height: '100%',
                // margin: "0 0 0 5px",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Avatar
                // style={{ height: "100%" }}
                src={state.user.avatar ?? siteIcon}
                variant="rounded"
              >
                {/* <AssignmentIcon /> */}
              </Avatar>
            </div>
            <div
              style={{
                gridArea: 'user',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  // placeSelf: "center start",
                  marginLeft: '2%',
                  zIndex: '1',
                  alignItems: 'center',
                }}
              >
                <Typography
                  color="white"
                  variant="h5"
                  style={{marginTop: 'auto'}}
                >
                  {state.user.name ?? 'AniCheck'}
                </Typography>
              </div>
            </div>
          </>
        )}
        <StatusTabs style={{gridArea: 'statusTabs'}} />
      </div>
      {state.status[0] === 'loading' ? <LinearProgress /> : undefined}
    </div>
  );
};
export default Header;
