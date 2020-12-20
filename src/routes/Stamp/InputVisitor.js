import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Card, Input, Form, Icon, Button } from "antd";
import IntlMessages from "../../util/IntlMessages";
import { formatMessage } from "devextreme/localization";
import {
  load_visitor_detail,
  load_inout_trandetail,
  load_visitor_detail_parking,
  remove_data_stamp
} from "../../appRedux/actions/Stamp";
import {
  show_message_error,
  show_message_success
} from "../../appRedux/actions/Alert";
const FormItem = Form.Item;
const { Search } = Input;
class InputVisitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visitorId: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      }
    });
  };
  cancel = () => {
    this.props.remove_data_stamp();
    this.setState({ visitorId: "" });
  };
  SearchVistor = value => {
    if (value.length > 0) {
      var datat_visitor_id = {
        visitor_id: value
      };

      var string_visitor_id = new String(value);
      if (string_visitor_id.indexOf("CC") === -1) {
        this.props.load_inout_trandetail(datat_visitor_id);
      } else {
        this.props.load_visitor_detail_parking(value);
      }
      // this.setState({ visitorId: "" });
    } else {
      this.props.show_message_error(formatMessage("please_input_visitor_code"));
    }
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     var datat_visitor_id = {
    //       visitor_id: values.visitorId
    //     };

    //     var string_visitor_id = new String(values.visitorId);
    //     if (string_visitor_id.indexOf("CC") === -1) {
    //       this.props.load_inout_trandetail(datat_visitor_id);
    //     } else {
    //       this.props.load_visitor_detail_parking(values.visitorId);
    //     }
    //   }
    // });
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
      <Card className="gx-card" title={<IntlMessages id="StampVisitor" />}>
        <Form
          {...formItemLayout}
          layout="vertical"
          onSubmit={this.handleSubmit}
        >
          {/* <IntlMessages id="stamp.visitorId" /> */}
          <FormItem
            label={
              <h4>
                {/* <IntlMessages id="stamp.visitorId" /> */}
                {formatMessage("stamp.visitorId")}
              </h4>
            }
          >
            <Search
              prefix={
                <Icon type="idcard" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              value={this.state.visitorId}
              onChange={e => {
                this.setState({ visitorId: e.target.value });
              }}
              onSearch={value => this.SearchVistor(value)}
              disabled={this.props.stampmodel.VisitorID ? true : false}
            />

            {this.props.stampmodel.VisitorID && (
              <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
                <Button
                  type="primary"
                  size="default"
                  onClick={() => this.cancel()}
                >
                  <Icon type="stop" /> <IntlMessages id="Cancel" />
                </Button>
              </Form.Item>
            )}
          </FormItem>
        </Form>
      </Card>
    );
  }
}

const StampFrom = Form.create()(InputVisitor);
const mapStateToProps = ({ stamp, commonData }) => {
  const { stampmodel } = stamp;
  const { loading } = commonData;
  return { stampmodel, loading };
};
export default connect(mapStateToProps, {
  load_visitor_detail,
  load_inout_trandetail,
  remove_data_stamp,
  load_visitor_detail_parking,
  show_message_error,
  show_message_success
})(StampFrom);
