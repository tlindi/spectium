import { action, observable, computed } from 'mobx';
import * as fetch from 'isomorphic-fetch';

import { Wallet } from './';

export class WalletBTC extends Wallet {
  readonly ticket = 'BTC';
  readonly name = 'Bitcoin';

  protected async fetchBalance(): Promise<number> {
    // `http://blockchain.info/balance?active=${this.address}&cors=true` crashes on IE.
    return this.fetchBalanceChainSo('BTC');
  }

  protected async fetchRate(): Promise<number> {
    return this.fetchRateKraken('XXBTZEUR');
  };

}