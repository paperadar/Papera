import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch'
import Login from './components/Login/Login';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  // if not logged in, show log in page
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-3 bg-danger left-panel">
          <FileSearch
            title='我的文档'
            onFileSearch={(value) => { console.log(value) }}
          />
        </div>
        <div className="col-9 bg-primary right-panel">
          <h1>this is the right</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
