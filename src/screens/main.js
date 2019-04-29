import React, { Component } from "react";
import { Jumbotron } from "reactstrap";
import { Divider } from "semantic-ui-react";

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
      <div>
        <Jumbotron style={styles.container}>
          <h1 style={styles.text} className="display-4">
            {fiatSymbol}
            {fiatBalance.toFixed(2)}
          </h1>
          {/* <hr className="my-2" />
          <h3 style={styles.text}>
            {symbol}
            {balance.toFixed(2)}
    </h3>*/}
          <Divider horizontal>History</Divider>
        </Jumbotron>
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "white",
    textAlign: "center",
    justifyContent: "center"
  },
  text: {
    color: "black",
    fontFamily: "Questrial"
  }
};
