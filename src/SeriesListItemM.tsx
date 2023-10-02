import { Box, Tooltip, Typography } from "@mui/material";
import React, {
  useState,
  useRef,
  useLayoutEffect,
  useContext,
  useEffect,
  useMemo,
  FC,
  memo,
} from "react";
import { render } from "react-dom";
import * as vis from "vis-network";
import cytoscape from "cytoscape";

import { useQuery, gql } from "@apollo/client";
import Loader from "./Loader";
import { keycharm } from "vis-network";
import { seriesListElementType, statsType } from "./Types";
import { useSharedState } from "./Store";
import DoubleProgressWithContent from "./DoubleProgressWithContent";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { GridChildComponentProps, ListChildComponentProps } from "react-window";
import ButtonBase from "@mui/material/ButtonBase";
import { FORMATS } from "./Utils";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ProgressBarStacked from "./ProgressBarStacked";
import { useNavigate } from "react-router-dom";

const SeriesListItemM: FC<
  GridChildComponentProps<{ seriesList: seriesListElementType[] }>
> = ({ columnIndex, rowIndex, style, isScrolling, data }) => {
  const [state, setState] = useSharedState();
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  isScrolling = true;
  let serieEl = data.seriesList[columnIndex + rowIndex * 4];
  if (!serieEl) return <div></div>;
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

  // useLayoutEffect(() => {
  //   console.log(state.seriesDict[key]);
  // }, [state.seriesDict]);

  return (
    <Box style={{ ...style, display: "grid", placeItems: "center" }} key={key}>
      {
        // isScrolling ? seriesPrime.title :
        <ButtonBase
          sx={{
            // display: "grid",
            // gridTemplateColumns: "1fr  32%",
            // //gridTemplateRows: "25% auto auto",
            // gridTemplateAreas: "'content stats'",
            // alignItems: "stretch",
            aspectRatio: "43/61",
            height: `calc(95% - ${checked ? "0px" : "4px"})`,
            // width: `calc(95% - ${checked ? "0px" : "4px"})`,
            // m: checked ? "3px 8px 3px 8px" : "5px 10px 5px 10px",
            m: "auto",
            border: checked ? "2px solid" : "0px solid",
            borderColor: checked ? "primary.main" : `grey.500`,
            // background: isScrolling
            //   ? undefined
            //   : `url(${
            //       seriesPrime.bannerImage ?? seriesPrime.cover
            //     }) no-repeat center center`,
            background: `url(${seriesPrime.cover}) no-repeat center center`,
            backgroundSize: "cover",
            color: "white",

            // boxShadow: 3,

            borderRadius: "5px",
            // boxShadow: `inset 0 0 0 2000px ${
            //   checked ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.4)"
            // }`,
            boxShadow: `inset 0px 35px 20px -30px black, inset 0px -65px 60px -30px black`,
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
            navigate(`${key}`);
          }}
        >
          <Box
            sx={{
              // gridArea: "content",
              placeSelf: "end start",
              margin: "0px 4px",
              width: "100%",
              // display: "grid",
              gridTemplateRows: "1fr 45px",
              gridTemplateAreas: "'title' 'bot-stat'",
              gap: "1px",
              // height:"100%",
              overflow: "hidden",
            }}
          >
            <Typography
              sx={{
                // gridArea: "title",
                // placeSelf: "stretch",
                // placeSelf: "center",
                width: "100%",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
              variant="subtitle2"
            >
              {seriesPrime.title}
            </Typography>

            <ProgressBarStacked
              data={[
                serieEl.stats["selected"].gotPerWeight ?? 0,
                serieEl.stats["selected"].planPerWeight ?? 0,
                serieEl.stats["selected"].missPerWeight ?? 0,
              ]}
              sx={{
                position: "absolute",
                // top: "89%",
                top: "0px",
                left: "0px",
              }}
            />

            {/* </Box> */}
            {/* <Box
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
                : (Object.keys(serieEl.stats) as (keyof statsType)[]).map(
                    (format) => {
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
                              {FORMATS[format].icon}
                            </DoubleProgressWithContent>
                          </Box>
                        );
                      }
                    }
                  )}
            </Box> */}
          </Box>

          {/* <Box
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
              value1={serieEl.stats["selected"].gotPerWeight ?? 0}
              value2={serieEl.stats["selected"].planPerWeight ?? 0}
              size={80}
              sx={{
                bgcolor: "rgba(0,2,2,0.2)",
                gridArea: "pie",
                backdropFilter: "blur(5px)",
                borderRadius: "30px",
                p: "5px",
              }}
            >
              <Typography>
                {serieEl.status == "PLAN_TO_COMPLETE" ||
                serieEl.status == "COMPLETE"
                  ? 100
                  : (serieEl.stats["selected"].gotPerWeight ?? 0) +
                    (serieEl.stats["selected"].planPerWeight ?? 0)}
              </Typography>
            </DoubleProgressWithContent>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: " space-evenly",
              }}
            >
              {serieEl.stats["selected"].planWeight ? (
                <Tooltip
                  placement="right"
                  title={
                    serieEl.stats["selected"].planWeight
                      ? `${serieEl.stats["selected"].planWeight} minutes planned`
                      : "You did it!"
                  }
                  disableInteractive
                >
                  <Box
                    sx={{
                      bgcolor: "rgba(0,2,2,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      color: "secondary.main",
                      backdropFilter: "blur(10px)",
                      p: "2px 8px",
                      borderRadius: "10px",
                      fontWeight: 600,
                    }}
                  >
                    <AccessTimeIcon sx={{ mr: "3px" }} />
                    {serieEl.stats["selected"].planWeight}
                  </Box>
                </Tooltip>
              ) : undefined}
              {serieEl.stats["selected"].missWeight ? (
                <Tooltip
                  placement="right"
                  title={
                    serieEl.stats["selected"].missWeight
                      ? `${serieEl.stats["selected"].missWeight} minutes missing`
                      : "You did it!"
                  }
                  disableInteractive
                >
                  <Box
                    sx={{
                      bgcolor: "rgba(0,2,2,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      color: "white",
                      backdropFilter: "blur(10px)",
                      p: "2px 8px",
                      borderRadius: "10px",
                      fontWeight: 600,
                    }}
                  >
                    <AccessTimeIcon sx={{ mr: "3px" }} />
                    {serieEl.stats["selected"].missWeight}
                  </Box>
                </Tooltip>
              ) : undefined}
              {serieEl.stats["selected"].gotPerWeight == 100 ? (
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
                  <CheckCircleOutlineRoundedIcon sx={{ mr: "3px" }} />
                  {"You did it!"}
                </Box>
              ) : undefined}
            </Box>
          </Box> */}
        </ButtonBase>
      }
    </Box>
  );
};

export default memo(SeriesListItemM);
