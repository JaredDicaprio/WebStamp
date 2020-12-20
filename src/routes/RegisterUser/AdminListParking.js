import React, { Component } from "react";
import { connect } from "react-redux";
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
import { load_admin_list_parking2 } from "../../appRedux/actions/StampReportParking";

const columns = [
  {
    title: <IntlMessages id="user_loagin" />,
    dataIndex: "user_name",
    key: "user_name"
  },
  {
    title: <IntlMessages id="department" />,
    dataIndex: "department",
    key: "department"
  },
  {
    title: <IntlMessages id="name" />,
    dataIndex: "name",
    key: "name"
  },
  {
    title: <IntlMessages id="admin_Level" />,
    dataIndex: "level_admin",
    key: "level_admin"
  },
  {
    title: <IntlMessages id="custom" />,
    dataIndex: "custom",
    key: "custom"
  }
  // {
  //   title: "Action",
  //   dataIndex: "action",
  //   key: "action",
  //   render: (text, record) => {
  //     return (
  //       <div>
  //         <Button onClick={() => {}} type="primary" size="small">
  //           <Icon type="edit"></Icon>
  //         </Button>
  //         <Popconfirm title="Sure to delete?" onConfirm={() => {}}>
  //           <Button type="danger" size="small">
  //             <Icon type="delete"></Icon>
  //           </Button>
  //         </Popconfirm>
  //       </div>
  //     );
  //   }
  // }
];

class AdminListParking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ""
    };
  }

  componentDidMount() {
    this.props.load_admin_list_parking2();
  }

  render() {
    return (
      <div>
        <Table
          rowKey="user_name"
          columns={columns}
          dataSource={this.props.data_admin_system_parking}
          scroll={{ x: 1500 }}
        ></Table>
      </div>
    );
  }
}

const mapStateTpProps = ({ stamp_report_parking }) => {
  const { data_admin_system_parking } = stamp_report_parking;
  return { data_admin_system_parking };
};
export default connect(mapStateTpProps, { load_admin_list_parking2 })(
  AdminListParking
);
