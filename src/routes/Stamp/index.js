import React, { Component } from "react";
import { Col, Row, Card, Input, Form, Icon, Carousel } from "antd";
import { connect } from "react-redux";

import InputVisitor from "./InputVisitor";
import TimeinAndLicensePlate from "./TimeinAndLicensePlate";
import "./Stamp.css";
import InoutTranStamp from "./InoutTranStamp";
import ImageInOut from "./ImageInOut";
import { remove_data_stamp } from "../../appRedux/actions/Stamp";

class Stamp extends Component {
  constructor(props) {
    super(props);

    this.props.remove_data_stamp();
  }

  render() {
    return (
      <div>
        <Row>
          <Col lg={24} md={12} sm={24} xs={24}>
            {this.props.stampmodel.PicIn1 && <ImageInOut />}
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={24} xs={24}>
            <InputVisitor />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}></Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={24} xs={24}>
            <TimeinAndLicensePlate />
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} sm={24} xs={24}>
            <InoutTranStamp />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ stamp, auth }) => {
  const { visitor_detail, stampmodel } = stamp;

  const { authUserParking } = auth;
  return { visitor_detail, stampmodel, authUserParking };
};
export default connect(mapStateToProps, { remove_data_stamp })(Stamp);
