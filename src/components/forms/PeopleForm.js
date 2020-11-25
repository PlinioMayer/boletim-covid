import React, { useReducer } from 'react';
import {
  TextField,
  Toolbar,
  Typography,
  Box,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { handleByValue } from 'utils/common';
import { onlyNumbers, notNull } from 'utils/validators';

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
    justifyContent: 'right',
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

const sendRequest = (entity, errorsDispatch) => {

  let error = false;

  if (!notNull(entity.name)) {
    errorsDispatch({ type: 'name', value: { message: 'Nome não pode estar vazio' } });
    error = true;
  }

  if (!notNull(entity.cpf)) {
    errorsDispatch({ type: 'cpf', value: { message: 'CPF não pode estar vazio' } });
    error = true;
  } else if (!onlyNumbers(entity.cpf)) {
    errorsDispatch({ type: 'cpf', value: { message: 'CPF pode conter apenas números' } });
    error = true;
  }

  if (!notNull(entity.gender)) {
    errorsDispatch({ type: 'gender', value: { message: 'Gênero não pode estar vazio' } });
    error = true;
  }

  if (!notNull(entity.birthdate)) {
    errorsDispatch({ type: 'birthdate', value: { message: 'Data de nascimento não pode estar vazia' } });
    error = true;
  }

  if (error) {
    return;
  }
}

const initialErrorsState = {
  name: null,
  cpf: null,
  gender: null,
  birthdate: null
}

const StatesForm = ({ entity }) => {
  const classes = useStyles();

  const initialEntityState = entity ? {
    id: entity.id,
    name: entity.name,
    cpf: entity.cpf,
    gender: entity.gender,
    birthdate: entity.birthdate
  } : {
    id: '',
    name: '',
    cpf: '',
    gender: '',
    birthdate: ''
  }

  const [entityState, entityDispatch] = useReducer(objReducer, initialEntityState);
  const [errorsState, errorsDispatch] = useReducer(objReducer, initialErrorsState);

  const handleChange = (type, value) => {
    entityDispatch({ type, value });
    errorsDispatch({ type, value: null });
  }

  return (
    <>
      <Toolbar className={classes.topToolbar}>
        <Typography variant="subtitle1">Criar novo Estado</Typography>
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

        <TextField
          className={classes.inputs}
          label="População"
          variant="outlined"
          size="small"
          type="number"
          value={entityState.population}
          onChange={handleByValue(value => handleChange('population', value))}
          error={errorsState.population ? true : false}
          helperText={errorsState.population ? errorsState.population.message : ''}
        />

       
      </Box>
      <Toolbar className={classes.bottomToolbar}>
        <Button onClick={() => sendRequest(entityState, errorsDispatch)} variant="contained" color="primary">ENVIAR</Button>
      </Toolbar>
    </>
  )
};

export default StatesForm;
