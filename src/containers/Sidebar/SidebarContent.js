import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";

class SidebarContent extends Component {
  getNoHeaderClass = navStyle => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = navStyle => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  getshowMenu = (Htag1, Tag1) => {
    if (this.props.data_menu.length > 0) {
      // console.log(this.props.authUser);
      if (this.props.authUser)
        return this.props.data_menu.find(
          c =>
            c.admin_level_id === this.props.authUser.admin_level_id &&
            c.Htag1 === Htag1 &&
            c.Tag1 === Tag1 &&
            c.Active1 === 1
        );
    }
  };
  render() {
    const SubMenu = Menu.SubMenu;
    const MenuItemGroup = Menu.ItemGroup;

    const { themeType, navStyle, pathname } = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split("/")[1];
    return (
      <Auxiliary>
        <SidebarLogo />
        <div className="gx-sidebar-content">
          <div
            className={`gx-sidebar-notifications ${this.getNoHeaderClass(
              navStyle
            )}`}
          ></div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
              mode="inline"
            >
              <MenuItemGroup
                key="main"
                className="gx-menu-group"
                title={<IntlMessages id="stamp.StampManagement" />}
              >
                {/* <SubMenu
                  key="Dashbord"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={
                    <span>
                      <i className="icon icon-chart-area-new" />
                      Dashbord
                    </span>
                  }
                >
                  <Menu.Item key="Dashbord/StampDashbord">
                    <Link
                      to={`${process.env.PUBLIC_URL}/Dashbord/StampDashbord`}
                    >
                      Stamp Dashbord
                    </Link>
                  </Menu.Item>
                </SubMenu> */}
                {this.getshowMenu(1, 0) && (
                  <SubMenu
                    key="Stamp"
                    className={this.getNavStyleSubMenuClass(navStyle)}
                    title={
                      <span>
                        {" "}
                        <i className="icon icon-dasbhoard" />
                        <IntlMessages id="stamp.stamp" />
                      </span>
                    }
                  >
                    {this.getshowMenu(1, 0) && (
                      <Menu.Item key="Stamp/Stamp">
                        <Link to={`${process.env.PUBLIC_URL}/Stamp`}>
                          <IntlMessages id="stamp.stamp" />
                        </Link>
                      </Menu.Item>
                    )}
                    {this.getshowMenu(1, 2) && (
                      <Menu.Item key="ActiveStamp">
                        <Link to={`${process.env.PUBLIC_URL}/ActiveStamp`}>
                          <IntlMessages id="activeStamp" />
                        </Link>
                      </Menu.Item>
                    )}
                  </SubMenu>
                )}
                {this.getshowMenu(2, 0) && (
                  <SubMenu
                    className={this.getNavStyleSubMenuClass(navStyle)}
                    key="mainMember"
                    title={
                      <span>
                        <i className="icon icon-user" />
                        <IntlMessages id="main_menu_member" />
                      </span>
                    }
                  >
                    {this.getshowMenu(2, 1) && (
                      <Menu.Item key="Member">
                        <Link to={`${process.env.PUBLIC_URL}/Member`}>
                          <IntlMessages id="member" />
                        </Link>
                      </Menu.Item>
                    )}
                    {this.getshowMenu(2, 2) && (
                      <Menu.Item key="TranMember">
                        <Link to={`${process.env.PUBLIC_URL}/TranMember`}>
                          <IntlMessages id="member_report" />
                        </Link>
                      </Menu.Item>
                    )}
                    {this.getshowMenu(2, 3) && (
                      <Menu.Item key="RequireChangeMember">
                        <Link
                          to={`${process.env.PUBLIC_URL}/RequireChangeMember`}
                        >
                          <IntlMessages id="require_change_member" />
                        </Link>
                      </Menu.Item>
                    )}
                    {this.getshowMenu(2, 4) && (
                      <Menu.Item key="MemberCard">
                        <Link to={`${process.env.PUBLIC_URL}/MemberCard`}>
                          <IntlMessages id="member_card" />
                        </Link>
                      </Menu.Item>
                    )}
                  </SubMenu>
                )}
                {this.getshowMenu(3, 0) && (
                  <SubMenu
                    className={this.getNavStyleSubMenuClass(navStyle)}
                    key="Report"
                    title={
                      <span>
                        {" "}
                        <i className="icon icon-editor" />
                        <IntlMessages id="report" />
                      </span>
                    }
                  >
                    {this.getshowMenu(3, 1) && (
                      <Menu.Item key="StampReport">
                        <Link to={`${process.env.PUBLIC_URL}/StampReport`}>
                          <IntlMessages id="stamp_report" />
                        </Link>
                      </Menu.Item>
                    )}
                    {this.getshowMenu(3, 6) && (
                      <Menu.Item key="StampReportByCutom">
                        <Link
                          to={`${process.env.PUBLIC_URL}/StampReportByCutom`}
                        >
                          <IntlMessages id="stamp_by_customer" />
                        </Link>
                      </Menu.Item>
                    )}
                    {this.getshowMenu(3, 2) && (
                      <Menu.Item key="StampReportByStamp">
                        <Link
                          to={`${process.env.PUBLIC_URL}/StampReportByStamp`}
                        >
                          <IntlMessages id="stamp_by_stamp" />
                        </Link>
                      </Menu.Item>
                    )}
                    {this.getshowMenu(3, 3) && (
                      <Menu.Item key="StampReportByuser">
                        <Link
                          to={`${process.env.PUBLIC_URL}/StampReportByuser`}
                        >
                          <IntlMessages id="stamp_by_user" />
                        </Link>
                      </Menu.Item>
                    )}
                    {this.getshowMenu(3, 4) && (
                      <Menu.Item key="StampReportByDepartment">
                        <Link
                          to={`${process.env.PUBLIC_URL}/stampReportByDepartment`}
                        >
                          <IntlMessages id="stamp_by_department" />
                        </Link>
                      </Menu.Item>
                    )}
                    {this.getshowMenu(3, 5) && (
                      <Menu.Item key="SummaryByStamp">
                        <Link to={`${process.env.PUBLIC_URL}/SummaryByStamp`}>
                          <IntlMessages id="summary_by_stamp" />
                        </Link>
                      </Menu.Item>
                    )}
                  </SubMenu>
                )}
                {this.getshowMenu(4, 0) && (
                  <SubMenu
                    className={this.getNavStyleSubMenuClass(navStyle)}
                    key="UserManagement"
                    title={
                      <span>
                        {" "}
                        <i className="icon icon-user" />
                        <IntlMessages id="User_Management" />
                      </span>
                    }
                  >
                    {this.getshowMenu(4, 1) && (
                      <Menu.Item key="registeruser">
                        <Link to={`${process.env.PUBLIC_URL}/registeruser`}>
                          <IntlMessages id="register_user" />
                        </Link>
                      </Menu.Item>
                    )}
                  </SubMenu>
                )}
              </MenuItemGroup>
            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({ settings, auth }) => {
  const { navStyle, themeType, locale, pathname } = settings;
  const { data_menu, authUser } = auth;
  return { navStyle, themeType, locale, pathname, data_menu, authUser };
};
export default connect(mapStateToProps)(SidebarContent);
