import { action, observable, computed } from 'mobx';
import * as fetch from 'isomorphic-fetch';

import { Wallet } from './';

export class WalletXRP extends Wallet {
  readonly ticket = 'XRP';
  readonly name = 'Ripple';

  protected async fetchBalance(): Promise<number> {
    // https://ripple.com/build/data-api-tool/#get-account
    interface Result {
      "result": "success",
      "account_data": {
        "account": string,
        "parent": string,
        "initial_balance": string,
        "inception": string,
        "ledger_index": number,
        "tx_hash": string
      }
    }
    const request = await fetch(`https://data.ripple.com/v2/accounts/${this.address}`);
    if(request.status != 200) return;
    const res = await request.json() as Result;
    const balance = res.account_data.initial_balance;
    return Number(balance);
  }

  protected async fetchRate(): Promise<number> {
    return this.fetchRateKraken('XXRPZEUR');
  };

}