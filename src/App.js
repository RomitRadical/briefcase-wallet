import React, { Component } from "react";
import NavBar from "./components/tools/navbar/navbar";
import Main from "./screens/main";
import { createWallet } from "./scripts/bitcoincash";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: false
    };
  }

  componentWillMount() {
    let wallet = localStorage.getItem("wallet");
    if (!wallet) {
      createWallet();
    }
    console.log(localStorage.getItem("wallet"));
  }

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
