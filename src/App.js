import React, { Component } from "react";
import Header from "./components/tools/navbars/header";
import Main from "./screens/main";
import History from "./screens/history";
import Send from "./screens/send";
import Receive from "./screens/receive";
import SwipeableViews from "react-swipeable-views";

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
      console.log("No wallet detected");
      createWallet();
      console.log("New wallet created");
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

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    return (
      <div style={styles.container}>
        <Header isOpen={this.state.collapsed} onClick={this.toggleNavbar} />
        <Main />
        <SwipeableViews index={1} resistance enableMouseEvents>
          <div style={Object.assign({}, styles.tabs, styles.tab1)}>
            <Send />
          </div>
          <div style={Object.assign({}, styles.tabs, styles.tab2)}>
            <History />
          </div>
          <div style={Object.assign({}, styles.tabs, styles.tab3)}>
            <Receive />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    color: "black",
    minHeight: "100vh"
  },
  spacer: {
    flex: "1"
  },
  tabs: {
    padding: 15,
    minHeight: 100,
    color: "#fff"
  },
  tab1: {
    backgroundColor: "white"
  },
  tab2: {
    backgroundColor: "white",
    overflow: ""
  },
  tab3: {
    backgroundColor: "white",
    overflow: "hidden"
  }
};
