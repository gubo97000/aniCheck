import {Box, Typography} from '@mui/material';
import React, {FC, memo, useLayoutEffect, useState} from 'react';

import ButtonBase from '@mui/material/ButtonBase';
import {useNavigate} from 'react-router-dom';
import {GridChildComponentProps} from 'react-window';
import ProgressBarStacked from './ProgressBarStacked';
import {useSharedState} from './Store';
import {seriesListElementType} from './Types';

const SeriesListItemM: FC<
  GridChildComponentProps<{seriesList: seriesListElementType[]}>
> = ({columnIndex, rowIndex, style, isScrolling, data}) => {
  const [state, setState] = useSharedState();
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  isScrolling = true;
  const serieEl = data.seriesList[columnIndex + rowIndex * 4];
  if (!serieEl) return <div></div>;
  const {series, seriesPrime} = serieEl;
  const key = seriesPrime.id;

  useLayoutEffect(() => {
    if (checked) {
      if (state.seriesSelected?.seriesPrime.id !== key) {
        setChecked(false);
      }
    } else {
      if (state.seriesSelected?.seriesPrime.id === key) {
        setChecked(true);
      }
    }
  }, [state.seriesSelected]);

  // useLayoutEffect(() => {
  //   console.log(state.seriesDict[key]);
  // }, [state.seriesDict]);

  return (
    <Box style={{...style, display: 'grid', placeItems: 'center'}} key={key}>
      {
        // isScrolling ? seriesPrime.title :
        <ButtonBase
          sx={{
            // display: "grid",
            // gridTemplateColumns: "1fr  32%",
            // //gridTemplateRows: "25% auto auto",
            // gridTemplateAreas: "'content stats'",
            // alignItems: "stretch",
            aspectRatio: '43/61',
            height: `calc(95% - ${checked ? '0px' : '4px'})`,
            // width: `calc(95% - ${checked ? "0px" : "4px"})`,
            // m: checked ? "3px 8px 3px 8px" : "5px 10px 5px 10px",
            m: 'auto',
            border: checked ? '2px solid' : '0px solid',
            borderColor: checked ? 'primary.main' : 'grey.500',
            // background: isScrolling
            //   ? undefined
            //   : `url(${
            //       seriesPrime.bannerImage ?? seriesPrime.cover
            //     }) no-repeat center center`,
            background: `url(${seriesPrime.cover}) no-repeat center center`,
            backgroundSize: 'cover',
            color: 'white',

            // boxShadow: 3,

            borderRadius: '5px',
            // boxShadow: `inset 0 0 0 2000px ${
            //   checked ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.4)"
            // }`,
            boxShadow:
              'inset 0px 35px 20px -30px black, inset 0px -65px 60px -30px black',
            overflow: 'hidden',
            textAlign: 'left',
          }}
          key={key}
          onClick={() => {
            // addState({ id: key, state: [checked, setChecked], series: series });
            // handleToggle(key)
            setState(state => {
              return {...state, seriesSelected: serieEl};
            });
            navigate({pathname: `${key}`, search: location.search});
          }}
        >
          <Box
            sx={{
              // gridArea: "content",
              placeSelf: 'end start',
              margin: '0px 4px',
              width: '100%',
              // display: "grid",
              gridTemplateRows: '1fr 45px',
              gridTemplateAreas: "'title' 'bot-stat'",
              gap: '1px',
              // height:"100%",
              overflow: 'hidden',
            }}
          >
            <Typography
              sx={{
                // gridArea: "title",
                // placeSelf: "stretch",
                // placeSelf: "center",
                width: '100%',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
              variant="subtitle2"
            >
              {seriesPrime.title}
            </Typography>

            <ProgressBarStacked
              data={[
                serieEl.stats['selected'].gotPerWeight ?? 0,
                serieEl.stats['selected'].planPerWeight ?? 0,
                serieEl.stats['selected'].missPerWeight ?? 0,
              ]}
              sx={{
                position: 'absolute',
                // top: "89%",
                top: '0px',
                left: '0px',
              }}
            />
          </Box>
        </ButtonBase>
      }
    </Box>
  );
};

export default memo(SeriesListItemM);
