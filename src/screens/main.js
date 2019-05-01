import React, { Component } from "react";
import Balance from "./balance";
import History from "./history";
import Send from "./send";
import Receive from "./receive";
import SwipeableViews from "react-swipeable-views";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: false,
      value: 0,
      addr: ""
    };
  }

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
        <Balance />
        <div>
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
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    textAlign: "center",
    fontFamily: "Questrial",
    flexDirection: "column",
    backgroundColor: "white",
    color: "black"
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
