import React, { Component } from "react";
import { Card, Form, Col, Row, Table, Select, Input, Button } from "antd";
import { connect } from "react-redux";
import IntlMessages from "../../util/IntlMessages";
import { update_password } from "../../appRedux/actions/RegisterUser";
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
export class EditPassword extends Component {
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
      form.validateFields(["Confirm_password"], { force: true });
    }
    callback();
  };

  onsubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        var data = {
          uerId: this.props.authUser.admin_ID,
          Password: value.Password
        };
        this.props.update_password(data);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card className="gx-card" title={"change password"}>
          <Form onSubmit={this.onsubmit}>
            <Row>
              <Col {...set_col}>
                <FormItem {...formItemLayout} label={"User"}>
                  {getFieldDecorator("Login_name", {
                    initialValue: this.props.authUser.Aminname,
                    rules: [
                      {
                        required: true,
                        message: "Please entry data"
                      }
                    ]
                  })(<Input disabled={true} />)}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...set_col}>
                <Form.Item label="Password" {...formItemLayout}>
                  {getFieldDecorator("Password", {
                    rules: [
                      {
                        required: true,
                        message: "Please entry data"
                      },
                      {
                        validator: this.validateToNextPassword
                      }
                    ]
                  })(<Input.Password />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col {...set_col}>
                <Form.Item label="Confirm Password" {...formItemLayout}>
                  {getFieldDecorator("Confirm_password", {
                    rules: [
                      {
                        required: true,
                        message: "Please entry data"
                      },
                      {
                        validator: this.compareToFirstPassword
                      }
                    ]
                  })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>
              </Col>
            </Row>
            <Button icon="save" htmlType="submit">
              <IntlMessages id="save" />
            </Button>
          </Form>
          {/* {JSON.stringify(this.props.authUser)} */}
        </Card>
      </div>
    );
  }
}

const From_edit_password = Form.create({ name: "formeditPassword" })(
  EditPassword
);
const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};
export default connect(mapStateToProps, { update_password })(
  From_edit_password
);
