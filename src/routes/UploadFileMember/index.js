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
  Card,
  message
} from "antd";
import { post } from "axios";
import { urlapi } from "../../util/urlconfig";
import { connect } from "react-redux";
import {
  upload_file,
  load_doc_list,
  send_email_uploadFile
} from "../../appRedux/actions/Member";

import IntlMessages from "../../util/IntlMessages";

const { Column } = Table;
const FormItem = Form.Item;
const { Option } = Select;
const set_col = {
  lg: 20,
  md: 20,
  sm: 12,
  xs: 24
};
const formItemLayout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 12 }
};
class UploadFileMember extends Component {
  constructor(props) {
    super(props);
    const reqNo = new URLSearchParams(this.props.location.search).get("req");
    this.state = {
      reqNo: reqNo,
      file: "",
      documentType: "0",
      fileList: [],
      uploading: false
    };
  }

  componentDidMount() {
    this.props.load_doc_list(this.state.reqNo);
  }

  handleUpload = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
          formData.append("files[]", file);
        });
        formData.append("reqId", this.state.reqNo);
        formData.append("docType", this.state.documentType);
        formData.append("sAdmin", this.props.authUser.Aminname);
        this.setState({
          uploading: true
        });
        this.props.upload_file(formData, this.state.reqNo);
        this.setState({ fileList: [] });
      }
    });
  };

  setFile(e) {
    this.setState({ file: e.target.files[0] });
    console.log(this.state.file);
  }
  onChange = value => {
    this.setState({ documentType: value });
    //console.log(`selected ${this.state.documentType}`);
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };

    const columns = [
      {
        title: "Document Type",
        dataIndex: "docType",
        key: "docType"
      },
      {
        title: "Document Name",
        dataIndex: "DocName",
        key: "DocName"
      },
      {
        title: "Upload date",
        dataIndex: "UploadDate",
        key: "UploadDate"
      }
    ];

    return (
      <div>
        <Card className="gx-card" title={"Upload File"}>
          <Form onSubmit={e => this.handleUpload(e)}>
            <Row>
              <Col {...set_col}>
                <FormItem {...formItemLayout} label={"Document Type"}>
                  {getFieldDecorator("documenttype", {
                    initialValue: "0",
                    rules: [
                      {
                        require: true,
                        message: "Plase Select Document Type"
                      }
                    ]
                  })(
                    <Select onChange={this.onChange}>
                      <Option value="0">สำเนาประชาชน</Option>
                      <Option value="1">สำเนาทะเบียนรถ</Option>
                      <Option value="2">สำเนาใบขับขี่</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col {...set_col}></Col>
              <Col {...set_col}>
                <FormItem {...formItemLayout} label={"Upload File"}>
                  {getFieldDecorator("inputFile", {
                    rules: [{ required: true, message: "Please upload File!" }]
                  })(
                    <Upload {...props} ileList={this.state.fileList}>
                      <Button>Select File</Button>
                    </Upload>
                  )}
                </FormItem>
              </Col>
              <Col {...set_col}></Col>
            </Row>
            <Button htmlType="submit">Upload</Button>
          </Form>
        </Card>
        <Card className="gx-card" title={"Upload File"}>
          <Table
            columns={columns}
            dataSource={this.props.data_doc_list}
            scroll={{ x: 500 }}
          ></Table>
          <Button
            onClick={() => {
              this.props.send_email_uploadFile(this.state.reqNo);
            }}
            loading={this.props.loading}
          >
            {!this.props.loading && <Icon type="mail"></Icon>} Send Email
          </Button>
        </Card>
      </div>
    );
  }
}
const formUploadFile = Form.create({ name: "formUploadFile" })(
  UploadFileMember
);
const mapStateToProps = ({ member, commonData, auth }) => {
  const { data_doc_list } = member;
  const { authUser } = auth;
  const { loading } = commonData;
  return { data_doc_list, loading, authUser };
};
export default connect(mapStateToProps, {
  upload_file,
  load_doc_list,
  send_email_uploadFile
})(formUploadFile);
