import React from "react";
import CircularProgress from "components/CircularProgress/index";
import { message } from "antd";
import Auxiliary from "util/Auxiliary";
import { connect } from "react-redux";
import { hideMessage } from "appRedux/actions/Common";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import IntlMessages from "../../util/IntlMessages";
import SweetAlert from "react-bootstrap-sweetalert";
import swal from "sweetalert";
class InfoView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAlert: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error || nextProps.message || nextProps.displayMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 3000);
    }
  }

  render() {
    const { error, loading, displayMessage } = this.props;

    return (
      <Auxiliary>
        {loading && (
          <div className="gx-loader-view">
            <CircularProgress />
          </div>
        )}
        {displayMessage &&
          // <SweetAlert success title={displayMessage}></SweetAlert>
          message.success(displayMessage, 3)}
        {error && message.error(error, 3)}

        <NotificationContainer />
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({ commonData }) => {
  const { error, loading } = commonData;
  const displayMessage = commonData.message;
  return { error, loading, displayMessage };
};

export default connect(mapStateToProps, { hideMessage })(InfoView);
