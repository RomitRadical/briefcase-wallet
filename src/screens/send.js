import React, { Component } from "react";
import { Divider } from "semantic-ui-react";
import { Input, Icon, Button } from "antd";

class Send extends Component {
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

  render() {
    let fiatSymbol = localStorage.getItem("currency");
    if (!fiatSymbol) {
      fiatSymbol = "₹";
    }
    return (
      <div style={styles.container}>
        <Divider style={styles.container} horizontal>
          Send
        </Divider>
        <Input
          style={styles.input}
          prefix={<Icon type="user" />}
          placeholder="Enter Bitcoin Cash Address"
          onChange={this.onAddressEnter}
        />
        <Input
          style={styles.input}
          prefix={fiatSymbol}
          placeholder="Enter amount to send"
          onChange={this.onAmountEnter}
        />
        <Button style={styles.button} shape="round">
          Send
        </Button>
      </div>
    );
  }
}
export default Send;

const styles = {
  container: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    color: "black"
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
