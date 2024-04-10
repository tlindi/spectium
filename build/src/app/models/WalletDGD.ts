import { action, observable, computed } from 'mobx';
import * as fetch from 'isomorphic-fetch';

import { Wallet } from './';

export class WalletDGD extends Wallet {
  readonly ticket = 'DGD';
  readonly name = 'DigixDAO';

  protected async fetchBalance(): Promise<number> {
    return await this.fetchBalanceEtherToken('0xe0b7927c4af23765cb51314a0e0521a9645f0e2a', 9);
  }

  protected async fetchRate(): Promise<number> {
    return await this.fetchRateNorthpole('DGD') * await this.fetchRateKraken('XXBTZEUR');
  };

}