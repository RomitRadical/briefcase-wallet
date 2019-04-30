let BITBOXSDK = require("bitbox-sdk");
let BITBOX = new BITBOXSDK({
  restURL: "https://trest.bitcoin.com/v2/"
});
//let NETWORK = "testnet"; // "mainnet"

export function createWallet() {
  let seed = BITBOX.Mnemonic.generate(128);
  if (!seed) {
    console.log("Network Error: New wallet could not be created");
    return false;
  }
  localStorage.setItem("wallet", seed);
  return true;
}

export function initWallet(seed) {
  if (!seed) {
    console.log("Error: No seed detected");
    return false;
  }
  let seedBuffer = BITBOX.Mnemonic.toSeed(seed);
  let hdNode = BITBOX.HDNode.fromSeed(seedBuffer, "testnet");
  let account = BITBOX.HDNode.derivePath(hdNode, "m/44'/145'/0'");
  let change = BITBOX.HDNode.derivePath(account, "0/0");
  let cashAddress = BITBOX.HDNode.toCashAddress(change);
  return cashAddress;
}
