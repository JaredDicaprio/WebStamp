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
import IntlMessages from "../../util/IntlMessages";
import { connect } from "react-redux";
import {
  load_admin_list_parking2,
  load_department_list_parking,
  load_stamp_code_all_parking,
  load_stamp_report_by_user
} from "../../appRedux/actions/StampReportParking";
import { formant_date_time } from "../../util/DataConfig";
import moment from "moment";
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

const columns = [
  {
    title: <IntlMessages id="DateTimeStamp" />,
    dataIndex: "date_time_stamp",
    key: "date_time_stamp",
    render: e => moment(e.text).format(formant_date_time)
  },

  {
    title: <IntlMessages id="stamp_code" />,
    dataIndex: "stamp_code",
    key: "stamp_code"
  },
  {
    title: <IntlMessages id="licensePlate" />,
    dataIndex: "license_plate",
    key: "license_plate"
  },
  {
    title: <IntlMessages id="stamp.visitorId" />,
    dataIndex: "visitor_id",
    key: "visitor_id"
  },
  {
    title: <IntlMessages id="amount" />,
    dataIndex: "amount",
    key: "amount"
  },
  {
    title: <IntlMessages id="admin_name" />,
    dataIndex: "admin_name",
    key: "admin_name"
  }
];

class StampReportByUserParking extends Component {
  componentDidMount() {
    this.props.load_admin_list_parking2();
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
          TernsubCode: value.TernsubCode,
          admin_name: value.admin_name
        };
        this.props.load_stamp_report_by_user(data_parameter);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {" "}
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
                  <Select>
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
                {getFieldDecorator("TernsubCode", {
                  rules: [
                    {
                      required: true,
                      message: "Plase select company"
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
                label={<IntlMessages id="admin_name" />}
              >
                {getFieldDecorator("admin_name", {
                  initialValue: ""
                })(
                  <Select>
                    {this.props.data_admin_system_parking &&
                      this.props.data_admin_system_parking.map(c => (
                        <Option value={c.name}>{c.name}</Option>
                      ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...set_col}></Col>
          </Row>

          <Button icon="search" htmlType="submit">
            Search
          </Button>
        </Form>
        <Table
          columns={columns}
          dataSource={this.props.data_stamp_report_stamp_by_user}
          scroll={{ x: 1500 }}
        ></Table>
      </div>
    );
  }
}

const formStampReportByUserParking = Form.create({
  name: "formStampReportByUserParking"
})(StampReportByUserParking);

const mapStateToProps = ({ stamp_report_parking }) => {
  const {
    data_stamp_code_all_parking,
    data_department_list_parking,
    data_admin_list_parking,
    data_admin_system_parking,
    data_stamp_report_stamp_by_user
  } = stamp_report_parking;
  return {
    data_stamp_code_all_parking,
    data_department_list_parking,
    data_admin_list_parking,
    data_admin_system_parking,
    data_stamp_report_stamp_by_user
  };
};
export default connect(mapStateToProps, {
  load_admin_list_parking2,
  load_department_list_parking,
  load_stamp_code_all_parking,
  load_stamp_report_by_user
})(formStampReportByUserParking);
