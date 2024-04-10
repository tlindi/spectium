import { action, observable, computed } from 'mobx';
import * as fetch from 'isomorphic-fetch';

import { Wallet } from './';

export class WalletDefault extends Wallet {
  readonly ticket: string;
  readonly name = 'NOT IMPLEMENTED';

  constructor(address: string, ticket?: string) {
    super(address);
    this.ticket = ticket;
  }

}