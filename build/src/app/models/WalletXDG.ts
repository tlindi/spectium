import { action, observable, computed } from 'mobx';
import * as fetch from 'isomorphic-fetch';

import { Wallet } from './';

export class WalletXDG extends Wallet {
  readonly ticket = 'XDG';
  readonly name = 'Dogecoin';

  protected async fetchBalance(): Promise<number> {
    return this.fetchBalanceChainSo('DOGE')
  }

  protected async fetchRate(): Promise<number> {
    return await this.fetchRateKraken('XXDGXXBT') * await this.fetchRateKraken('XXBTZEUR');
  };

}