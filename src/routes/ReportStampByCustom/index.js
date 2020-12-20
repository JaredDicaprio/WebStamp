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
  load_department_list,
  load_stamp_code_all,
  load_custom_list,
  load_custom_report,
  clear_custom_report
} from "../../appRedux/actions/StampReport";
import { connect } from "react-redux";
import IntlMessages from "../../util/IntlMessages";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Workbook from "react-excel-workbook";
import StampReportByCustomParking from "./StampReportByCustomParking";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
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
    key: "date_time_stamp"
  },
  {
    title: <IntlMessages id="date_in" />,
    dataIndex: "date_in",
    key: "date_in"
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
    title: "Activate",
    dataIndex: "active",
    key: "active"
  },
  {
    title: <IntlMessages id="custom" />,
    dataIndex: "custom",
    key: "custom"
  },
  {
    title: <IntlMessages id="amount" />,
    dataIndex: "amount",
    key: "amount"
  },
  {
    title: <IntlMessages id="hour_total" />,
    dataIndex: "total_host",
    key: "total_host"
  }
];

class RepoetStampByCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: moment(Date.now()).format("DD-MM-YYYY"),
      end_date: moment(Date.now()).format("DD-MM-YYYY")
    };
    this.props.clear_custom_report();
  }

  printPDF = data_stamp_custom => {
    const data_array = [];
    data_stamp_custom.map(c => {
      data_array.push({
        "DateTime Stamp": c.date_time_stamp,
        "Date In": c.date_in,
        "Date Out": c.date_out,
        "Stamp Code": c.stamp_code,
        "license plate": c.license_plate,
        "Visitor ID": c.visitor_id,
        "admin name": c.admin_name,
        Activate: c.active,
        custom: c.custom,
        amount: c.amount,
        "hour total": c.total_host
      });
    });

    function buildTableBody(data, columns) {
      var body = [];

      body.push(columns);

      data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
          dataRow.push(row[column].toString());
        });

        body.push(dataRow);
      });

      return body;
    }

    function table(data, columns) {
      return {
        table: {
          headerRows: 1,

          widths: [80, 80, 80, 60, 50, 50, 50, 50, 50, 50, 80, 50],
          body: buildTableBody(data, columns)
        }
      };
    }

    var docDefinition = {
      pageSize: "A4",
      pageOrientation: "landscape",
      content: [
        {
          text: "Stamp Report by Custom",
          style: "header",
          alignment: "center"
        },
        {
          text: ` ระหว่างวันที่ ${this.state.start_date} ถึง ${this.state.end_date} `,
          style: "header",
          alignment: "center"
        },
        table(data_array, [
          "DateTime Stamp",
          "Date In",
          "Date Out",
          "Stamp Code",
          "license plate",
          "Visitor ID",
          "admin name",
          "Activate",
          "custom",
          "amount",
          "hour total"
        ])
      ],
      defaultStyle: {
        font: "THSarabunNew"
      },
      styles: {
        header: {
          fontSize: 20,

          margin: [0, 0, 0, 10]
        },

        tableExample: {
          margin: [0, 5, 0, 2]
        },
        tableHeader: {
          bold: false,
          fontSize: 30,
          color: "black"
        }
      },
      header: function(currentPage, pageCount) {
        return {
          text: "Page " + currentPage.toString() + " of " + pageCount,
          alignment: "right",
          style: "normalText",

          margin: [10, 10, 40, 10]
        };
      },
      footer: function(currentPage, pageCount) {
        return {
          text: "Page " + currentPage.toString() + " of " + pageCount,
          alignment: "right",
          style: "normalText",

          margin: [0, 0, 40, 10]
        };
      }
    };

    pdfMake.createPdf(docDefinition).open();
  };
  componentDidMount() {
    this.props.load_department_list();
    this.props.load_stamp_code_all();
    this.props.load_custom_list();
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
        this.props.load_custom_report(data_parameter);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Card className="gx-card" title={"Stamp Report By Custom"}>
          <Tabs type="card">
            <TabPane tab="Stamp Report By Custom" key="1">
              <Form onSubmit={this.onsearch}>
                <Row>
                  <Col {...set_col}>
                    <FormItem
                      {...formItemLayout}
                      label={<IntlMessages id="start_date" />}
                    >
                      {getFieldDecorator("start_date", {
                        initialValue: moment(),
                        rules: [
                          {
                            required: true,
                            message: (
                              <IntlMessages id="please_select_start_date" />
                            )
                          }
                        ]
                      })(
                        <DatePicker
                          onChange={e => {
                            this.setState({
                              start_date: e.format("DD-MM-YYYY")
                            });
                          }}
                          format="DD-MMM-YYYY"
                          width={350}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col {...set_col}>
                    <FormItem
                      {...formItemLayout}
                      label={<IntlMessages id="end_date" />}
                    >
                      {getFieldDecorator("end_date", {
                        initialValue: moment(),
                        rules: [
                          {
                            required: true,
                            message: (
                              <IntlMessages id="please_select_end_date" />
                            )
                          }
                        ]
                      })(
                        <DatePicker
                          onChange={e => {
                            this.setState({ end_date: e.format("DD-MM-YYYY") });
                          }}
                          format="DD-MMM-YYYY"
                          width={400}
                        />
                      )}
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
                          <Option value="">
                            <IntlMessages id="select_all" />
                          </Option>
                          {this.props.stamp_code_all &&
                            this.props.stamp_code_all.map(c => (
                              <Option value={c.stampcode}>
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
                        initialValue: ""
                      })(
                        <Select>
                          <Option value="">
                            <IntlMessages id="select_all" />
                          </Option>
                          {this.props.department_list &&
                            this.props.department_list.map(c => (
                              <Option value={c.TernsubCode}>
                                {c.CompanyName}
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
                          <Option value="">
                            <IntlMessages id="select_all" />
                          </Option>
                          <Option value="0">
                            <IntlMessages id="in" />
                          </Option>
                          <Option value="1">
                            <IntlMessages id="out" />
                          </Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col {...set_col}>
                    <FormItem {...formItemLayout} label="Custom">
                      {getFieldDecorator("custom", { initialValue: "" })(
                        <Select>
                          <Option value="">
                            <IntlMessages id="select_all" />
                          </Option>
                          {this.props.data_custom_list &&
                            this.props.data_custom_list.map(c => (
                              <Option value={c.custom_stamp}>
                                {c.custom_stamp}
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
                  <Col {...set_col}></Col>
                </Row>
                <Button icon="search" htmlType="submit">
                  <IntlMessages id="search" />
                </Button>
              </Form>
              <Table
                columns={columns}
                dataSource={this.props.data_custom_stamp_report}
                scroll={{ x: 1500 }}
              ></Table>
              {this.props.data_custom_stamp_report.length > 0 && (
                <div>
                  <Button
                    icon="file-pdf"
                    onClick={() => {
                      this.printPDF(this.props.data_custom_stamp_report);
                    }}
                  >
                    PDF
                  </Button>
                  <ExcelFile
                    filename="StampbyCustom"
                    element={<Button icon="file-excel">Excel</Button>}
                  >
                    <ExcelSheet
                      data={this.props.data_custom_stamp_report}
                      name="StampbyCustom"
                    >
                      <ExcelColumn
                        value="date_time_stamp"
                        label="Date Time Stamp"
                      />
                      <ExcelColumn value="date_in" label="Date In" />
                      <ExcelColumn value="stamp_code" label="Stamp Code" />
                      <ExcelColumn
                        value="license_plate"
                        label="License plate"
                      />
                      <ExcelColumn value="visitor_id" label="Visitor ID" />
                      <ExcelColumn value="admin_name" label="Admin name" />
                      <ExcelColumn value="active" label="active" />
                      <ExcelColumn value="custom" label="custom" />
                      <ExcelColumn value="amount" label="amount" />
                      <ExcelColumn value="total_host" label="hour total" />
                    </ExcelSheet>
                  </ExcelFile>
                </div>
              )}
            </TabPane>
            <TabPane tab="Stamp Report by Custom Parking" key="2">
              <StampReportByCustomParking />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ stamp_report }) => {
  const {
    stamp_code_all,
    department_list,
    data_custom_list,
    data_custom_stamp_report
  } = stamp_report;
  return {
    stamp_code_all,
    department_list,
    data_custom_list,
    data_custom_stamp_report
  };
};
const formStampCustomReport = Form.create({ name: "formStampCustomReport" })(
  RepoetStampByCustom
);
export default connect(mapStateToProps, {
  load_department_list,
  load_stamp_code_all,
  load_custom_list,
  load_custom_report,
  clear_custom_report
})(formStampCustomReport);
