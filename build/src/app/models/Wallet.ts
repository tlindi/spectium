import { action, computed, observable } from 'mobx';

export abstract class Wallet {
  readonly ticket: string;
  readonly name: string;
  readonly address: string;

  @observable balance: number;
  @observable rate: number;
  @computed get value(): number {
    const value = this.balance * this.rate;
    if(isNaN(value)) return undefined;
    return value;
  }

  constructor(address: string) {
    this.address = address;

    this.fetchBalance = this.fetchBalance.bind(this);
    this.fetchRate = this.fetchRate.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  @action private setBalance(balance: number): void {
    this.balance = balance;
  }

  @action private setRate(rate: number): void {
    this.rate = rate;
  }

  protected async fetchBalanceChainSo(ticket:'BTC'|'DASH'|'DOGE'|'LTC'): Promise<number> {
    const opts: RequestInit = {
      method: 'get',
      headers: {
        'Content-Type': 'text/plain',
      }
    };
    const request = await fetch(`https://chain.so/api/v2/get_address_balance/${ticket}/${this.address}`, opts);
    const res = await request.json();
    if(res.status == 'fail') throw new Error('chain.so failed to find address');
    const balance = Number(res.data.confirmed_balance);
    return balance;
    
  }

  protected async fetchBalanceEtherToken(contractAddr: string, decimals: number) {
    const opts: RequestInit = {
      method: 'get',
      headers: {
        'Content-Type': 'text/plain',
      }
    }
    const request = await fetch(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contractAddr}&address=${this.address}&tag=latest`, opts);
    const res = await request.json();
    const balance = res.result;
    return Number(balance) / Math.pow(10, decimals);
  }

  protected async fetchRateKraken(pair): Promise<number> {
    // https://www.kraken.com/en-us/help/api#public-market-data
    const opts: RequestInit = {
      method: 'get',
      headers: {
        'Content-Type': 'text/plain',
      }
    }
    const request = await fetch(`https://api.kraken.com/0/public/Ticker?pair=${pair}`, opts);
    const res = await request.json();
    const result = res.result[pair];
    const midPrice = (Number(result.a[0]) + Number(result.b[0])) / 2;
    return midPrice;
  };

  protected async fetchRateBittrex(pair): Promise<number> {
    // https://bittrex.com/Home/Api
    // TODO:  yarn add node.bittrex.api , but no typings for it
    throw new Error('Not implemented due to CORS issues');

  }

  protected async fetchRateCoinMarketCap(pair): Promise<number> {
    throw new Error('Not implemented due to CORS issues');
  }

  protected async fetchRateNorthpole(ticket): Promise<number> {
    // http://coinmarketcap.northpole.ro/

    const opts: RequestInit = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    const request = await fetch(`http://coinmarketcap.northpole.ro/ticker.json?select=${ticket}`, opts);
    const res = await request.json();
    const price = res.markets[0].price.btc;
    return price;

  }

  protected async fetchBalance(): Promise<number> {
    throw Error(`Fetching balance of coin ${this.ticket} is not implemented yet.`)
  }

  protected async fetchRate(): Promise<number> {
    throw Error(`Fetching rate of coin ${this.ticket} is not implemented yet.`)
  };

  @action async refreshBalance(): Promise<void> {
    this.setBalance(undefined);
    return this.fetchBalance().then((balance)=>this.setBalance(balance));
  }

  @action async refreshRate(): Promise<void> {
    this.setRate(undefined);
    return this.fetchRate().then((rate)=>this.setRate(rate));
  }

  @action async refresh(): Promise<void[]> {
    return Promise.all([
      this.refreshBalance(),
      this.refreshRate(),
    ]);
  }

}