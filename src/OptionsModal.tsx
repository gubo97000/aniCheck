import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import React, { FC, useEffect, useState } from "react";
import { useSharedState } from "./Store";
import SortMenu from "./SortMenu";
import CompletionMenu from "./CompletionMenu";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import CyFilterMenu from "./CyFilterMenu";
import GeneralOptionsMenu from "./GeneralOptionsMenu";

export default function OptionsModal() {
  const [state, setState] = useSharedState();
  const [page, setPage] = useState("1");
  const [open, setOpen] = useState(false);
  const openOptionsModal = (openState: boolean, page?: string) => {
    setOpen(openState);
    setPage(page ?? "general");
  };
  useEffect(() => {
    setState((state) => {
      return {
        ...state,
        modalOpenState: [open, openOptionsModal],
      };
    });
  }, []);

  const handleOpen = () => state.modalOpenState?.[1](true);
  const handleClose = () => state.modalOpenState?.[1](false);

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
          width: 400,
          bgcolor: "background.paper",
          // border: '2px solid #000',
          boxShadow: 24,
          p: 4,

          maxHeight: "90%",
          borderRadius: "10px",
          overflow: "auto auto",
        }}
      >
        <TabContext value={page}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="options">
              <Tab label="General" value="general" />
              <Tab label="Completion" value="completion_options" />
              {/* <Tab label="Filter" value="3" /> */}
            </TabList>
          </Box>
          <TabPanel value="general"><GeneralOptionsMenu/></TabPanel>
          <TabPanel value="completion_options">
            <CompletionMenu />
          </TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </Modal>
  );
}
