import React, { useReducer, useState } from 'react';
import {
  TextField,
  Toolbar,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { handleByValue } from 'utils/common';
import { notNull } from 'utils/validators';
import api from 'utils/api';

const useStyles = makeStyles(theme => ({
  inputs: {
    width: '100%',
    marginTop: theme.spacing(2),
    '&:first-child': {
      marginTop: 0
    }
  },
  box: {
    width: '100%'
  },
  topToolbar: {
    padding: 0
  },
  bottomToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0
  },
  phoneToolbar: {
    display: 'flex',
    justifyContent: 'right'
  },
  telefonesOuterContainer: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  telefonesInnerContainer: {
    maxHeight: '10vw',
    overflow: 'auto',
    width: '100%'
  }
}));

const objReducer = (state, action) => {
  const obj = { ...state };
  obj[action.type] = action.value;

  return obj;
}

const sendRequest = (entity, errorsDispatch, openSuccessDialog, openErrorDialog, afterModify) => {

  let error = false;

  if (!notNull(entity.name)) {
    errorsDispatch({ type: 'name', value: { message: 'Nome não pode estar vazio' } });
    error = true;
  }

  if (error) {
    return;
  }

  if (entity.id) {
    api.put('risk_groups/' + entity.id, entity)
    .then(() => {
      openSuccessDialog();
      afterModify();
    })
    .catch(() => {
      openErrorDialog();
    })
  } else {
    api.post('risk_groups', entity)
      .then(() => {
        openSuccessDialog();
        afterModify();
      })
      .catch(() => {
        openErrorDialog();
      })
  }
}

const sendDeleteRequest = (id, openSuccessDialog, openErrorDialog, afterModify) => {
  api.delete('risk_groups/' + id)
    .then(() => {
      openSuccessDialog();
      afterModify();
    })
    .catch(() => {
      openErrorDialog();
    })
}

const initialErrorsState = {
  name: null,
  cpf: null,
  gender: null,
  birthdate: null
}


const RiskGroupsForm = ({ entity, afterModify }) => {
  const classes = useStyles();

  const initialEntityState = entity ? {
    id: entity.id,
    name: entity.name
  } : {
    name: ''
  }

  const [entityState, entityDispatch] = useReducer(objReducer, initialEntityState);
  const [errorsState, errorsDispatch] = useReducer(objReducer, initialErrorsState);
  const [successDialogState, setSuccessDialogState] = useState(false);
  const [errorDialogState, setErrorDialogState] = useState(false);

  const handleChange = (type, value) => {
    entityDispatch({ type, value });
    errorsDispatch({ type, value: null });
  }

  return (
    <>
      <Toolbar className={classes.topToolbar}>
        <Typography variant="subtitle1">{!entityState.id ? 'Criar novo Estado' : 'Atualizar Estado'}</Typography>
      </Toolbar>
      <Box className={classes.box}>
        <TextField
          className={classes.inputs}
          label="Nome"
          variant="outlined"
          size="small"
          value={entityState.name}
          onChange={handleByValue(value => handleChange('name', value))}
          error={errorsState.name ? true : false}
          helperText={errorsState.name ? errorsState.name.message : ''}
        />
      </Box>
      <Toolbar className={classes.bottomToolbar}>
        {entityState.id ? <Button onClick={() => sendDeleteRequest(entityState.id, () => setSuccessDialogState(true), () => setErrorDialogState(true), afterModify)} variant="contained" color="secondary">DELETAR</Button> : <div/> }
        <Button onClick={() => sendRequest(entityState, errorsDispatch, () => setSuccessDialogState(true), () => setErrorDialogState(true), afterModify)} variant="contained" color="primary">ENVIAR</Button>
      </Toolbar>
      
      <Dialog
        open={successDialogState}
        onClose={() => setSuccessDialogState(false)}
      >
        <DialogTitle>Grupo de risco {entityState.id ? 'alterada' : 'cadastrada'} com sucesso</DialogTitle>
        <DialogActions>
          <Button onClick={() => setSuccessDialogState(false)} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={errorDialogState}
        onClose={() => setErrorDialogState(false)}
      >
        <DialogTitle>Erro ao {entityState.id ? 'alterar' : 'cadastrar'} grupo de risco</DialogTitle>
        <DialogActions>
          <Button onClick={() => setErrorDialogState(false)} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default RiskGroupsForm;
