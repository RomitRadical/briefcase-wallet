import React, { Component } from "react";
import Header from "./components/tools/navbars/header";
import Main from "./screens/main";
import History from "./screens/history";
import Send from "./screens/send";

import { createWallet, initWallet } from "./scripts/bitcoincash";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: false,
      value: 0,
      addr: ""
    };
  }

  componentWillMount() {
    let wallet = localStorage.getItem("wallet");
    if (!wallet) {
      createWallet();
    }
    let addr = initWallet(localStorage.getItem("wallet"));
    this.setState({
      addr
    });
  }

  componentDidMount() {}

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div style={styles.container}>
        <Header isOpen={this.state.collapsed} onClick={this.toggleNavbar} />
        <Main />
        <h1>send</h1>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    color: "white",
    minHeight: "100vh"
  },
  spacer: {
    flex: "1"
  }
};
