import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  InputBase,
  IconButton
} from '@material-ui/core';
import {
  Add as AddIcon
} from '@material-ui/icons';
import {  handleByValue } from 'utils/common';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));



export default function CustomizedInputBase({ placeholder, initReadonly, add, update, value }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        readOnly={initReadonly}
        value={value}
        update={handleByValue(value => update(value))}
      />
      <IconButton onClick={add} color="primary" className={classes.iconButton}>
        <AddIcon />
      </IconButton>
    </Paper>
  );
}