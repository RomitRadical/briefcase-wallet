import React, { Component } from "react";
import { Jumbotron, Button } from "reactstrap";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0.0,
      fiatSymbol: "₹"
    };
  }
  render() {
    let { fiatSymbol, balance } = this.state;
    return (
      <div>
        <Jumbotron style={styles.container}>
          <h1 style={styles.text} className="display-4">
            Balance: {fiatSymbol}
            {balance}
          </h1>
          <hr className="my-0" />
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
