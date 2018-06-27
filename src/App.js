import React, { Component } from 'react';
import PartneredSchools from './containers/PartneredSchools/PartneredSchools';
import School from './containers/School/School';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
          <Switch>
            <Route path="/partneredschools" component={PartneredSchools} exact/>
            <Route path="/partneredschools/:name" component={School} />
          </Switch>
      </div>
    );
  }
}

export default App;
