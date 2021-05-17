import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  RadioGroup,
} from "@material-ui/core";
import React, {
  useState,
  useRef,
  useLayoutEffect,
  useContext,
  useEffect,
  useMemo,
  FC,
} from "react";
import { render } from "react-dom";
import * as vis from "vis-network";
import cytoscape from "cytoscape";

import { useQuery, gql } from "@apollo/client";
import { useSharedState } from "./Store";
import Loader from "./Loader";
import { keycharm } from "vis-network";
import SeriesListItem from "./SeriesListItem";
import { globalStateType, seriesListElementType } from "./Types";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import SearchBox from "./SearchBox";
import { dataForCyto } from "./Utils";

interface props {
  seriesToRender?: seriesListElementType[];
}

const SeriesList: FC<props> = ({ seriesToRender }) => {
  // console.log(seriesToRender)
  const listRef = React.createRef<FixedSizeList<any>>();
  const [state, setState] = useSharedState();
  let [seriesList, setSeriesList] = useState<seriesListElementType[]>([]);

  useEffect(() => {
    setSeriesList(seriesToRender ?? Object.values(state.seriesDict) ?? []);
    listRef.current?.scrollTo(0);
  }, [seriesToRender, state.seriesDict]);

  function itemKey(index: number) {
    // Find the item at the specified index.
    // In this case "data" is an Array that was passed to List as "itemData".
    const key = seriesList[index].seriesPrime.id ?? "1";

    // Return a value that uniquely identifies this item.
    return key;
  }
  return (
    <Box sx={{ height: "calc(100vh - 200px)" }}>
      {state.seriesDict ? (
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              ref={listRef}
              height={height}
              itemSize={140}
              width={width}
              itemCount={seriesList?.length ?? 0}
              itemData={{
                seriesList: seriesList,
              }}
              itemKey={itemKey}
            >
              {SeriesListItem}
            </FixedSizeList>
          )}
        </AutoSizer>
      ) : (
        <p>None</p>
      )}
    </Box>
  );
};
export default SeriesList;
