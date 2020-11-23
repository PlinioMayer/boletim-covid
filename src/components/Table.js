import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import dictionary from '@/utils/dictionary';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '60vh'
  },
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    }
  }
}));

const BaseTable = ({ headers, entities, pageState, rowsState, showUpdateModal }) => {
  const classes = useStyles();

  return (
      <TableContainer className={classes.root}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell variant="head">{dictionary[headers[0]]}</TableCell>
              {
                headers.slice(1).map(elem => (
                  <TableCell key={elem} align="right" variant="head">{dictionary[elem]}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {entities.slice(pageState * rowsState, pageState * rowsState + rowsState).map(entity => (
              <TableRow onClick={() => showUpdateModal(entity)} className={classes.tableRow} key={entity[headers[0]]}>
                <TableCell>{entity[headers[0]]}</TableCell>
                { 
                  headers.slice(1)
                    .map(elem => (
                      <TableCell key={elem} align="right">{entity[elem]}</TableCell>
                    ))
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  )
};

export default BaseTable;
