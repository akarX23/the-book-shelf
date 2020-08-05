import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import { bindActionCreators } from "redux";

class Logout extends Component {
  state = {
    logout: false,
    error: "",
  };

  confirmYes = () => {
    this.props.logoutUser();
  };

  confirmNo = () => {
    this.props.history.push("/");
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.logoutInfo.logout.success) {
      this.setState({
        logout: true,
      });
      setTimeout(() => this.props.history.push("/"), 2500);
    } else this.setState({ error: nextProps.logoutInfo.logout.error });
  }

  render() {
    return (
      <div className="logout-container">
        {!this.state.logout ? (
          <div className="confirm-dialouguebox">
            <div className="confirmMessage">Do you really want to log out?</div>
            <div className="confirm-button">
              <button className="confirm-yes" onClick={this.confirmYes}>
                Yes
              </button>
              <button className="confirm-no" onClick={this.confirmNo}>
                No
              </button>
            </div>
            <div className="error-logout">{this.state.error}</div>
          </div>
        ) : (
          <div className="farewell-message">Sorry to see you go :\</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  logoutInfo: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ logoutUser }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
