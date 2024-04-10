import { action, observable, computed } from 'mobx';
import * as fetch from 'isomorphic-fetch';

import { Wallet } from './';

export class WalletLTC extends Wallet {
  readonly ticket = 'LTC';
  readonly name = 'Litecoin';

  protected async fetchBalance(): Promise<number> {
    return this.fetchBalanceChainSo(this.ticket)
  }

  protected async fetchRate(): Promise<number> {
    return this.fetchRateKraken('XLTCZEUR');
  };

}