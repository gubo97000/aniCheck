import { Box, Grid, Icon, Paper, Typography } from "@mui/material";
import React, { FC } from "react";

import { NodeType } from "./Types";
import { FORMATS } from "./Utils";

interface props {
  data: NodeType;
}

function statusToColor(status: string) {
  switch (status) {
    case "NO":
      return "red";

    case "COMPLETED":
      return "green";

    default:
      return "grey.500";
  }
}

const GraphNode: FC<props> = ({ data }) => {
  return (
    <Paper
      sx={{
        width: 200,
        height: 60,
        border: "1px solid",
        borderColor: statusToColor(data.status),
        // overflow: "hidden",
        position: "relative",
      }}
      style={{
        width: 200,
        height: 60,
        border: "1px solid",
        borderColor: statusToColor(data.status),
        // overflow: "hidden",
        position: "relative",
      }}
    >
      {/* <Tooltip
        title="Right Click to open in AniList"
        sx={{
          maxWidth: 100,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            transition: "width .2s",
            // left:"100%",
            bgcolor: "red",
            display: "flex",
            width: "30px",
            height: "30px",
            overflow: "hidden",
            borderRadius: "20px",
            ":hover": {
              width: "100px",
            },
          }}
        >
          Right Click Me!
          <OpenInNewRoundedIcon />
        </Box>
      </Tooltip> */}
      <Grid container style={{ height: "100%" }}>
        <Grid item xs={12} style={{ height: "70%", overflow: "hidden" }}>
          <Typography>{data.title}</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            borderTop: "solid 1px",
            borderColor: "grey.500",
            // backgroundColor: "green",
            height: "30%",
            fontSize: "13px",
          }}
        >
          <Typography
            style={{
              marginRight: "22px",
              textAlign: "center",
              fontSize: "13px",
            }}
          >
            {data.startDate ?? "TBA"}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            borderTop: "solid 1px",
            borderColor: "grey.500",
            // backgroundColor: "red",
            height: "30%",
            textAlign: "center",
          }}
        >
          <Typography
            style={{
              marginLeft: "22px",
              textAlign: "center",
              fontSize: "13px",
              textTransform: "capitalize",
            }}
          >
            {data.format.toLowerCase()}
          </Typography>
        </Grid>
      </Grid>
      <Box
        style={{
          position: "absolute",
          width: "50px",
          height: "50px",
          borderRadius: "100%",
          border: "1px solid transparent",
          borderTopColor: "inherit",
          borderRightColor: "inherit",
          right: "35%",
          top: "58%",
          backgroundColor: "white",
          transform: "rotate(315deg)",
        }}
      >
        {" "}
        <Icon
          style={{
            margin: "auto",
            width: "100%",
            transform: "rotate(45deg)",
            position: "absolute",
            right: "-3px",
            top: "9px",
          }}
        >
          {FORMATS[data.format]?.icon}
        </Icon>
      </Box>
    </Paper>
  );
};
export default GraphNode;
