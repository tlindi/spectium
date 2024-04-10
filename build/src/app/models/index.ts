export { Wallet } from './Wallet';

import { WalletBTC } from './WalletBTC';
import { WalletETH } from './WalletETH';
import { WalletETC } from './WalletETC';
import { WalletDASH } from './WalletDASH';
import { WalletLTC } from './WalletLTC';
// import { WalletNEM } from './WalletNEM';
import { WalletXDG } from './WalletXDG';
import { WalletXLM } from './WalletXLM';
// import { WalletXMR } from './WalletXMR';
import { WalletXRP } from './WalletXRP';
// import { WalletZEC } from './WalletZEC';
import { WalletDGD } from './WalletDGD';
import { WalletGNO } from './WalletGNO';

export { WalletDefault } from './WalletDefault';

export namespace Wallets {
  export const BTC = WalletBTC;
  export const DASH = WalletDASH;
  export const ETC = WalletETC;
  export const ETH = WalletETH;
  export const LTC = WalletLTC;
  // export const NEM = WalletNEM;
  export const XDG = WalletXDG;
  export const XLM = WalletXLM;
  // export const XMR = WalletXMR;
  export const XRP = WalletXRP;
  // export const ZEC = WalletZEC;
  export const DGD = WalletDGD;
  export const GNO = WalletGNO;
}
