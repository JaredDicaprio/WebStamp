import React, { Component } from "react";
import { Layout } from "antd";

import Sidebar from "../Sidebar/index";
import HorizontalDefault from "../Topbar/HorizontalDefault/index";
import HorizontalDark from "../Topbar/HorizontalDark/index";
import InsideHeader from "../Topbar/InsideHeader/index";
import AboveHeader from "../Topbar/AboveHeader/index";
import BelowHeader from "../Topbar/BelowHeader/index";
import Alert from "../../components/Alert";

import InfoView from "../../components/InfoView";
import Topbar from "../Topbar/index";
import { footerText } from "util/config";
import App from "routes/index";
import { connect } from "react-redux";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE
} from "../../constants/ThemeSetting";
import NoHeaderNotification from "../Topbar/NoHeaderNotification/index";

const { Content, Footer } = Layout;

export class MainApp extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress"
    ];

    this.warn = this.warn.bind(this);
    this.logout = this.logout.bind(this);
    this.resetTimeout = this.resetTimeout.bind(this);

    for (var i in this.events) {
      window.addEventListener(this.events[i], this.resetTimeout);
    }

    this.setTimeout();
  }

  clearTimeout() {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);

    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  setTimeout() {
    if (
      this.props.location.pathname === `${process.env.PUBLIC_URL}/UpdateDataDCC`
    ) {
      this.clearTimeout();
    }

    this.warnTimeout = setTimeout(this.warn, 600 * 500);

    this.logoutTimeout = setTimeout(this.logout, 600 * 500);
  }

  resetTimeout() {
    this.clearTimeout();
    this.setTimeout();
  }

  warn() {
    alert("You will be logged out automatically in 5 minute.");
    //this.props.userSignOut();
    localStorage.removeItem("token");
    //localStorage.removeItem("token");
    window.location.reload();
  }

  logout() {
    // Send a logout request to the API
    //  console.log("Sending a logout request to the API...");
    this.setState({ logginStatus: false });
    // this.destroy(); // Cleanup
  }

  destroy() {
    this.clearTimeout();

    for (var i in this.events) {
      window.removeEventListener(this.events[i], this.resetTimeout);
    }
  }

  getContainerClass = navStyle => {
    switch (navStyle) {
      case NAV_STYLE_DARK_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-container-wrap";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-container-wrap";
      default:
        return "";
    }
  };

  getNavStyles = navStyle => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return <HorizontalDefault />;
      case NAV_STYLE_DARK_HORIZONTAL:
        return <HorizontalDark />;
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return <InsideHeader />;
      case NAV_STYLE_ABOVE_HEADER:
        return <AboveHeader />;
      case NAV_STYLE_BELOW_HEADER:
        return <BelowHeader />;
      case NAV_STYLE_FIXED:
        return <Topbar />;
      case NAV_STYLE_DRAWER:
        return <Topbar />;
      case NAV_STYLE_MINI_SIDEBAR:
        return <Topbar />;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
        return <NoHeaderNotification />;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
        return <NoHeaderNotification />;
      default:
        return null;
    }
  };

  getSidebar = (navStyle, width) => {
    if (width < TAB_SIZE) {
      return <Sidebar />;
    }
    switch (navStyle) {
      case NAV_STYLE_FIXED:
        return <Sidebar />;
      case NAV_STYLE_DRAWER:
        return <Sidebar />;
      case NAV_STYLE_MINI_SIDEBAR:
        return <Sidebar />;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
        return <Sidebar />;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
        return <Sidebar />;
      default:
        return null;
    }
  };

  render() {
    const { match, width, navStyle } = this.props;

    return (
      <Layout className="gx-app-layout">
        {this.getSidebar(navStyle, width)}
        <Layout>
          {this.getNavStyles(navStyle)}
          <Content
            className={`gx-layout-content ${this.getContainerClass(navStyle)} `}
          >
            <Alert />
            <InfoView />
            <App match={match} />

            <Footer>
              <div className="gx-layout-footer-content">{footerText}</div>
            </Footer>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { width, navStyle } = settings;
  return { width, navStyle };
};
export default connect(mapStateToProps)(MainApp);
