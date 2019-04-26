import React, { Component } from "react";
import Main from "./screens/main";

export default class App extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h1>Briefcase</h1>
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
