import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { Home, RegisterList } from './views';
import { DefaultLayout } from './layout';
import { PeopleForm, HealthCentersForm } from 'components/forms';

// const statesHeaders = [
//   'name', 'population', 'region'
// ]

// const citiesHeaders = [
//   'name', 'population', 'state'
// ]

// const riskGroupHeaders = [
//   'name'
// ]

const peopleHeaders = [
  'cpf', 'name', 'gender', 'race', 'birthdate', 'city_name', 'case_name'
]

const statesBulletinsHeaders = [
  'name', 'confirmed', 'recovered', 'active', 'death', 'men_cases', 'women_cases'
]

const healthCenterHeaders = [
  'name', 'address', 'total', 'occupied', 'city_name'
]

const peopleConverters = {
  birthdate: (value) => {
    if (typeof value !== 'string') {
      return value;
    }

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

          {/* <Route path="/grupos-de-risco">
            <RegisterList
              headers={riskGroupHeaders}
              title="Grupos de Risco"
              form={ RiskGroupsForm }
              baseUrl="risk_groups"
            />
          </Route> */}

          <Route path="/pessoas">
            <RegisterList
              headers={peopleHeaders}
              title="Pessoas"
              form={ PeopleForm }
              baseUrl="people"
              converters={peopleConverters}
              identifier="p"
            />
          </Route>

          <Route path="/boletim-estadual">
            <RegisterList
              readOnly={true}
              headers={statesBulletinsHeaders}
              title="Boletim Estadual"
              form={ PeopleForm }
              baseUrl="states_bulletins"
              identifier="sb"
            />
          </Route>

          <Route path="/postos">
            <RegisterList
              headers={healthCenterHeaders}
              title="Postos"
              form={ HealthCentersForm }
              baseUrl="health_centers"
              identifier="h"
            />
          </Route>
          
        </Switch>
      </DefaultLayout>
    </Router>
  );
}

export default App;
