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
import { connect } from "react-redux";
import {
  load_require_cardtype,
  load_payment_list,
  load_contac_type_list,
  get_member_name_list,
  get_user_info,
  Require_Change_Member
} from "../../appRedux/actions/Reqirecheang";
import { show_message_error } from "../../appRedux/actions/Alert";

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
  labelCol: { span: 9 },
  wrapperCol: { span: 15 }
};

class ChangeMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ChaengName: false,
      ChaengeContactType: false,
      ChaengLicenseplat: false,
      carType: "C"
    };
  }
  componentDidMount() {
    this.props.load_require_cardtype();
    this.props.load_payment_list();
    this.props.load_contac_type_list();
    this.props.get_member_name_list(this.state.carType);
  }

  componentWillUpdate() {}
  onsubmit = e => {
    e.preventDefault();

    if (
      this.state.ChaengName === false &&
      this.state.ChaengLicenseplat === false &&
      this.state.ChaengeContactType === false
    ) {
      this.props.show_message_error(
        <IntlMessages id="Please_select_revision" />
      );
      return false;
    }
    this.props.form.validateFields((err, value) => {
      if (!err) {
        var data_parameter = {
          check_cheangcontacType: this.state.ChaengeContactType,
          Check_cheangName: this.state.ChaengName,
          check_licensep: this.ChaengLicenseplat,
          memberCode: value.memberCode,
          ternCode: value.ternCode,
          cardtype: value.cardtype,
          New_Contacttype: value.New_Contacttype,
          Contacttype: value.Contacttype,

          name: value.name,
          lastName: value.lastName,
          payment: value.payment,
          firstday: value.firstday,
          licenseplate: value.licenseplate,
          new_licenseplate: value.new_licenseplate,
          Model: value.Model,
          new_Model: value.new_Model,
          CarColor: value.CarColor,
          new_CarColor: value.new_CarColor,
          licenseplate1: value.licenseplate1,
          new_licenseplate1: value.new_licenseplate1,
          Model1: value.Model1,
          new_Model1: value.new_Model1,
          CarColor1: value.CarColor1,
          new_CarColor1: value.new_CarColor1,
          licenseplate2: value.licenseplate2,
          new_licenseplate2: value.new_licenseplate2,
          Model2: value.Model2,
          new_Model2: value.new_Model2,
          CarColor2: value.CarColor2,
          new_CarColor2: value.new_CarColor2,
          New_Name: value.New_Name,
          New_LastName: value.New_LastName
        };
        this.props.Require_Change_Member(data_parameter);
      }
    });
  };

  checkChaengName = e => {
    this.setState({ ChaengName: e.target.checked });
  };

  checkChaengeContactType = e => {
    this.setState({ ChaengeContactType: e.target.checked });
  };
  checkChaengLicenseplat = e => {
    this.setState({ ChaengLicenseplat: e.target.checked });
  };
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
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card className="gx-card" title={"Require Chang Member"}>
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
            <Col {...set_col}>
              <Checkbox onChange={this.checkChaengName}>
                <IntlMessages id="change_name_last_name" />
              </Checkbox>
            </Col>
            <Col {...set_col}>
              <Checkbox onChange={this.checkChaengeContactType}>
                <IntlMessages id="Change_contact_type" />
              </Checkbox>
            </Col>
            <Col {...set_col}>
              <Checkbox onChange={this.checkChaengLicenseplat}>
                <IntlMessages id="change_license_plate" />
              </Checkbox>
            </Col>
          </Row>
          <br />
          <Row>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="car_type" />}
              >
                {getFieldDecorator("cardtype", {
                  initialValue: this.state.carType,
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="Please_Select_Car_Type" />
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
                {getFieldDecorator("memberCode", {
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
                {getFieldDecorator("Contacttype", {
                  initialValue: this.props.data_user_info.Cartype
                })(<Input disabled />)}
              </FormItem>
              {this.state.ChaengeContactType && (
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="new_contract_type" />}
                >
                  {getFieldDecorator("New_Contacttype", {
                    rules: [
                      {
                        required: true,
                        message: (
                          <IntlMessages id="please_select_contractType" />
                        )
                      }
                    ]
                  })(
                    <Select>
                      {this.props.data_contact_type_list &&
                        this.props.data_contact_type_list.map(c => (
                          <Option value={c.contacttypeId}>
                            {c.contactype}
                          </Option>
                        ))}
                    </Select>
                  )}
                </FormItem>
              )}
            </Col>
            <Col {...set_col}>
              <FormItem {...formItemLayout} label={<IntlMessages id="name" />}>
                {getFieldDecorator("name", {
                  initialValue: this.props.data_user_info.name1
                })(<Input disabled />)}
              </FormItem>
              {this.state.ChaengName && (
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="new_name" />}
                >
                  {getFieldDecorator("New_Name", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="Please_input_name" />
                      }
                    ]
                  })(<Input />)}
                </FormItem>
              )}

              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="last_name" />}
              >
                {getFieldDecorator("lastName", {
                  initialValue: this.props.data_user_info.LastName1
                })(<Input disabled />)}
              </FormItem>
              {this.state.ChaengName && (
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="new_last_name" />}
                >
                  {getFieldDecorator("New_LastName", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="Please_input_lest_name" />
                      }
                    ]
                  })(<Input />)}
                </FormItem>
              )}
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
                {getFieldDecorator("licenseplate", {
                  initialValue: this.props.data_user_info.vehicalID
                })(<Input disabled />)}
              </FormItem>
              {this.state.ChaengLicenseplat && (
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="new_license_plate" />}
                >
                  {getFieldDecorator("new_licenseplate", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="Please_input_license" />
                      }
                    ]
                  })(<Input />)}
                </FormItem>
              )}
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="licensePlate2" />}
              >
                {getFieldDecorator("licenseplate1", {
                  initialValue: this.props.data_user_info.vehicalID1
                })(<Input disabled />)}
              </FormItem>
              {this.state.ChaengLicenseplat && (
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="newlicensePlate2" />}
                >
                  {getFieldDecorator("new_licenseplate1")(<Input />)}
                </FormItem>
              )}
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="licensePlate3" />}
              >
                {getFieldDecorator("licenseplate2", {
                  initialValue: this.props.data_user_info.vehicalID2
                })(<Input disabled />)}
              </FormItem>
              {this.state.ChaengLicenseplat && (
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="newlicensePlate3" />}
                >
                  {getFieldDecorator("new_licenseplate2")(<Input />)}
                </FormItem>
              )}
            </Col>
          </Row>
          <Row>
            <Col {...set_col}>
              <FormItem {...formItemLayout} label={<IntlMessages id="model" />}>
                {getFieldDecorator("Model", {
                  initialValue: this.props.data_user_info.Model
                })(<Input disabled />)}
              </FormItem>
              {this.state.ChaengLicenseplat && (
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="new_model" />}
                >
                  {getFieldDecorator("new_Model", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="Please_input_model" />
                      }
                    ]
                  })(<Input />)}
                </FormItem>
              )}
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="model2" />}
              >
                {getFieldDecorator("Model1", {
                  initialValue: this.props.data_user_info.Model1
                })(<Input disabled />)}
              </FormItem>
              {this.state.ChaengLicenseplat && (
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="new_model2" />}
                >
                  {getFieldDecorator("new_Model1")(<Input />)}
                </FormItem>
              )}
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="model3" />}
              >
                {getFieldDecorator("Model2", {
                  initialValue: this.props.data_user_info.Model2
                })(<Input disabled />)}
              </FormItem>
              {this.state.ChaengLicenseplat && (
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="new_modle3" />}
                >
                  {getFieldDecorator("new_Model2")(<Input />)}
                </FormItem>
              )}
            </Col>
          </Row>
          <Row>
            <Col {...set_col}>
              <FormItem {...formItemLayout} label={<IntlMessages id="color" />}>
                {getFieldDecorator("CarColor", {
                  initialValue: this.props.data_user_info.color
                })(<Input disabled />)}
              </FormItem>
              {this.state.ChaengLicenseplat && (
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="new_color" />}
                >
                  {getFieldDecorator("new_CarColor", {
                    rules: [
                      {
                        required: true,
                        message: <IntlMessages id="Please_input_Color" />
                      }
                    ]
                  })(<Input />)}
                </FormItem>
              )}
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="Color2" />}
              >
                {getFieldDecorator("CarColor1", {
                  initialValue: this.props.data_user_info.color1
                })(<Input disabled />)}
              </FormItem>
              {this.state.ChaengLicenseplat && (
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="new_color2" />}
                >
                  {getFieldDecorator("new_CarColor1")(<Input />)}
                </FormItem>
              )}
            </Col>
            <Col {...set_col}>
              <FormItem
                {...formItemLayout}
                label={<IntlMessages id="Color3" />}
              >
                {getFieldDecorator("CarColor2", {
                  initialValue: this.props.data_user_info.color2
                })(<Input disabled />)}
              </FormItem>
              {this.state.ChaengLicenseplat && (
                <FormItem
                  {...formItemLayout}
                  label={<IntlMessages id="new_Color3" />}
                >
                  {getFieldDecorator("new_CarColor2")(<Input />)}
                </FormItem>
              )}
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
                  <Icon type="stop"></Icon> <IntlMessages id="Cancel" />
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

const FormChangeMember = Form.create({ name: "FormChangeMember" })(
  ChangeMember
);
const mapStateToProps = ({ reqirecheang, auth }) => {
  const {
    data_require_cartype,
    data_payment_list,
    data_contact_type_list,
    data_member_name_list,
    data_user_info
  } = reqirecheang;
  const { authUser } = auth;
  return {
    data_require_cartype,
    data_payment_list,
    data_contact_type_list,
    data_member_name_list,
    data_user_info,
    authUser
  };
};
export default connect(mapStateToProps, {
  load_contac_type_list,
  load_payment_list,
  load_require_cardtype,
  get_member_name_list,
  get_user_info,
  show_message_error,
  Require_Change_Member
})(FormChangeMember);
