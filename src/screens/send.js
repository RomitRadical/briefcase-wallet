import React, { Component } from "react";
import bitcore from "bitcore-lib-cash";
import { initWallet } from "../scripts/bitcoincash";
import { Divider } from "semantic-ui-react";
import { Icon, Button } from "antd";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import QrReader from 'react-qr-reader'

let NETWORK = localStorage.getItem("network");

let BITBOXSDK = require("bitbox-sdk");
let bitbox;

if (NETWORK === "testnet") {
  bitbox = new BITBOXSDK({
    restURL: "https://trest.bitcoin.com/v2/"
  });
} else {
  bitbox = new BITBOXSDK();
}

export default class Send extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      sendAddr: "",
      sendAmount: "",
      fiatSymbol: "",
      isContacts: false,
      isQRModalOpen: false
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

  toggleQRModal = () => {
    this.setState({
      isQRModalOpen: !this.state.isQRModalOpen
    })
  }

  scanQRCode = (data) => {
    if (data) {
      this.setState({
        result: data
      })
    }
  };

  handleError = err => {
    console.error(err)
  }

  onSend = () => {
    this.setState({ isLoading: true });
    let { sendAddr, sendAmount } = this.state;
    if (!sendAddr) {
      this.setState({ isLoading: false });
      return console.log("Enter the address");
    } else if (!sendAmount) {
      this.setState({ isLoading: false });
      return console.log("Enter the amount");
    }
    let fee = 0;
    let satoshis = 0;
    let details = {};
    let currency = localStorage.getItem("currency");
    if (!currency) {
      currency = "INR";
    }
    (async () => {
      try {
        // Get current BCH price
        fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin-cash"
        )
          .then(res => res.json())
          .then(json => {
            if (!json) {
              console.log("Network Error: Price could not be fetched");
              return false;
            }
            let price = json.market_data.current_price[currency.toLowerCase()];
            // Convert fiat amount to bch amount
            sendAmount /= price;
            // Convert BCH to satoshis
            sendAmount = bitbox.BitcoinCash.toSatoshi(sendAmount.toFixed(8));
            let seed = localStorage.getItem("wallet");
            let addr = initWallet(seed);
            (async () => {
              try {
                //Get the utxo details of the address
                let utxo = await bitbox.Address.utxo(addr);
                // Create a transaction object
                let transaction = new bitcore.Transaction();

                // Get the wallet's private key
                let rootSeed = bitbox.Mnemonic.toSeed(seed);
                let hd = bitcore.HDPrivateKey.fromSeed(rootSeed).deriveChild("m/44'/145'/0'/0'/0")
                let wif = hd.privateKey.toWIF();
                let privateKey = new bitcore.PrivateKey(wif).toString();

                // Add inputs for the transaction
                for (let i = 0; i < utxo.utxos.length; i++) {
                  details = {
                    txId: utxo.utxos[i].txid,
                    outputIndex: utxo.utxos[i].vout,
                    address: utxo.cashAddress,
                    script: utxo.scriptPubKey,
                    satoshis: utxo.utxos[i].satoshis
                  };
                  transaction.from(details);
                  satoshis += details.satoshis;
                  fee += bitbox.BitcoinCash.getByteCount(
                    { P2PKH: i + 1 },
                    { P2PKH: 2 }
                  );
                  console.log(fee)
                  sendAmount += fee;
                  if (satoshis >= sendAmount) {
                    sendAmount -= fee;
                    break;
                  }
                }
                // Calulate network fee
                let change = details.satoshis - (sendAmount + fee);
                if (change > 0) {
                  //If change exists send change to self
                  transaction.change(addr, change);
                }
                // Add fee to transaction
                transaction
                  .fee(fee)
                  // Add the receiving address and amount
                  .to(sendAddr, sendAmount)
                  // Sign the transaction
                  .sign(privateKey);
                // Get the hex of the transaction
                let hex = transaction.serialize();
                if (transaction) {
                  //Broadcast the transaction
                  bitbox.RawTransactions.sendRawTransaction(hex).then(
                    result => {
                      console.log(result);
                      return this.setState({
                        isLoading: false
                      });
                    },
                    err => {
                      console.log(err);
                      return this.setState({ isLoading: false });
                    }
                  );
                } else {
                  console.log("Error: Transaction failed");
                  return this.setState({ isLoading: false });
                }
              } catch (error) {
                console.error(error);
                return this.setState({ isLoading: false });
              }
            })();
          });
      } catch (error) {
        console.error(error);
        return this.setState({ isLoading: false });
      }
    })();
  };

  onSendMax = () => { }

  render() {
    let { isLoading, fiatSymbol, isQRModalOpen } = this.state;
    return (
      <div>

        {/* Main View */}
        <div style={styles.container}>
          <Divider horizontal>Send</Divider>
          <TextField
            fullWidth
            style={styles.input}
            type="text"
            onChange={this.onEnterAddress.bind(this)}
            margin="normal"
            variant="outlined"
            placeholder="Address"
            InputProps={{
              startAdornment: <InputAdornment position="start"><Icon type="user" /></InputAdornment>,
              endAdornment: <InputAdornment position="end">
                <Icon onClick={this.toggleQRModal} style={styles.scan} type="scan" /></InputAdornment>,
            }}
          />
          <TextField
            fullWidth
            style={styles.input}
            type="number"
            placeholder="Amount"
            margin="normal"
            variant="outlined"
            onChange={this.onEnterAmount.bind(this)}
            InputProps={{
              startAdornment: <InputAdornment position="start">{fiatSymbol}</InputAdornment>,
              endAdornment: <InputAdornment position="end">
                <Button
                  style={{
                    backgroundColor: "#0492CE",
                    color: "white",
                  }}
                  size="sm"
                  type="primary"
                  loading={isLoading}
                  onClick={this.onSendMax}
                >
                  Max
        </Button></InputAdornment>,
            }}
          />
          <Button
            style={styles.button}
            size="large"
            type="primary"
            loading={isLoading}
            onClick={this.onSend}
          >
            Send
        </Button>
        </div>

        {/** QR Code Modal */}
        <div>
          <Modal isOpen={isQRModalOpen} toggle={this.toggleQRModal}>
            <ModalHeader toggle={this.toggleQRModal}>Scan QR Code</ModalHeader>
            <ModalBody>
              <QrReader
                delay={300}
                onError={this.handleError}
                onScan={this.scanQRCode}
                style={{ width: '100%' }}
              />
            </ModalBody>
          </Modal>
        </div>

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
    marginTop: "10px",
    color: "#0492CE"
  },
  button: {
    backgroundColor: "#0492CE",
    color: "white",
    marginTop: "15px",
    padding: "0 50px"
  },
  scan: {
    marginRight: "3px", fontSize: '18px',
    backgroundColor: "#0492CE",
    color: "white",
    padding: "7px 19px",
    borderRadius: "3px"
  },
  buttonRound: {
    backgroundColor: "#0492CE",
    color: "white",
    marginTop: "13px",
    marginLeft: "5px"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    maxheight: "50px"
  }
};
