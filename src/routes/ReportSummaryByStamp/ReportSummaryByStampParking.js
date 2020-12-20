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
import { connect } from "react-redux";
import { formant_date_time } from "../../util/DataConfig";
import {
  load_summary_report_stmpa_by_stamp_parking,
  load_stamp_code_all_parking
} from "../../appRedux/actions/StampReportParking";
import moment from "moment";
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

const columns = [
  {
    title: <IntlMessages id="stamp_code" />,
    dataIndex: "stamp_code",
    key: "stamp_code"
  },
  {
    title: <IntlMessages id="date" />,
    dataIndex: "date_count",
    key: "date_count"
  },
  {
    title: "Count",
    dataIndex: "stamp_count",
    key: "stamp_count"
  },
  {
    title: "amount",
    dataIndex: "total_amount",
    key: "total_amount"
  }
];

class ReportSummaryByStampParking extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
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
          car_type: value.car_type
        };
        this.props.load_summary_report_stmpa_by_stamp_parking(data_parameter);
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
                {getFieldDecorator("stamp_code", { initialValue: "" })(
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
                label={<IntlMessages id="car_type" />}
              >
                {getFieldDecorator("car_type")(
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
          </Row>

          <Button icon="search" htmlType="submit">
            <IntlMessages id="search" />
          </Button>
        </Form>

        <Table
          columns={columns}
          dataSource={
            this.props.data_stamp_report_summary_stamp_by_stamp_parking
          }
          scroll={{ x: 1500 }}
        ></Table>
      </div>
    );
  }
}

const FormReportSummaryByStampParking = Form.create({
  name: "FormReportSummaryByStampParking"
})(ReportSummaryByStampParking);

const mapStateToProps = ({ stamp_report_parking }) => {
  const {
    data_stamp_report_summary_stamp_by_stamp_parking,
    data_stamp_code_all_parking
  } = stamp_report_parking;
  return {
    data_stamp_report_summary_stamp_by_stamp_parking,
    data_stamp_code_all_parking
  };
};
export default connect(mapStateToProps, {
  load_summary_report_stmpa_by_stamp_parking,
  load_stamp_code_all_parking
})(FormReportSummaryByStampParking);
