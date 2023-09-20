import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React, { FC, useEffect, useRef, useState } from "react";
import { useSharedState } from "./Store";
import SortMenu from "./SortMenu";
import CompletionMenu from "./CompletionMenu";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CyFilterMenu from "./CyFilterMenu";
import ReactMarkdown from "react-markdown";
import infoText from "./info.md?raw"
import gfm from 'remark-gfm'

export default function InfoModal() {
  const [state, setState] = useSharedState();
  const [page, setPage] = useState("1");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setState((state) => {
      return {
        ...state,
        modalInfoOpenState: [open, setOpen],
      };
    });
  }, []);
  const handleOpen = () => state.modalInfoOpenState?.[1](true);
  const handleClose = () => state.modalInfoOpenState?.[1](false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setPage(newValue);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          // border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          maxWidth:"80%",
          maxHeight:"90%",

          borderRadius: "10px",
          overflow: "auto",
        }}
      >
        <ReactMarkdown remarkPlugins={[gfm]} children={`${infoText}`} />

      </Box>
    </Modal>
  );
}
