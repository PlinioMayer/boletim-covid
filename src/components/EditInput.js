import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  InputBase,
  Divider,
  IconButton
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@material-ui/icons';
import { toggleReducer, handleByValue } from 'utils/common';

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



export default function CustomizedInputBase({ placeholder, initReadonly, remove, update, value }) {
  const classes = useStyles();
  const [readOnly, toggleReadonly] = useReducer(toggleReducer, initReadonly ? true : false);

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        readOnly={readOnly}
        value={value}
        update={handleByValue(value => update(value))}
      />
      <IconButton onClick={toggleReadonly} color="primary" className={classes.iconButton}>
        <EditIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="secondary" onClick={remove} className={classes.iconButton}>
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
}