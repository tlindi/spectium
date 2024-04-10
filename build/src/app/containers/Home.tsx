import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';

import {ComponentRouted} from '../common/';
import {STORE_WALLET} from "../constants/";
import {WalletStore} from "../stores/";

import WalletRow from '../components/WalletRow';
import SummaryRow from "../components/SummaryRow";

import * as banner from '../../../assets/images/banner.jpg';

const style = createStyleSheet('Home', (theme) => ({
  banner: {
    backgroundImage: `url('${banner}')`,
    filter: 'sepia(60%)',
    height: '100%',
    backgroundPosition: '0px -664px',
    display: 'inline-block',
    width: '100%',
  },
  display3: {
    color: 'DarkBlue',
  },
  tableHeaderRow: {
    height: '3.5em'
  }
}));

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

@withStyles(style)
@inject(STORE_WALLET)
@observer
export default class Home extends ComponentRouted<{}, {}, {}> {
  intervalId: number;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow className={this.props.classes.tableHeaderRow}>
                <TableCell compact>Currency</TableCell>
                <TableCell compact>Address</TableCell>
                <TableCell compact numeric>Balance</TableCell>
                <TableCell compact numeric>Rate (EUR)</TableCell>
                <TableCell compact numeric>Total (EUR)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(this.props[STORE_WALLET] as WalletStore)
                .map((wallet) => wallet)
                .sort((a, b) => a.ticket > b.ticket ? 1 : -1)
                .map((wallet) => <WalletRow key={wallet.address} wallet={wallet} /> )}
              <SummaryRow />
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    );
  }
};
