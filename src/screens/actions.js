import React, { Component } from "react";
import Send from "./send";
import Receive from "./receive";

class Actions extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div>
          <Send />
        </div>
        <div>
          <Receive />
        </div>
      </div>
    );
  }
}
export default Actions;

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
};
