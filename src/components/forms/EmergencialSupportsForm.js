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
import { notNull, onlyNumbers, moneyValidator } from 'utils/validators';
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

  if (!notNull(entity.person_id)) {
    errorsDispatch({ type: 'person_id', value: { message: 'ID de pessoa não pode estar vazio' } });
    error = true;
  } else if (!onlyNumbers(entity.person_id)) {
    errorsDispatch({ type: 'person_id', value: { message: 'ID de pessoa só pode conter números' } });
    error = true;
  }

  if (!notNull(entity.value)) {
    errorsDispatch({ type: 'value', value: { message: 'Valor não pode estar vazio' } });
    error = true;
  } else if (!moneyValidator(entity.value)) {
    errorsDispatch({ type: 'value', value: { message: 'Valor deve estar no formato 0,00' } });
    error = true;
  }

  if (!notNull(entity.date)) {
    errorsDispatch({ type: 'date', value: { message: 'Data não pode estar vazia' } });
    error = true;
  } 


  if (error) {
    return;
  }

  entity.value = parseFloat(entity.value.replace(',', '.'));

  if (entity.id) {
    api.put('emergencial_supports/' + entity.id, entity)
    .then(() => {
      openSuccessDialog();
      afterModify();
    })
    .catch(() => {
      openErrorDialog();
    })
  } else {
    api.post('emergencial_supports', entity)
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
  api.delete('emergencial_supports/' + id)
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
  value: null,
  date: null
}


const EmergencialSupportsForm = ({ entity, afterModify }) => {
  const classes = useStyles();

  const initialEntityState = entity ? {
    id: entity.id,
    person_id: entity.person_id,
    value: entity.value.toLocaleString('pt-BR', {style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2}),
    date: entity.date
  } : {
    person_id: '',
    value: '',
    date: ''
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
        <Typography variant="subtitle1">{!entityState.id ? 'Criar novo auxílio emergencial' : 'Atualizar auxílio emergencial'}</Typography>
      </Toolbar>
      <Box className={classes.box}>
        <TextField
          className={classes.inputs}
          label="ID de pessoa"
          variant="outlined"
          size="small"
          value={entityState.person_id}
          onChange={handleByValue(value => handleChange('person_id', value))}
          error={errorsState.person_id ? true : false}
          helperText={errorsState.person_id ? errorsState.person_id.message : ''}
        />

        <TextField
          className={classes.inputs}
          label="Valor do suporte"
          variant="outlined"
          size="small"
          value={entityState.value}
          onChange={handleByValue(value => handleChange('value', value))}
          error={errorsState.value ? true : false}
          helperText={errorsState.value ? errorsState.value.message : ''}
        />

        <TextField
          type="date"
          className={classes.inputs}
          label="Data"
          variant="outlined"
          size="small"
          value={entityState.date}
          onChange={handleByValue(value => handleChange('date', value))}
          error={errorsState.date ? true : false}
          helperText={errorsState.date ? errorsState.date.message : ''}
          InputLabelProps={{
            shrink: true,
          }}
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
        <DialogTitle>Auxílio emergencial {entityState.id ? 'alterado' : 'cadastrado'} com sucesso</DialogTitle>
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
        <DialogTitle>Erro ao {entityState.id ? 'alterar' : 'cadastrar'} auxílio emergencial</DialogTitle>
        <DialogActions>
          <Button onClick={() => setErrorDialogState(false)} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default EmergencialSupportsForm;
