import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { auth } from "../../../actions";

const SideNavItems = ({ user }) => {
  const items = [
    {
      type: "navItem",
      link: "/",
      icon: "home",
      text: "Home",
      authorisedRoute: null,
    },
    {
      type: "navItem",
      link: "/user",
      icon: "file-text-o",
      text: "My Profile",
      authorisedRoute: true,
    },
    {
      type: "navItem",
      link: "/user/register",
      icon: "file-text-o",
      text: "Add User",
      authorisedRoute: null,
    },
    {
      type: "navItem",
      link: "/user/user-reviews",
      icon: "file-text-o",
      text: "My Reviews",
      authorisedRoute: true,
    },
    {
      type: "navItem",
      link: "/user/add",
      icon: "file-text-o",
      text: "Add Reviews",
      authorisedRoute: true,
    },
    {
      type: "navItem",
      link: "/login",
      icon: "sign-in",
      text: "Log In",
      authorisedRoute: false,
    },
    {
      type: "navItem",
      link: "/user/logout",
      icon: "sign-out",
      text: "Log Out",
      authorisedRoute: true,
    },
  ];

  const element = (item, i) => {
    return (
      <div className={item.type} key={i}>
        <Link to={item.link}>
          <FontAwesome name={item.icon} />
          {item.text}
        </Link>
      </div>
    );
  };

  const showItem = () => {
    return user.login
      ? items.map((item, i) => {
          if (
            (user.login.isAuth && item.authorisedRoute === true) ||
            (!user.login.isAuth && item.authorisedRoute === false) ||
            item.authorisedRoute === null
          )
            return element(item, i);
        })
      : null;
  };

  return { user } ? <div>{showItem()}</div> : null;
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ auth }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNavItems);
