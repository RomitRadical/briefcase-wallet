import bitcore from "bitcore-lib-cash";

let NETWORK = localStorage.getItem("network");
if (!NETWORK) {
  NETWORK = "testnet";
}

let BITBOX = require('bitbox-sdk');
let bitbox;

if (NETWORK === "mainnet") {
  bitbox = new BITBOX();
} else {
  bitbox = new BITBOX({
    restURL: "https://trest.bitcoin.com/v2/"
  });

}

bitcore.Networks.defaultNetwork = bitcore.Networks.testnet;

export function createWallet() {
  let seed = bitbox.Mnemonic.generate(128);
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
  let rootSeed = bitbox.Mnemonic.toSeed(seed);
  let hd = bitcore.HDPrivateKey.fromSeed(rootSeed).deriveChild("m/44'/145'/0'/0'/0")
  let cashAddress = hd.publicKey.toAddress().toString();
  return cashAddress;
}
