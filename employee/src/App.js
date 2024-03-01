import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EmployeeForm from './Pages/EmployeeForm';
import EmployeeList from './Pages/EmployeeList';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={EmployeeForm} />
          <Route path="/list" exact component={EmployeeList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
