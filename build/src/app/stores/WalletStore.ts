import { Wallet, Wallets, WalletDefault } from './../models/';
import {ObservableMap, computed} from "mobx";

export class WalletStore extends ObservableMap<Wallet> {
  map<T>( callback: (wallet: Wallet, key: string)=>T ): T[] {
    const results: T[] = [];
    this.forEach((wallet: Wallet, key: string)=>results.push(callback(wallet, key)));
    return results;
  }
  add(ticket:string, addr: string): void {
    // TODO: Refactor observable array.
    if(ticket in Wallets) {
      const ticketValid = ticket as keyof typeof Wallets;
      this.set(Math.random().toString(4), new Wallets[ticketValid](addr))
    } else {
      this.set(Math.random().toString(4), new WalletDefault(addr, ticket))
    }
  }
  @computed get sum(): number { return this.map((wallet)=>Number(wallet.value)||0).reduce((sum, v)=>sum+=v, 0) }
}
