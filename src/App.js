import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { Home, RegisterList } from './views';
import { DefaultLayout } from './layout';
import { StatesForm, CitiesForm, RiskGroupsForm } from 'components/forms';
import { states, cities, riskGroups } from 'utils/mock';

const statesHeaders = [
  'name', 'population', 'region'
]

const citiesHeaders = [
  'name', 'population', 'state'
]

const riskGroupHeaders = [
  'name'
]

function App() {
  return (
    <Router>
      <DefaultLayout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/estados">
            <RegisterList
              headers={statesHeaders}
              entities={states}
              title="Estados"
              form={ StatesForm }
              baseUrl="states"
            />
          </Route>

          <Route path="/cidades">
            <RegisterList
              headers={citiesHeaders}
              entities={cities}
              title="Cidades"
              form={ CitiesForm }
              baseUrl="cities"
            />
          </Route>

          <Route path="/grupos-de-risco">
            <RegisterList
              headers={riskGroupHeaders}
              entities={riskGroups}
              title="Grupos de Risco"
              form={ RiskGroupsForm }
              baseUrl="risk_groups"
            />
          </Route>
          
        </Switch>
      </DefaultLayout>
    </Router>
  );
}

export default App;
