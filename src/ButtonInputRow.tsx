import { Box, BoxProps, Typography, useAutocomplete } from "@mui/material";
import React, {
  useState,
  useRef,
  useLayoutEffect,
  useContext,
  useEffect,
  useMemo,
  FC,
  Children,
  isValidElement,
} from "react";
import ButtonBase from "@mui/material/ButtonBase";
import SelectAllRoundedIcon from "@mui/icons-material/SelectAllRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Divider from "@mui/material/Divider";

type props = {
  name: string;
  helperText: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  control: React.ReactNode;
};
export const ButtonInputRow: FC<props & BoxProps> = ({
  name,
  helperText,
  onClick,
  control,
  ...boxProps
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gridTemplateRows: "auto auto",
        gridTemplateAreas: "'name s' 'help s'",
        alignItems: "center",
        m: "5px 0px",
        ...boxProps.sx
      }}
    >
      <ButtonBase
        disabled={onClick ? false : true}
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        onClick={onClick}
      />
      <Typography
        sx={{
          gridArea: "name",
          color: "text.primary",
        }}
        variant="body1"
      >
        {name}
      </Typography>
      <Typography
        sx={{
          gridArea: "help",
          color: "text.secondary",
        }}
        variant="caption"
      >
        {helperText}
      </Typography>
      <Box
        sx={{
          gridArea: "s",
          placeSelf: "start end",
        }}
      >
        {control}
      </Box>
    </Box>
  );
};
