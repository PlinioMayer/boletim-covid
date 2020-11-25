import React, { useReducer } from 'react';
import { TextField, Toolbar, Typography, Box, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { handleByValue } from 'utils/common';
import { notNull } from 'utils/validators'

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
  }
}));

const entityReducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return {
        ...state,
        name: action.value
      };

    default:
      return state;
  }
}

const errorsReducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return {
        ...state,
        name: action.value
      };

    default:
      return state;
  }
}

const sendRequest = (entity, errorsDispatch) => {

  let error = false;

  if (!notNull(entity.name)) {
    errorsDispatch({ type: 'name', value: { message: 'Nome não pode estar vazio' } });
    error = true;
  }

  if (error) {
    return;
  }
}

const initialErrorsState = {
  name: null,
  population: null
}

const RiskGroupsForm = ({ entity }) => {
  const classes = useStyles();

  const initialEntityState = entity ? {
    id: entity.id,
    name: entity.name
  } : {
    name: ''
  }

  const [entityState, entityDispatch] = useReducer(entityReducer, initialEntityState);
  const [errorsState, errorsDispatch] = useReducer(errorsReducer, initialErrorsState);

  function handleChange (type, value) {
    entityDispatch({ type, value });
    errorsDispatch({ type, value: null });
  }

  return (
    <>
      <Toolbar className={classes.topToolbar}>
        <Typography variant="subtitle1">{ !entity ?  'Criar novo' : 'Atualizar' } Grupo de Risco</Typography>
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
        <Button onClick={() => sendRequest(entityState, errorsDispatch)} variant="contained" color="primary">ENVIAR</Button>
      </Toolbar>
    </>
  )
};

export default RiskGroupsForm;
