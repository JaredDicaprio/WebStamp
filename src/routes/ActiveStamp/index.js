import React, { Component } from "react";
import { Col, Row, Card, Input, Form, Icon, Table } from "antd";
import TableActiveStamp from "./TableActiveStamp";
import { connect } from "react-redux";

class ActiveStamp extends Component {
  render() {
    return (
      <Row>
        <Col lg={24} md={12} sm={24} xs={24}>
          <TableActiveStamp />
        </Col>
      </Row>
    );
  }
}

export default ActiveStamp;
