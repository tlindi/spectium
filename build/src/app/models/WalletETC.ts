import { action, observable, computed } from 'mobx';
import * as fetch from 'isomorphic-fetch';

import { Wallet } from './';

export class WalletETC extends Wallet {
  readonly ticket = 'ETC';
  readonly name = 'Ethereum Classic';

  protected async fetchBalance(): Promise<number> {
    const opts: RequestInit = {
      method: 'post',
      body: JSON.stringify({
        'method': 'eth_getBalance',
        'params': [this.address],
        'id': Math.floor(Math.random()*1000000),
      }),
      headers: {
        // 'Content-Type': 'text/plain',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    throw new Error('Not implemented due to CORS issues.')
    // TODO implement.
    // const request = await fetch(`http://api.gastracker.io/web3`, opts);
    // const balance = await request.text();
    // return Number(balance);
    
  }

  protected async fetchRate(): Promise<number> {
    return this.fetchRateKraken('XETCZEUR');
  };

}