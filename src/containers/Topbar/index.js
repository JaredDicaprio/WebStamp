import React, { Component } from "react";
import { Layout, Popover } from "antd";
import { Link } from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";
import CustomScrollbars from "util/CustomScrollbars";
import languageData from "./languageData";
import {
  switchLanguage,
  toggleCollapsedSideNav
} from "../../appRedux/actions/Setting";
import SearchBox from "components/SearchBox";
import UserInfo from "components/UserInfo";
import AppNotification from "components/AppNotification";
import MailNotification from "components/MailNotification";
import Auxiliary from "util/Auxiliary";

import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  TAB_SIZE
} from "../../constants/ThemeSetting";
import { connect } from "react-redux";
import { locale } from "devextreme/localization";
const { Header } = Layout;

class Topbar extends Component {
  state = {
    searchText: ""
  };

  languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map(language => (
          <li
            className="gx-media gx-pointer"
            key={JSON.stringify(language)}
            onClick={e => {
              this.props.switchLanguage(language);
              locale(language.locale);
            }}
          >
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
            <span className="gx-language-text">{language.name}</span>
          </li>
        ))}
      </ul>
    </CustomScrollbars>
  );

  updateSearchChatUser = evt => {
    this.setState({
      searchText: evt.target.value
    });
  };

  render() {
    const { locale, width, navCollapsed, navStyle, authUser } = this.props;

    return (
      <Auxiliary>
        <Header>
          {navStyle === NAV_STYLE_DRAWER ||
          ((navStyle === NAV_STYLE_FIXED ||
            navStyle === NAV_STYLE_MINI_SIDEBAR) &&
            width < TAB_SIZE) ? (
            <div className="gx-linebar gx-mr-3">
              <i
                className="gx-icon-btn icon icon-menu"
                onClick={() => {
                  this.props.toggleCollapsedSideNav(!navCollapsed);
                }}
              />
            </div>
          ) : null}

          <p>
            <IntlMessages id="welcomeTo" />{" "}
            {this.props.authUser && this.props.authUser.name} {`  `}(
            {this.props.authUser && this.props.authUser.DeptName})
          </p>

          <ul className="gx-header-notifications gx-ml-auto">
            <li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none"></li>

            <li className="gx-language">
              <Popover
                overlayClassName="gx-popover-horizantal"
                placement="bottomRight"
                content={this.languageMenu()}
                trigger="click"
              >
                <span className="gx-pointer gx-flex-row gx-align-items-center">
                  <i className={`flag flag-24 flag-${locale.icon}`} />
                  <span className="gx-pl-2 gx-language-name">
                    {locale.name}
                  </span>
                  <i className="icon icon-chevron-down gx-pl-2" />
                </span>
              </Popover>
            </li>

            <Auxiliary>
              <li className="gx-user-nav">
                <UserInfo />
              </li>
            </Auxiliary>
          </ul>
        </Header>
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { locale, navStyle, navCollapsed, width } = settings;
  const { authUser } = auth;
  return { locale, navStyle, navCollapsed, width, authUser };
};

export default connect(mapStateToProps, {
  toggleCollapsedSideNav,
  switchLanguage
})(Topbar);
