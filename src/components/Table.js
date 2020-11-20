import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@material-ui/core';

const BaseTable = props => (
  !props.entities.length || !props.headers.length ? (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
        <TableRow>
            {
              props.headers.map(elem => (
                <TableCell variant="head">{elem}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {props.entities.map(entity => (
            <TableRow>
              { 
                Object.entries(entity)
                  .filter(tuple => typeof tuple[1] !== 'object')
                  .map(tuple => (
                    <TableCell>{tuple[1]}</TableCell>
                  ))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Paper>
      <Typography variant="subtitle1">Não foram encontradas entidades</Typography>
    </Paper>
  )
);

  export default BaseTable;
