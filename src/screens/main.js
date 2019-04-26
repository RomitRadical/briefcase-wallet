import React, { Component } from "react";

class Main extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h1>Main</h1>
      </div>
    );
  }
}
export default Main;

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
};
