import React, { Component } from "react";
import { Divider } from "semantic-ui-react";

export default class History extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Divider horizontal>History</Divider>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    color: "black",
    alignItems: "center",
    maxWidth: "500px",
    margin: "0 auto"
  }
};
