import * as React from 'react';
import { observable, action } from 'mobx';
import {observer, inject} from 'mobx-react';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
// import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';

import {ComponentRouted} from '../common/';
import {Wallets} from '../models/';
import {STORE_WALLET} from "../constants/";
import {WalletStore} from "../stores/";

import Topbar from '../components/Topbar';
// import Navigation from '../components/Navigation';

const style = createStyleSheet('App', (theme) => ({
  '@media (min-width: 0px)': {
    content: {
      paddingTop: '56px',
    }
  },
  '@media (min-width: 600px)': {
    content: {
      paddingTop: '64px',
    }
  },
  app: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    font: '"Roboto", Helvetica, Arial, sans-serif',
    background: '#f0f0f0',
    // color: '#4d4d4d',
    fontSmoothing: 'antialiased',
    fontWeight: 300,
    overflow: 'auto',
  },
  content: {
    minWidth: '680px',
    maxWidth: '960px',
    margin: 'auto',
    paddingLeft: '8px',
    paddingRight: '8px',
  }
}));

@withStyles(style)
@inject(STORE_WALLET)
@observer
export default class App extends ComponentRouted<{}, {}, {}> {
  @observable public isDrawerOpen: boolean = false;

  constructor(props) {
    super(props);

    this.setDrawer = this.setDrawer.bind(this);
  }

  resetCoins() {
    const walletStore = this.props[STORE_WALLET] as WalletStore;
    walletStore.clear();
    Object.keys(this.props.location.query).forEach((ticket)=> {
      let addrs: string | string[] = this.props.location.query[ticket];
      if(typeof addrs == 'string') addrs = [addrs];
      addrs.forEach((addr) => walletStore.add(ticket, addr) );
    })
    console.log(`${this.props.location.pathname}?`+walletStore.map((wallet)=>`${wallet.ticket}=${wallet.address}`).join('&'));
  }
  
  componentDidMount() {
    this.resetCoins();
  }

  componentDidUpdate() {
    this.resetCoins();
  }

  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return (<DevTools />);
    }
  };

  @action setDrawer(open: boolean): void { this.isDrawerOpen = open || false };

  render() {
    return (
        <Paper className={this.props.classes.app}>
          {/*<Drawer
            docked={false}
            open={this.isDrawerOpen}
            onRequestClose={()=>this.setDrawer(false)}
          >
            <Navigation />
          </Drawer>*/}
          <Topbar setDrawer={this.setDrawer} />
          <Paper id='content' className={this.props.classes.content}>
            {this.props.children}
          </Paper>
          {this.renderDevTool()}
        </Paper>
    );
  }
};
