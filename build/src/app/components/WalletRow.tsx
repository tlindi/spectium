import * as React from 'react';
import { observer } from 'mobx-react';
import {action, computed, observable} from 'mobx';
import * as numeral from 'numeral';
import * as log10 from 'log10';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import { TableCell, TableRow } from 'material-ui/Table';

import {Component} from "../common/";
import {Wallet} from "../models/";

type Status = 'fetching' | 'ok' | string;

interface WalletRowProps {
  wallet: Wallet,
}

const style = createStyleSheet('WalletRowCustom', (theme) => ({
  root: {
    height: '2.5em'
  },
}));

@withStyles(style)
@observer
export default class WalletRow extends Component<WalletRowProps, {}> {
  @observable balanceStatus: Status = 'ok';
  @observable rateStatus: Status = 'ok';

  @computed get balance(): string | JSX.Element {
    if(this.balanceStatus == 'ok') {
      return numeral(this.props.wallet.balance).format('0.0000000');
    } else if(this.balanceStatus == 'fetching') {
      return <span title='loading...'>...</span>;
    } else {
      return <a href='#' title={this.balanceStatus} onClick={(event)=>{event.preventDefault(); this.refreshBalance(); }}>Error</a>;
    }
  }

  @computed get rate(): string | JSX.Element {
    if(this.rateStatus == 'ok') {
      let inputString = '0.';
      for(let i=0; i<Math.max(2,3-Math.floor(log10(this.props.wallet.rate))); i++) inputString+='0';
      return numeral(this.props.wallet.rate).format(inputString)
    } else if(this.rateStatus == 'fetching') {
      return <span title='loading...'>...</span>;
    } else {
      return <a href='#' title={this.rateStatus} onClick={(event)=>{event.preventDefault(); this.refreshRate(); }}>Error</a>;
    }

  }

  @action statBalance(status: string) { this.balanceStatus = status; }
  @action statRate(status: string) { this.rateStatus = status; }

  @action async refreshBalance(): Promise<any> {
    this.balanceStatus='fetching';
    return this.props.wallet.refreshBalance()
      .then(()=>this.statBalance('ok'))
      .catch((e: Error)=>this.statBalance(e.message));
  }

  @action async refreshRate(): Promise<any> {
    this.rateStatus='fetching';
    return this.props.wallet.refreshRate()
      .then(()=>this.statRate('ok'))
      .catch((e: Error)=>this.statRate(e.message));
  }
  componentDidMount() {
    this.refreshBalance();
    this.refreshRate();
  }

  renderAddress() {
    return (<span title={this.props.wallet.address}>
      {(this.props.wallet.address as string).substr(0, 4)}...{(this.props.wallet.address as string).substr(-4, 4)}
    </span>)
  }

  render() {
    return (
      <TableRow classes={this.props.classes}>
        <TableCell compact>{`${this.props.wallet.name} (${this.props.wallet.ticket})`}</TableCell>
        <TableCell compact>{this.renderAddress()}</TableCell>
        <TableCell compact numeric>{this.balance}</TableCell>
        <TableCell compact numeric>{this.rate}</TableCell>
        <TableCell compact numeric>{numeral(this.props.wallet.value).format('0.00')}</TableCell>
      </TableRow>
    );
  }
}