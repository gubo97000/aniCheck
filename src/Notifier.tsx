import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import React, {FC} from 'react';
import {useSharedState} from './Store';
import {useUpdateWorker} from './lib/useUpdateWorker';

const Notifier: FC = () => {
  const {run, status, error, setStatus, result} = useUpdateWorker();
  const [state, setState] = useSharedState();
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const [time, setTime] = React.useState<number | null>(null);
  // const { getLists } = useAPIs();
  // const test = useTestWorker();

  //Hook check if the data displayed is cached once
  React.useEffect(() => {
    if (state.tempInfo.usingCache) {
      setState(s => {
        return {
          ...s,
          status: ['loading', '✨ Updating Data'],
          tempInfo: {usingCache: false},
        };
      });
      setOpen(true);
      setMsg(state.status[1]);
      setTimeout(() => {
        console.log('Getting new data for', state.user.name);
        run('fullUpdate', {user: state.user.name!});
      }, 4000);
    }
  }, []);

  //Update global status every status update from the worker
  React.useEffect(() => {
    if (!status) return;
    setState(s => {
      return {
        ...s,
        status: status,
      };
    });
    if (status[0] === 'success') {
      setTime(3000);
    }
    setOpen(true);
    setMsg(status[1]);
    setStatus(null);
  }, [status]);

  const handleClick = async () => {
    // let res = await test();
    // console.log(res);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setTime(null);
    setState(s => ({
      ...s,
      status: ['ok', ' '],
    }));
  };

  const action = <>{/* <CircularProgress /> */}</>;

  return (
    <>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        open={open}
        autoHideDuration={time}
        onClose={handleClose}
        message={state.status[1]}
        action={action}
      />
      {/* <Button
        sx={{
          position: "fixed",
          top: "0",
        }}
        onClick={handleClick}
      >
        Test
      </Button> */}
    </>
  );
};

export default Notifier;
