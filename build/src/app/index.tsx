import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { hashHistory, Router } from 'react-router';

import * as injectTapEventPlugin from 'react-tap-event-plugin';
import {RouterStore, WalletStore} from './stores/';
import {STORE_ROUTER, STORE_WALLET} from './constants/';

import {routes} from './routes';

// enable MobX strict mode
useStrict(true);

// prepare MobX stores
const routerStore = new RouterStore(hashHistory);
const walletStore = new WalletStore();
const rootStores = {
  [STORE_ROUTER]: routerStore,
  [STORE_WALLET]: walletStore,
};

injectTapEventPlugin();
ReactDOM.render(
  <Provider {...rootStores} >
    <Router history={hashHistory} >
      { routes }
    </Router>
  </Provider >,
  document.getElementById('root')
);