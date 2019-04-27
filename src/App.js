import React, { Component } from "react";
import NavBar from "./components/tools/navbar/navbar";
import Main from "./screens/main";
import { createWallet, initWallet } from "./scripts/bitcoincash";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: false,
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

  render() {
    return (
      <div style={styles.container}>
        <NavBar isOpen={this.state.collapsed} onClick={this.toggleNavbar} />
        <Main />
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#0292CE",
    color: "white"
  }
};
