import React, { Component } from "react";
import {
  Col,
  Row,
  Card,
  Input,
  Form,
  Icon,
  Table,
  Button,
  Popconfirm,
  Tabs
} from "antd";
import IntlMessages from "../../util/IntlMessages";
import { connect } from "react-redux";
import {
  load_active_stamp,
  delete_stamp,
  load_active_stamp_parking,
  dlete_stamp_parking
} from "../../appRedux/actions/ActiveStamp";
import { formant_date_time } from "../../util/DataConfig";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import moment from "moment";
const { Column } = Table;
const { TabPane } = Tabs;
class TableActiveStamp extends Component {
  constructor(props) {
    super(props);

    this.props.load_active_stamp();
    this.props.load_active_stamp_parking();
  }
  handleDelete = data_stamp => {
    var data_parameter = {
      stampcode: data_stamp.StampCode,
      inoutTrainStamp: data_stamp.InoutTrainStamp
    };
    this.props.delete_stamp(data_parameter);
  };
  handleDeleteStampParking = data_stamp => {
    var data_parameter = {
      stampcode: data_stamp.stampCode,
      inoutTrain: data_stamp.inoutTrainStamp
    };
    this.props.dlete_stamp_parking(data_parameter);
  };
  render() {
    const columns = [
      {
        title: <IntlMessages id="DateTimeStamp" />,
        dataIndex: "TimeStamp",
        render: (text, record) => {
          return moment(record.TimeStamp).format(formant_date_time);
        }
      },
      {
        title: <IntlMessages id="stamp.visitorId" />,
        dataIndex: "visitor_id"
      },
      {
        title: <IntlMessages id="licensePlate" />,
        dataIndex: "license_plate"
      },
      {
        title: <IntlMessages id="StampCode" />,
        dataIndex: "StampCode"
      },
      {
        title: <IntlMessages id="change_delete" />,
        render: (text, record) => (
          <div>
            <Link
              to={`${process.env.PUBLIC_URL}/ChangeStamp?inoutTrainStamp=${record.InoutTrainStamp}&visitor_id=${record.visitor_id}`}
            >
              <Button type="primary" size="small">
                {" "}
                <i className="icon icon-edit" />
              </Button>
            </Link>{" "}
            <Popconfirm
              title={<IntlMessages id="confirm_delete" />}
              onConfirm={() => this.handleDelete(record)}
            >
              <Button type="danger" size="small">
                <i className="icon icon-trash" />
              </Button>
            </Popconfirm>
          </div>
        )
      }
    ];

    return (
      <Card className="gx-card" title={<IntlMessages id="TableActiveStamp" />}>
        <Tabs type="card">
          <TabPane tab="Active Stamp" key="1">
            <Table
              columns={columns}
              rowKey="InoutTrainStamp"
              dataSource={this.props.data_active_stamp}
              bordered
              // title={() => "Header"}
              // footer={() => "Footer"}
            />
          </TabPane>
          <TabPane tab="Parking Active Stamp" key="2">
            <Table
              rowKey="inoutTrainStamp"
              dataSource={this.props.data_active_stamp_parking}
              bordered
            >
              <Column
                dataIndex="timeStamp"
                render={(text, record) => {
                  return moment(record.timeStamp).format(formant_date_time);
                }}
                title={<IntlMessages id="DateTimeStamp" />}
              />
              <Column
                dataIndex="visitor_id"
                title={<IntlMessages id="stamp.visitorId" />}
              />
              <Column
                dataIndex="license_plate"
                title={<IntlMessages id="licensePlate" />}
              />
              <Column
                dataIndex="stampCode"
                title={<IntlMessages id="StampCode" />}
              />
              <Column
                render={(text, record) => {
                  return (
                    <div>
                      <Link
                        to={`${process.env.PUBLIC_URL}/ChangeStampParking?inoutTrainStamp=${record.inoutTrainStamp}&visitor_id=${record.visitor_id}`}
                      >
                        <Button type="primary" size="small">
                          <i className="icon icon-edit" />
                        </Button>
                      </Link>{" "}
                      <Popconfirm
                        title={<IntlMessages id="confirm_delete" />}
                        onConfirm={() => {
                          this.handleDeleteStampParking(record);
                        }}
                      >
                        <Button type="danger" size="small">
                          <i className="icon icon-trash" />
                        </Button>
                      </Popconfirm>
                    </div>
                  );
                }}
              />
            </Table>
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}

const mapStateToProps = ({ active_stamp }) => {
  const { data_active_stamp, data_active_stamp_parking } = active_stamp;
  return {
    data_active_stamp,
    data_active_stamp_parking
  };
};
export default connect(mapStateToProps, {
  load_active_stamp,
  delete_stamp,
  load_active_stamp_parking,
  dlete_stamp_parking
})(TableActiveStamp);
