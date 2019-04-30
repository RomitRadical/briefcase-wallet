import React, { Component } from "react";
import QRCode from "qrcode.react";
import { initWallet } from "../scripts/bitcoincash";
import { Divider } from "semantic-ui-react";
import { Button } from "antd";

export default class Receive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addr: "",
      bal: ""
    };
  }

  componentWillMount() {
    let addr = initWallet(localStorage.getItem("wallet"));
    this.setState({
      addr
    });
  }

  render() {
    let { addr } = this.state;
    return (
      <div style={styles.container}>
        <Divider style={styles.container} horizontal>
          Receive
        </Divider>
        <div>
          <h3>Your Bitcoin Cash Address:</h3>
          <QRCode value={addr} />
          <div>
            <Button style={styles.button} shape="round">
              Copy
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    textAlign: "center",
    color: "black"
  },
  button: {
    backgroundColor: "#0492CE",
    color: "white",
    marginTop: "10px",
    padding: "0 50px"
  }
};
