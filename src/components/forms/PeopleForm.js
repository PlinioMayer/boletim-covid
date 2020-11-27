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
import { genders, cases, cities, races } from 'utils/options';
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

  if (!notNull(entity.case_id)) {
    errorsDispatch({ type: 'case_id', value: { message: 'Caso não pode estar vazio' } });
    error = true;
  }

  if (!notNull(entity.city_id)) {
    errorsDispatch({ type: 'city_id', value: { message: 'Cidade não pode estar vazia' } });
    error = true;
  }

  if (!notNull(entity.race)) {
    errorsDispatch({ type: 'race', value: { message: 'Raça não pode estar vazia' } });
    error = true;
  }

  if (error) {
    return;
  }

  if (entity.id) {
    api.put('people/' + entity.id, entity)
    .then(() => {
      openSuccessDialog();
    })
    .catch(() => {
      openErrorDialog();
    })
  } else {
    api.post('people', entity)
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


const PeopleForm = ({ entity }) => {
  const classes = useStyles();

  const initialEntityState = entity ? {
    id: entity.id,
    name: entity.name,
    cpf: entity.cpf,
    gender: entity.gender,
    birthdate: entity.birthdate,
    case_id: entity.case_id,
    city_id: entity.city_id,
    race: entity.race
  } : {
    name: '',
    cpf: '',
    gender: '',
    birthdate: '',
    case_id: '',
    city_id: '',
    race: ''
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
          label="CPF"
          variant="outlined"
          size="small"
          value={entityState.cpf}
          onChange={handleByValue(value => handleChange('cpf', value))}
          error={errorsState.cpf ? true : false}
          helperText={errorsState.cpf ? errorsState.cpf.message : ''}
        />

        <TextField
            id="date"
            label="Birthday"
            type="date"
            value={entityState.birthdate}
            onChange={handleByValue(value => handleChange('birthdate', value))}
            error={errorsState.birthdate ? true : false}
            helperText={errorsState.birthdate ? errorsState.birthdate.message : ''}
            className={classes.inputs}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControl
            className={classes.inputs}
            error={errorsState.gender ? true : false}
          >
            <InputLabel id="gender-select-label">Gênero</InputLabel>

            <Select
              labelId="state-select-label"
              value={entityState.gender}
              onChange={handleByValue(value => handleChange('gender', value))}
            >
              { genders.map((elem, index) => <MenuItem key={index} value={elem.value}>{elem.name}</MenuItem>) }
            </Select>
            <FormHelperText>{errorsState.gender ? errorsState.gender.message : ''}</FormHelperText>
          </FormControl>

          <FormControl
            className={classes.inputs}
            error={errorsState.case_id ? true : false}
          >
            <InputLabel id="case-select-label">Caso</InputLabel>

            <Select
              labelId="case-select-label"
              value={entityState.case_id}
              onChange={handleByValue(value => handleChange('case_id', value))}
            >
              { cases.map((elem, index) => <MenuItem key={index} value={elem.value}>{elem.name}</MenuItem>) }
            </Select>
            <FormHelperText>{errorsState.case_id ? errorsState.case_id.message : ''}</FormHelperText>
          </FormControl>

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

          <FormControl
            className={classes.inputs}
            error={errorsState.race ? true : false}
          >
            <InputLabel id="race-select-label">Raça</InputLabel>

            <Select
              labelId="race-select-label"
              value={entityState.race}
              onChange={handleByValue(value => handleChange('race', value))}
            >
              { races.map((elem, index) => <MenuItem key={index} value={elem.value}>{elem.name}</MenuItem>) }
            </Select>
            <FormHelperText>{errorsState.race ? errorsState.race.message : ''}</FormHelperText>
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

export default PeopleForm;
