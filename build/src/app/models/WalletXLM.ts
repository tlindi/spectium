import { action, observable, computed } from 'mobx';
import * as fetch from 'isomorphic-fetch';

import { Wallet } from './';

export class WalletXLM extends Wallet {
  readonly ticket = 'XLM';
  readonly name = 'Lumens';

  protected async fetchBalance(): Promise<number> {
    type Balance = {asset_type: string, balance: string};
    const request = await fetch(`https://horizon.stellar.org/accounts/${this.address}`);
    if(request.status != 200) return;
    const res = await request.json() as {balances: Balance[]};
    let amount: number;
    (res.balances as Balance[]).forEach((balance) => {
      if(balance.asset_type == 'native') amount = Number(balance.balance);
    });
    return amount;
  }

  protected async fetchRate(): Promise<number> {
    return this.fetchRateKraken('XXLMZEUR');
  };

}