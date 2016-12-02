import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import Users from './routes/Users';
import Settings from './routes/Settings';
import Calendar from './components/Calendar/Calendar';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/users" component={Users} />
      <Route path="/settings" component={Settings} />
      <Route path="/calendar" component={Calendar} />
    </Router>
  );
};
