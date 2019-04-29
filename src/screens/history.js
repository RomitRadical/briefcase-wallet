import React, { Component } from "react";
import { Divider } from "semantic-ui-react";

class History extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Divider horizontal>History</Divider>
      </div>
    );
  }
}
export default History;

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
};
