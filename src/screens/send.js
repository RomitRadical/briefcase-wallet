import React, { Component } from "react";
import bitcore from "bitcore-lib-cash";
import { initWallet } from "../scripts/bitcoincash";
import { Divider } from "semantic-ui-react";
import { Input, Icon, Button, Popover } from "antd";

let NETWORK = localStorage.getItem("network");

let BITBOXSDK = require("bitbox-sdk");

let BITBOX;

if (NETWORK === "testnet") {
  BITBOX = new BITBOXSDK({
    restURL: "https://trest.bitcoin.com/v2/"
  });
} else {
  BITBOX = new BITBOXSDK();
}

export default class Send extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      sendAddr: "",
      sendAmount: "",
      fiatSymbol: ""
    };
  }

  componentWillMount() {
    let fiatSymbol = localStorage.getItem("fiat-symbol");
    if (!fiatSymbol) {
      fiatSymbol = "₹";
    }
    this.setState({
      fiatSymbol
    });
  }

  scanQRCode = () => {
    console.log("Scan");
  };

  onMaxAmount = () => {
    console.log("Max Amount");
  };

  onEnterAddress = addr => {
    this.setState({
      sendAddr: addr.target.value
    });
  };

  onEnterAmount = amount => {
    this.setState({
      sendAmount: amount.target.value
    });
  };

  onSend = () => {
    this.setState({ loading: true });
    let { sendAddr, sendAmount } = this.state;
    let currency,
      price,
      addr,
      seed,
      utxo,
      value,
      hash,
      bn,
      privateKey,
      transaction,
      byteCount,
      details,
      change,
      hex;
    currency = localStorage.getItem("currency");
    if (!currency) {
      currency = "INR";
    }
    (async () => {
      try {
        // Get current BCH price
        price = await BITBOX.Price.current(currency);
        if (!price) {
          console.log("Network Error: Price cannot be fetched");
          return false;
        }
        // Convert fiat amount to bch amount
        sendAmount /= price;
        // Convert BCH to satoshis
        sendAmount = BITBOX.BitcoinCash.toSatoshi(sendAmount.toFixed(8));
        addr = initWallet(localStorage.getItem("wallet"));
        seed = localStorage.getItem("wallet");
        (async () => {
          try {
            //Get the utxo details of the address
            utxo = await BITBOX.Address.utxo(addr);
            //console.log(utxo);
            // Create a transaction object
            transaction = new bitcore.Transaction();

            // Get the wallet's private key
            value = new Buffer(seed);
            hash = bitcore.crypto.Hash.sha256(value);
            bn = bitcore.crypto.BN.fromBuffer(hash);
            privateKey = new bitcore.PrivateKey(bn).toString();

            // Add inputs for the transaction
            utxo.utxos.map(res => {
              details = {
                txId: res.txid,
                outputIndex: res.vout,
                address: utxo.cashAddress,
                script: utxo.scriptPubKey,
                satoshis: res.satoshis
              };
              console.log(details);
              transaction.from(details);
              if (sendAmount < res.satoshis) {
                return;
              }
            });

            // Calulate network fee
            change = details.satoshis - sendAmount;
            if (change > 0) {
              byteCount = BITBOX.BitcoinCash.getByteCount(
                { P2PKH: 1 },
                { P2PKH: 2 }
              );
              //If change exists send change to self
              transaction.change(addr);
            } else {
              byteCount = BITBOX.BitcoinCash.getByteCount(
                { P2PKH: 1 },
                { P2PKH: 1 }
              );
            }
            // Add fee to transaction
            transaction
              .fee(byteCount)
              // Add the receiving address and amount
              .to(sendAddr, sendAmount)
              // Sign the transaction
              .sign(privateKey);
            // Get the hex of the transaction
            hex = transaction.serialize();
            if (transaction) {
              //Broadcast the transaction
              BITBOX.RawTransactions.sendRawTransaction(hex).then(
                result => {
                  console.log(result);
                  this.setState({
                    loading: false
                  });
                },
                err => {
                  console.log(err);
                }
              );
            } else {
              console.log("Error: Transaction failed");
            }
          } catch (error) {
            console.error(error);
          }
        })();
        this.setState({ loading: false });
      } catch (error) {
        console.error(error);
      }
    })();
  };

  render() {
    let { sendAddr, sendAmount, loading, fiatSymbol } = this.state;

    return (
      <div style={styles.container}>
        <Divider horizontal>Send</Divider>
        <Input
          style={styles.input}
          type="text"
          size="large"
          placeholder="Address"
          defaultValue="bitcoincash:"
          prefix={<Icon type="user" />}
          suffix={
            <div>
              <Popover
                content="Click to open camera and scan a qr code"
                title="Scan QR Code"
              >
                <Icon type="scan" onClick={this.scanQRCode} />
              </Popover>
            </div>
          }
          value={sendAddr}
          onChange={this.onEnterAddress.bind(this)}
        />
        <Input
          style={styles.input}
          type="number"
          size="large"
          placeholder="Amount"
          prefix="$"
          suffix={
            <div>
              <Popover
                content="Click to send all funds from the wallet"
                title="Max Amount"
              >
                <Icon type="to-top" onClick={this.onMaxAmount} />
              </Popover>
            </div>
          }
          value={sendAmount}
          onChange={this.onEnterAmount.bind(this)}
        />
        <Button
          style={styles.button}
          size="large"
          type="primary"
          loading={loading}
          onClick={this.onSend}
        >
          Send
        </Button>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    textAlign: "center",
    color: "black",
    maxWidth: "500px",
    margin: "0 auto"
  },
  input: {
    marginTop: "10px"
  },
  button: {
    backgroundColor: "#0492CE",
    color: "white",
    marginTop: "15px",
    padding: "0 50px"
  }
};
