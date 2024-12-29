import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TransactionDetailPage from './pages/TransactionDetailPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/transaction/:id" component={TransactionDetailPage} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));