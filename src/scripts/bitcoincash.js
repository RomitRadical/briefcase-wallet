let BITBOXSDK = require("bitbox-sdk");
let BITBOX = new BITBOXSDK();
//let NETWORK = "testnet"; // "mainnet"

export function getPrice(currency) {
  if (!currency) {
    currency = "INR";
  }
  let price = BITBOX.Price.current(currency);
  return price;
}

export function createWallet() {
  let seed = BITBOX.Mnemonic.generate(128);
  localStorage.setItem("wallet", seed);
  return seed;
}

export function initWallet(seed) {
  let seedBuffer = BITBOX.Mnemonic.toSeed(seed);
  let hdNode = BITBOX.HDNode.fromSeed(seedBuffer);
  let account = BITBOX.HDNode.derivePath(hdNode, "m/44'/145'/0'");
  let change = BITBOX.HDNode.derivePath(account, "0/0");
  let cashAddress = BITBOX.HDNode.toCashAddress(change);
  return cashAddress;
}
