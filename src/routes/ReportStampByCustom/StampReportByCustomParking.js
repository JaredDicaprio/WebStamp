import React, { Component } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Checkbox,
  Input,
  Col,
  Row,
  DatePicker,
  Popconfirm,
  Select,
  Upload,
  Icon,
  Card,
  Tabs
} from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { formant_date_time } from "../../util/DataConfig";
import {
  load_stamp_report_by_custom_parking,
  load_department_list_parking,
  load_stamp_code_all_parking
} from "../../appRedux/actions/StampReportParking";
import IntlMessages from "../../util/IntlMessages";
const { TabPane } = Tabs;
const { Column } = Table;
const FormItem = Form.Item;
const { Option } = Select;
const set_col = {
  lg: 12,
  md: 12,
  sm: 12,
  xs: 24
};
const formItemLayout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 12 }
};

class StampReportByCustomParking extends Component {
  componentDidMount() {
    //  this.props.load_stamp_report_by_custom_parking();
    this.props.load_department_list_parking();
    this.props.load_stamp_code_all_parking();
  }

  onsearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        var data_parameter = {
          start_date: moment(value.start_date).format("YYYY-MM-DD"),
          end_date: moment(value.end_date).format("YYYY-MM-DD"),
          stamp_code: value.stamp_code,
          ternsubcode: value.ternsubcode,
          in_out: value.in_out,
          stamp_status: value.stamp_status,
          car_type: value.car_type,
          custom: value.custom
        };
        this.props.load_stamp_report_by_custom_parking(data_parameter);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.onsearch}>
          <Row>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="start_date" />}
              >
                {getFieldDecorator("start_date", {
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="please_select_start_date" />
                    }
                  ]
                })(<DatePicker format="DD-MMM-YYYY" width={350} />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="end_date" />}
              >
                {getFieldDecorator("end_date", {
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="please_select_end_date" />
                    }
                  ]
                })(<DatePicker format="DD-MMM-YYYY" width={400} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="stamp_code" />}
              >
                {getFieldDecorator("stamp_code", {
                  initialValue: ""
                })(
                  <Select showSearch>
                    {this.props.data_stamp_code_all_parking &&
                      this.props.data_stamp_code_all_parking.map((c, index) => (
                        <Option key={index} value={c.stampcode}>
                          {c.stampCodeName}
                        </Option>
                      ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="company" />}
              >
                {getFieldDecorator("ternsubcode", {
                  initialValue: "",
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="Please_select_company" />
                    }
                  ]
                })(
                  <Select>
                    {this.props.data_department_list_parking &&
                      this.props.data_department_list_parking.map(c => (
                        <Option value={c.ternsubCode} key={c.ternsubCode}>
                          {c.companyName}
                        </Option>
                      ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="in_out" />}
              >
                {getFieldDecorator("in_out", {
                  initialValue: ""
                })(
                  <Select>
                    <Option value="1">
                      <IntlMessages id="in" />
                    </Option>
                    <Option value="2">
                      <IntlMessages id="out" />
                    </Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="stamp_status" />}
              >
                {getFieldDecorator("stamp_status", {
                  initialValue: ""
                })(
                  <Select>
                    <Option value="">
                      <IntlMessages id="select_all" />
                    </Option>
                    <Option value="1">Active Stamp</Option>
                    <Option value="2">not Active Stamp</Option>
                    <Option value="3">Unusual Active Stamp</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="car_type" />}
              >
                {getFieldDecorator("car_type", {
                  initialValue: ""
                })(
                  <Select>
                    <Option value="">
                      <IntlMessages id="select_all" />
                    </Option>
                    <Option value="C">
                      <IntlMessages id="car" />
                    </Option>
                    <Option value="M">
                      <IntlMessages id="Motorcycle" />
                    </Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem {...formItemLayout} label="Custom">
                {getFieldDecorator("custom", { initialValue: "" })(
                  <Select>
                    <Option value="1">Custom Test</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Button icon="search" htmlType="submit">
            <IntlMessages id="search" />
          </Button>
        </Form>
        <Table
          dataSource={this.props.data_stamp_report_custom_parking}
          scroll={{ x: 1500 }}
        >
          <Column
            dataIndex="date_time_stamp"
            render={e => moment(e.text).format(formant_date_time)}
            title={<IntlMessages id="DateTimeStamp" />}
          />
          <Column
            dataIndex="date_in"
            render={e => moment(e.text).format(formant_date_time)}
            title={<IntlMessages id="date_in" />}
          />
          <Column
            dataIndex="date_out"
            render={e => moment(e.text).format(formant_date_time)}
            title={<IntlMessages id="date_out" />}
          />
          <Column
            dataIndex="stamp_code"
            title={<IntlMessages id="stamp_code" />}
          />
          <Column
            dataIndex="license_plate"
            title={<IntlMessages id="license_plate" />}
          />
          <Column
            dataIndex="visitor_id"
            title={<IntlMessages id="stamp.visitorId" />}
          />
          <Column
            dataIndex="admin_name"
            title={<IntlMessages id="admin_name" />}
          />
          <Column dataIndex="active" title={<IntlMessages id="active" />} />
          <Column dataIndex="custom" title={<IntlMessages id="custom" />} />
          <Column dataIndex="amount" title={<IntlMessages id="amount" />} />
          <Column
            dataIndex="hour_total"
            title={<IntlMessages id="hour_total" />}
          />
        </Table>
      </div>
    );
  }
}

const mapStateToProps = ({ stamp_report_parking }) => {
  const {
    data_stamp_report_custom_parking,
    data_stamp_code_all_parking,
    data_department_list_parking
  } = stamp_report_parking;
  return {
    data_stamp_report_custom_parking,
    data_stamp_code_all_parking,
    data_department_list_parking
  };
};

const formStampReportByCustomParking = Form.create({
  name: "formStampReportByCustomParking"
})(StampReportByCustomParking);

export default connect(mapStateToProps, {
  load_stamp_report_by_custom_parking,
  load_department_list_parking,
  load_stamp_code_all_parking
})(formStampReportByCustomParking);
