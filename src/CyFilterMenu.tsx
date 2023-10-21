import xor from 'lodash/xor';
import React, {FC} from 'react';
import {FilterGroup} from './FilterGroup';
import {useSharedState} from './Store';
import {formatsType} from './Types';
import {FORMATS} from './Utils';

const CyFilterMenu: FC = () => {
  const [state, setState] = useSharedState();

  function handleClick(tag: (typeof state.userOptions.cyFilter)[number]) {
    setState(state => {
      return {
        ...state,
        userOptions: {
          ...state.userOptions,
          cyFilter: xor(state.userOptions.cyFilter, [tag]) as formatsType[],
        },
      };
    });
  }
  function isSelected(tag: (typeof state.userOptions.cyFilter)[number]) {
    return state.userOptions.cyFilter.includes(tag) ? undefined : 'outlined';
  }

  // useEffect(() => {
  //     // setState(state => { return { ...state, globalStats: { ...state.globalStats, tot: 1 } } })
  //     setState(state => updateCompletion(state))
  // }, [
  //     state.userOptions.cyFilter,
  // ])

  return (
    <FilterGroup
      name={'Formats to hide'}
      chips={[
        ...new Set([
          ...(state.seriesSelected?.series.nodes.map(n => n.format) ?? []),
          ...(state.userOptions.cyShowHidden
            ? state.seriesSelected?.serieComplete.nodes.map(n => n.format) ?? []
            : []),
        ]),
      ]}
      stateArray="cyFilter"
      dataset={FORMATS}
      sx={{mt: 0}}
      // disabled={state.userOptions.smartCompletion}
    />
  );
};
export default CyFilterMenu;
