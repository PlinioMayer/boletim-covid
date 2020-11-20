import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './views/Home';
import { DefaultLayout } from './layout';

function Teste () {
  return <div style={{ width: 800, height: 800, background: 'red', color: 'white', textAlign: 'center', display: 'table-cell', verticalAlign: 'middle' }}>
  TESTE
</div>
}

function App() {
  return (
    <Router>
      <DefaultLayout>
        <Switch>
          <Route path="/teste">
            <Teste />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </DefaultLayout>
    </Router>
  );
}

export default App;
