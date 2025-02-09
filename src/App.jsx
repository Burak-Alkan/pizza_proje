import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Order from './components/order';
import Home from './components/home';
import Success from './components/success';
import React from 'react';

function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/order" component={Order} />
          <Route path="/success" component={Success} />
        </Switch>
      </Router>
    </>
  )
}

export default App
