import { action, observable, computed } from 'mobx';
import * as fetch from 'isomorphic-fetch';

import { Wallet } from './';

export class WalletETH extends Wallet {
  readonly ticket = 'ETH';
  readonly name = 'Ethereum';

  protected async fetchBalance(): Promise<number> {
    const opts: RequestInit = {
      method: 'get',
      headers: {
        'Content-Type': 'text/plain',
      }
    }
    
    const request = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${this.address}&tag=latest`, opts);
    const res = await request.json();
    const balance = res.result;
    return balance / Math.pow(10, 18);
    
  }

  protected async fetchRate(): Promise<number> {
    return this.fetchRateKraken('XETHZEUR');
  };

}