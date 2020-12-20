import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row, Card, Input, Form, Icon, Button } from "antd";
import IntlMessages from "../../util/IntlMessages";
class ImageInOut extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card className="gx-card" title={<IntlMessages id="imageCar" />}>
        <div className="gx-gallery-grid gx-gallery-3">
          {this.props.stampmodel.PicIn1 && (
            <div className="gx-gallery-item">
              <img
                className="gx-img-fluid"
                src={this.props.stampmodel.PicIn1}
                alt="post"
              />
            </div>
          )}

          {this.props.stampmodel.PicIn2 && (
            <div className="gx-gallery-item">
              <img
                className="gx-img-fluid"
                src={this.props.stampmodel.PicIn2}
                alt="post"
              />
            </div>
          )}

          {this.props.stampmodel.PicIn3 && (
            <div className="gx-gallery-item">
              <img
                className="gx-img-fluid"
                src={this.props.stampmodel.PicIn3}
                alt="post"
              />
            </div>
          )}
        </div>
      </Card>
    );
  }
}
const mapStateToProps = ({ stamp }) => {
  const { stampmodel } = stamp;
  return { stampmodel };
};
export default connect(mapStateToProps, {})(ImageInOut);
