import React, { Component } from "react";
import { connect } from "react-redux";
import IntlMessages from "../../util/IntlMessages";
import moment from "moment";
import {
  load_stamp_report_by_department_parking,
  load_department_list_parking
} from "../../appRedux/actions/StampReportParking";
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
  Card
} from "antd";
const columns = [
  {
    title: <IntlMessages id="company" />,
    dataIndex: "department",
    key: "department"
  },
  {
    title: <IntlMessages id="date" />,
    dataIndex: "date_count",
    key: "date_count",
    render: (text, record) => {
      return moment(record.date_count).format("DD-MM-YYYY");
    }
  },
  {
    title: "Count",
    dataIndex: "count",
    key: "count"
  },
  {
    title: "amount",
    dataIndex: "amount",
    key: "amount"
  }
];
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
export class ReportStampByDepartmentParking extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    this.props.load_department_list_parking();
  }

  onsearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        var data_parameter = {
          start_date: moment(value.start_date).format("YYYY-MM-DD"),
          end_date: moment(value.end_date).format("YYYY-MM-DD"),
          ternsubcode: value.ternsubcode,
          car_type: value.car_type,
          sCompanyID: localStorage.getItem("ParkingCompanyID")
        };
        this.props.load_stamp_report_by_department_parking(data_parameter);
        //console.log(data_parameter);
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
                label={<IntlMessages id="car_type" />}
              >
                {getFieldDecorator("car_type", {
                  initialValue: "C"
                })(
                  <Select>
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

          <Button icon="search" htmlType="submit">
            Search
          </Button>
        </Form>
        <br />
        <Table
          columns={columns}
          dataSource={this.props.data_stamp_report_by_department}
          scroll={{ x: 1500 }}
        ></Table>
      </div>
    );
  }
}

const formReportStampByDepartmentParking = Form.create({
  name: "formReportStampByDepartmentParking"
})(ReportStampByDepartmentParking);

const mapStateToProps = ({ stamp_report_parking }) => {
  const {
    data_department_list_parking,
    data_stamp_report_by_department
  } = stamp_report_parking;

  return {
    data_department_list_parking,
    data_stamp_report_by_department
  };
};

export default connect(mapStateToProps, {
  load_stamp_report_by_department_parking,
  load_department_list_parking
})(formReportStampByDepartmentParking);
