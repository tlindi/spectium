import { action, observable, computed } from 'mobx';
import * as fetch from 'isomorphic-fetch';

import { Wallet } from './';

export class WalletDASH extends Wallet {
  readonly ticket = 'DASH';
  readonly name = 'Dash';

  protected async fetchBalance(): Promise<number> {
    const opts: RequestInit = {
      method: 'get',
      headers: {
        'Content-Type': 'text/plain',
      }
    };
    const request = await fetch(`https://explorer.dash.org/chain/Dash/q/addressbalance/${this.address}`, opts);
    const res = await request.json();
    const balance = res;
    return balance;
  }

  protected async fetchRate(): Promise<number> {
    return this.fetchRateKraken('DASHEUR');
  };

}