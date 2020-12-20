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
import { load_require_change_member } from "../../appRedux/actions/Member";
import IntlMessages from "../../util/IntlMessages";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
const { Column } = Table;
class RequireChangeMember extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.load_require_change_member();
  }

  render() {
    return (
      <Card className="gx-card" title={"Require & ChangeMember"}>
        <Link to={`${process.env.PUBLIC_URL}/AddRequireMember`}>
          <Button type="primary">
            <Icon type="plus"></Icon> <IntlMessages id="add" />
          </Button>
        </Link>{" "}
        <Link to={`${process.env.PUBLIC_URL}/ChangeMember`}>
          <Button type="default">
            <Icon type="edit"></Icon> <IntlMessages id="change" />
          </Button>
        </Link>{" "}
        <Link to={`${process.env.PUBLIC_URL}/CancelMember`}>
          <Button type="danger">
            <Icon type="stop"></Icon> <IntlMessages id="Cancel" />
          </Button>
        </Link>
        <Table dataSource={this.props.data_require_chenge_member}>
          <Column title="Action" dataIndex="action" key="action" width={50} />
          <Column
            title={<IntlMessages id="name_lastname" />}
            dataIndex="name"
            key="name"
            width={50}
          />
          <Column
            title={<IntlMessages id="card_type" />}
            dataIndex="CarType"
            key="CarType"
            width={50}
          />
          <Column
            title={<IntlMessages id="status" />}
            dataIndex="status"
            key="status"
            width={50}
          />
        </Table>
      </Card>
    );
  }
}
const mapStateToProps = ({ member }) => {
  const { data_require_chenge_member } = member;
  return { data_require_chenge_member };
};
export default connect(mapStateToProps, { load_require_change_member })(
  RequireChangeMember
);
