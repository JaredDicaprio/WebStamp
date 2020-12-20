import React, { Component } from "react";
import IntlMessages from "../../util/IntlMessages";
import {
  load_change_stamp,
  update_stamp
} from "../../appRedux/actions/ActiveStamp";
import { Col, Row, Card, Input, Form, Icon, Table, Select, Button } from "antd";
import { connect } from "react-redux";
import { formant_date_time } from "../../util/DataConfig";
import moment from "moment";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

class ChangeStamp extends Component {
  constructor(props) {
    super(props);
    const _inoutTrainStamp = new URLSearchParams(
      this.props.location.search
    ).get("inoutTrainStamp");

    const _visitor_id = new URLSearchParams(this.props.location.search).get(
      "visitor_id"
    );
    var data_parameter_active_stamp = {
      inoutTrainStamp: _inoutTrainStamp,
      visitor_id: _visitor_id
    };
    this.props.load_change_stamp(data_parameter_active_stamp);
  }

  saveChangeStamp = () => {
    // e.preventDefault();
    this.props.form.validateFields((err, value) => {
      var data_update_stamp = {
        stampCode: value.stampCode,
        inoutTranID: this.props.data_change_stamp.inoutTranID,
        inoutTrainStampID: this.props.data_change_stamp.inoutTrainStampID
      };

      this.props.update_stamp(data_update_stamp);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Card className="gx-card" title={<IntlMessages id="change_stamp" />}>
            <Form>
              <Form.Item
                {...formItemLayout}
                label={<IntlMessages id="DateTimeStamp" />}
              >
                {getFieldDecorator("dateTimeStamp", {
                  initialValue: this.props.data_change_stamp.DateTimeStamp
                    ? moment(this.props.data_change_stamp.DateTimeStamp).format(
                        formant_date_time
                      )
                    : "",
                  rules: [
                    {
                      required: true,
                      message: "Please input your CDR ID"
                    }
                  ]
                })(<Input disabled={true} />)}
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                label={<IntlMessages id="stamp.visitorId" />}
              >
                {getFieldDecorator("visitorId", {
                  initialValue: this.props.data_change_stamp.VisitorId,
                  rules: [
                    {
                      required: true,
                      message: "Please input visitor id"
                    }
                  ]
                })(<Input disabled={true} />)}
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                label={<IntlMessages id="licensePlate" />}
              >
                {getFieldDecorator("licensePlate", {
                  initialValue: this.props.data_change_stamp.licensePlate,
                  rules: [
                    {
                      required: true,
                      message: "Please input visitor id"
                    }
                  ]
                })(<Input disabled={true} />)}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={<IntlMessages id="StampCode" />}
              >
                {getFieldDecorator("stampCode", {
                  initialValue: this.props.data_change_stamp.stampCode,
                  rules: [
                    {
                      required: true,
                      message: "Please input visitor id"
                    }
                  ]
                })(
                  <Select
                    showSearch
                    // defaultValue={this.props.data_change_stamp.stampCode}
                    style={{ width: "100%" }}
                  >
                    {this.props.data_change_stamp.stampCodeList &&
                      this.props.data_change_stamp.stampCodeList.map(c => {
                        return (
                          <Option key={c.stampcode}>{c.stampCodeName}</Option>
                        );
                      })}
                  </Select>
                )}
              </Form.Item>
              <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
                <Button
                  type="primary"
                  size="default"
                  onClick={() => this.saveChangeStamp()}
                >
                  <IntlMessages id="save" />
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

const ChangeStamp_form = Form.create({ name: "ChangeStamp_form" })(ChangeStamp);
const mapStateToProps = ({ active_stamp }) => {
  const { data_active_stamp, data_change_stamp } = active_stamp;
  return { data_active_stamp, data_change_stamp };
};
export default connect(mapStateToProps, { load_change_stamp, update_stamp })(
  ChangeStamp_form
);
