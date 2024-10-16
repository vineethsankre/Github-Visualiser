// src/App.js
import React, {Component} from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import Repositories from './components/Repositories'
import NotFound from './components/NotFound'
import UserContext from './context/UserContext'

import './App.css'

class App extends Component {
  state = {
    username: '',
  }

  changeUsername = username => {
    this.setState({username})
  }

  render() {
    const {username} = this.state

    return (
      <UserContext.Provider
        value={{
          username,
          changeUsername: this.changeUsername,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/repositories" component={Repositories} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    )
  }
}

export default App
