import React from 'react';
import { Modal, Zoom, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    width: '30%',
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4)
  },
  inputs: {
    width: '100%',
    marginTop: theme.spacing(2),
    '&:first-child': {
      marginTop: 0
    }
  }
}));

const MyModal = ({open, handleClose, children}) => {
  const classes = useStyles();

  return (
    <Modal
        className={classes.root}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Zoom in={open} style={{outline: 'none'}}>
          <Paper className={classes.paper}>
            { children }
          </Paper>
        </Zoom>
      </Modal>
  );
}

export default MyModal;