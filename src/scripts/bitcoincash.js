let BITBOXSDK = require("bitbox-sdk");
let BITBOX = new BITBOXSDK();
//let NETWORK = "testnet"; // "mainnet"

export function createWallet() {
  let seed = BITBOX.Mnemonic.generate(128);
  localStorage.setItem("wallet", seed);
  return seed;
}
