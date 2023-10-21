import {Box, CircularProgress, Tooltip} from '@mui/material';
import React, {FC} from 'react';

interface props {
  value1: number;
  value2: number;
  size?: number;
  sx?: any;
  children?: React.ReactNode;
}

const DoubleProgressWithContent: FC<props> = ({
  value1,
  value2,
  size,
  sx,
  children,
}) => {
  return (
    <Box sx={{...sx, position: 'relative', display: 'inline-flex'}}>
      <Tooltip
        placement="right"
        title={
          `${value2 ? `${value2}% Planned` : ''}` +
          `${value1 && value2 ? ' / ' : ''}` +
          `${value1 ? `${value1}% Completed` : ''}`
        }
        disableInteractive
      >
        <CircularProgress
          variant="determinate"
          color="primary"
          value={value1}
          size={size ?? 40}
          thickness={5}
          sx={{zIndex: 1}}
        />
      </Tooltip>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress
          variant="determinate"
          color="secondary"
          value={value2 + value1}
          size={(size ?? 40) - 2}
          thickness={4.0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
export default DoubleProgressWithContent;
