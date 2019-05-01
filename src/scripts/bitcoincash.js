import bitcore from "bitcore-lib-cash";

let BITBOXSDK = require("bitbox-sdk");
let BITBOX = new BITBOXSDK({
  restURL: "https://trest.bitcoin.com/v2/"
});
//let NETWORK = "testnet"; // "mainnet"

bitcore.Networks.defaultNetwork = bitcore.Networks.testnet;

export function createWallet() {
  let seed = BITBOX.Mnemonic.generate(128);
  if (!seed) {
    console.log("Network Error: New wallet could not be created");
    return false;
  }
  localStorage.setItem("wallet", seed);
  return seed;
}

export function initWallet(seed) {
  if (!seed) {
    console.log("Error: No seed detected");
    return false;
  }
  //let seedBuffer = BITBOX.Mnemonic.toSeed(seed);
  // let hdNode = BITBOX.HDNode.fromSeed(seedBuffer, "testnet");
  // let account = BITBOX.HDNode.derivePath(hdNode, "m/44'/145'/0'");
  // let change = BITBOX.HDNode.derivePath(account, "0/0");
  // let cashAddress = BITBOX.HDNode.toCashAddress(change);
  var value = new Buffer(seed);
  let hash = bitcore.crypto.Hash.sha256(value);
  let bn = bitcore.crypto.BN.fromBuffer(hash);
  var address = new bitcore.PrivateKey(bn).toAddress();
  let cashAddress = address.toString();
  return cashAddress;
}
