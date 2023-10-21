import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, {FC, useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import {useSharedState} from './Store';
import infoText from './info.md?raw';

const InfoModal: FC = () => {
  const [state, setState] = useSharedState();
  const [page, setPage] = useState('1');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setState(state => {
      return {
        ...state,
        modalInfoOpenState: open,
      };
    });
  }, []);
  const handleOpen = () => true;
  const handleClose = () =>
    setState(s => {
      return {...s, modalInfoOpenState: false};
    });

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setPage(newValue);
  };

  return (
    <Modal
      open={state.modalInfoOpenState ?? false}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          // border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          maxWidth: '80%',
          maxHeight: '90%',

          borderRadius: '10px',
          overflow: 'auto',
        }}
      >
        <ReactMarkdown remarkPlugins={[gfm]} children={`${infoText}`} />
      </Box>
    </Modal>
  );
};

export default InfoModal;
