import React, { Component } from "react";
import { Card, Input, Form, Select, Button } from "antd";
import { connect } from "react-redux";
import IntlMessages from "../../util/IntlMessages";
import { formant_date_time } from "../../util/DataConfig";
import {
  insertStampCode,
  insertStampParking
} from "../../appRedux/actions/Stamp";
import moment from "moment";

const FormItem = Form.Item;
const Option = Select.Option;

class TimeinAndLicensePlate extends Component {
  constructor(props) {
    super(props);
  }
  SubmitStamp = e => {
    e.preventDefault();

    this.props.form.validateFields((err, stampValue) => {
      if (err) {
        return;
      }

      if (this.props.stampmodel.VisitorID.indexOf("CC") !== -1) {
        var data_stamp_parking = {
          StampCodeSelect: stampValue.stampCodeSelete,
          inoutTrainID: stampValue.inoutTrainID,
          clientid: 1,
          userid: 1,
          deptid: 1,
          areaid: 1
        };

        this.props.insertStampParking(data_stamp_parking);
      } else {
        var data_stamp = {
          inoutTrainID: stampValue.inoutTrainID,
          StampCodeSelect: stampValue.stampCodeSelete,
          custom: stampValue.custom
        };
        this.props.insertStampCode(data_stamp);
      }
    });
  };
  showButtonStamp = () => {
    if (this.props.stampmodel.historyStamp_list) {
      if (Object.keys(this.props.stampmodel.historyStamp_list).length < 4) {
        return (
          <Button loading={this.props.loading} type="primary" htmlType="submit">
            <IntlMessages id="stamp.stamp" />
          </Button>
        );
      } else {
        return <p>มี Stamp ครบจำนวนแล้ว</p>;
      }
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    return (
      <Card className="gx-card" title={<IntlMessages id="visitordetail" />}>
        <Form {...formItemLayout} layout="vertical" onSubmit={this.SubmitStamp}>
          {getFieldDecorator("inoutTrainID", {
            initialValue: this.props.stampmodel.inoutTrainID
          })(<Input hidden={true} />)}
          <FormItem label={<IntlMessages id="TimeIn" />}>
            {getFieldDecorator("timeIn", {
              initialValue: this.props.stampmodel.Time_IN
                ? moment(this.props.stampmodel.Time_IN).format(
                    formant_date_time
                  )
                : ""
            })(<Input disabled={true} />)}
          </FormItem>
          <FormItem label={<IntlMessages id="licensePlate" />}>
            {getFieldDecorator("licenseplate", {
              initialValue: this.props.stampmodel.license_plate
            })(<Input disabled={true} />)}
          </FormItem>
          <FormItem label={<IntlMessages id="totaltime" />}>
            {getFieldDecorator("totaltime", {
              initialValue: this.props.stampmodel.TotalTime
            })(<Input disabled={true} />)}
          </FormItem>
          <FormItem label={<IntlMessages id="custom" />}>
            {getFieldDecorator("custom")(<Input />)}
          </FormItem>
          {this.props.stampmodel.StampCodeList && (
            <div>
              <FormItem label={<IntlMessages id="StampCode" />}>
                {getFieldDecorator("stampCodeSelete", {
                  rules: [
                    {
                      required: true,
                      message: <IntlMessages id="PleaseSeleteStamp" />
                    }
                  ]
                })(
                  <Select
                    placeholder={<IntlMessages id="PleaseSeleteStamp" />}
                    className="gx-mr-3 gx-mb-3"
                    showSearch
                    style={{ width: "100%" }}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {this.props.stampmodel.StampCodeList &&
                      this.props.stampmodel.StampCodeList.map(c => {
                        return (
                          <Option key={c.stampcode} value={c.stampcode}>
                            {c.stampCodeName}
                          </Option>
                        );
                      })}
                  </Select>
                )}
              </FormItem>
              <FormItem>{this.showButtonStamp()}</FormItem>
            </div>
          )}
        </Form>
      </Card>
    );
  }
}
const VisitorDetail = Form.create()(TimeinAndLicensePlate);
const mapstaetToProps = ({ stamp, commonData }) => {
  const { visitor_detail, stampmodel } = stamp;
  const { loading } = commonData;
  return {
    visitor_detail,
    stampmodel,
    loading
  };
};
export default connect(mapstaetToProps, {
  insertStampCode,
  insertStampParking
})(VisitorDetail);
