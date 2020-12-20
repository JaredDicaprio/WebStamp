import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import IntlMessages from "../../util/IntlMessages";
import {
  load_require_cardtype,
  get_user_info,
  get_member_name_list,
  cancel_member
} from "../../appRedux/actions/Reqirecheang";
import { connect } from "react-redux";

const { Column } = Table;
const FormItem = Form.Item;
const { Option } = Select;
const set_col = {
  lg: 8,
  md: 8,
  sm: 8,
  xs: 24
};

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 15 }
};
class CancelMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carType: "C"
    };
  }
  componentDidMount() {
    this.props.load_require_cardtype();
    this.props.get_member_name_list(this.state.carType);
  }
  onChangeCarType = value => {
    this.setState({ carType: value });
    this.props.get_member_name_list(value);
  };
  onChangeUser = e => {
    var data_para = {
      userid: e,
      Typecard: this.state.carType
    };
    this.props.get_user_info(data_para);
  };
  onsubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        var data_parameter = {
          CancelDate: value.CancelDate,
          ternCode: value.ternCode,
          payment: value.payment,
          cusNo: value.cusNo,

          name: value.name,
          last_name: value.last_name,
          card_type: value.card_type,
          ContractType: value.ContractType,
          firstday: value.firstday,

          licenplatel: value.licenplatel,
          model: value.model,
          car_color: value.car_color,
          licenplatel1: value.licenplatel1,
          model1: value.model1,
          car_color1: value.car_color1,
          licenplatel2: value.licenplatel2,
          model2: value.model2,
          car_color2: value.car_color2
        };
        this.props.cancel_member(data_parameter);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card className="gx-card" title={"Cancel Member"}>
        <Form onSubmit={this.onsubmit}>
          <Row>
            <Col {...set_col}></Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="company_id" />}
              >
                {getFieldDecorator("ternCode", {
                  initialValue: this.props.authUser.Terncode,
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col {...set_col}></Col>
          </Row>
          <Row>
            <Col {...set_col}></Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="cancel_date" />}
              >
                {getFieldDecorator("CancelDate", {
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="Please_select_canceldate" />
                    }
                  ]
                })(<DatePicker format="DD-MMM-YYYY" width={400} />)}
              </FormItem>
            </Col>
            <Col {...set_col}></Col>
          </Row>
          <br />
          <Row>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="car_type" />}
              >
                {getFieldDecorator("card_type", {
                  initialValue: this.state.carType,
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="please_select_member_id" />
                    }
                  ]
                })(
                  <Select onChange={this.onChangeCarType}>
                    {this.props.data_require_cartype &&
                      this.props.data_require_cartype.map(c => (
                        <Option value={c.CarTypeID}>{c.carType}</Option>
                      ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="member_id" />}
              >
                {getFieldDecorator("cusNo", {
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="please_select_member_id" />
                    }
                  ]
                })(
                  <Select showSearch onChange={this.onChangeUser}>
                    {this.props.data_member_name_list &&
                      this.props.data_member_name_list.map(c => (
                        <Option key={c.MemberID} value={c.MemberID}>
                          {c.MemberName}
                        </Option>
                      ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="payment" />}
              >
                {getFieldDecorator("payment", {
                  initialValue: this.props.data_user_info.Carbill
                })(<Input disabled />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="contract_type" />}
              >
                {getFieldDecorator("ContractType", {
                  initialValue: this.props.data_user_info.Cartype
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem {...formItemLayout} label={<IntlMessages id="name" />}>
                {getFieldDecorator("name", {
                  initialValue: this.props.data_user_info.name1
                })(<Input disabled />)}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="last_name" />}
              >
                {getFieldDecorator("last_name", {
                  initialValue: this.props.data_user_info.LastName1
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="start_date" />}
              >
                {getFieldDecorator("firstday", {
                  initialValue: this.props.data_user_info.Firstdate
                })(<Input disabled />)}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="licensePlate" />}
              >
                {getFieldDecorator("licenplatel", {
                  initialValue: this.props.data_user_info.vehicalID
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="licensePlate2" />}
              >
                {getFieldDecorator("licenplatel1", {
                  initialValue: this.props.data_user_info.vehicalID1
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="licensePlate3" />}
              >
                {getFieldDecorator("licenplatel2", {
                  initialValue: this.props.data_user_info.vehicalID2
                })(<Input disabled />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col {...set_col}>
              <FormItem {...formItemLayout} label={<IntlMessages id="model" />}>
                {getFieldDecorator("model", {
                  initialValue: this.props.data_user_info.Model
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="model2" />}
              >
                {getFieldDecorator("model1", {
                  initialValue: this.props.data_user_info.Model1
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="model3" />}
              >
                {getFieldDecorator("model2", {
                  initialValue: this.props.data_user_info.Model2
                })(<Input disabled />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col {...set_col}>
              <FormItem {...formItemLayout} label={<IntlMessages id="color" />}>
                {getFieldDecorator("car_color", {
                  initialValue: this.props.data_user_info.color
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="Color2" />}
              >
                {getFieldDecorator("car_color1", {
                  initialValue: this.props.data_user_info.color1
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="Color3" />}
              >
                {getFieldDecorator("car_color2", {
                  initialValue: this.props.data_user_info.color2
                })(<Input disabled />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col {...set_col}></Col>
            <Col {...set_col}>
              <Button type="primary" htmlType="submit">
                <Icon type="save"></Icon> <IntlMessages id="save" />
              </Button>
              <Link to={`${process.env.PUBLIC_URL}/RequireChangeMember`}>
                <Button type="danger">
                  <Icon type="stop"></Icon> <IntlMessages id="cancel" />
                </Button>
              </Link>
            </Col>
            <Col {...set_col}></Col>
          </Row>
        </Form>
      </Card>
    );
  }
}

const FormCancelMember = Form.create({ name: "FormCancelMember" })(
  CancelMember
);
const mapStateToprops = ({ reqirecheang, auth }) => {
  const {
    data_require_cartype,
    data_member_name_list,
    data_user_info
  } = reqirecheang;
  const { authUser } = auth;
  return {
    data_require_cartype,
    data_member_name_list,
    data_user_info,
    authUser
  };
};
export default connect(mapStateToprops, {
  load_require_cardtype,
  get_user_info,
  get_member_name_list,
  cancel_member
})(FormCancelMember);
