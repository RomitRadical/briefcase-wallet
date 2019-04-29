import React, { Component } from "react";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0.0,
      symbol: "₿",
      fiatBalance: 0.0,
      fiatSymbol: "₹"
    };
  }
  render() {
    let { balance, symbol, fiatSymbol, fiatBalance } = this.state;
    return (
      <div style={styles.container}>
        <div style={styles.box}>
          <h2 style={styles.text} className="display-4">
            {fiatSymbol}
            {fiatBalance.toFixed(2)}
          </h2>
          <h3 style={styles.text}>
            {symbol}
            {balance.toFixed(2)}
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
    borderBottomLeftRadius: "25px",
    borderBottomRightRadius: "25px"
  },
  text: {
    color: "white",
    fontFamily: "Questrial",
    margin: "0px"
  },
  mainText: {
    color: "white",
    fontFamily: "Questrial",
    marginBottom: "0"
  },
  box: {
    marginTop: "20px",
    marginBottom: "10px"
  }
};
