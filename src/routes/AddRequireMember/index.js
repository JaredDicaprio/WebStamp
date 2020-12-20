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
  Card,
  Progress
} from "antd";
import IntlMessages from "../../util/IntlMessages";
import { connect } from "react-redux";

import {
  load_require_cardtype,
  load_payment_list,
  load_contac_type_list,
  add_require_member
} from "../../appRedux/actions/Reqirecheang";

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

class AddRequireMember extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.load_require_cardtype();
    this.props.load_payment_list();
    this.props.load_contac_type_list();
  }
  onsubmitMember = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        var data_parameter = {
          TernCode: value.TernCode,
          carType: value.carType,
          Contacttype: value.Contacttype,
          name: value.name,
          lastName: value.lastName,
          payment: value.payment,
          firstday: value.firstday,
          licenseplate: value.licenseplate,
          Model: value.Model,
          Color: value.Color,
          licenseplate1: value.licenseplate1,
          Model1: value.Model1,
          Color1: value.Color1,
          licenseplate2: value.licenseplate2,
          Model2: value.Model2,
          Color2: value.Color2,
          PhoneNumber: value.PhoneNumber,
          sAminname: this.props.authUser.Aminname
        };
        this.props.add_require_member(data_parameter);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card className="gx-card" title={<IntlMessages id="add_member" />}>
        <Form onSubmit={this.onsubmitMember}>
          <Row>
            <Col {...set_col}></Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="company_id" />}
              >
                {getFieldDecorator("TernCode", {
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
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="car_type" />}
              >
                {getFieldDecorator("carType", {
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(
                  <Select>
                    {this.props.data_require_cartype &&
                      this.props.data_require_cartype.map(c => (
                        <Option value={c.CarTypeID}>{c.carType}</Option>
                      ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem {...formItemLayout} label={<IntlMessages id="name" />}>
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(<Input />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="payment" />}
              >
                {getFieldDecorator("payment", {
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(
                  <Select>
                    {this.props.data_payment_list &&
                      this.props.data_payment_list.map(c => (
                        <Option value={c.paymentId}>{c.payment}</Option>
                      ))}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="contract_type" />}
              >
                {getFieldDecorator("Contacttype", {
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(
                  <Select>
                    {this.props.data_contact_type_list &&
                      this.props.data_contact_type_list.map(c => (
                        <Option value={c.contacttypeId}>{c.contactype}</Option>
                      ))}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="last_name" />}
              >
                {getFieldDecorator("lastName", {
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(<Input />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="start_date" />}
              >
                {getFieldDecorator("firstday", {
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(<DatePicker format="DD-MMM-YYYY" width={400} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="licensePlate" />}
              >
                {getFieldDecorator("licenseplate", {
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(<Input />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="licensePlate2" />}
              >
                {getFieldDecorator("licenseplate1")(<Input />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="licensePlate3" />}
              >
                {getFieldDecorator("licenseplate2")(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col {...set_col}>
              <FormItem {...formItemLayout} label={<IntlMessages id="model" />}>
                {getFieldDecorator("Model", {
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(<Input />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="model2" />}
              >
                {getFieldDecorator("Model1")(<Input />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="model3" />}
              >
                {getFieldDecorator("Model2")(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col {...set_col}>
              <FormItem {...formItemLayout} label={<IntlMessages id="color" />}>
                {getFieldDecorator("Color", {
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(<Input />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="color1" />}
              >
                {getFieldDecorator("Color1")(<Input />)}
              </FormItem>
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="color2" />}
              >
                {getFieldDecorator("Color2")(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col {...set_col}></Col>
            <Col {...set_col}>
              <Button type="primary" htmlType="submit">
                {" "}
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

const FormRequireMember = Form.create({ name: "FormRequireMember" })(
  AddRequireMember
);

const mapStateToProps = ({ reqirecheang, auth }) => {
  const {
    data_require_cartype,
    data_payment_list,
    data_contact_type_list
  } = reqirecheang;
  const { authUser } = auth;
  return {
    data_require_cartype,
    data_payment_list,
    data_contact_type_list,
    authUser
  };
};
export default connect(mapStateToProps, {
  load_require_cardtype,
  load_payment_list,
  load_contac_type_list,
  add_require_member
})(FormRequireMember);
