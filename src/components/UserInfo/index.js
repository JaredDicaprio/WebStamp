import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar, Popover, Modal, Input, Form, Col, Row } from "antd";
import { userSignOut } from "appRedux/actions/Auth";
import { Link } from "react-router-dom";
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
class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      visiblePopover: false
    };
  }

  oncancelMoal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li>My Account </li>
        <li>
          <Link to={`${process.env.PUBLIC_URL}/EditPassword`}>
            แก้ไข Password
          </Link>
        </li>
        <li onClick={() => this.props.userSignOut()}>Logout</li>
      </ul>
    );

    return (
      <div>
        <Popover
          overlayClassName="gx-popover-horizantal"
          placement="bottomRight"
          content={userMenuOptions}
          trigger="click"
        >
          <Avatar
            src="https://via.placeholder.com/150x150"
            className="gx-avatar gx-pointer"
            onClick={() => {
              this.setState({ visiblePopover: true });
            }}
            alt=""
          />
        </Popover>
        <Modal
          visible={this.state.showModal}
          onCancel={this.oncancelMoal}
          footer={[]}
        >
          <Form>
            <Row>
              <Col {...set_col}>
                <Form.Item {...formItemLayout} label="User Name">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {JSON.stringify(this.props.authUser)}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};
export default connect(mapStateToProps, { userSignOut })(UserInfo);
