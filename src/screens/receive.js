import React, { Component } from "react";
import { initWallet } from "../scripts/bitcoincash";

class Receive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addr: ""
    };
  }

  componentWillMount() {
    let addr = initWallet();
    this.setState({
      addr
    });
  }

  render() {
    let { addr } = this.state;
    return (
      <div style={styles.container}>
        <h3>Your Bitcoin Cash Address:</h3>
        <p>{addr}</p>
      </div>
    );
  }
}
export default Receive;

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
};
