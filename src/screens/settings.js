import React, { Component } from "react";

export default class Settings extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h1>Settings</h1>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
};
