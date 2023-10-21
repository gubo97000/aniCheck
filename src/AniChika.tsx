import {Typography} from '@mui/material';
import Box, {BoxProps} from '@mui/material/Box';
import React, {FC, useState} from 'react';
import LoaderInput from './LoaderInput';
import {useSharedState} from './Store';

const AniChika: FC<BoxProps> = boxProps => {
  const [state, setState] = useSharedState();
  const [usr, setUsr] = useState('');

  return (
    <Box
      {...boxProps}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        ...boxProps.sx,
      }}
      // xs={12} sm={3}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: '100px 50px, auto',
          // gridTemplateColumns:"",
          gridTemplateAreas: "'text' 'input' 'hist'",
          placeItems: 'center',
        }}
      >
        <Typography
          sx={{
            gridArea: 'text',
            textAlign: 'center',
          }}
          color="primary"
          variant="h4"
        >
          Welcome to AniCheck!
          <br /> Insert a AniList username to start.
        </Typography>
        {/* <Box
          sx={{
            gridArea: "input",
            width: "50%",
            height: 40,
            borderRadius: "5px",
            overflow: "hidden",
            // bgcolor: "primary.main",
          }}
        > */}
        {/* <input
            type="text"
            style={{
              width: "100%",
              height: "100%",
              border: "0px",
              backgroundColor: "inherit",
              color:"inherit"
            }}
          ></input> */}
        <LoaderInput sx={{gridArea: 'input'}} />
        {/* <Input
            sx={{
              //   color: "white",
              fontSize: "20px",
              textAlign: "center",
            }}
            id="username"
            placeholder="AniList Username"
            value={usr}
            onChange={(event) => {
              setUsr(event.target.value);
            }}
            onKeyPress={(ev) => {
              if (ev.key == "Enter" && state.status[0] != "loading") {
                setState((state) => {
                  return {
                    ...state,
                    user: { name: usr },
                    usersHist: [usr, ...state.usersHist],
                  };
                });
              }
            }}
          /> */}
        {/* </Box> */}
      </Box>
    </Box>
  );
};

export default AniChika;
