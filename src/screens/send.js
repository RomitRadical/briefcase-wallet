import React, { Component } from "react";
import bitcore from "bitcore-lib-cash";
import { initWallet } from "../scripts/bitcoincash";
import { Divider } from "semantic-ui-react";
import { Input, Icon, Button } from "antd";

let NETWORK = localStorage.getItem("network");

let BITBOXSDK = require("bitbox-sdk");

let BITBOX;
let utxoURL;

if (NETWORK === "testnet") {
  BITBOX = new BITBOXSDK({
    restURL: "https://trest.bitcoin.com/v2/"
  });
  utxoURL = "https://trest.bitcoin.com/v2/address/utxo/";
} else {
  BITBOX = new BITBOXSDK();
  utxoURL = "https://rest.bitcoin.com/v2/address/utxo/";
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
    let addr = initWallet(localStorage.getItem("wallet"));
    let seed = localStorage.getItem("wallet")(async () => {
      try {
        //Get the utxo details of the address
        let utxo = await BITBOX.Address.utxo(addr);

        // Get the wallet's private key
        let value = new Buffer(seed);
        let hash = bitcore.crypto.Hash.sha256(value);
        let bn = bitcore.crypto.BN.fromBuffer(hash);
        let privateKey = new bitcore.PrivateKey(bn).toString();

        // Add inputs for the transaction
        let send = {
          txId: utxo.utxos[0].txid,
          outputIndex: utxo.utxos[0].vout,
          address: utxo.cashAddress,
          script: utxo.scriptPubKey,
          satoshis: utxo.utxos[0].satoshis
        };

        // Calulate network fee
        let byteCount = BITBOX.BitcoinCash.getByteCount(
          { P2PKH: 1 },
          { P2PKH: 1 }
        );

        // Subtract fee from amount to send
        let sendAmount = utxo.utxos[0].satoshis - byteCount;

        // Get the hex of transaction
        let hex = new bitcore.Transaction()
          .from(send)
          .to(sendAddr, sendAmount)
          .sign(privateKey);
        console.log(hex.toString());

        // Broadcast the transaction
        BITBOX.RawTransactions.sendRawTransaction(hex.toString()).then(
          result => {
            console.log(result);
          },
          err => {
            console.log(err);
          }
        );
      } catch (error) {
        console.error(error);
      }
    })();
    this.setState({ loading: false });
  };

  render() {
    let { sendAddr, sendAmount, loading } = this.state;
    let fiatSymbol = localStorage.getItem("fiat-symbol");
    if (!fiatSymbol) {
      fiatSymbol = "₹";
    }

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
          suffix={<Icon type="scan" onClick={this.scanQRCode} />}
          value={sendAddr}
          onChange={this.onEnterAddress.bind(this)}
        />
        <Input
          style={styles.input}
          type="number"
          size="large"
          placeholder="Amount"
          prefix="$"
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
