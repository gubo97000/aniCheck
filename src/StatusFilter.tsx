import {Box, Button, ButtonProps} from '@mui/material';
import React, {FC} from 'react';
// import useAutocomplete from '@mui/material/useAutocomplete';

import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import Tooltip from '@mui/material/Tooltip';
import without from 'lodash/without';
import {useSharedState} from './Store';
import {serieStatusType} from './Types';

interface props {
  children: React.ReactNode[] | React.ReactNode;
  statusId: serieStatusType;
  tooltip?: string;
}

const FilterButton: FC<props & ButtonProps> = ({
  children,
  statusId,
  tooltip,
  ...buttonProps
}) => {
  const [state, setState] = useSharedState();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setState(state => {
      return {
        ...state,
        userOptions: {
          ...state.userOptions,
          // Checkbox Version
          //   statusFilter: xor(state.userOptions.statusFilter, [
          //     statusId,
          // Radio Version
          statusFilter: without(
            ['COMPLETE', 'PLAN_TO_COMPLETE', 'NOT_COMPLETE', 'ERR'],
            statusId
          ) as serieStatusType[],
        },
      };
    });
  };

  const isSelectedColor = () => {
    if (!state.userOptions.statusFilter.includes(statusId)) {
      return 'primary';
    } else {
      return undefined;
    }
  };
  const isSelectedVariant = () => {
    if (!state.userOptions.statusFilter.includes(statusId)) {
      return 'contained';
    } else {
      return 'outlined';
    }
  };

  return (
    <Tooltip title={tooltip ?? false} disableInteractive>
      <Button
        onClick={handleClick}
        color={buttonProps.color}
        variant={isSelectedVariant()}
        startIcon={buttonProps.startIcon}
        {...buttonProps}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

const StatusFilter: FC = () => {
  const [state, setState] = useSharedState();

  return (
    <Box>
      <Box
        sx={{
          margin: '5px 0 0 0',
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
        }}
      >
        <FilterButton
          statusId="COMPLETE"
          tooltip="Completed"
          startIcon={<CheckCircleOutlineRoundedIcon />}
          color="primary"
        >
          {/* <CheckCircleOutlineRoundedIcon /> */}
          {state.globalStats?.got}
        </FilterButton>
        <FilterButton
          statusId="PLAN_TO_COMPLETE"
          tooltip="Plan To Complete"
          startIcon={<CloudCircleIcon />}
          color="secondary"
        >
          {/* <CloudCircleIcon /> */}
          {state.globalStats?.plan}
        </FilterButton>
        <FilterButton
          statusId="NOT_COMPLETE"
          tooltip="Not Completed"
          startIcon={<AdjustRoundedIcon />}
          color={undefined}
        >
          {/* <AdjustRoundedIcon /> */}
          {state.globalStats?.miss}
        </FilterButton>
        {(state.globalStats?.tot ?? 0) -
          ((state.globalStats?.got ?? 0) +
            (state.globalStats?.miss ?? 0) +
            (state.globalStats?.plan ?? 0)) ===
        0 ? undefined : (
          <FilterButton
            statusId="ERR"
            tooltip="Not Included with current options"
            startIcon={<HighlightOffRoundedIcon />}
            color={undefined}
          >
            {/* <HighlightOffRoundedIcon /> */}
            {(state.globalStats?.tot ?? 0) -
              ((state.globalStats?.got ?? 0) +
                (state.globalStats?.miss ?? 0) +
                (state.globalStats?.plan ?? 0))}
          </FilterButton>
        )}
      </Box>
      {/* <Typography>
        {without(
            ["COMPLETE", "PLAN_TO_COMPLETE", "NOT_COMPLETE", "ERR"],
            ...state.userOptions.statusFilter
          )}
    </Typography> */}
    </Box>
  );
};
export default StatusFilter;
