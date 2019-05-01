import React, { Component } from "react";

export default class About extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h3>About Bitcoin Cash:</h3>
        <p>
          Bitcoin Cash is a peer-to-peer electronic cash system. It's a
          permissionless, decentralized cryptocurrency that requires no trusted
          third parties and no central bank.
        </p>
        <hr className="my-2" />
        <h3>Key Features:</h3>
        <ol>
          <li>Fast</li>
          <li>Reliable</li>
          <li>Low Fees</li>
          <li>Simple</li>
          <li>Stable</li>
          <li>Secure</li>
        </ol>
        <hr className="my-2" />
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    padding: "10px"
  }
};
