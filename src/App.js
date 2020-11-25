import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { Home, RegisterList } from './views';
import { DefaultLayout } from './layout';
import { StatesForm, CitiesForm, RiskGroupsForm, PeopleForm } from 'components/forms';
import { states, cities, riskGroups, people } from 'utils/mock';

const statesHeaders = [
  'name', 'population', 'region'
]

const citiesHeaders = [
  'name', 'population', 'state'
]

const riskGroupHeaders = [
  'name'
]

const peopleHeaders = [
  'cpf', 'name', 'case', 'birthdate', 'gender'
]

const peopleConverters = {
  birthdate: (value) => {
    if (typeof value !== 'string') {
      return value;
    }

    console.log(value);

    return value.split('-').reverse().join('/');
  }
}

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

          <Route path="/pessoas">
            <RegisterList
              headers={peopleHeaders}
              entities={people}
              title="Pessoas"
              form={ PeopleForm }
              baseUrl="people"
              converters={peopleConverters}
            />
          </Route>
          
        </Switch>
      </DefaultLayout>
    </Router>
  );
}

export default App;
