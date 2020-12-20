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

import { load_member_company } from "../../appRedux/actions/Member";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Workbook from "react-excel-workbook";
import { connect } from "react-redux";

import IntlMessages from "../../util/IntlMessages";

class ExportExcelMemberTran extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Workbook
        filename="Memberlist.xlsx"
        element={<Button icon="file-excel">Excel</Button>}
      >
        <Workbook.Sheet data={this.props.data_member_company} name="Sheet A">
          <Workbook.Column label="Member Card" value="CardNumber" />
          <Workbook.Column label="Name Lastname" value="FullName" />
          <Workbook.Column label="license plate" value="Lineceplate" />
          <Workbook.Column label="Company" value="CompanyName" />
          <Workbook.Column label="Card Type" value="carType" />
        </Workbook.Sheet>
      </Workbook>
    );
  }
}

class MemberCard extends Component {
  printPDF = data_member => {
    const data_array = [];
    data_member.map(c => {
      data_array.push({
        "Member Card": c.CardNumber,
        "Name Lastname": c.FullName,
        "license plate": c.Lineceplate,
        Company: c.CompanyName,
        "Card Type": c.carType
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
          text: "Member List Report ",
          style: "header",
          alignment: "center"
        },

        table(data_array, [
          "Member Card",
          "Name Lastname",
          "license plate",
          "Company",
          "Card Type"
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
    this.props.load_member_company();
  }

  render() {
    const columns = [
      {
        title: <IntlMessages id="member_card" />,
        dataIndex: "CardNumber",
        key: "CardNumber"
      },
      {
        title: <IntlMessages id="name_lastname" />,
        dataIndex: "FullName",
        key: "FullName"
      },
      {
        title: <IntlMessages id="license_plate" />,
        dataIndex: "Lineceplate",
        key: "Lineceplate"
      },
      {
        title: <IntlMessages id="company" />,
        key: "CompanyName",
        dataIndex: "CompanyName"
      },
      {
        title: <IntlMessages id="card_type" />,
        key: "carType",
        dataIndex: "carType"
      }
    ];

    return (
      <div>
        <Card className="gx-card" title={"Member Card"}>
          <Table
            columns={columns}
            dataSource={this.props.data_member_company}
            scroll={{ x: 1300 }}
          />
          <Button
            icon="file-pdf"
            onClick={() => {
              this.printPDF(this.props.data_member_company);
            }}
          >
            PDF
          </Button>
          <ExportExcelMemberTran
            data_member_company={this.props.data_member_company}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ member }) => {
  const { data_member_company } = member;
  return { data_member_company };
};
export default connect(mapStateToProps, { load_member_company })(MemberCard);
