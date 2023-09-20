import React, {
  FC
} from "react";
import { useSharedState } from "./Store";
import { NodeType } from "./Types";

// import elk from "cytoscape-elk";
import HighlightOffRounded from "@mui/icons-material/HighlightOffRounded";
import { Chip, Typography } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import {
  FORMATS,
  RELEASE_STATUS,
  STATUSES
} from "./Utils";

type props = {
  node: NodeType;
};

const CardItemA: FC<props & BoxProps> = ({ node, ...boxProps }) => {
  // const graphBox = useRef(null)
  const [state, setState] = useSharedState();

  return (
    <Box
      {...boxProps}
      sx={{
        display: "grid",
        gridTemplateColumns: "130px auto",
        gridTemplateRows: "170px",
        gridTemplateAreas: "'cover content'",
        // overflow: "hidden",
        border: "1px solid",
        borderColor: "grey.300",
        borderRadius: "10px",
        width: "400px",
        m: 2,
        opacity: state.seriesSelected?.formatsIncluded?.includes(node.format)
          ? "1"
          : "0.2",
        ":hover": {
          opacity: "1",
        },
        // boxShadow:1,
        ...boxProps.sx,
      }}
    >
      <Box //Cover
        sx={{
          gridArea: "cover",
          placeSelf: "center",
          position: "relative",
          backgroundImage: `url(${node.cover})`,
          backgroundSize: "cover",
          borderRadius: "10px",
          border: "1px solid",
          borderColor: STATUSES[node.status].color
            ? `${STATUSES[node.status].color}.main`
            : "grey.500",
          boxShadow: 2,
          width: "108%",
          height: "108%",
          //   overflow: "hidden",
          cursor: "pointer",
        }}
        // onClick={() => {
        //   window.open(node.siteUrl, "_blank");
        // }}
        component="a"
        href={node.siteUrl}
        target="_blank"
      >
        <Box
          sx={{
            position: "absolute",
            top: "87%",
            left: "80%",
            display: "flex",
          }}
        >
          <Chip
            color={STATUSES[node.status].color}
            variant="filled"
            label={(() => {
              if (["MANGA", "NOVEL", "ONE_SHOT"].includes(node.format)) {
                if (node.status == "CURRENT") return "Reading";
                if (node.status == "PLANNING") return "Plan To Read";
              }
              return STATUSES[node.status].label;
            })()}
            icon={STATUSES[node.status].icon}
            size="small"
            sx={{
              // position: "absolute",
              // top: "86%",
              // left: "80%",
              // gridArea: "status",
              // placeSelf: "start start",
              mx: 0.5,
              my: 0.5,
              boxShadow: 1,
              "&.MuiChip-filledDefault": {
                bgcolor: "grey.600",
                color: "white",
              },
              "& .MuiChip-iconColorDefault": {
                // bgcolor: "grey.600",
                color: "white",
              },
            }}
          />
          {state.seriesSelected?.formatsIncluded?.includes(
            node.format
          ) ? undefined : (
            <Chip
              color={STATUSES["NO"].color}
              variant="filled"
              label={"Not Considered"}
              icon={<HighlightOffRounded />}
              size="small"
              sx={{
                // position: "absolute",
                // top: "86%",
                // left: "80%",
                // gridArea: "status",
                // placeSelf: "start start",
                mx: 0.5,
                my: 0.5,
                boxShadow: 1,
                "&.MuiChip-filledDefault": {
                  bgcolor: "grey.600",
                  color: "white",
                },
                "& .MuiChip-iconColorDefault": {
                  // bgcolor: "grey.600",
                  color: "white",
                },
              }}
            />
          )}
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          gridArea: "content",
          display: "grid",
          height: "170px",
          gridTemplateRows: "30px auto auto 20px",
          gridTemplateColumns: "1fr auto",
          gridTemplateAreas: "'format link' 'title .' 'date .' 'status .'",
        }}
      >
        {/* <IconButton sx={{ gridArea: "link", overflow: "hidden" }}><OpenInNewRoundedIcon/></IconButton> */}
        <Box sx={{ gridArea: "title", mx: 2, my: 0, overflow: "hidden" }}>
          <Typography
            // sx={{ color: "text.primary" }}
            variant="h6"
            color="text.primary"
          >
            {node.title}
          </Typography>
        </Box>
        <Box sx={{ gridArea: "date", mx: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {node.startDate ? `${node.startDate} · ` : ""}
            {RELEASE_STATUS[node.airStatus].label}
          </Typography>
        </Box>
        <Box
          sx={{ position: "relative", gridArea: "format", mx: 0.9, mt: 0.9 }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -7,
              left: -26,
              display: "flex",
              alignItems: "center",
              color: "primary.main",
            }}
          >
            <Box
              sx={{
                ml: 1,
                display: "flex",
                alignItems: "center",
                // border: "1px solid",
                // borderColor:"primary.main",
                borderRadius: "20px",
                p: "4px",
                boxShadow: 1,
                bgcolor: "background.paper",
              }}
            >
              {FORMATS[node.format].icon}
            </Box>
            <Box sx={{ ml: 0.8, fontWeight: 500, fontSize: 15 }}>
              {FORMATS[node.format].label}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default CardItemA;
