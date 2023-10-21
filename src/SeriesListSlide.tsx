import {Box, BoxProps} from '@mui/material';
import React, {FC} from 'react';

import {random} from 'lodash';
import {memo} from 'react-tracked';
import AutoSizer from 'react-virtualized-auto-sizer';
import {FixedSizeGrid} from 'react-window';
import SeriesListItemB from './SeriesListItemB';
import SeriesListItemM from './SeriesListItemM';
import {useSharedState} from './Store';
import {seriesListElementType} from './Types';
import {useMediaQuery} from './lib/Hooks';

type props = {
  seriesList?: seriesListElementType[];
};
const SeriesListSlide: FC<BoxProps & props> = ({seriesList, ...boxProps}) => {
  // console.log(seriesList?.length);
  // const listRef = React.createRef<FixedSizeList<any>>();
  const gridRef = React.createRef<FixedSizeGrid<any>>();
  const outerRef = React.createRef();
  const [state, setState] = useSharedState();
  const isMobile = useMediaQuery('(max-width: 600px)');
  // const [seriesList, setSeriesList] = useState<seriesListElementType[]>(
  //   seriesList ?? []
  // );

  // useEffect(() => {
  //   setSeriesList(Object.values(state.seriesDict) ?? []);
  //   // listRef.current?.scrollTo(0);
  //   gridRef.current?.scrollTo({
  //     scrollTop: 0,
  //   });
  // }, [state.seriesToRender, state.seriesDict]);

  function itemKeyGrid({
    columnIndex,
    data,
    rowIndex,
  }: {
    columnIndex: number;
    data: {seriesList: seriesListElementType[]};
    rowIndex: number;
  }): string {
    if (
      !data.seriesList[
        columnIndex +
          rowIndex * parseInt(state.userOptions.listLayout.split('.')[1])
      ]
    )
      return random(100000).toString();
    // Find the item at the specified index.
    // In this case "data" is an Array that was passed to List as "itemData".
    const key =
      data.seriesList[
        columnIndex +
          rowIndex * parseInt(state.userOptions.listLayout.split('.')[1])
      ].seriesPrime.id ?? '1';

    // Return a value that uniquely identifies this item.
    return key;
  }
  return (
    <Box
      {...boxProps}
      sx={{
        ...boxProps.sx,
        height: '100%',
        // height: "100%",
        // scrollbarWidth: "none",
        scrollbarGutter: 'stable',
      }}
    >
      {seriesList ? (
        <AutoSizer>
          {({height, width}) => (
            <FixedSizeGrid<{seriesList: seriesListElementType[]}>
              // className="serie-list"
              style={{overflowX: 'hidden'}}
              ref={gridRef}
              height={height}
              width={width}
              columnWidth={
                (width - (isMobile ? 0 : 13)) /
                parseInt(state.userOptions.listLayout.split('.')[1])
              }
              rowHeight={
                parseInt(state.userOptions.listLayout.split('.')[1]) === 1
                  ? 130
                  : (61 * (width - 20)) /
                    parseInt(state.userOptions.listLayout.split('.')[1]) /
                    43
              }
              columnCount={parseInt(state.userOptions.listLayout.split('.')[1])}
              rowCount={Math.ceil(
                (seriesList?.length ?? 0) /
                  parseInt(state.userOptions.listLayout.split('.')[1])
              )}
              itemData={{
                seriesList: seriesList,
              }}
              useIsScrolling
              itemKey={itemKeyGrid}
              overscanRowCount={2}
              // outerElementType={CustomScrollbarsVirtualList}
              // outerRef={outerRef}
            >
              {state.userOptions.listLayout === 'g.1'
                ? SeriesListItemB
                : SeriesListItemM}
            </FixedSizeGrid>
            // <FixedSizeList<{ seriesList: seriesListElementType[] }>
            //   ref={listRef}
            //   height={height}
            //   itemSize={140}
            //   width={width}
            //   itemCount={seriesList?.length ?? 0}
            //   itemData={{
            //     seriesList: seriesList,
            //   }}
            //   useIsScrolling
            //   itemKey={itemKey}
            //   // outerElementType={CustomScrollbarsVirtualList}
            //   outerRef={outerRef}
            // >
            //   {/* {SeriesListItemB} */}
            //   {SeriesListItemM}
            // </FixedSizeList>
          )}
        </AutoSizer>
      ) : (
        <p>None</p>
      )}
    </Box>
  );
};
export default memo(SeriesListSlide);
