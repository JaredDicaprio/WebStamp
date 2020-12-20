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
  Card
} from "antd";
import moment from "moment";
import {
  load_member_department,
  load_department,
  load_card_type,
  load_member_tran_inout
} from "../../appRedux/actions/Member";
import IntlMessages from "../../util/IntlMessages";
import { connect } from "react-redux";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Workbook from "react-excel-workbook";

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

class ExportExcelMemberTran extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Workbook
        filename="MemberTran.xlsx"
        element={<Button icon="file-excel">Excel</Button>}
      >
        <Workbook.Sheet data={this.props.data_member_tran_inout} name="Sheet A">
          <Workbook.Column label="Card Number" value="card_number" />
          <Workbook.Column label="Time In" value="time_in" />
          <Workbook.Column label="Time Out" value="time_out" />
          <Workbook.Column label="license plate" value="licensePlate" />
          <Workbook.Column label="Name LastName" value="name" />
        </Workbook.Sheet>
      </Workbook>
    );
  }
}

class TranMember extends Component {
  onsearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        console.log(value);
        var data_parameter = {
          startdate: moment(value.startdate).format("YYYY-MM-DD"),
          end_date: moment(value.end_date).format("YYYY-MM-DD"),
          CscMain: value.CscMain,
          in_out: value.in_out,
          depId: value.depId,
          CardType: value.CardType
        };
        this.props.load_member_tran_inout(data_parameter);
      }
    });
  };

  printPDF = data_memer_tran => {
    const data_array = [];
    data_memer_tran.map(c => {
      data_array.push({
        "Card Number": c.card_number,
        "Time In": c.time_in,
        "Time Out": c.time_out,
        "license plate": c.licensePlate,
        "Name LastName": c.name
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

          widths: ["*", "*", "*", "*", "*"],
          body: buildTableBody(data, columns)
        }
      };
    }

    var docDefinition = {
      pageSize: "A4",
      pageOrientation: "landscape",
      content: [
        {
          text: "Member Report ",
          style: "header",
          alignment: "center"
        },

        table(data_array, [
          "Card Number",
          "Time In",
          "Time Out",
          "license plate",
          "Name LastName"
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
    this.props.load_member_department();
    this.props.load_department();
    this.props.load_card_type();
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Card className="gx-card" title={"Member Report"}>
          <Form onSubmit={this.onsearch}>
            <Row>
              <Col {...set_col}>
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="start_date" />}
                >
                  {getFieldDecorator("startdate", {
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
                  label={<IntlMessages id="member" />}
                >
                  {getFieldDecorator("CscMain", {
                    initialValue: ""
                  })(
                    <Select>
                      <Option value="">
                        <IntlMessages id="select_all" />
                      </Option>
                      {this.props.data_member_department &&
                        this.props.data_member_department.map(c => (
                          <Option value={c.csc_main}>{c.name}</Option>
                        ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...set_col}>
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="in_out" />}
                >
                  {getFieldDecorator("in_out", {
                    initialValue: "0"
                  })(
                    <Select>
                      <Option value="0">
                        <IntlMessages id="select_all" />
                      </Option>
                      <Option value="1">
                        <IntlMessages id="in" />
                      </Option>
                      <Option value="2">
                        <IntlMessages id="out" />
                      </Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...set_col}>
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="department" />}
                >
                  {getFieldDecorator("depId", {
                    initialValue: ""
                  })(
                    <Select>
                      <Option value="">
                        <IntlMessages id="select_all" />
                      </Option>
                      {this.props.data_department &&
                        this.props.data_department.map(c => (
                          <Option value={c.DepId}>{c.DepName}</Option>
                        ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...set_col}>
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="card_type" />}
                >
                  {getFieldDecorator("CardType", { initialValue: "" })(
                    <Select>
                      <Option value="">
                        <IntlMessages id="select_all" />
                      </Option>
                      {this.props.data_card_type &&
                        this.props.data_card_type.map(c => (
                          <Option value={c.CardTypeId}>{c.CardType}</Option>
                        ))}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Button icon="search" htmlType="submit">
              <IntlMessages id="search" />
            </Button>
          </Form>
        </Card>

        <Card className="gx-card" title={"Member Report"}>
          <Table
            dataSource={this.props.data_member_tran_inout}
            scroll={{ x: 1500 }}
          >
            <Column
              title={<IntlMessages id="card_number" />}
              dataIndex="card_number"
              key="card_number"
              width={100}
            />
            <Column
              title={<IntlMessages id="time_in" />}
              dataIndex="time_in"
              key="time_in"
              width={100}
            />

            <Column
              title={<IntlMessages id="time_out" />}
              dataIndex="time_out"
              key="time_out"
              width={100}
            />

            <Column
              title={<IntlMessages id="license_plate" />}
              dataIndex="licensePlate"
              key="licensePlate"
              width={100}
            />
            <Column
              title={<IntlMessages id="name_lastName" />}
              dataIndex="name"
              key="name"
              width={100}
            />
          </Table>
          <Button
            icon="file-pdf"
            onClick={() => {
              this.printPDF(this.props.data_member_tran_inout);
            }}
          >
            PDF
          </Button>
          <ExportExcelMemberTran
            data_member_tran_inout={this.props.data_member_tran_inout}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ member }) => {
  const {
    data_member_department,
    data_department,
    data_card_type,
    data_member_tran_inout
  } = member;
  return {
    data_member_department,
    data_department,
    data_card_type,
    data_member_tran_inout
  };
};
const formtranmember = Form.create({ name: "formtranmember" })(TranMember);
export default connect(mapStateToProps, {
  load_member_department,
  load_department,
  load_card_type,
  load_member_tran_inout
})(formtranmember);
