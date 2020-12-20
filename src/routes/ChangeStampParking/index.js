import React, { Component } from "react";

import IntlMessages from "../../util/IntlMessages";
import {
  load_change_stamp_parking,
  change_stamp_parking
} from "../../appRedux/actions/ActiveStamp";
import {
  Col,
  Row,
  Card,
  Input,
  Form,
  Icon,
  Table,
  Select,
  Button,
  Tabs
} from "antd";
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
class ChangeStampParking extends Component {
  constructor(props) {
    super(props);
    const _inoutTrainStamp = new URLSearchParams(
      this.props.location.search
    ).get("inoutTrainStamp");

    const _visitor_id = new URLSearchParams(this.props.location.search).get(
      "visitor_id"
    );
    this.state = {
      inoutTrainStamp: _inoutTrainStamp,
      visitor_id: _visitor_id
    };
  }
  componentDidMount() {
    this.props.load_change_stamp_parking(
      this.state.inoutTrainStamp,
      this.state.visitor_id
    );
  }
  saveChangeStamp = e => {
    //e.preventDefault();
    this.props.form.validateFields((err, value) => {
      // var data_update_stamp = {
      //   inoutTrainStampID: this.props.data_change_stamp.inoutTrainStampID,
      //   inoutTranID: this.props.data_change_stamp.inoutTranID,
      //   DateTimeStamp: moment(this.props.data_change_stamp.DateTimeStamp),
      //   VisitorId: this.props.data_change_stamp.VisitorId,
      //   licensePlated: this.props.data_change_stamp.licensePlate,
      //   stampCode: value.stampCode,
      //   stampCodeOld: this.props.data_change_stamp.stampCode
      // };
      var data_update_stamp = {
        DateTimeStamp: moment(
          this.props.data_change_stamp.DateTimeStamp
        ).format("DD-MMM-YYYY HH:mm:ss"),
        VisitorId: this.props.data_change_stamp.VisitorId,
        inoutTrainStampID: this.props.data_change_stamp.inoutTrainStampID,
        inoutTranID: this.props.data_change_stamp.inoutTranID,
        licensePlate: this.props.data_change_stamp.licensePlate,
        stampCode: value.stampCode,
        stampCodeOld: this.props.data_change_stamp.stampCode
      };
      //console.log(data_update_stamp);
      this.props.change_stamp_parking(data_update_stamp);
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
                      message: "Please input your Date time"
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
                    {this.props.data_change_stamp.StampCodeList &&
                      this.props.data_change_stamp.StampCodeList.map(c => {
                        return (
                          <Option key={c.stampcode} value={c.stampcode}>
                            {c.stampCodeName}
                          </Option>
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

const mapStateToProps = ({ active_stamp }) => {
  const { data_active_stamp, data_change_stamp } = active_stamp;
  return { data_active_stamp, data_change_stamp };
};
const ChangeStamp_form_parking = Form.create({
  name: "ChangeStamp_form_parking"
})(ChangeStampParking);
export default connect(mapStateToProps, {
  load_change_stamp_parking,
  change_stamp_parking
})(ChangeStamp_form_parking);
