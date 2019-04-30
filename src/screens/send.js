import React, { Component } from "react";
import { Divider } from "semantic-ui-react";

class Send extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Divider style={styles.container} horizontal>
          Send
        </Divider>
      </div>
    );
  }
}
export default Send;

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "black"
  }
};
