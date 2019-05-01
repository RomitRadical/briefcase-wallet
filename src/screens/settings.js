import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Switch, Select, Icon, Modal, Input } from "antd";

const Option = Select.Option;
const { TextArea } = Input;

const FiatCurrency = [
  {
    currency: "Indian Rupee",
    ticker: "INR",
    symbol: "₹"
  },
  {
    currency: "United States Dollar",
    ticker: "USD",
    symbol: "$"
  }
];
const DisplayCurrency = ["Fiat", "Bitcoin Cash"];

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fiatCurrency: "",
      displayCurrency: "",
      importModal: false
    };
  }

  componentWillMount() {
    let fiatCurrency = localStorage.getItem("fiat-currency");
    let displayCurrency = localStorage.getItem("display-currency");
    if (!fiatCurrency) {
      fiatCurrency = "INR";
    } else if (!displayCurrency) {
      displayCurrency = "Fiat";
    }
    this.setState({
      fiatCurrency,
      displayCurrency
    });
  }

  fiatCurrencyToogle = value => {
    this.setState({
      fiatCurrency: value
    });
    localStorage.setItem("fiat-currency", value);
  };

  displayCurrencyToogle = value => {
    this.setState({
      displayCurrency: value
    });
    localStorage.setItem("display-currency", value);
  };

  displayPriceToggle = checked => {
    if (checked) {
      localStorage.setItem("display-price", "On");
    } else {
      localStorage.setItem("display-price", "Off");
    }
  };

  importModalToggle = importModal => {
    this.setState({
      importModal
    });
  };

  render() {
    let { fiatCurrency, displayCurrency } = this.state;
    return (
      <div>
        <ListGroup>
          <ListGroupItem>
            <div style={styles.container}>
              <div>Fiat Currency</div>
              <div style={styles.spacer} />
              <div>
                <Select
                  defaultValue={fiatCurrency}
                  style={{ width: 80 }}
                  onChange={this.fiatCurrencyToogle}
                >
                  {FiatCurrency.map(item => (
                    <Option key={item.ticker} value={item.ticker}>
                      {item.ticker}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <div style={styles.container}>
              <div>Display Currency</div>
              <div style={styles.spacer} />
              <Select
                defaultValue={displayCurrency}
                style={{ width: 120 }}
                onChange={this.displayCurrencyToogle}
              >
                {DisplayCurrency.map(item => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <div style={styles.container}>
              <div>Display Price</div>
              <div style={styles.spacer} />
              <div>
                <Switch defaultChecked onChange={this.displayPriceToggle} />
              </div>
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <div style={styles.container}>
              <div>Import/Recover Wallet</div>
              <div style={styles.spacer} />
              <div>
                <Icon
                  type="right"
                  onClick={() => this.importModalToggle(true)}
                />
                <Modal
                  title="Import/Recover Wallet"
                  centered
                  visible={this.state.importModal}
                  onOk={() => this.importModalToggle(false)}
                  onCancel={() => this.importModalToggle(false)}
                >
                  <TextArea
                    placeholder="Enter the seed to recover your wallet"
                    autosize={{
                      minRows: 3,
                      maxRows: 6
                    }}
                  />
                </Modal>
              </div>
            </div>
          </ListGroupItem>
          <ListGroupItem>Advanced</ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  spacer: {
    flex: 1
  }
};
