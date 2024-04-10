import * as React from 'react';
import { observer } from 'mobx-react';
import { Route, IndexRoute, Redirect } from 'react-router';

import Theme from './containers/Theme';
import App from './containers/App';
import Home from './containers/Home';

export const routes = (
  <Route component={Theme}>
    <Route path='/' component={App} >
      <IndexRoute component={Home} />
    </Route>
  </Route>
);