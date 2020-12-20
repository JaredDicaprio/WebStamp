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
  load_stamp_code_all,
  load_department_list,
  load_stamp_by_stamp_report,
  clear_stamp_by_stamp_report
} from "../../appRedux/actions/StampReport";
import { connect } from "react-redux";
import IntlMessages from "../../util/IntlMessages";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Workbook from "react-excel-workbook";
import ReportStampByStampParking from "./ReportStampByStampParking";
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
    dataIndex: "licen_plate",
    key: "licen_plate"
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

class ExportExcel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Workbook
        filename="StampByStamp.xlsx"
        element={<Button icon="file-excel">Excel</Button>}
      >
        <Workbook.Sheet data={this.props.data_stamp_by_stamp} name="Sheet A">
          <Workbook.Column label="DateTime Stamp" value="date_time_stamp" />
          <Workbook.Column label="Date In" value="date_in" />
          <Workbook.Column label="Date out" value="date_out" />
          <Workbook.Column label="Stamp Code" value="stamp_code" />
          <Workbook.Column label="license plate" value="licen_plate" />
          <Workbook.Column label="Visitor ID" value="visitor_id" />
          <Workbook.Column label="admin name" value="admin_name" />
          <Workbook.Column label="amount" value="amount" />
        </Workbook.Sheet>
      </Workbook>
    );
  }
}

class ReportStampByStamp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: moment(Date.now()).format("DD-MM-YYYY"),
      end_date: moment(Date.now()).format("DD-MM-YYYY")
    };
  }

  componentDidMount() {
    this.props.load_department_list();
    this.props.load_stamp_code_all();
  }

  printPDF = data_stamp_by_stamp => {
    const data_array = [];
    data_stamp_by_stamp.map(c => {
      data_array.push({
        "DateTime Stamp": c.date_time_stamp,
        "Date In": c.date_in,
        "Date Out": c.date_out,
        "Stamp Code": c.stamp_code,
        "license plate": c.licen_plate,
        "Visitor ID": c.visitor_id,
        "admin name": c.admin_name,
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

          widths: ["*", "*", "*", "*", "*", "*", "*", "*"],
          body: buildTableBody(data, columns)
        }
      };
    }

    var docDefinition = {
      pageSize: "A4",
      pageOrientation: "landscape",
      content: [
        {
          text: "Stamp by Stamp Report",
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
          "amount"
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

  onsearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        var data_parameter = {
          start_date: moment(value.start_date).format("YYYY-MM-DD"),
          end_date: moment(value.end_date).format("YYYY-MM-DD"),
          ternsubcode: value.ternsubcode,
          stamp_code: value.stamp_code,
          status_stamp: value.status_stamp
        };

        this.props.load_stamp_by_stamp_report(data_parameter);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Card className="gx-card" title={"Stamp Report By Stamp"}>
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
                          onClick={e => {
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
                      label={<IntlMessages id="StampCode" />}
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
                      label={<IntlMessages id="stamp_status" />}
                    >
                      {getFieldDecorator("status_stamp", {
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
                  <Col {...set_col}></Col>
                </Row>

                <Button icon="search" htmlType="submit">
                  <IntlMessages id="search" />
                </Button>
              </Form>

              <Table
                columns={columns}
                dataSource={this.props.data_stamp_by_stamp}
                scroll={{ x: 1500 }}
              ></Table>
              <Button
                icon="file-pdf"
                onClick={() => {
                  this.printPDF(this.props.data_stamp_by_stamp);
                }}
              >
                PDF
              </Button>
              <ExportExcel
                data_stamp_by_stamp={this.props.data_stamp_by_stamp}
              />
            </TabPane>
            <TabPane tab="Stamp Report By Stamp Parking" key="2">
              <ReportStampByStampParking />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}
const fromStampByStampReport = Form.create({ name: "fromStampByStampReport" })(
  ReportStampByStamp
);

const mapStateToprop = ({ stamp_report }) => {
  const { stamp_code_all, department_list, data_stamp_by_stamp } = stamp_report;
  return { stamp_code_all, department_list, data_stamp_by_stamp };
};
export default connect(mapStateToprop, {
  load_stamp_code_all,
  load_department_list,
  load_stamp_by_stamp_report,
  clear_stamp_by_stamp_report
})(fromStampByStampReport);
