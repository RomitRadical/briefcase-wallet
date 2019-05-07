import React, { Component } from "react";
import { Divider } from "semantic-ui-react";
import { initWallet } from "../scripts/bitcoincash";
import { Icon } from "antd";

let NETWORK = localStorage.getItem("network");
if (!NETWORK) {
  NETWORK = "testnet";
}

let BITBOX;
let BITBOXSDK = require("bitbox-sdk");

let detailsURL;
let txDetailsURL;

if (NETWORK === "testnet") {
  BITBOX = new BITBOXSDK({
    restURL: "https://trest.bitcoin.com/v2/"
  });
  detailsURL = "https://trest.bitcoin.com/v2/address/details/";
  txDetailsURL = "https://trest.bitcoin.com/v2/transaction/details/";
} else {
  BITBOX = new BITBOXSDK();
  detailsURL = "https://rest.bitcoin.com/v2/address/details/";
  txDetailsURL = "https://rest.bitcoin.com/v2/transaction/details/";
}

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      transactions: [],
      details: [],
      price: "",
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
    this.getPrice();
  }

  componentDidMount() {
    //setInterval(this.getPrice, 5000);
  }

  getPrice = () => {
    let currency = localStorage.getItem("currency");
    if (!currency) {
      currency = "INR";
    }
    (async () => {
      try {
        let price = await BITBOX.Price.current(currency);
        if (!price) {
          console.log("Network Error: Price cannot be fetched");
          return false;
        }
        this.getTxs(price);
        this.setState({ loading: false });
      } catch (error) {
        console.error(error);
      }
    })();
  };

  getTxs = price => {
    this.setState({ loading: true });
    let time;
    let txobj = {};
    let transactions = [];
    let amount = 0;
    let address = [];
    let addr = initWallet(localStorage.getItem("wallet"));
    fetch(detailsURL + addr)
      .then(res => res.json())
      .then(json => {
        if (!json) {
          console.log("Error: Network Error");
        } else if (json.transactions.length < 1) {
          console.log("No Transactions Found");
        } else {
          json.transactions.map(tx => {
            fetch(txDetailsURL + tx)
              .then(res => res.json())
              .then(json => {
                if (json.vin[0].cashAddress === addr) {
                  time = new Date(json.time * 1000);
                  amount = json.vout[0].value;
                  txobj = {
                    type: "Sent",
                    amount: parseFloat(amount * price).toFixed(2),
                    confirmations: json.confirmations,
                    fees: json.fees,
                    txid: json.txid,
                    time: time.toGMTString()
                  };
                  transactions.push(txobj);
                } else {
                  time = new Date(json.time * 1000);
                  json.vout.map(vout => {
                    if (!vout.scriptPubKey.cashAddrs) {
                      return false;
                    }
                    address = vout.scriptPubKey.cashAddrs;
                    if (address.indexOf(addr) > -1) {
                      amount = vout.value;
                    }
                    return true;
                  });
                  txobj = {
                    type: "Received",
                    amount: parseFloat(amount * price).toFixed(2),
                    confirmations: json.confirmations,
                    fees: json.fees,
                    txid: json.txid,
                    time: time.toGMTString()
                  };
                  transactions.push(txobj);
                }
                transactions = transactions
                  .sort(function(a, b) {
                    return new Date(a.time) - new Date(b.time);
                  })
                  .reverse();
                this.setState({
                  transactions: transactions,
                  isLoading: false
                });
              });
            return true;
          });
        }
      });
  };

  render() {
    let { fiatSymbol, transactions } = this.state;
    return (
      <div style={styles.container}>
        <Divider horizontal>History</Divider>
        {transactions.map(tx => (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              margin: "10px",
              color: tx.type === "Sent" ? "red" : "green",
              fontSize: "1.2rem"
            }}
            key={tx.txid}
          >
            {tx.type === "Sent" ? <Icon type="rise" /> : <Icon type="fall" />}
            <div style={styles.spacer} /> {tx.type}
            <div style={styles.spacer} /> {fiatSymbol}
            {tx.amount}
          </div>
        ))}
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    color: "black",
    alignItems: "center",
    maxWidth: "500px",
    margin: "0 auto"
  },
  spacer: {
    flex: 1
  }
};
