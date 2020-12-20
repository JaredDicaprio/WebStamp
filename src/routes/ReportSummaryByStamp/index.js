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
import moment from "moment";
import {
  load_stamp_code_all,
  load_summary_by_stamp
} from "../../appRedux/actions/StampReport";
import IntlMessages from "../../util/IntlMessages";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Workbook from "react-excel-workbook";
import ReportSummaryByStampParking from "./ReportSummaryByStampParking";
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
    dataIndex: "toltal_amont",
    key: "toltal_amont"
  }
];

class ExportExcel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Workbook
        filename="SummaryByStamp.xlsx"
        element={<Button icon="file-excel">Excel</Button>}
      >
        <Workbook.Sheet data={this.props.data_summary_by_stamp} name="Sheet A">
          <Workbook.Column label="Stamp Code" value="stamp_code" />
          <Workbook.Column label="Date" value="date_count" />
          <Workbook.Column label="Count" value="stamp_count" />
          <Workbook.Column label="amount" value="toltal_amont" />
        </Workbook.Sheet>
      </Workbook>
    );
  }
}

class ReportSummaryByStamp extends Component {
  constructor(props) {
    super(props);
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
        this.props.load_summary_by_stamp(data_parameter);
      }
    });
  };
  componentDidMount() {
    this.props.load_stamp_code_all();
  }

  printPDF = data_stamp_summary_stamp => {
    const data_array = [];
    data_stamp_summary_stamp.map(c => {
      data_array.push({
        "Stamp Code": c.stamp_code,
        Date: c.date_count,
        Count: c.stamp_count,
        amount: c.toltal_amont
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

        table(data_array, ["Stamp Code", "Date", "Count", "amount"])
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

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Card className="gx-card" title={"Summary Stamp"}>
          <Tabs type="card">
            <TabPane tab="Stamp Report By Stamp" key="1">
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
                      label={<IntlMessages id="stamp_code" />}
                    >
                      {getFieldDecorator("stamp_code", { initialValue: "" })(
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
                </Row>

                <Button icon="search" htmlType="submit">
                  <IntlMessages id="search" />
                </Button>
              </Form>
              <Table
                columns={columns}
                dataSource={this.props.data_summary_by_stamp}
                scroll={{ x: 1500 }}
              ></Table>
              <Button
                icon="file-pdf"
                onClick={() => this.printPDF(this.props.data_summary_by_stamp)}
              >
                PDF
              </Button>
              <ExportExcel
                data_summary_by_stamp={this.props.data_summary_by_stamp}
              />
            </TabPane>
            <TabPane tab="Stamp Report By Stamp Parking" key="2">
              <ReportSummaryByStampParking />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}
const FormReportByStamp = Form.create({ name: "FormReportByStamp" })(
  ReportSummaryByStamp
);
const mapStateToProps = ({ stamp_report }) => {
  const { stamp_code_all, data_summary_by_stamp } = stamp_report;
  return { stamp_code_all, data_summary_by_stamp };
};
export default connect(mapStateToProps, {
  load_stamp_code_all,
  load_summary_by_stamp
})(FormReportByStamp);
