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
import StampReportByUserParking from "./StampReportByUserParking";
import {
  load_department_list,
  load_stamp_code_all,
  load_admin_list,
  load_stamp_report_by_user
} from "../../appRedux/actions/StampReport";
import IntlMessages from "../../util/IntlMessages";
import { connect } from "react-redux";
import moment from "moment";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Workbook from "react-excel-workbook";
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

class ExportExcel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Workbook
        filename="StampByUserReport.xlsx"
        element={<Button icon="file-excel">Excel</Button>}
      >
        <Workbook.Sheet data={this.props.data_stamp_by_user} name="Sheet A">
          <Workbook.Column label="DateTime Stamp" value="date_time_stamp" />
          <Workbook.Column label="Stamp Code" value="stamp_code" />
          <Workbook.Column label="license plate" value="license_plate" />
          <Workbook.Column label="Visitor ID" value="visitor_id" />
          <Workbook.Column label="amount" value="amount" />
          <Workbook.Column label="admin name" value="admin_name" />
        </Workbook.Sheet>
      </Workbook>
    );
  }
}

class StampReportByUser extends Component {
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
    this.props.load_admin_list();
  }

  printPDF = data_stamp_by_user => {
    const data_array = [];
    data_stamp_by_user.map(c => {
      data_array.push({
        "DateTime Stamp": c.date_time_stamp,
        "Stamp Code": c.stamp_code,
        "license plate": c.license_plate,
        "Visitor ID": c.visitor_id,
        amount: c.amount,
        "admin name": c.admin_name
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

          widths: ["*", "*", "*", "*", "*", "*"],
          body: buildTableBody(data, columns)
        }
      };
    }

    function groupByKey(array, key) {
      return array.reduce((hash, obj) => {
        if (obj[key] === undefined) return hash;
        return Object.assign(hash, {
          [obj[key]]: (hash[obj[key]] || []).concat(obj)
        });
      }, {});
    }

    function data_report() {
      var data_table = groupByKey(data_array, "admin name");

      return [
        {
          text: `101`,
          style: "header",
          alignment: "lift"
        },
        table(data_table["101"], [
          "DateTime Stamp",
          "Stamp Code",
          "license plate",
          "Visitor ID",
          "amount",
          "admin name"
        ])
      ];
    }

    var docDefinition = {
      pageSize: "A4",
      pageOrientation: "landscape",
      content: [
        {
          text: "Stamp by User Report",
          style: "header",
          alignment: "center"
        },
        {
          text: ` ระหว่างวันที่ ${this.state.start_date} ถึง ${this.state.end_date} `,
          style: "header",
          alignment: "center"
        },
        data_report()
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
          stamp_code: value.stamp_code,
          ternsubcode: value.ternsubcode,

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
        <Card className="gx-card" title={"Stamp Report By User"}>
          <Tabs type="card">
            <TabPane tab="Stamp Report By User" key="1">
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
                      label={<IntlMessages id="admin_name" />}
                    >
                      {getFieldDecorator("admin_name", {
                        initialValue: ""
                      })(
                        <Select>
                          <Option value="">
                            <IntlMessages id="select_all" />
                          </Option>
                          {this.props.admin_list &&
                            this.props.admin_list.map(c => (
                              <Option value={c.admin_name}>
                                {c.admin_name}
                              </Option>
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
                dataSource={this.props.data_stamp_by_user}
                scroll={{ x: 1500 }}
              ></Table>
              <Button
                icon="file-pdf"
                onClick={() => {
                  this.printPDF(this.props.data_stamp_by_user);
                }}
              >
                PDF
              </Button>
              <ExportExcel data_stamp_by_user={this.props.data_stamp_by_user} />
            </TabPane>
            <TabPane tab="Stamp Report By User Parking" key="2">
              <StampReportByUserParking />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}

const formStampReportByUers = Form.create({ name: "formStampReportByUers" })(
  StampReportByUser
);
const mapStateToProps = ({ stamp_report }) => {
  const {
    stamp_code_all,
    department_list,
    admin_list,
    data_stamp_by_user
  } = stamp_report;
  return { stamp_code_all, department_list, admin_list, data_stamp_by_user };
};
export default connect(mapStateToProps, {
  load_department_list,
  load_stamp_code_all,
  load_admin_list,
  load_stamp_report_by_user
})(formStampReportByUers);
