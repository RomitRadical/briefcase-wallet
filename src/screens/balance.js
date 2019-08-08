import React, { Component } from "react";
import { initWallet } from "../scripts/bitcoincash";
import { notification, Button } from "antd";

let NETWORK = localStorage.getItem("network");
if (!NETWORK) {
  NETWORK = "testnet";
}

let BITBOX;
let BITBOXSDK = require("bitbox-sdk");

if (NETWORK === "testnet") {
  BITBOX = new BITBOXSDK({
    restURL: "https://trest.bitcoin.com/v2/"
  });
} else {
  BITBOX = new BITBOXSDK();
}

notification.config({
  placement: "bottomRight"
});

const addr = initWallet(localStorage.getItem("wallet"));

export default class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bal: 0,
      fiatBal: 0,
      newBal: 0,
      symbol: "₿",
      fiatSymbol: "₹",
      price: ""
    };
  }

  componentWillMount() {
    this.getPrice(addr);
  }

  componentDidMount() {
    setInterval(this.getPrice, 100000);
    setInterval(this.checkNewTx, 2000);
  }

  getPrice = () => {
    let currency = localStorage.getItem("currency");
    if (!currency) {
      currency = "INR";
    }
    fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin-cash"
    )
      .then(res => res.json())
      .then(json => {
        if (!json) {
          console.log("Network Error: Price cannot be fetched");
          return false;
        }
        let price = json.market_data.current_price[currency.toLowerCase()];
        this.getBalance(price)
        this.setState({
          price
        })
      });
  };

  getBalance = price => {
    (async () => {
      try {
        let details = await BITBOX.Address.details(addr);
        this.setState({
          bal: Number(details.balance + details.unconfirmedBalance),
          fiatBal: (details.balance + details.unconfirmedBalance) * price
        });
      } catch (err) {
        console.log(err);
      }
    })();
  };

  checkNewTx = () => {
    (async () => {
      try {
        let details = await BITBOX.Address.details(addr);
        let price = this.state.price;
        if (details.balance + details.unconfirmedBalance > this.state.bal) {
          console.log("New payment received");
          this.setState({
            bal: Number(details.balance + details.unconfirmedBalance),
            fiatBal: (details.balance + details.unconfirmedBalance) * price
          });
        } else if (
          details.balance + details.unconfirmedBalance <
          this.state.bal
        ) {
          console.log("Payment sent");
          this.setState({
            bal: Number(details.balance + details.unconfirmedBalance),
            fiatBal: (details.balance + details.unconfirmedBalance) * price
          });
        } else {
          this.setState({
            fiatBal: (details.balance + details.unconfirmedBalance) * price
          });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  };

  newPayment = () => {
    let { receivedAmount } = this.state;
    const btn = (
      <Button type="primary" size="small" onClick={this.openTxDetails}>
        Details
      </Button>
    );
    const paymentNotification = {
      message: "New Payment Received",
      description: `Amount: ${receivedAmount}`,
      duration: 0,
      btn
    };
    notification.info(paymentNotification);
  };

  openTxDetails = () => {
    console.log("Hi");
  };

  render() {
    let { bal, fiatBal, symbol, fiatSymbol } = this.state;
    return (
      <div style={styles.container}>
        <div style={styles.box}>
          <h2 style={styles.text} className="display-4">
            {fiatSymbol}
            {fiatBal.toFixed(2)}
          </h2>
          <h3 style={styles.text}>
            {symbol}
            {bal.toFixed(8)}
          </h3>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#0492CE",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Questrial",
    borderBottomLeftRadius: "50px",
    borderBottomRightRadius: "50px"
  },
  text: {
    color: "white",
    margin: "0px"
  },
  mainText: {
    color: "white",
    fontFamily: "Questrial",
    marginBottom: "0"
  },
  box: {
    marginTop: "40px",
    marginBottom: "20px"
  }
};
