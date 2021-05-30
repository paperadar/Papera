import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Home } from './Home';
import { About } from './About';
import { NoMatch } from './NoMatch';
import Sidebar from './components/Sidebar';
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import defaultFiles from './utils/defaultFiles'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <React.Fragment>
      <Router>
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
      <div className="App container-fluid px=0">
        <div className="row no-gutters">
          <div className="col-3 bg-danger left-panel">
            <div className="col-2 bg-primary label-panel">
              <div className='row'>
                <BottomBtn
                  text='Translate'
                  colorClass='btn-primary'
                />
            </div>
              <div className='row'>
                <BottomBtn
                  text='Serach'
                  colorClass='btn-primary'
                />
              </div>
            </div>
            <div className="col-10 bg-primary tab-panel">
              <FileSearch
                title='My Documents'
                onFileSearch={(value) => { console.log(value) }}
              />
              <FileList
                files={defaultFiles}
                onFileClick={(id) => {console.log(id)}}
                onFileDelete={(id) => {console.log('deleting', id)}}
                onSaveEdit={(id, newValue) => {console.log(id); console.log(newValue)}}
              />
            </div>
          </div>
          <div className="col-9 bg-primary right-panel">
            <h1>this is the pdf</h1>
          </div>
        </div>
      </div>
  </React.Fragment>

    
  );
}

export default App;
