import React, { Component } from "react";
import { Divider } from "semantic-ui-react";
import { Input, Icon, Button } from "antd";

export default class Send extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      amount: ""
    };
  }

  onAmountEnter = address => {
    this.setState({
      address
    });
  };

  onAmountEnter = amount => {
    this.setState({
      amount
    });
  };

  onSend = () => {
    console.log("Send");
  };

  render() {
    let fiatSymbol = localStorage.getItem("fiat-symbol");
    if (!fiatSymbol) {
      fiatSymbol = "₹";
    }
    return (
      <div style={styles.container}>
        <Divider horizontal>Send</Divider>
        <Input
          size="large"
          style={styles.input}
          prefix={<Icon type="user" />}
          placeholder="Enter Bitcoin Cash Address"
          onChange={this.onAddressEnter}
        />
        <Input
          size="large"
          style={styles.input}
          prefix={fiatSymbol}
          placeholder="Enter Amount to Send"
          onChange={this.onAmountEnter}
        />
        <Button
          size="large"
          style={styles.button}
          shape="round"
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
