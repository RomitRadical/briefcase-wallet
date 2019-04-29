import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Send from "../../../screens/send";
import Home from "../../../screens/history";
import Receive from "../../../screens/receive";

const styles = {
  slide: {
    padding: 0,
    minHeight: 100,
    color: "#000"
  }
};

function TabContainer({ children, dir }) {
  return (
    <div>
      <SwipeableViews enableMouseEvents>
        <div style={Object.assign({}, styles.slide)}>{children}</div>
      </SwipeableViews>
    </div>
  );
}

class FullWidthTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <Send />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Home />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Receive />
          </TabContainer>
        </SwipeableViews>
        <AppBar
          position="static"
          style={{
            backgroundColor: "#0492CE",
            borderTopLeftRadius: "25px",
            borderTopRightRadius: "25px"
          }}
        >
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            style={{ color: "white" }}
            variant="fullWidth"
          >
            <Tab label="Send" />
            <Tab label="Home" />
            <Tab label="Receive" />
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
