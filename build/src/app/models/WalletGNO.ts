import { action, observable, computed } from 'mobx';
import * as fetch from 'isomorphic-fetch';

import { Wallet } from './';

export class WalletGNO extends Wallet {
  readonly ticket = 'GNO';
  readonly name = 'Gnosis';

  protected async fetchBalance(): Promise<number> {
    return await this.fetchBalanceEtherToken('0x6810e776880c02933d47db1b9fc05908e5386b96', 18)
  }

  protected async fetchRate(): Promise<number> {
    return await this.fetchRateKraken('GNOEUR');
  };

}