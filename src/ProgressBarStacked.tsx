import {Box, useTheme} from '@mui/material';
import type {} from '@mui/material/themeCssVarsAugmentation';
import React, {FC} from 'react';

interface props {
  data: Array<any>;
  size?: number;
  sx?: any;
  children?: React.ReactNode;
}

const ProgressBarStacked: FC<props> = ({data, size, sx, children}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        ...sx,
        // height: "100%",
        width: '100%',
        display: 'flex',
        // flexDirection: "column-reverse",
        flexDirection: 'row-reverse',
        alignContent: 'stretch',
        transform: 'rotate(180deg)',
        // gap: "2px",
        // backgroundColor: "white",
        // borderRadius: "20px",
        // border : "1px solid lightgray",
        // padding: "2px",
      }}
    >
      {/* <Tooltip
          placement="right"
          title={
            `${value2 ? `${value2}% Planned` : ""}` +
            `${value1 && value2 ? " / " : ""}` +
            `${value1 ? `${value1}% Completed` : ""}`
          }
          disableInteractive
        > */}

      {/* </Tooltip> */}

      {data.map((value, index) => (
        <Box
          key={index}
          sx={{
            flex: 1,
            // width: "20px",
            height: '10px',
            borderBottom: `3px solid ${
              [
                theme.vars.palette.primary.main,
                theme.vars.palette.secondary.main,
                'lightgray',
              ][index % 3]
            }`,
            // backgroundColor: [theme.palette.primary.main, theme.palette.secondary.main, "lightgray"][index % 3],
            backgroundColor: 'transparent',
            // minHeight: "16%",
            minWidth: '16%',
            display: value === 0 ? 'none' : 'block',
            //   height: `${value > 20 ? value : 20}%`,
            //   maxHeight: `${value > 20 ? value : 20}%`,
            // maxHeight: `${value}%`,
            maxWidth: `${value}%`,
            // borderRadius: ["20px 20px 10px 10px","5px", "10px 10px 20px 20px"].reverse()[index % 3],
            // box shadow of the same color of the bar
            // boxShadow: `2px -2px 20px ${[theme.palette.primary.main, theme.palette.secondary.main, "lightgray"][index % 3]}`,
            boxShadow: `inset 0px -26px 5px -24px  ${
              [
                theme.vars.palette.primary.main,
                theme.vars.palette.secondary.main,
                'lightgray',
              ][index % 3]
            }`,
            alignItems: 'center',
          }}
        ></Box>
      ))}
    </Box>
  );
};
export default ProgressBarStacked;
