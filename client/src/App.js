import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home'
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
