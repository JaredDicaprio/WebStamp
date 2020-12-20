import React, { Component } from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { message } from "antd";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import swal from "sweetalert";
class Altert extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let alert = null;
    if (this.props.shows) {
      switch (this.props.type) {
        case "info":
          NotificationManager.info(this.props.message);
          break;
        case "success":
          message.success(this.props.message, 3);

          //  alert = <SweetAlert success title={this.props.message}></SweetAlert>;

          break;

        case "error":
          message.error(this.props.message, 3);

          // message.error(this.props.message, "Error", 2.5);
          // alert = <SweetAlert error title={this.props.message}></SweetAlert>;

          break;
        default:
          NotificationManager.info("test");
          break;
      }
    }

    return alert;
  }
}

const mapStateToProps = ({ alert }) => {
  const { shows, type, message } = alert;

  return { shows, type, message };
};

export default connect(mapStateToProps, {})(Altert);
