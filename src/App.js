import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

// Components
import WebAudits from './components/WebAudits'
import AuditIdRuns from './components/AuditIdRuns'
import Run from './components/Run'

// Utils
import {setAuthHeaderDev} from './config/setAuthHeaderDev'

class App extends Component {
  render() {
    
    if (process.env.NODE_ENV === 'production') {
      console.log('production', process.env.NODE_ENV)
      return 'production env'
    } else {
      console.log('development', process.env.NODE_ENV)
      setAuthHeaderDev()
    }

    return (
      <Router>
        <div className='App'>
          <Route exact path='/' component={WebAudits}/>
          <Route exact path='/:auditId' component={AuditIdRuns}/>
          <Route exact path='/:auditId/:runId' component={Run}/>
        </div>
      </Router>
    );
  }
}

export default App;
