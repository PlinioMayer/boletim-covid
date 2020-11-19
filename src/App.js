import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './views/Home';
import { Drawer } from './components';

function Teste () {
  return <div style={{ width: 800, height: 800, background: 'red', color: 'white', textAlign: 'center', display: 'table-cell', verticalAlign: 'middle' }}>
  TESTE
</div>
}

function App() {
  return (
    <Router>
      <Drawer />
      <Switch>
      <Route path="/teste">
          <Teste />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
