import React, { useReducer } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Typography,
  TablePagination,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import dictionary from '@/utils/dictionary';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between'
  },
  tableContainer: {
    maxHeight: '60vh'
  }
}));

function reducer(state, action) {
  return action;
}

function changeRowsState (event, pageDispatch, rowsDispatch) {
  rowsDispatch(parseInt(event.target.value));
  pageDispatch(0);
}

const BaseTable = props => {
  const classes = useStyles();
  const [pageState, pageDispatch] = useReducer(reducer, 0);
  const [rowsState, rowsDispatch] = useReducer(reducer, 10);

  return (
    <Paper>
      <Toolbar className={classes.toolbar}>
        <Typography variant="subtitle1">
          {props.title}
        </Typography>

        <Button variant="contained" color="primary">
          CRIAR NOVO
        </Button>
      </Toolbar>

      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell variant="head">{dictionary[props.headers[0]]}</TableCell>
              {
                props.headers.slice(1).map(elem => (
                  <TableCell align="right" variant="head">{dictionary[elem]}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {props.entities.slice(pageState * rowsState, pageState * rowsState + rowsState).map(entity => (
              <TableRow>
                <TableCell>{entity[props.headers[0]]}</TableCell>
                { 
                  props.headers.slice(1)
                    .map(elem => (
                      <TableCell align="right">{entity[elem]}</TableCell>
                    ))
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.entities.length}
        rowsPerPage={rowsState}
        page={pageState}
        onChangePage={(e, num) => pageDispatch(num)}
        onChangeRowsPerPage={e => changeRowsState(e, pageDispatch, rowsDispatch)}
      />
    </Paper>
  )
};

export default BaseTable;
