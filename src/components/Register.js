import React, { useState } from 'react';  

import { apiRegister } from '../request/api';

export default function Register() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();

    const token = await apiRegister({ username, password });

    console.log(token);
    console.log(token.data);
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
          <button type="submit">Create account</button>
        </form>
      </div>
    )
}