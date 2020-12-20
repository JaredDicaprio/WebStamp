import React, { Component } from "react";
import {
  Table,
  Divider,
  Tag,
  Col,
  Row,
  Card,
  Input,
  Select,
  Button,
  Tabs
} from "antd";
import IntlMessages from "../../util/IntlMessages";
import { connect } from "react-redux";
import { load_member_list } from "../../appRedux/actions/Member";
import moment from "moment";
import { formant_date, formant_date_time } from "../../util/DataConfig";
import { PDFViewer } from "@react-pdf/renderer";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Workbook from "react-excel-workbook";
const { TabPane } = Tabs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  THSarabunNew: {
    normal: "THSarabunNew.ttf",
    bold: "THSarabunNew-Bold.ttf",
    italics: "THSarabunNew-Italic.ttf",
    bolditalics: "THSarabunNew-BoldItalic.ttf"
  },
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf"
  }
};

const ref = React.createRef();
const { Option } = Select;
const columns = [
  {
    title: <IntlMessages id="member_id" />,
    dataIndex: "BADGENUMBER",
    key: "BADGENUMBER"
  },
  {
    title: <IntlMessages id="name_lastname" />,
    dataIndex: "name1",
    key: "name1"
  },
  {
    title: <IntlMessages id="billing" />,
    dataIndex: "Carbill",
    key: "Carbill"
  },
  {
    title: <IntlMessages id="contract_type" />,
    key: "Cartype",
    dataIndex: "Cartype"
  },
  {
    title: <IntlMessages id="start_date" />,
    key: "Firstdate",
    dataIndex: "Firstdate",
    render: (text, record) => {
      return record.Firstdate; // moment(Date.parse(record.Firstdate)).toDate();
    }
  },
  {
    title: <IntlMessages id="expired_date" />,
    key: "Expdate",
    dataIndex: "Expdate"
  },
  {
    title: <IntlMessages id="licensePlate" />,
    key: "vehicalID",
    dataIndex: "vehicalID"
  },
  {
    title: <IntlMessages id="model" />,
    key: "Model",
    dataIndex: "Model"
  },
  {
    title: <IntlMessages id="licensePlate2" />,
    key: "vehicalID1",
    dataIndex: "vehicalID1"
  },
  {
    title: <IntlMessages id="model2" />,
    key: "Model1",
    dataIndex: "Model1"
  },
  {
    title: <IntlMessages id="licensePlate3" />,
    key: "vehicalID2",
    dataIndex: "vehicalID2"
  },
  {
    title: <IntlMessages id="model3" />,
    key: "Model2",
    dataIndex: "Model2"
  }
];

class ExportExcel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Workbook
        filename="MemberReport.xlsx"
        element={<Button icon="file-excel">Excel</Button>}
      >
        <Workbook.Sheet data={this.props.data_member_list} name="Sheet A">
          <Workbook.Column label="Member ID" value="BADGENUMBER" />
          <Workbook.Column label="Name Lastname" value="name1" />
          <Workbook.Column label="billing" value="Carbill" />
          <Workbook.Column label="Contract type" value="Cartype" />
          <Workbook.Column label="Start Date" value="Firstdate" />
          <Workbook.Column label="Expires Date" value="Expdate" />
          <Workbook.Column label="license Plate" value="vehicalID" />
          <Workbook.Column label="Model" value="Model" />
          <Workbook.Column label="license Plate2" value="vehicalID1" />
          <Workbook.Column label="Model 2" value="Model1" />
          <Workbook.Column label="license Plate3" value="vehicalID2" />
          <Workbook.Column label="Model 3" value="Model2" />
        </Workbook.Sheet>
      </Workbook>
    );
  }
}

class Member extends Component {
  componentDidMount() {
    var data_send_parameter = {
      cardType: 1
    };
    this.props.load_member_list(data_send_parameter);
  }
  handleChange = value => {
    var data_send_parameter = {
      cardType: value
    };
    this.props.load_member_list(data_send_parameter);
  };

  print = data_member_list => {
    const data_array = [];
    data_member_list.map(c => {
      data_array.push({
        "Member ID": c.BADGENUMBER,
        "Name Lastname": c.name1,
        billing: c.Carbill,
        "Contract type": c.Cartype,
        "Start Date": c.Firstdate,
        "Expires Date": c.Expdate,
        "license Plate": c.vehicalID,
        Model: c.Model,
        "license Plate2": c.vehicalID1,
        "Model 2": c.Model1,
        "license Plate3": c.vehicalID2,
        "Model 3": c.Model2
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
          widths: [56, 100, 50, 50, 50, 50, 50, 50, 60, 50, 60, 50],
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
          "Member ID",
          "Name Lastname",
          "billing",
          "Contract type",
          "Start Date",
          "Expires Date",
          "license Plate",
          "Model",
          "license Plate2",
          "Model 2",
          "license Plate3",
          "Model 3"
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

  exportexcel = () => {
    return ""; //<ExportExcel />;
  };
  render() {
    return (
      <div>
        <Card className="gx-card" title={"Member List"}>
          <Tabs type="card">
            <TabPane tab="Member List" key="1">
              <Row>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Select
                    defaultValue="1"
                    style={{ width: "20%" }}
                    onChange={this.handleChange}
                  >
                    <Option value="1">
                      <IntlMessages id="car" />
                    </Option>
                    <Option value="2">
                      <IntlMessages id="Motorcycle" />
                    </Option>
                  </Select>

                  <hr />
                  <Table
                    columns={columns}
                    dataSource={this.props.data_member_list}
                    scroll={{ x: 1300 }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Button
                    icon="file-pdf"
                    onClick={() => {
                      this.print(this.props.data_member_list);
                    }}
                  >
                    PDF
                  </Button>
                  <ExportExcel data_member_list={this.props.data_member_list} />
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ member }) => {
  const { data_member_list } = member;
  return { data_member_list };
};
export default connect(mapStateToProps, { load_member_list })(Member);
