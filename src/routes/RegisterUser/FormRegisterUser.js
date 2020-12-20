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
  register_user_admin
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
class FormRegisterUser extends Component {
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
          Login_name: value.Login_name,
          Password: value.Password,
          FullName: value.FullName,
          terncode: value.terncode,
          Custom: value.Custom,
          ternsubcode: value.ternsubcode,
          admin_level: value.admin_level
        };
        this.props.register_user_admin(data_parameter);
        // this.props.register_user_parking(data_parameter);
        this.props.form.resetFields();
        this.props.handleCancelModel();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form onSubmit={this.onsubmit}>
          <Row>
            <Col {...set_col}>
              {getFieldDecorator("terncode", {
                initialValue: this.props.authUser.Terncode
              })(<Input hidden />)}
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="usernmae" />}
              >
                {getFieldDecorator("Login_name", {
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="please_input_username" />
                    }
                  ]
                })(<Input />)}
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
                      required: true,
                      message: <IntlMessages id="Please_input_your_password" />
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(<Input.Password type="password" />)}
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
                      required: true,
                      message: (
                        <IntlMessages id="Please_confirm_your_password" />
                      )
                    },
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
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="Please_input_Name_lastname" />
                    }
                  ]
                })(<Input />)}
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
                {getFieldDecorator("Custom")(<Input />)}
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
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="Please_select_admin_level" />
                    }
                  ]
                })(
                  <Select>
                    {this.props.data_admin_level_list &&
                      this.props.data_admin_level_list.map((c, index) => (
                        <Option key={index} value={c.admin_lvId}>
                          {c.admin_lv}
                        </Option>
                      ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Button icon="save" htmlType="submit">
            <IntlMessages id="save" />
          </Button>
          <Button
            onClick={() => {
              this.props.form.resetFields();
            }}
            icon="stop"
          >
            <IntlMessages id="Cancel" />
          </Button>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = ({ stamp_report, register_user, auth }) => {
  const { department_list } = stamp_report;
  const { authUser } = auth;
  const { data_admin_level_list } = register_user;
  return { department_list, data_admin_level_list, authUser };
};

const formAddAdmin = Form.create({ name: "formAddAdmin" })(FormRegisterUser);
export default connect(mapStateToProps, {
  load_department_list,
  load_admin_level,
  register_user_admin
})(formAddAdmin);
