import { Route, Switch, Link, useHistory } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/actions";
import { useEffect, useState } from "react";
import Blog from "./pages/Blog";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [ userStatus, setUserStatus ] = useState('LOADING');

  const logout = () => {
    fetch('/api/v1/users/logout')
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert(data.success);
        dispatch(setUser(null));
        history.push('/login')
      }
    })
  }
// checking to see if user logged in - if so, set up redux with user data so that page refreshes dont reset login status
  useEffect(() => {
    fetch('/api/v1/users/current')
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        dispatch(setUser(data))
      }
      setUserStatus('CHECKED')
    })
  }, [])

  return (
    <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link><Link to='/'>Home</Link></Nav.Link>
              
              {user ? (
                <>
                  {user.username}
                  <Button onClick={logout} variant="primary">Logout</Button>
                </>
              ) : (
                <>
                  <Nav.Link><Link to='/register'>Register</Link></Nav.Link>
                  <Nav.Link><Link to='/login'>Login</Link></Nav.Link>
                </>
                )
              }
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item to="/">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        {userStatus === 'LOADING' && 'Loading...'}
        {userStatus === 'CHECKED' && (
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <ProtectedRoute path='/blog'>
            <Blog />
          </ProtectedRoute>
        </Switch>
        )}
    </div>
  );
}

export default App;
