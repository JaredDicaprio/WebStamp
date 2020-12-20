import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { userSignIn, userSignInParking } from "../appRedux/actions/Auth";
import IntlMessages from "util/IntlMessages";
import InfoView from "components/InfoView";
import Alert from "../components/Alert";

const FormItem = Form.Item;

class SignIn extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //  this.props.userSignInParking(values);
        this.props.userSignIn(values);
        this.props.userSignInParking(values);
      }
    });
  };

  componentDidUpdate() {
    if (this.props.token !== null) {
      this.props.history.push(`${process.env.PUBLIC_URL}/`);
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="gx-app-login-wrap">
        <Alert />
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-login-content">
              <h3>Stamp parking</h3>
              <Form
                onSubmit={this.handleSubmit}
                className="gx-signin-form gx-form-row0"
              >
                <FormItem label={"user name"}>
                  {getFieldDecorator("user", {
                    rules: [
                      {
                        required: true,

                        message: "Please input your  Username!"
                      }
                    ]
                  })(<Input placeholder="user name" />)}
                </FormItem>
                <FormItem label={"password"}>
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Password!"
                      }
                    ]
                  })(<Input type="password" placeholder="password" />)}
                </FormItem>
                <br />
                <FormItem>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.signIn" />
                  </Button>
                </FormItem>
                <span className="gx-text-light gx-fs-sm"> </span>
              </Form>
            </div>
            <InfoView />
          </div>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(SignIn);

const mapStateToProps = ({ auth }) => {
  const { token } = auth;
  return { token };
};

export default connect(mapStateToProps, { userSignIn, userSignInParking })(
  WrappedNormalLoginForm
);
