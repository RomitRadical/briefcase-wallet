import React, { Component } from "react";
import QRCode from "qrcode.react";
import { initWallet } from "../scripts/bitcoincash";
import { Divider } from "semantic-ui-react";
import { Button } from "antd";
import { Plugins } from "@capacitor/core";
import { isMobile } from "react-device-detect";

const { Share } = Plugins;

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

  copyAddress = () => {
    let { addr } = this.state;
    async function copy() {
      try {
        await Share.share({
          title: "Share",
          text: addr,
          dialogTitle: "Share your bitcoin cash address"
        });
      } catch (err) {}
    }
    copy();
    console.log("Address copied");
  };

  renderContent = () => {
    let { addr } = this.state;
    if (isMobile) {
      return (
        <div>
          <Button
            style={styles.button}
            shape="round"
            onClick={this.copyAddress}
          >
            Share
          </Button>
        </div>
      );
    }
    return (
      <div>
        <Button
          style={styles.button}
          onClick={() => navigator.clipboard.writeText(addr)}
        >
          Copy
        </Button>
      </div>
    );
  };

  render() {
    let { addr } = this.state;
    return (
      <div style={styles.container}>
        <Divider horizontal>Receive</Divider>
        <div>
          <h4>Your Bitcoin Cash Address:</h4>
          <QRCode style={styles.qr} value={addr} />
          <div>{addr}</div>
          <div>{this.renderContent()}</div>
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
  button: {
    backgroundColor: "#0492CE",
    color: "white",
    marginTop: "10px",
    padding: "0 50px"
  },
  qr: {
    marginTop: "5px"
  }
};
