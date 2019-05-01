import React, { Component } from "react";
import { initWallet } from "../scripts/bitcoincash";

let BITBOXSDK = require("bitbox-sdk");
let BITBOX = new BITBOXSDK({
  restURL: "https://trest.bitcoin.com/v2/"
});

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
    let addr = initWallet(localStorage.getItem("wallet"));
    this.getPrice();
    this.getBalance(addr);
  }

  componentDidMount() {
    setInterval(this.getPrice, 10000);
    setInterval(this.checkNewTx, 1000);
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
        this.setState({
          price
        });
        return true;
      } catch (error) {
        console.error(error);
      }
    })();
  };

  getBalance = addr => {
    (async () => {
      try {
        let details = await BITBOX.Address.details(addr);
        let price = this.state.price;
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
        let addr = initWallet(localStorage.getItem("wallet"));
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
        }
      } catch (err) {
        console.log(err);
      }
    })();
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
