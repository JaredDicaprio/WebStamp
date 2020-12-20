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
import {
  load_department_list_parking,
  load_stamp_code_all_parking,
  load_stamp_report_by_stamp_parking
} from "../../appRedux/actions/StampReportParking";
import { connect } from "react-redux";
import { formant_date_time } from "../../util/DataConfig";
import IntlMessages from "../../util/IntlMessages";

const { Column } = Table;
const FormItem = Form.Item;
const { Option } = Select;
const { TabPane } = Tabs;
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
class ReportStampByStampParking extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.load_department_list_parking();
    this.props.load_stamp_code_all_parking();
  }
  onsearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        var data_parameter = {
          TernsubCode: value.TernsubCode,
          end_date: moment(value.end_date).format(formant_date_time),
          stamp_code: value.stamp_code,
          stamp_status: value.stamp_status,
          start_date: moment(value.start_date).format(formant_date_time)
        };

        this.props.load_stamp_report_by_stamp_parking(data_parameter);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const columns = [
      {
        title: <IntlMessages id="DateTimeStamp" />,
        dataIndex: "date_time_stamp",
        key: "date_time_stamp",
        render: e => moment(e.text).format(formant_date_time)
      },
      {
        title: <IntlMessages id="date_in" />,
        dataIndex: "date_in",
        key: "date_in",
        render: e => moment(e.text).format(formant_date_time)
      },
      {
        title: <IntlMessages id="date_out" />,
        dataIndex: "date_out",
        key: "date_out"
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
        title: <IntlMessages id="admin_name" />,
        dataIndex: "admin_name",
        key: "admin_name"
      },
      {
        title: <IntlMessages id="amount" />,
        dataIndex: "amount",
        key: "amount"
      }
    ];
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
                label={<IntlMessages id="StampCode" />}
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
                label={<IntlMessages id="stamp_status" />}
              >
                {getFieldDecorator("stamp_status", {
                  initialValue: ""
                })(
                  <Select>
                    <Option value="0">Active Stamp</Option>
                    <Option value="1">not Active Stamp</Option>
                    <Option value="2">Unusual Active Stamp</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...set_col}></Col>
          </Row>

          <Button icon="search" htmlType="submit">
            <IntlMessages id="search" />
          </Button>
        </Form>

        <Table
          columns={columns}
          dataSource={this.props.data_stamp_report_stamp_by_stamp}
          scroll={{ x: 1500 }}
        ></Table>
      </div>
    );
  }
}

const FormReportStampByStampParking = Form.create({
  name: "FormReportStampByStampParking"
})(ReportStampByStampParking);

const mapStateToProps = ({ stamp_report_parking }) => {
  const {
    data_stamp_report_stamp_by_stamp,
    data_stamp_code_all_parking,
    data_department_list_parking
  } = stamp_report_parking;
  return {
    data_stamp_report_stamp_by_stamp,
    data_stamp_code_all_parking,
    data_department_list_parking
  };
};
export default connect(mapStateToProps, {
  load_department_list_parking,
  load_stamp_code_all_parking,
  load_stamp_report_by_stamp_parking
})(FormReportStampByStampParking);
