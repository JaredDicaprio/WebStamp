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
import { formant_date_time } from "../../util/DataConfig";
import moment from "moment";
import IntlMessages from "../../util/IntlMessages";
import {
  load_department_list,
  load_stamp_code_all,
  load_stamp_report,
  clear_stamp_report
} from "../../appRedux/actions/StampReport";
import { load_stamp_report_parking } from "../../appRedux/actions/StampReportParking";
import { connect } from "react-redux";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Workbook from "react-excel-workbook";
import StampReportParking from "./StampReportParking";
import ReactExport from "react-data-export";

import jsPDF from "jspdf";
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
    dataIndex: "Hour_total",
    key: "Hour_total"
  }
];

class StampReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startdate: moment(Date.now()).format("DD-MM-YYYY"),
      end_date: moment(Date.now()).format("DD-MM-YYYY")
    };
    this.props.clear_stamp_report();
  }
  componentDidMount() {
    this.props.load_stamp_code_all();
    this.props.load_department_list();
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
          in_out: value.in_out,
          stamp_status: value.stamp_status,
          car_type: value.car_type
        };

        this.props.load_stamp_report(data_parameter);
      }
    });
  };

  printPDF = data_stamp_report => {
    const data_array = [];
    data_stamp_report.map(c => {
      data_array.push({
        "DATETIME STAMP": c.date_time_stamp,
        "DATE IN": c.date_in,
        "DATE OUT": c.date_out,
        "STAMP CODE": c.stamp_code,
        "LICENSE PLATE": c.license_plate,
        "VISITOR ID": c.visitor_id,
        "ADMIN NAME": c.admin_name,
        ACTIVE: c.active,
        CUSTOM: c.custom,
        AMOUNT: c.amount,
        "HOUR TOTAL": c.Hour_total
      });
    });

    function buildTableBody(data, columns) {
      var body = [];

      body.push(columns);
      console.log(body);
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
          widths: [80, 80, 80, 60, 60, 50, 50, 50, 50, 50, 80, 50],
          body: buildTableBody(data, columns)
        }
      };
    }

    var docDefinition = {
      pageSize: "A4",
      pageOrientation: "landscape",
      content: [
        {
          text: "Stamp Report",
          style: "header",
          alignment: "center"
        },
        {
          text: ` ระหว่างวันที่ ${this.state.startdate} ถึง ${this.state.end_date} `,
          style: "header",
          alignment: "center"
        },
        table(data_array, [
          "DATETIME STAMP",
          "DATE IN",
          "DATE OUT",
          "STAMP CODE",
          "LICENSE PLATE",
          "VISITOR ID",
          "ADMIN NAME",
          "ACTIVE",
          "CUSTOM",
          "AMOUNT",
          "HOUR TOTAL"
        ]),
        {
          text: `รวม: ${data_stamp_report
            .map(c => {
              return Number(c.amount);
            })
            .reduce((sum, x) => sum + x)}`,
          margin: [20, 10, 95, 0],
          alignment: "right"
        },
        {
          canvas: [
            {
              type: "line",
              x1: 5,
              y1: 5,
              x2: 800 - 30,
              y2: 5,
              lineWidth: 1
            }
          ]
        }
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
          color: "black",
          alignment: "center"
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

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Card className="gx-card" title={""}>
          <Tabs type="card">
            <TabPane tab="Stamp Report" key="1">
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
                              startdate: e.format("DD-MM-YYYY")
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
                          onClick={e => {
                            this.setState({
                              end_date: e.format("DD-MM-YYYY")
                            });
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
                        <Select showSearch>
                          <Option value="">
                            {<IntlMessages id="select_all" />}
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
                      {getFieldDecorator("TernsubCode", {
                        initialValue: ""
                      })(
                        <Select>
                          <Option value="">
                            {<IntlMessages id="select_all" />}
                          </Option>
                          {this.props.department_list &&
                            this.props.department_list.map(c => (
                              <Option key={c.TernsubCode} value={c.TernsubCode}>
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
                          <Option value="0">Active Stamp</Option>
                          <Option value="1">not Active Stamp</Option>
                          <Option value="2">Unusual Active Stamp</Option>
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
                </Row>
                <Button icon="search" htmlType="submit">
                  <IntlMessages id="search" />
                </Button>
              </Form>
              <Table
                columns={columns}
                dataSource={this.props.data_stamp_report}
                scroll={{ x: 1500 }}
              ></Table>
              {this.props.data_stamp_report.length > 0 && (
                <div>
                  <Button
                    icon="file-pdf"
                    onClick={() => {
                      this.printPDF(this.props.data_stamp_report);
                    }}
                  >
                    PDF
                  </Button>
                  <ExcelFile
                    filename="StampReport"
                    element={<Button icon="file-excel">Excel</Button>}
                  >
                    <ExcelSheet
                      data={this.props.data_stamp_report}
                      name="StampReport"
                    >
                      <ExcelColumn
                        label={"DateTimeStamp"}
                        value="date_time_stamp"
                      />
                      <ExcelColumn label={"DateIn"} value="date_in" />
                      <ExcelColumn label={"DateOut"} value="date_out" />
                      <ExcelColumn label={"Stamp Code"} value="stamp_code" />
                      <ExcelColumn
                        label={"License plate"}
                        value="license_plate"
                      />
                      <ExcelColumn label={"Visitor ID"} value="visitor_id" />
                      <ExcelColumn label={"Admin naek"} value="admin_name" />
                      <ExcelColumn label={"Active"} value="active" />
                      <ExcelColumn label={"Custom"} value="custom" />
                      <ExcelColumn label={"Hour total"} value="Hour_total" />
                    </ExcelSheet>
                  </ExcelFile>
                </div>
              )}

              {/* <ExportExcelMemberTran
                data_stamp_report={this.props.data_stamp_report}
              /> */}
            </TabPane>
            <TabPane tab="Stamp Report Parking" key="2">
              <StampReportParking />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ stamp_report }) => {
  const { stamp_code_all, department_list, data_stamp_report } = stamp_report;
  return {
    stamp_code_all,
    department_list,
    data_stamp_report
  };
};

const formStampReport = Form.create({ name: "formStampReport" })(StampReport);
export default connect(mapStateToProps, {
  load_stamp_code_all,
  load_department_list,
  load_stamp_report,
  clear_stamp_report
})(formStampReport);
