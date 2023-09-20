import { Box, BoxProps } from "@mui/material";
import React, {
  useState,
  useRef,
  useLayoutEffect,
  useContext,
  useEffect,
  useMemo,
  FC,
  useCallback,
} from "react";
import { render } from "react-dom";
import * as vis from "vis-network";
import cytoscape from "cytoscape";

import { useQuery, gql } from "@apollo/client";
import { useSharedState } from "./Store";
import Loader from "./Loader";
import { keycharm } from "vis-network";
import { globalStateType, seriesListElementType } from "./Types";
import { FixedSizeGrid, FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import SearchBox from "./SearchBox";
import { dataForCyto } from "./Utils";
import SeriesListItemB from "./SeriesListItemB";
import SeriesListItemM from "./SeriesListItemM";
import { Scrollbars } from "react-custom-scrollbars-2";
import { random } from "lodash";

interface scrollProps {
  onScroll?: any;
  forwardedRef?: any;
  style?: any;
  children?: React.ReactNode;
}

// const CustomScrollbars: FC<scrollProps> = ({
//   onScroll,
//   forwardedRef,
//   style,
//   children,
// }) => {
//   const refSetter = useCallback(
//     (scrollbarsRef) => {
//       if (scrollbarsRef) {
//         forwardedRef(scrollbarsRef.view);
//       } else {
//         forwardedRef(null);
//       }
//     },
//     [forwardedRef]
//   );

//   return (
//     <Scrollbars
//       ref={refSetter}
//       style={{ ...style, overflow: "hidden" }}
//       onScroll={onScroll}
//     >
//       {children}
//     </Scrollbars>
//   );
// };

// const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
//   <CustomScrollbars {...props} forwardedRef={ref} />
// ));

const SeriesList: FC<BoxProps> = (boxProps) => {
  // console.log(seriesToRender)
  const listRef = React.createRef<FixedSizeList<any>>();
  const gridRef = React.createRef<FixedSizeGrid<any>>();
  const outerRef = React.createRef();
  const [state, setState] = useSharedState();
  let [seriesList, setSeriesList] = useState<seriesListElementType[]>([]);

  useEffect(() => {
    setSeriesList(
      state.seriesToRender ?? Object.values(state.seriesDict) ?? []
    );
    listRef.current?.scrollTo(0);
    gridRef.current?.scrollTo({
      scrollTop: 0,
    });
  }, [state.seriesToRender, state.seriesDict]);

  function itemKey(index: number) {
    // Find the item at the specified index.
    // In this case "data" is an Array that was passed to List as "itemData".
    const key = seriesList[index].seriesPrime.id ?? "1";

    // Return a value that uniquely identifies this item.
    return key;
  }

  function itemKeyGrid({
    columnIndex,
    data,
    rowIndex,
  }: {
    columnIndex: number;
    data: { seriesList: seriesListElementType[] };
    rowIndex: number;
  }): string {
    if (
      !data.seriesList[
        columnIndex +
          rowIndex * parseInt(state.userOptions.listLayout.split(".")[1])
      ]
    )
      return random(100000).toString();
    // Find the item at the specified index.
    // In this case "data" is an Array that was passed to List as "itemData".
    const key =
      data.seriesList[
        columnIndex +
          rowIndex * parseInt(state.userOptions.listLayout.split(".")[1])
      ].seriesPrime.id ?? "1";

    // Return a value that uniquely identifies this item.
    return key;
  }
  return (
    <Box
      {...boxProps}
      sx={{
        ...boxProps.sx,
        height: "100%",
        // height: "100%",
        // scrollbarWidth: "none",
        scrollbarGutter: "stable",
      }}
    >
      {state.seriesDict ? (
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeGrid<{ seriesList: seriesListElementType[] }>
              ref={gridRef}
              height={height}
              width={width}
              columnWidth={
                (width - 20) /
                parseInt(state.userOptions.listLayout.split(".")[1])
              }
              rowHeight={
                parseInt(state.userOptions.listLayout.split(".")[1]) == 1
                  ? 130
                  : (61 * (width - 20)) /
                    parseInt(state.userOptions.listLayout.split(".")[1]) /
                    43
              }
              columnCount={parseInt(state.userOptions.listLayout.split(".")[1])}
              rowCount={Math.ceil(
                (seriesList?.length ?? 0) /
                  parseInt(state.userOptions.listLayout.split(".")[1])
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
              {state.userOptions.listLayout == "g.1"
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
export default SeriesList;
