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
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    }
  }
}));

const BaseTable = ({ headers, entities, pageState, rowsState, showUpdateModal, converters, identifier, readOnly }) => {
  const classes = useStyles();
  const innerConverters = converters ? converters : {};
  return (
      <TableContainer className={classes.root}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell variant="head">{dictionary[headers[0]]}</TableCell>
              {
                headers.slice(1).map((elem, index) => (
                  <TableCell key={'h' + identifier + index} align="right" variant="head">{dictionary[elem]}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {entities.slice(pageState * rowsState, pageState * rowsState + rowsState).map((entity, entityIndex) => (
              <TableRow onClick={() => showUpdateModal(entity)} style={{cursor: readOnly ? 'default' : 'pointer'}} className={classes.tableRow} key={'r' + identifier + entityIndex}>
                <TableCell>{entity[headers[0]]}</TableCell>
                { 
                  headers.slice(1)
                    .map((elem, headerIndex) => (
                      <TableCell key={'c' + identifier + headerIndex} align="right">{innerConverters[elem] ? innerConverters[elem](entity[elem]) : entity[elem]}</TableCell>
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
