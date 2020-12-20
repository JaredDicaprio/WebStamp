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
import moment from "moment";
import {
  load_department_list,
  load_summary_by_department
} from "../../appRedux/actions/StampReport";
import { connect } from "react-redux";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Workbook from "react-excel-workbook";
import ReportStampByDepartmentParking from "./ReportStampByDepartmentParking";

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

class ExportExcel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Workbook
        filename="SummaryByDepart.xlsx"
        element={<Button icon="file-excel">Excel</Button>}
      >
        <Workbook.Sheet
          data={this.props.data_summary_by_department}
          name="Sheet A"
        >
          <Workbook.Column label="Company" value="department" />
          <Workbook.Column label="Date" value="date_count" />

          <Workbook.Column label="Count" value="count" />
          <Workbook.Column label="amount" value="amount" />
        </Workbook.Sheet>
      </Workbook>
    );
  }
}

class ReportStampByDepartment extends Component {
  constructor(props) {
    super(props);
  }
  printPDF = data_summary_department => {
    const data_array = [];
    data_summary_department.map(c => {
      data_array.push({
        Company: c.department,
        Date: moment(c.date_count).format("DD-MM-YYYY"),
        Count: c.count,
        amount: c.amount
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

          widths: ["*", "*", "*", "*"],
          body: buildTableBody(data, columns)
        }
      };
    }

    var docDefinition = {
      pageSize: "A4",
      pageOrientation: "landscape",
      content: [
        {
          text: "Summary By Depart",
          style: "header",
          alignment: "center"
        },

        table(data_array, ["Company", "Date", "Count", "amount"])
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
  }
  onsearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        var data_parameter = {
          start_date: moment(value.start_date),
          end_date: moment(value.end_date),
          ternsubcode: value.ternsubcode,
          car_type: value.car_type
        };
        this.props.load_summary_by_department(data_parameter);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Card className="gx-card" title={"Stamp Report By Department"}>
          <Tabs type="card">
            <TabPane tab="Stamp Report By Department" key="1">
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
                            message: (
                              <IntlMessages id="please_select_start_date" />
                            )
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
                            message: (
                              <IntlMessages id="please_select_end_date" />
                            )
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
                        initialValue: "0"
                      })(
                        <Select>
                          <Option value="0">
                            <IntlMessages id="select_all" />
                          </Option>
                          <Option value="1">
                            <IntlMessages id="car" />
                          </Option>
                          <Option value="2">
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
                        rules: [
                          {
                            required: true,
                            message: "Please select Department"
                          }
                        ]
                      })(
                        <Select>
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

                <Button icon="search" htmlType="submit">
                  Search
                </Button>
              </Form>
              <br />
              <Table
                columns={columns}
                dataSource={this.props.data_summary_by_department}
                scroll={{ x: 1500 }}
              ></Table>
              <Button
                icon="file-pdf"
                onClick={() => {
                  this.printPDF(this.props.data_summary_by_department);
                }}
              >
                PDF
              </Button>
              <ExportExcel
                data_summary_by_department={
                  this.props.data_summary_by_department
                }
              />
            </TabPane>
            <TabPane tab="Stamp Report By Department Parking" key="2">
              <ReportStampByDepartmentParking />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}
const formSummaryByDepartment = Form.create({
  name: "formSummaryByDepartment"
})(ReportStampByDepartment);

const mapStateToProps = ({ stamp_report }) => {
  const { department_list, data_summary_by_department } = stamp_report;

  return { department_list, data_summary_by_department };
};

export default connect(mapStateToProps, {
  load_department_list,
  load_summary_by_department
})(formSummaryByDepartment);
