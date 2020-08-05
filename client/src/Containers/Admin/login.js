import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "../../actions/index";
import Input from "../../WidgetsUI/Input";

class Login extends Component {
  state = {
    email: {
      errorMessage: "",
      value: "",
      validate: false,
      config: {
        type: "email",
        placeholder: "Enter Email",
        required: true,
      },
    },
    password: {
      errorMessage: "",
      value: "",
      validate: false,
      successMessage: "",
      config: {
        type: "password",
        placeholder: "Enter Password",
        required: true,
      },
    },
  };

  validate = (input) => {
    input.errorMessage = "";
    if (input.value === "") input.errorMessage = "Field Required";
    else if (input.config.type === "email") {
      if (
        !RegExp(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ).test(input.value)
      ) {
        input.errorMessage = "Not Valid Email";
      }
    } else if (input.config.type === "password") {
      if (input.value.length < 5) {
        input.errorMessage = "Password too short";
      }
    }
    if (input.errorMessage === "") input.validate = true;
    else input.validate = false;

    return input;
  };

  handleInputChange = (event, input) => {
    input.value = event.target.value;
    input = this.validate(input);

    this.updateState(input);
  };

  updateState = (input) => {
    if (input.config.type === "email") this.setState({ email: { ...input } });
    else if (input.config.type === "password")
      this.setState({ password: { ...input } });
  };

  submitForm = (e) => {
    e.preventDefault();
    let submit = true;
    Object.entries(this.state).forEach((input) => {
      if (!input[1].validate) {
        submit = false;
      }
    });
    if (submit) {
      this.props.loginUser(this.state.email.value, this.state.password.value);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.login.isAuth) this.props.history.push("/user");
  }

  renderForm() {
    return (
      <div className="rl_container">
        <form onSubmit={this.submitForm}>
          <h2>Log in here</h2>
          <Input
            {...this.state.email}
            onchange={(event) =>
              this.handleInputChange(event, this.state.email)
            }
          />
          <Input
            {...this.state.password}
            onchange={(event) =>
              this.handleInputChange(event, this.state.password)
            }
          />
          <button type="submit">Log In</button>
          <div className="error">
            {this.props.user.login ? (
              <div>{this.props.user.login.message}</div>
            ) : null}
          </div>
        </form>
      </div>
    );
  }

  render() {
    return this.renderForm();
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ loginUser }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
