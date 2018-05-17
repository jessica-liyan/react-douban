import React from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom'

import {Main} from '../components/main/main'
import {Login} from '../components/login/login'

export class Routes extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={props => <Login {...props}/>}/>
          <Route path="/login" render={props => <Login {...props}/>}/>
          <Route path="/main" render={props => <Main {...props}/>}/>
        </Switch>
      </Router>
    )
  }
}

