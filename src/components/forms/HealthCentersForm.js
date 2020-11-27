import React, { useReducer, useState } from 'react';
import {
  TextField,
  Toolbar,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogActions
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { handleByValue } from 'utils/common';
import { onlyNumbers, notNull } from 'utils/validators';
import { cities } from 'utils/options';
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

const sendRequest = (entity, errorsDispatch, openSuccessDialog, openErrorDialog) => {

  let error = false;

  if (!notNull(entity.name)) {
    errorsDispatch({ type: 'name', value: { message: 'Nome não pode estar vazio' } });
    error = true;
  }

  if (!notNull(entity.address)) {
    errorsDispatch({ type: 'address', value: { message: 'Endereço não pode estar vazio' } });
    error = true;
  } 

  if (!notNull(entity.total)) {
    errorsDispatch({ type: 'total', value: { message: 'Total não pode estar vazio' } });
    error = true;
  } else if (!onlyNumbers(entity.total)) {
    errorsDispatch({ type: 'total', value: { message: 'Total pode conter apenas números' } });
    error = true;
  }

  if (!notNull(entity.occupied)) {
    errorsDispatch({ type: 'occupied', value: { message: 'Ocupado não pode estar vazio' } });
    error = true;
  } else if (!onlyNumbers(entity.occupied)) {
    errorsDispatch({ type: 'occupied', value: { message: 'Ocupado pode conter apenas números' } });
    error = true;
  }

  if (!notNull(entity.city_id)) {
    errorsDispatch({ type: 'city_id', value: { message: 'Cidade não pode estar vazia' } });
    error = true;
  }

  if (error) {
    return;
  }

  if (entity.id) {
    api.put('health_centers/' + entity.id, entity)
    .then(() => {
      openSuccessDialog();
    })
    .catch(() => {
      openErrorDialog();
    })
  } else {
    api.post('health_centers', entity)
    .then(() => {
      openSuccessDialog();
    })
    .catch(() => {
      openErrorDialog();
    })
  }
}

const initialErrorsState = {
  name: null,
  cpf: null,
  gender: null,
  birthdate: null
}


const HealthCentersForm = ({ entity }) => {
  const classes = useStyles();

  const initialEntityState = entity ? {
    id: entity.id,
    total: entity.total,
    occupied: entity.occupied,
    address: entity.address,
    name: entity.name,
    city_id: entity.city_id,
  } : {
    total: '',
    occupied: '',
    address: '',
    name: '',
    city_id: '',
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
          label="Endereço"
          variant="outlined"
          size="small"
          value={entityState.address}
          onChange={handleByValue(value => handleChange('address', value))}
          error={errorsState.address ? true : false}
          helperText={errorsState.address ? errorsState.address.message : ''}
        />

        <TextField
          label="Total"
          type="number"
          value={entityState.total}
          onChange={handleByValue(value => handleChange('total', value))}
          error={errorsState.total ? true : false}
          helperText={errorsState.total ? errorsState.total.message : ''}
          className={classes.inputs}
        />

        <TextField
          label="Ocupado"
          type="number"
          value={entityState.occupied}
          onChange={handleByValue(value => handleChange('occupied', value))}
          error={errorsState.occupied ? true : false}
          helperText={errorsState.occupied ? errorsState.occupied.message : ''}
          className={classes.inputs}
        />

        <FormControl
          className={classes.inputs}
          error={errorsState.city_id ? true : false}
        >
          <InputLabel id="city-select-label">Cidade</InputLabel>

          <Select
            labelId="city-select-label"
            value={entityState.city_id}
            onChange={handleByValue(value => handleChange('city_id', value))}
          >
              { cities.map((elem, index) => <MenuItem key={index} value={elem.value}>{elem.name}</MenuItem>) }
          </Select>
          <FormHelperText>{errorsState.city_id ? errorsState.city_id.message : ''}</FormHelperText>
        </FormControl>

      </Box>
      <Toolbar className={classes.bottomToolbar}>
        <Button onClick={() => sendRequest(entityState, errorsDispatch, () => setSuccessDialogState(true), () => setErrorDialogState(true))} variant="contained" color="primary">ENVIAR</Button>
      </Toolbar>
      
      <Dialog
        open={successDialogState}
        onClose={() => setSuccessDialogState(false)}
      >
        <DialogTitle>Pessoa cadastrada com sucesso</DialogTitle>
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
        <DialogTitle>Pessoa cadastrada com sucesso</DialogTitle>
        <DialogActions>
          <Button onClick={() => setErrorDialogState(false)} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default HealthCentersForm;
