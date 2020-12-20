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
import {
  load_user_admin,
  load_user_detail,
  delete_user_admin
} from "../../appRedux/actions/RegisterUser";
import DataGrid, {
  Scrolling,
  Paging,
  ColumnFixing,
  Column,
  SearchPanel,
  Export,
  FilterRow
} from "devextreme-react/data-grid";
import FormRegisterUser from "./FormRegisterUser";
import FormEditUser from "./FormEditUser";
import moment from "moment";
import { connect } from "react-redux";
import AdminListParking from "./AdminListParking";
import { formatMessage } from "devextreme/localization";

//const { Column } = Table;
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

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visibleEdit: false,
      user_id_update: null
    };
  }

  componentDidMount() {
    this.props.load_user_admin();
  }
  showModel = () => {
    this.setState({ visible: true });
  };
  showModelEdit = user_id => {
    this.setState({ user_id_update: user_id });
    this.setState({ visibleEdit: true });
  };
  handleCancelModel = () => {
    this.setState({ visible: false });
  };
  handleCancelModelEdit = () => {
    this.setState({ visibleEdit: false });
  };
  render() {
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
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (text, record) => {
          return (
            <div>
              <Button
                onClick={() => this.showModelEdit(record.user_Id)}
                type="primary"
                size="small"
              >
                <Icon type="edit"></Icon>
              </Button>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => {
                  this.props.delete_user_admin(record.user_Id);
                }}
              >
                <Button type="danger" size="small">
                  <Icon type="delete"></Icon>
                </Button>
              </Popconfirm>
            </div>
          );
        }
      }
    ];

    return (
      <div>
        <Card className="gx-card" title={"User List"}>
          <Tabs type="card">
            <TabPane tab="User" key="1">
              <Button
                type="primary"
                onClick={() => {
                  this.showModel();
                }}
              >
                <Icon type="user-add"></Icon>
                {formatMessage("add_administrator")}
              </Button>
              <DataGrid
                dataSource={this.props.data_user_admin}
                showBorders={true}
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                showColumnLines={true}
                showRowLines={true}
                rowAlternationEnabled={true}
              >
                <Scrolling columnRenderingMode="virtual" />
                <SearchPanel visible={true} />
                <Paging defaultPageSize={10} />
                <Column
                  dataField="user_name"
                  caption={formatMessage("user_loagin")}
                />
                <Column
                  dataField="department"
                  caption={formatMessage("department")}
                />
                <Column dataField="name" caption={formatMessage("name")} />
                <Column
                  dataField="level_admin"
                  caption={formatMessage("admin_Level")}
                />
                <Column dataField="custom" caption={formatMessage("custom")} />
                <Column dataField="custom" caption={formatMessage("custom")} />
                <Column
                  cellRender={e => {
                    return (
                      <div>
                        <Button
                          onClick={() => this.showModelEdit(e.data.user_Id)}
                          type="primary"
                          size="small"
                        >
                          <Icon type="edit"></Icon>
                        </Button>
                        <Popconfirm
                          title="Sure to delete?"
                          onConfirm={() => {
                            this.props.delete_user_admin(e.data.user_Id);
                          }}
                        >
                          <Button type="danger" size="small">
                            <Icon type="delete"></Icon>
                          </Button>
                        </Popconfirm>
                      </div>
                    );
                  }}
                />
              </DataGrid>
              {/* <Table
                rowKey="user_name"
                columns={columns}
                dataSource={this.props.data_user_admin}
                scroll={{ x: 1500 }}
              ></Table> */}
              <Modal
                visible={this.state.visible}
                title="Register User"
                onCancel={this.handleCancelModel}
                width={1200}
                footer={[]}
              >
                <FormRegisterUser handleCancelModel={this.handleCancelModel} />
              </Modal>
              <Modal
                visible={this.state.visibleEdit}
                title="Edit User"
                onCancel={this.handleCancelModelEdit}
                width={1200}
                footer={[]}
              >
                <FormEditUser
                  user_id={this.state.user_id_update}
                  handleCancelModelEdit={this.handleCancelModelEdit}
                />
              </Modal>
            </TabPane>
            <TabPane tab="User Parking" key="2">
              <AdminListParking />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ register_user }) => {
  const { data_user_admin, data_admin_parking } = register_user;
  return { data_user_admin, data_admin_parking };
};
export default connect(mapStateToProps, {
  load_user_admin,
  load_user_detail,
  delete_user_admin
})(RegisterUser);
