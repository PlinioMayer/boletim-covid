import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { Home, RegisterList } from './views';
import { DefaultLayout } from './layout';

function Teste () {
  return <div style={{ width: 800, height: 800, background: 'red', color: 'white', textAlign: 'center', display: 'table-cell', verticalAlign: 'middle' }}>
  TESTe
</div>
}

const states = [
  {
    name: 'Acre',
    population: 773559,
    region: 'NORTE'
  },
  {
    name: 'Alagoas',
    population: 3351543,
    region: 'NORDESTE'
  },
  {
    name: 'Amapá',
    population: 669526,
    region: 'NORTE'
  },
  {
    name: 'Amazonas',
    population: 4207714,
    region: 'NORTE'
  },
  {
    name: 'Bahia',
    population: 14016906,
    region: 'NORDESTE'
  },
  {
    name: 'Ceará',
    population: 8452381,
    region: 'NORDESTE'
  },
  {
    name: 'Espírito Santo',
    population: 3514952,
    region: 'SUDESTE'
  },
  {
    name: 'Goiás',
    population: 6003788,
    region: 'CENTRO_OESTE'
  },
  {
    name: 'Maranhão',
    population: 6574789,
    region: 'NORDESTE'
  },
  {
    name: 'Mato Grosso',
    population: 3035122,
    region: 'CENTRO_OESTE'
  },
  {
    name: 'Mato Grosso do Sul',
    population: 2449024,
    region: 'CENTRO_OESTE'
  },
  {
    name: 'Minas Gerais',
    population: 19597330,
    region: 'SUDESTE'
  },
  {
    name: 'Pernambuco',
    population: 8796448,
    region: 'NORDESTE'
  },
  {
    name: 'Paraná',
    population: 10444526,
    region: 'SUL'
  },
  {
    name: 'Paraíba',
    population: 3766528,
    region: 'NORDESTE'
  },
  {
    name: 'Pará',
    population: 7581051,
    region: 'NORTE'
  },
  {
    name: 'Piauí',
    population: 3118360,
    region: 'NORDESTE'
  },
  {
    name: 'Rio de Janeiro',
    population: 15989929,
    region: 'dSUDESTE'
  },
  {
    name: 'Rio Grande do Norte',
    population: 3168027,
    region: 'NORDESTE'
  },
  {
    name: 'Rio Grande do Sul',
    population: 11422973,
    region: 'SUL'
  },
  {
    name: 'Rondônia',
    population: 1562409,
    region: 'NORTE'
  },
  {
    name: 'Roraima',
    population: 450479,
    region: 'NORTE'
  },
  {
    name: 'Santa Catarina',
    population: 6248436,
    region: 'SUL'
  },
  {
    name: 'São Paulo',
    population: 41262199,
    region: 'SUL'
  },
  {
    name: 'Sergipe',
    population: 2068017,
    region: 'NORDESTE'
  },
  {
    name: 'Tocantins',
    population: 1590248,
    region: 'NORTE'
  },
  {
    name: 'Distrito Federal',
    population: 2570160,
    region: 'CENTRO_OESTE'
  }
];

const statesHeaders = [
  'name', 'population', 'region'
]

function App() {
  return (
    <Router>
      <DefaultLayout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/teste">
            <Teste />
          </Route>

          <Route path="/estados">
            <RegisterList
              headers={statesHeaders}
              entities={states}
              title="Estados"
            />
          </Route>
          
        </Switch>
      </DefaultLayout>
    </Router>
  );
}

export default App;
