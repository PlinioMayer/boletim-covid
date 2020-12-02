import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { Home, RegisterList } from './views';
import { DefaultLayout } from './layout';
import { PeopleForm, HealthCentersForm, RiskGroupsForm, PeopleRiskGroupsForm, PhonesForm, TestsForm } from 'components/forms';
import { EmergencialSupportsForm } from './components/forms';

const riskGroupHeaders = [
  'name'
]

const peopleHeaders = [
  'id', 'cpf', 'name', 'gender', 'race', 'birthdate', 'city_name', 'case_name'
]

const statesBulletinsHeaders = [
  'name', 'confirmed', 'recovered', 'active', 'death', 'men_cases', 'women_cases'
]

const healthCenterHeaders = [
  'name', 'address', 'total', 'occupied', 'city_name'
]

const emergencialSupportsHeaders = [
  'person_name', 'value', 'date'
]

const peopleRiskGroupsHeaders = [
  'person_name', 'risk_group_name'
]

const phonesHeaders = [
  'person_name', 'number'
]

const testsHeaders = [
  'person_name', 'testtype', 'result'
]

const peopleConverters = {
  birthdate: (value) => {
    if (typeof value !== 'string') {
      return value;
    }

    return value.split('-').reverse().join('/');
  }
}

const testsConverters = {
  result: (value) => {
    return value ? 'Positivo' : 'Negativo';
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
          
          <Route path="/grupos-de-risco">
            <RegisterList
              headers={ riskGroupHeaders }
              title="Grupos de Risco"
              form={ RiskGroupsForm }
              baseUrl="risk_groups"
              identifier="rg"
            />
          </Route>

          <Route path="/auxilios-emergenciais">
            <RegisterList
              headers={ emergencialSupportsHeaders }
              title="Auxílios Emergenciais"
              form={ EmergencialSupportsForm }
              baseUrl="emergencial_supports"
              identifier="es"
            />
          </Route>

          <Route path="/pessoas-em-risco">
            <RegisterList
              headers={ peopleRiskGroupsHeaders }
              title="Pessoas em Risco"
              form={ PeopleRiskGroupsForm }
              baseUrl="people_risk_groups"
              identifier="prg"
            />
          </Route>

          <Route path="/telefones">
            <RegisterList
              headers={ phonesHeaders }
              title="Telefones"
              form={ PhonesForm }
              baseUrl="phones"
              identifier="ph"
            />
          </Route>

          <Route path="/testes">
            <RegisterList
              headers={ testsHeaders }
              title="Testes"
              form={ TestsForm }
              baseUrl="tests"
              identifier="tt"
              converters={testsConverters}
            />
          </Route>
        </Switch>
      </DefaultLayout>
    </Router>
  );
}

export default App;
