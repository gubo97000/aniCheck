import React, { FC, memo, useEffect, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Nav from "./Nav";
import { useSharedState } from "./Store";
import { serieStatusType, seriesListElementType, statusType } from "./Types";
import SeriesListSlide from "./SeriesListSlide";
import { SERIE_STATUS } from "./lib/consts";
import { getUntrackedObject } from "react-tracked";

export const NavSlides: FC = () => {
  const [state, setState] = useSharedState();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: SERIE_STATUS.indexOf(
      getUntrackedObject(state.userOptions.statusSelect) ?? "NOT_COMPLETE"
    ),
    // startIndex: SERIE_STATUS.indexOf("NOT_COMPLETE"),
  });
  //Add listener for changing status on drag
  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", (eA, evt) => {
        setState((state) => {
          return {
            ...state,
            userOptions: {
              ...state.userOptions,
              statusSelect: SERIE_STATUS[eA.selectedScrollSnap()],
            },
          };
        });
      });
    }
  }, [emblaApi]);

  //Divide series dict into 4 arrays, one for each status
  const seriesByStatus = useMemo(() => {
    console.log("seriesByStatus");
    let res: Partial<{
      [key in Partial<serieStatusType>]: seriesListElementType[];
    }> = {};
    for (const status of SERIE_STATUS) {
      res[status] = Object.values(state.seriesDict).filter((serie) => {
        return serie.status === status;
      });
    }
    console.log(res?.["COMPLETE"]?.length ?? 0);
    return { ...res };
  }, [state.seriesDictFlag]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(SERIE_STATUS.indexOf(state.userOptions.statusSelect));
    }
  }, [state.userOptions.statusSelect]);

  //Should make this a loop on SERIE_STATUS
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <SeriesListSlide seriesList={seriesByStatus?.["COMPLETE"]} />
        </div>
        <div className="embla__slide">
          <SeriesListSlide seriesList={seriesByStatus?.["PLAN_TO_COMPLETE"]} />
        </div>
        <div className="embla__slide">
          <SeriesListSlide seriesList={seriesByStatus?.["NOT_COMPLETE"]} />
        </div>
        {seriesByStatus["ERR"]?.length == 0 ? undefined : (
          <div className="embla__slide">
            <SeriesListSlide seriesList={seriesByStatus?.["ERR"]} />
          </div>
        )}
      </div>
    </div>
  );
};
// const SeriesListSlideM = memo(function SeriesListSlide({ seriesList }) {});

export default NavSlides;
