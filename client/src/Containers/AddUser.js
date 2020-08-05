import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../WidgetsUI/Input";
import { addUser, getUserlist, clearUser } from "../actions";
import { bindActionCreators } from "redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class AddUser extends Component {
  state = {
    formdata: {
      values: {
        name: "",
        lastname: "",
        email: "",
        password: "",
      },
      config: {
        name: {
          type: "text",
          placeholder: "Enter Name",
        },
        lastname: {
          type: "text",
          placeholder: "Enter lastname",
        },
        email: {
          type: "text",
          placeholder: "Enter email",
        },
        password: {
          type: "password",
          placeholder: "Enter password",
        },
      },
      error: {
        name: "",
        lastname: "",
        email: "",
        password: "",
      },
      valid: {
        name: false,
        lastname: false,
        email: false,
        password: false,
      },
    },
    successMessage: "",
    errorMessage: "",
  };

  componentWillMount() {
    this.props.getUserlist();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userAddInfo.user) {
      if (nextProps.userAddInfo.user.success) {
        this.props.getUserlist();
        this.props.clearUser();
        this.setState({
          formdata: {
            ...this.state.formdata,
            values: { name: "", lastname: "", email: "", password: "" },
          },
          successMessage: "User added Successfully",
          errorMessage: "",
        });
      } else {
        this.setState({
          errorMessage: nextProps.userAddInfo.user.errorMessage,
          successMessage: "",
        });
      }
      setTimeout(
        () => this.setState({ successMessage: "", errorMessage: "" }),
        3000
      );
    }
  }

  handleInputChnage = (event, input) => {
    let values = { ...this.state.formdata.values };
    values[input] = event.target.value;

    let newFormData = {
      ...this.state.formdata,
      values,
      error: { ...this.validate(event.target.value, input).errors },
      valid: { ...this.validate(event.target.value, input).valid },
    };
    this.setState({ formdata: newFormData });
  };

  validate = (value, input) => {
    let errors = { ...this.state.formdata.error };
    let valid = { ...this.state.formdata.valid };
    errors[input] = "";

    if (input === "name" || input === "lastname") {
      if (value === "") errors[input] = "Field cannot be empty.";
    } else if (input === "email") {
      if (
        !RegExp(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ).test(value)
      )
        errors[input] = "Email not valid.";
    } else if (input === "password") {
      if (value.length < 5) errors[input] = "Password too short.";
    }

    errors[input] === "" ? (valid[input] = true) : (valid[input] = false);

    return {
      errors,
      valid,
    };
  };

  submitUserDetails = (e) => {
    e.preventDefault();

    if (
      Object.keys(this.state.formdata.valid).every(
        (key) => this.state.formdata.valid[key]
      )
    ) {
      this.props.addUser(this.state.formdata.values);
    }
  };

  renderForm = () => {
    return (
      <div className="add-user-form">
        <form onSubmit={this.submitUserDetails}>
          <Input
            config={this.state.formdata.config.name}
            value={this.state.formdata.values.name}
            onchange={(event) => this.handleInputChnage(event, "name")}
            errorMessage={this.state.formdata.error.name}
          />
          <Input
            config={this.state.formdata.config.lastname}
            value={this.state.formdata.values.lastname}
            onchange={(event) => this.handleInputChnage(event, "lastname")}
            errorMessage={this.state.formdata.error.lastname}
          />
          <Input
            config={this.state.formdata.config.email}
            value={this.state.formdata.values.email}
            onchange={(event) => this.handleInputChnage(event, "email")}
            errorMessage={this.state.formdata.error.email}
          />
          <Input
            config={this.state.formdata.config.password}
            value={this.state.formdata.values.password}
            onchange={(event) => this.handleInputChnage(event, "password")}
            errorMessage={this.state.formdata.error.password}
          />
          <button type="submit">Add User</button>
        </form>
      </div>
    );
  };

  fillTableWithData = () => {
    return this.props.userAddInfo.userList
      ? this.props.userAddInfo.userList.map((item, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.lastname}</td>
              <td>{item.email}</td>
            </tr>
          );
        })
      : null;
  };

  render() {
    return (
      <div className="add-user-wrap">
        <div className="add-user-container">
          <TransitionGroup component="div">
            {this.state.successMessage ? (
              <CSSTransition classNames="status" timeout={400}>
                <div className="success-adding">
                  {this.state.successMessage}
                </div>
              </CSSTransition>
            ) : null}
            {this.state.errorMessage ? (
              <CSSTransition classNames="status" timeout={400}>
                <div className="error-adding">{this.state.errorMessage}</div>
              </CSSTransition>
            ) : null}
          </TransitionGroup>
          <h2>Add User</h2>
          {this.renderForm()}
        </div>
        <div className="user-list-table">
          <h1>Users List</h1>
          <table>
            <thead>
              <tr>
                <th>Sl.no</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>{this.fillTableWithData()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userAddInfo: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ addUser, getUserlist, clearUser }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
