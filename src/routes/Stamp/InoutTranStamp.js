import React, { Component } from "react";
import {
  Col,
  Row,
  Card,
  Input,
  Form,
  Icon,
  DatePicker,
  Table,
  Divider,
  Tag
} from "antd";
import IntlMessages from "../../util/IntlMessages";
import { formant_date_time } from "../../util/DataConfig";
import moment from "moment";

import { connect } from "react-redux";

class InoutTranStamp extends Component {
  render() {
    const columns = [
      {
        title: <IntlMessages id="DateTimeStamp" />,
        dataIndex: "DateTimeStamp",
        key: "DateTimeStamp",
        render: (text, record) => {
          return moment(record.DateTimeStamp).format(formant_date_time);
        }
      },
      {
        title: <IntlMessages id="StampCode" />,
        dataIndex: "StampCode",
        key: "StampCode"
      },
      {
        title: <IntlMessages id="company" />,
        dataIndex: "Company",
        key: "Company"
      },
      {
        title: <IntlMessages id="Calculation" />,
        key: "Calculation",
        dataIndex: "Calculation",
        render: (text, record) => {
          if (record.Calculation === 1) {
            return <Icon type="close-circle" />;
          } else {
            return <Icon type="check-circle" />;
          }
        }
      }
    ];

    return (
      <Card className="gx-card" title={<IntlMessages id="visitordetail" />}>
        <Table
          columns={columns}
          dataSource={this.props.stampmodel.historyStamp_list}
        />
      </Card>
    );
  }
}

const mapStateToProps = ({ stamp }) => {
  const { stampmodel } = stamp;
  return { stampmodel };
};
export default connect(mapStateToProps, {})(InoutTranStamp);
