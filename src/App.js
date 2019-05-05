import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/tools/navbars/header";
import Main from "./screens/main";
import Settings from "./screens/settings";
import About from "./screens/about";
import { createWallet, initWallet } from "./scripts/bitcoincash";
import { Plugins } from "@capacitor/core";
const { SplashScreen } = Plugins;

SplashScreen.hide();

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
      let seed = createWallet();
      console.log("New wallet created: " + seed);
    }
    let addr = initWallet(localStorage.getItem("wallet"));
    this.setState({
      addr
    });
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <Router>
        <div style={styles.container}>
          <Header isOpen={this.state.collapsed} onClick={this.toggleNavbar} />
          <Route path="/" exact component={Main} />
          <Route path="/settings/" component={Settings} />
          <Route path="/about/" component={About} />
        </div>
      </Router>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    fontFamily: "Questrial",
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
