import React, { Component } from "react";
import Header from "./components/tools/navbars/header";
import Footer from "./components/tools/navbars/footer";
import Main from "./screens/main";
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
        <div style={styles.spacer} />
        <Footer />
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
