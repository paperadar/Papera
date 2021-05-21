import React, { useState } from 'react';  
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';  
 
import { apiLogin } from '../../request/api';
import Register from '../Register'

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();

    const token = await apiLogin({ username, password });

    console.log(token);
    console.log(token.data);

    setToken(token);
  }

  return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" onChange={e => setUserName(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <button type="submit">Sign in</button>
        </form>
        <div>
          <label>New to Papera?</label>
          <a href="/register">Create an account</a>
          <BrowserRouter>
            <Switch>
              <Route path="/register">
                <Register />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};