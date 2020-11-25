import React, { useReducer } from 'react';
import { Table, Modal } from '../components';
import { styled, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  CircularProgress,
  Paper,
  Button,
  Toolbar,
  Typography,
  TablePagination
} from '@material-ui/core';

const StyledBox = styled(Box)({
  width: '100%',
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center'
});

const useStyle = makeStyles(theme => ({
  root: {
    width: '60%',
    margin: '0 auto',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  paper: {
    width: '100%'
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between'
  },
}));

function returnByStatusState (statusState, entities, headers, pageState, rowsState, showUpdateModal, converters) {
  switch (statusState) {
    case 'fetching':
      return (
        <StyledBox>
          <CircularProgress />
        </StyledBox>
      );
    
    case 'done':
      if (entities.length) {
        return (
          <Table
            headers={headers}
            entities={entities}
            pageState={pageState}
            rowsState={rowsState}
            showUpdateModal={showUpdateModal}
            converters={converters}
          />
        );
      }
      
      return (
        <StyledBox>
          <Typography variant="subtitle2">Nenhuma entidade encontrada</Typography>
        </StyledBox>
      );
    
    case 'error':
      return (
        <StyledBox>
          <Typography variant="subtitle2">Erro ao buscasr entidade</Typography>
        </StyledBox>
      );

    default:
      return null;
  }
}



function changeRowsState (event, pageDispatch, rowsDispatch) {
  rowsDispatch(parseInt(event.target.value));
  pageDispatch(0);
}

function modalReducer(state) {
  return !state;
}

function reducer (state, action) {
  return action;
}

const RegisterList = ({ headers, entities, title, form, converters }) => {
  const classes= useStyle();
  const Form = form;

  const [statusState, statusDispatch] = useReducer(reducer, 'fetching')
  const [pageState, pageDispatch] = useReducer(reducer, 0);
  const [rowsState, rowsDispatch] = useReducer(reducer, 10);
  const [creationModalState, creationModalDispatch] = useReducer(modalReducer, false);
  const [updateModalState, updateModalDispatch] = useReducer(modalReducer, false);
  const [focusedEntityState, focusedEntityDispatch] = useReducer(reducer, null);

  const showUpdateModal = (entity) => {
    focusedEntityDispatch(entity);
    updateModalDispatch();
  }

  setTimeout(() => { statusDispatch('done') }, 1000);

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="subtitle1">
            {title}
          </Typography>

          <Button variant="contained" color="primary" onClick={creationModalDispatch}>
            CRIAR NOVO
          </Button>
        </Toolbar>

        { returnByStatusState(statusState, entities, headers, pageState, rowsState, showUpdateModal, converters) }

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={entities.length}
          rowsPerPage={rowsState}
          page={pageState}
          onChangePage={(e, num) => pageDispatch(num)}
          onChangeRowsPerPage={e => changeRowsState(e, pageDispatch, rowsDispatch)}
        />
        <Modal open={creationModalState} handleClose={creationModalDispatch}>
          <Form />
        </Modal>

        <Modal open={updateModalState} handleClose={updateModalDispatch}>
          <Form entity={focusedEntityState} />
        </Modal>
      </Paper>
      
    </Box>
  );
};

export default RegisterList;
