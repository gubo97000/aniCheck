import {
    Box,
    Typography,
    useAutocomplete,
  } from "@material-ui/core";
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
  import ButtonBase from "@material-ui/core/ButtonBase";
  import SelectAllRoundedIcon from "@material-ui/icons/SelectAllRounded";
  import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
  import Divider from "@material-ui/core/Divider";

type props = {
  name: string;
  helperText: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  control: React.ReactNode;
};
export const ButtonInputRow: FC<props> = ({
  name,
  helperText,
  onClick,
  control,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 25%",
        gridTemplateRows: "auto auto",
        gridTemplateAreas: "'name s' 'help .'",
        alignItems: "center",
        m: "5px 0px",
      }}
    >
      <ButtonBase
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
        }}
        variant="subtitle1"
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
          placeSelf: "center end",
        }}
      >
        {control}
      </Box>
    </Box>
  );
};
