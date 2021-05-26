import { Box, Typography } from "@material-ui/core";
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
import Loader from "./Loader";
import { keycharm } from "vis-network";
import { seriesListElementType } from "./Types";
import { useSharedState } from "./Store";
import { formatToIcon } from "./Utils";
import DoubleProgressWithContent from "./DoubleProgressWithContent";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { ListChildComponentProps } from "react-window";
import ButtonBase from "@material-ui/core/ButtonBase";

const SeriesListItem: FC<
  ListChildComponentProps<{ seriesList: seriesListElementType[] }>
> = ({ index, style, isScrolling, data }) => {
  const [state, setState] = useSharedState();
  const [checked, setChecked] = useState(false);
  // let isScrolling = false
  let serieEl = data.seriesList[index];
  let { series, seriesPrime } = serieEl;
  let key = seriesPrime.id;

  useLayoutEffect(() => {
    if (checked) {
      if (state.seriesSelected?.seriesPrime.id != key) {
        setChecked(false);
      }
    } else {
      if (state.seriesSelected?.seriesPrime.id == key) {
        setChecked(true);
      }
    }
  }, [state.seriesSelected]);

  useLayoutEffect(() => {
    console.log(state.seriesDict[key]);
  }, [state.seriesDict]);

  return (
    <Box style={{ ...style }} key={key}>
      {
      // isScrolling ? seriesPrime.title : 
      (
        <ButtonBase
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr  25%",
            // gridTemplateRows: "25% auto auto",
            gridTemplateAreas: "'content stats'",
            alignItems: "stretch",

            height: checked ? "calc(100% - 6px)" : "calc(100% - 10px)",
            width: checked ? "calc(100% - 16px)" : "calc(100% - 20px)",
            m: checked ? "3px 8px 3px 8px" : "5px 10px 5px 10px",

            border: checked ? "3px solid" : "1px solid",
            borderColor: checked ? "primary.main" : `grey.500`,
            // bgcolor: 'background.paper',
            background: isScrolling
              ? undefined
              : `url(${
                  seriesPrime.bannerImage ?? seriesPrime.cover
                }) no-repeat center center`,
            backgroundSize: "cover",
            color: "white",
            // boxShadow: 3,

            borderRadius: "10px",
            boxShadow: `inset 0 0 0 2000px ${
              checked ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.4)"
            }`,
            overflow: "hidden",
            textAlign: "left",
          }}
          key={key}
          onClick={() => {
            // addState({ id: key, state: [checked, setChecked], series: series });
            // handleToggle(key)
            setState((state) => {
              return { ...state, seriesSelected: serieEl };
            });
          }}
        >
          <Box
            sx={{
              gridArea: "content",
              placeSelf: "stretch",

              display: "grid",
              gridTemplateRows: "1fr 45px",
              gridTemplateAreas: "'title' 'bot-stat'",
              gap: "1px",
              // height:"100%",
              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                pt: "10px",
                pr: "10px",
                pl: "20px",
                pb: "20px",
                gridArea: "title",
                // placeSelf: "stretch",
                // placeSelf: "center",
                overflow: "hidden",

                display: "-webkit-box",

                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
              variant="h6"
            >
              {seriesPrime.title}
            </Typography>

            <Box
              sx={{
                gridArea: "bot-stat",
                placeSelf: "stretch",
                // bgcolor: "gray",
                // h:"100%",
                // w:"100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                pl: "10px",
              }}
            >
              {isScrolling
                ? undefined
                : Object.keys(serieEl.stats).map((format) => {
                    if (format != "selected" && serieEl.stats[format].tot) {
                      return (
                        <Box
                          key={format}
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "center",

                            mr: "6px",
                            mb: "5px",
                            color:
                              serieEl.stats[format].tot -
                              serieEl.stats[format].got
                                ? "gray"
                                : "primary.main",
                            width: "40px",
                            height: "40px",
                            bgcolor: "white",
                            // bgcolor:"rgba(255,255,255,0.9)",
                            // backdropFilter: "blur(5px)",
                            // clipPath: "circle(15px at center)",
                            borderRadius: "50px",
                            // textAlign: "center",
                          }}
                        >
                          <DoubleProgressWithContent
                            value1={Math.floor(
                              (serieEl.stats[format].got /
                                serieEl.stats[format].tot) *
                                100
                            )}
                            value2={Math.floor(
                              (serieEl.stats[format].plan /
                                serieEl.stats[format].tot) *
                                100
                            )}
                          >
                            {formatToIcon(format)}
                          </DoubleProgressWithContent>
                        </Box>
                      );
                    }
                  })}
            </Box>
          </Box>

          <Box
            sx={{
              gridArea: "stats",
              // placeSelf: "stretch",

              display: "grid",
              gridTemplateRows: "75% auto",
              gridTemplateAreas: "'pie' 'weight'",
              alignItems: "center",
              justifyItems: "center",

              // bgcolor: "white",
              width: "100%",
            }}
          >
            <DoubleProgressWithContent
              value1={serieEl.stats["selected"].perWeight ?? 0}
              value2={Math.floor(
                ((serieEl.stats["selected"].planWeight ?? 0) /
                  (serieEl.stats["selected"].totWeight ?? 0)) *
                  100
              )}
              size={80}
              sx={{
                bgcolor: "rgba(0,2,2,0.2)",
                gridArea: "pie",
                backdropFilter: "blur(5px)",
                borderRadius: "30px",
                p: "5px",
              }}
            >
              <Typography>{serieEl.stats["selected"].perWeight}</Typography>
            </DoubleProgressWithContent>
            <Box
              sx={{
                bgcolor: "rgba(0,2,2,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                color: "primary.main",
                backdropFilter: "blur(10px)",
                p: "2px 8px",
                borderRadius: "10px",
                fontWeight: 600,
              }}
            >
              <AccessTimeIcon sx={{ mr: "3px" }} />
              {serieEl.stats["selected"].missWeight}
            </Box>
          </Box>
        </ButtonBase>
      )}
    </Box>
  );
};
export default SeriesListItem;
