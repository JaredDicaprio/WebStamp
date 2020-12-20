import React from "react";
import { post } from "axios";
import { urlapi } from "../../util/urlconfig";
class Fileupload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      reqId: "123456"
    };
  }
  async submit(e) {
    e.preventDefault();
    const url = `${urlapi}api/cdr/uploadfile`;
    const formData = new FormData();
    formData.append("body", this.state.file);
    formData.append("reqId", "123456");

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return post(url, formData, config);
  }
  setFile(e) {
    this.setState({ file: e.target.files[0] });
  }
  render() {
    return (
      <div className="container-fluid">
        <form onSubmit={e => this.submit(e)}>
          <h1>File Upload</h1>
          <input type="file" onChange={e => this.setFile(e)} />
          <button className="btn btn-primary" type="submit">
            Upload
          </button>
        </form>
      </div>
    );
  }
}
export default Fileupload;
