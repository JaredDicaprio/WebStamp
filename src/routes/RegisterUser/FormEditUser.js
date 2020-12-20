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
import { load_department_list } from "../../appRedux/actions/StampReport";
import {
  load_admin_level,
  register_user_admin,
  update_user_admin,
  load_user_detail
} from "../../appRedux/actions/RegisterUser";
import { connect } from "react-redux";
import IntlMessages from "../../util/IntlMessages";
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

export class FormEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  componentDidMount() {
    this.props.load_department_list();
    this.props.load_admin_level();
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("Password")) {
      callback(<IntlMessages id="password_not_map" />);
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["ConfirmPassword"], { force: true });
    }
    callback();
  };

  onsubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        var data_parameter = {
          uerId: value.uerId,
          Login_name: value.Login_name,
          Password: value.Password,
          FullName: value.FullName,
          terncode: value.terncode,
          Custom: value.Custom,
          ternsubcode: value.ternsubcode,
          admin_level_update: value.admin_level
        };
        this.props.update_user_admin(data_parameter);
        this.props.handleCancelModelEdit();
      }
    });
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  componentDidUpdate() {
    this.props.load_user_detail(this.props.user_id);
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("Password")) {
      callback(<IntlMessages id="password_not_map" />);
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["ConfirmPassword"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form onSubmit={this.onsubmit}>
          <Row>
            {getFieldDecorator("uerId", {
              initialValue: this.props.data_user_detail.uerId
            })(<Input hidden />)}
            <Col {...set_col}>
              {getFieldDecorator("terncode", {
                initialValue: this.props.authUser.Terncode
              })(<Input hidden />)}
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="userNmae" />}
              >
                {getFieldDecorator("Login_name", {
                  initialValue: this.props.data_user_detail.Login_name,
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(<Input placeholder="User" />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="password" />}
              >
                {getFieldDecorator("Password", {
                  rules: [
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(<Input.Password type="password" placeholder="password" />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="confirm_password" />}
              >
                {getFieldDecorator("ConfirmPassword", {
                  rules: [
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="name_lastname" />}
              >
                {getFieldDecorator("FullName", {
                  initialValue: this.props.data_user_detail.FullName,
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="Please_input_Name_lastname" />
                    }
                  ]
                })(<Input placeholder="Name LastName" />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="company" />}
              >
                {getFieldDecorator("companyname", {
                  initialValue: this.props.authUser.DeptName,
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="Please_input_company" />
                    }
                  ]
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem {...formItemLayout} label="custom">
                {getFieldDecorator("Custom", {
                  initialValue: this.props.data_user_detail.Custom
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="department" />}
              >
                {getFieldDecorator("ternsubcode", {
                  initialValue: this.props.data_user_detail.ternsubcode,
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="Please_input_company" />
                    }
                  ]
                })(
                  <Select>
                    {this.props.department_list &&
                      this.props.department_list.map(c => (
                        <Option key={c.TernsubCode} value={c.TernsubCode}>
                          {c.CompanyName}
                        </Option>
                      ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="admin_Level" />}
              >
                {getFieldDecorator("admin_level", {
                  initialValue: this.props.data_user_detail.admin_level_update,
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="Please_select_admin_level" />
                    }
                  ]
                })(
                  <Select>
                    {this.props.data_admin_level_list &&
                      this.props.data_admin_level_list.map(c => (
                        <Option value={c.admin_lvId}>{c.admin_lv}</Option>
                      ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Button icon="save" htmlType="submit">
            Save
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ stamp_report, register_user, auth }) => {
  const { department_list } = stamp_report;
  const { authUser } = auth;
  const { data_admin_level_list, data_user_detail } = register_user;
  return { department_list, data_admin_level_list, data_user_detail, authUser };
};

const formEditAdmin = Form.create({ name: "formEditAdmin" })(FormEditUser);
export default connect(mapStateToProps, {
  load_department_list,
  load_admin_level,
  register_user_admin,
  update_user_admin,
  load_user_detail
})(formEditAdmin);
