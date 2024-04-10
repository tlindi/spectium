import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as numeral from 'numeral';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import { TableCell, TableRow } from 'material-ui/Table';

import {Wallet} from "../models/";
import {STORE_WALLET} from "../constants/";
import {WalletStore} from "../stores/";
import {Component} from "../common/";

const style = createStyleSheet('SummaryRow', (theme) => ({
  root: {
    fontWeight: 700,
  }
}));

@withStyles(style)
@inject(STORE_WALLET)
@observer
export default class SummaryRow extends Component<{}, {}> {

  render() {
    return (
      <TableRow classes={this.props.classes}>
        <TableCell compact>&nbsp;</TableCell>
        <TableCell compact>&nbsp;</TableCell>
        <TableCell compact>&nbsp;</TableCell>
        <TableCell compact>&nbsp;</TableCell>
        <TableCell compact numeric>Total (EUR): {numeral((this.props[STORE_WALLET] as WalletStore).sum).format('0.00')}</TableCell>
      </TableRow>
    );
  }
}