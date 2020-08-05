import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { auth } from "../actions";

export default function (ComposedClass, authComponent) {
  class AuthenticationCheck extends Component {
    state = {
      loading: true,
    };

    componentWillMount() {
      this.props.auth();
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ loading: false });

      if (!nextProps.user.login.isAuth) {
        if (authComponent) this.props.history.push("/login");
      } else {
        if (authComponent === false) this.props.history.push("/user");
      }
    }

    render() {
      if (this.state.loading) {
        return <div className="loader"></div>;
      }
      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  const mapStateToProps = (state) => ({
    user: state.user,
  });

  const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({ auth }, dispatch),
  });

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticationCheck);
}
