import React, { useReducer, useState } from 'react';
import {
  TextField,
  Toolbar,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { handleByValue } from 'utils/common';
import { notNull, onlyNumbers } from 'utils/validators';
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

  if (!notNull(entity.testtype)) {
    errorsDispatch({ type: 'testtype', value: { message: 'Tipo de teste não pode estar vazio' } });
    error = true;
  }

  if (!notNull(entity.result)) {
    errorsDispatch({ type: 'result', value: { message: 'Resultado não pode estar vazio' } });
    error = true;
  }

  if (error) {
    return;
  }

  if (entity.id) {
    api.put('tests/' + entity.id, entity)
    .then(() => {
      openSuccessDialog();
      afterModify();
    })
    .catch(() => {
      openErrorDialog();
    })
  } else {
    api.post('tests', entity)
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
  api.delete('tests/' + id)
    .then(() => {
      openSuccessDialog();
      afterModify();
    })
    .catch(() => {
      openErrorDialog();
    })
}

const initialErrorsState = {
  person_id: null,
  result: null,
  testtype: null
}


const TestsForm = ({ entity, afterModify }) => {
  const classes = useStyles();

  const initialEntityState = entity ? {
    id: entity.id,
    person_id: entity.person_id,
    result: entity.result,
    testtype: entity.testtype
  } : {
    person_id: '',
    result: '',
    testtype: ''
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
        <Typography variant="subtitle1">{!entityState.id ? 'Criar novo teste' : 'Atualizar teste'}</Typography>
      </Toolbar>
      <Box className={classes.box}>
        <TextField
          className={classes.inputs}
          label="ID de Pessoa"
          variant="outlined"
          size="small"
          value={entityState.person_id}
          onChange={handleByValue(value => handleChange('person_id', value))}
          error={errorsState.person_id ? true : false}
          helperText={errorsState.person_id ? errorsState.person_id.message : ''}
        />

        <TextField
          className={classes.inputs}
          label="Tipo de Teste"
          variant="outlined"
          size="small"
          value={entityState.testtype}
          onChange={handleByValue(value => handleChange('testtype', value))}
          error={errorsState.testtype ? true : false}
          helperText={errorsState.testtype ? errorsState.testtype.message : ''}
        />

        <FormControl
          className={classes.inputs}
          error={errorsState.result ? true : false}
        >
          <InputLabel id="result-select-label">Resultado</InputLabel>

          <Select
            labelId="state-select-label"
            value={entityState.result}
            onChange={handleByValue(value => handleChange('result', value))}
          >
            <MenuItem value={0}>Negativo</MenuItem>
            <MenuItem value={1}>Positivo</MenuItem>
          </Select>
          <FormHelperText>{errorsState.result ? errorsState.result.message : ''}</FormHelperText>
        </FormControl>
      </Box>
      <Toolbar className={classes.bottomToolbar}>
        {entityState.id ? <Button onClick={() => sendDeleteRequest(entityState.id, () => setSuccessDialogState(true), () => setErrorDialogState(true), afterModify)} variant="contained" color="secondary">DELETAR</Button> : <div/> }
        <Button onClick={() => sendRequest(entityState, errorsDispatch, () => setSuccessDialogState(true), () => setErrorDialogState(true), afterModify)} variant="contained" color="primary">ENVIAR</Button>
      </Toolbar>
      
      <Dialog
        open={successDialogState}
        onClose={() => setSuccessDialogState(false)}
      >
        <DialogTitle>Teste {entityState.id ? 'alterado' : 'cadastrado'} com sucesso</DialogTitle>
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
        <DialogTitle>Erro ao {entityState.id ? 'alterar' : 'cadastrar'} teste</DialogTitle>
        <DialogActions>
          <Button onClick={() => setErrorDialogState(false)} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default TestsForm;
